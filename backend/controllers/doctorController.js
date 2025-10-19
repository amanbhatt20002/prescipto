import { Doctor } from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await Doctor.findById(docId);
    await Doctor.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);
    res
      .status(200)
      .json({
        success: true,
        message: "Doctor list fetched successfully",
        doctors,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};


//api for doctor login
const loginDoctor=async(req ,res )=>{
  try {

    const {email,password}=req.body
    const doctor =await Doctor.findOne({email})

    if(!doctor){
      res.json({success:false,message:"invalid credentials"})
    }
    
    const isMatch=await bcrypt.compare(password,doctor.password)
    if(isMatch)
    {
      const token =jwt.sign({id:doctor._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"invalid credentials"})
    }
  } catch (error) {
     console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
    
  }
}

export { changeAvailability, doctorList ,loginDoctor};
