import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/userModel.js";
import { Doctor } from "../models/doctorModel.js";
import { Appointment } from "../models/appointmentModel.js";
import razorpay from "razorpay";

// ===============================
// Register User
// ===============================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ===============================
// Login User
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ===============================
// Get User Profile
// ===============================
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ===============================
// Update User Profile
// ===============================
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.user.id;
    const imageFile = req.file;

    if (!userId || !name || !phone || !address || !dob || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;

    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    });

    if (imageFile) {
      const upload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      await User.findByIdAndUpdate(userId, { image: upload.secure_url });
    }

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ===============================
// Book Appointment
// ===============================
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { docId, slotDate, slotTime } = req.body;

    if (!docId || !slotDate || !slotTime) {
      return res
        .status(400)
        .json({ success: false, message: "Missing booking details" });
    }

    const docData = await Doctor.findById(docId).select("-password");
    if (!docData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not available" });
    }

    // Check if slot is already booked (ignoring cancelled appointments)
    const existingAppointment = await Appointment.findOne({
      docId,
      slotDate,
      slotTime,
      cancelled: false, // only consider active bookings
    });

    if (existingAppointment) {
      return res
        .status(400)
        .json({ success: false, message: "Slot already booked" });
    }

    // Update doctor's slots_booked
    let slots_booked = docData.slots_booked || {};
    if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
    if (!slots_booked[slotDate].includes(slotTime)) {
      slots_booked[slotDate].push(slotTime);
      await Doctor.findByIdAndUpdate(docId, { slots_booked });
    }

    const userData = await User.findById(userId).select("-password");

    // Save appointment
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fee,
      slotDate,
      slotTime,
      date: Date.now(),
      cancelled: false,
      payment: false,
      isCompleted: false,
    };

    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();

    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Book Appointment Error:", error);

    // Handle duplicate key error gracefully
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Slot already booked" });
    }

    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ===============================
// List All User Appointments
// ===============================
const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("List Appointment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "unauthorizes action" });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });
    //releasing doc slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await Doctor.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.error("List Appointment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//api to make payment of appointment
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled not found",
      });
    }
    // creating options for razor pay
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    //creation of an order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//api to  verify the raazor pay

const verifyRazorPay=async(req,res)=>{
  try {
      const {razorpay_order_id}=req.body
      const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
       
      if(orderInfo.status==="paid"){
        await Appointment.findByIdAndUpdate(orderInfo.receipt,{payment:true})
        res.json({success:true,message:"Payment Successful"})

      }else{
        res.json({success:false,message:"Payment Failed"})
      }


  } catch (error) {
     res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  
    
  }
}



export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorPay
};
