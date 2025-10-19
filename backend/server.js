import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongoDb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adimRote.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'





//app config
const app=express()
const port =process.env.PORT||4000
connectDb()
connectCloudinary()



//middleware
app.use(express.json())
app.use(cors());
app.use('/uploads', express.static('uploads'));


//api end points
app.use('/api/admin',adminRouter)

//api  for doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>
{
    res.send('api working ')
})





app.listen(port,()=>console.log('server started',port))