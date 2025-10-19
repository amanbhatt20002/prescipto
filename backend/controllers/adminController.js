import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
import { Doctor } from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import { Appointment } from "../models/appointmentModel.js";
import { User } from "../models/userModel.js";

//api fo radding doctor
const addDoctor = async (req, res) => {
  //   return res.status(200).json({ body: req.body, file: req.file });

  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      degree,
      about,
      fee,
      address,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !experience ||
      !degree ||
      !about ||
      !fee ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });

    if (await Doctor.findOne({ email }))
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    if (password.length < 8)
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters",
        });

    if (!imageFile)
      return res
        .status(400)
        .json({ success: false, message: "Doctor image is required" });

    if (isNaN(fee) || Number(fee) <= 0)
      return res
        .status(400)
        .json({ success: false, message: "Fee must be a positive number" });

    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address format" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const doctorData = {
      name,
      email,
      image: imageUpload.secure_url,
      password: hashedPassword,
      speciality,
      experience,
      degree,
      about,
      fee,
      address: parsedAddress,
      date: Date.now(),
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    res
      .status(200)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//API FOR THE ADMIN LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (email !== process.env.ADMIN_EMAIL) {
      return res
        .status(400)
        .json({ success: false, message: "Email not registered" });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//api tio get all doctors list
const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//api to get all all appoint ment list

const appointmentsAdmin=async(req,res)=>{
  try {
    const appointments=await Appointment.find({})
    res.json({success:true,appointments})
  } catch (error) {
     console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    
  }

}

// api for cancel from admin side

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);
    

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

//api  to get dashboard data for admin panel
const adminDashboard=async (req,res)=>{
  try {
      const doctors=await Doctor.find({})
      const users=await User.find({})
      const appointments=await Appointment.find({})

        const dashData={
          doctors:doctors.length,
          appointments:appointments.length,
          patients:users.length,
          latestAppointment:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})


  } catch (error) {
    console.error("List Appointment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
    
  }
}


export { addDoctor, loginAdmin, allDoctors,appointmentsAdmin,appointmentCancel ,adminDashboard};
