import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorPay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter=express()

userRouter.post('/register',registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/get-profile",authUser,getProfile)
userRouter.post("/update-profile",upload.single('image'),authUser,updateProfile)
userRouter.post("/book-appointment",authUser,bookAppointment)
userRouter.get("/appointment",authUser,listAppointment)
userRouter.post("/cancel-appointment",authUser,cancelAppointment)
userRouter.post("/payment-razorpay",authUser,paymentRazorpay)
userRouter.post("/verifyRazorpay",authUser,verifyRazorPay)


export default userRouter