import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';


//API for adding doctor
const addDoctor = async (req, res)=>{
    try {
       const {name, email, password, speciality, degree, experience, about, fees, address} = req.body 
       const imageFile = req.file

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ){
           return res.json({success: false, message: "Missing Details"});
        }

        // validating email  formate
        if(!validator.isEmail(email)){
         return res.json({success: false, message: "Please Enter Valide Email"});  
        }

        // validate password
         if(password.length < 8){
         return res.json({success: false, message: "Please Enter Strong Password"});  

         }

       //hashing doctorpassword
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       //upload image on cloudinary
       const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
       const imageUrl = imageUpload.secure_url

       const doctorData = {
         name,
         email,
         password: hashedPassword,
         speciality,
         degree,
         experience,
         fees,
         about,
         address: JSON.parse(address),
         image:imageUrl,
         date: Date.now()
       }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save();

    res.json({success: true, message: "Doctor Added Success"})
       
    } catch (error) {
     console.log(error.message)
     res.json({success: false, message: error.message})    
    }
}

// api to login admin
const loginAdmin = async (req, res)=>{
   try {
      const {email, password} = req.body

      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
         
         const token = jwt.sign(email+password, process.env.JWT_SECRET)
         res.json({success:true, token})

      }else{
         return res.json({success: false, message: "Invalid credentials"});
      }
      
   } catch (error) {
      console.log(error.message)
      res.json({success: false, message: error.message})    
      
   }
}

// api to fetch all doctors
const allDoctors = async (req, res)=>{
   try {  
    const doctors = await doctorModel.find({}).select('-password');
    return res.json({success:true, doctors})

   } catch (error) {
   console.log(error.message)
    return res.json({success: false, message: error.message})    
      
   }
}


// api to get all appointments list
const appointmentsAdmin = async (req, res)=>{
   try {

      const appointments = await appointmentModel.find({})

      res.json({success: true, appointments})
      
   } catch (error) {
      console.log(error.message)
      return res.json({success: false, message: error.message})    
    
   }
}


// api for appointment cancellation 
const appoimtmentCancel = async (req, res) => {
   try {

       const { appointmentId } = req.body

       const appointmentData = await appointmentModel.findById(appointmentId)

       

       await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

       //releasing doctor's slot
       const { docId, slotDate, slotTime } = appointmentData

       const doctorData = await doctorModel.findById(docId)

       let slot_booked = doctorData.slot_booked

       slot_booked[slotDate] = slot_booked[slotDate].filter(e => e !== slotTime)

       await doctorModel.findByIdAndUpdate(docId, { slot_booked })

       res.json({ success: true, message: "Appointment Cancelled" })
   } catch (error) {
       console.log(error.message)
       return res.json({ success: false, message: error.message })
   }
}

// api to get dashboard data for admin dashboard

const adminDashboard =async (req, res)=>{
   try {
      const doctors = await doctorModel.find({})
      const users = await userModel.find({})
      const appointments = await appointmentModel.find({})

      const dashData = {
         doctors: doctors.length,
         appointments: appointments.length,
         users: users.length,
         latestAppointment: appointments.reverse().slice(0,5)
      }

       res.json({success:true, dashData})



   } catch (error) {
      console.log(error.message)
      return res.json({ success: false, message: error.message })

   }
}
  

export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appoimtmentCancel, adminDashboard}