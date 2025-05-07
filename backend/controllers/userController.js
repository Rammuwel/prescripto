import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razarpay from 'razorpay'


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!password || !name || !email) {
            return res.json({ success: false, message: "Missing Details" })
        }

        //validate user email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter Valide Email" });
        }

        // validate password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter Strong Password" });

        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.json({ success: true, token })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}



//lofin api
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!password || !email) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.json({ success: true, token })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}


//get user data
const getProfileData = async (req, res) => {

    try {

        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')

        if (!userData) {
            return res.json({ success: false, message: "User Not Found" })
        }

        return res.json({ success: true, userData });

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}


// update profile

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId
        const imageFile = req.file
        const { name, phone, address, dob, gender } = req.body
       
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }


        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }



        return res.json({ success: true, message: "Profile updated" })


    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}


//api to book  appointment
const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId

        const { docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available" })
        }

        let slot_booked = docData.slot_booked

        /// checking for slot availability

        if (slot_booked[slotDate]) {
            if (slot_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slote Not Available" })
            } else {
                slot_booked[slotDate].push(slotTime)
            }
        } else {
            slot_booked[slotDate] = []
            slot_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slot_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slot_booked })

        res.json({ success: true, message: "Appointment Booked" })


    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}



// api for my appointments

const getMyAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}


///api to cancel the appoimtment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized access" })
        }

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

// api to make payment of appointment using razorpay

// config...
const razorpayIntance = new razarpay({
    key_id: 'ahshjksasKLHDHKhdk',
    key_secret: 'skhakhkJGDJKSGJKJJGDSKlakl'

})

const paymentRazorpay = async (req, res) => {
    try {

        const { appointmentId } = req.id

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res, json({ success: false, message: "Appointment cancelled or not found" })
        }

        //create options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            reciept: appointmentId,
        }

        // create of an order

        const order = await razorpayIntance.orders.create(options)

        return res.json({ success: true, order })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}

/// api to verify Razorpay peyment
const verifyRazorPay = async (req, res)=>{
   try {

    const {razarpay_order_id} = req.body
    const orderInfo = await razorpayIntance.orders.fetch(razarpay_order_id)
    console.log(orderInfo)

    if(orderInfo.status === 'paid'){
      await appointmentModel.findById(orderInfo.receipt, {payment: true})

      res.json({success: true, message: "Payment Successful"})
    }else{
      res.json({success: false, message: "Payment Failed"})

    }

    
   } catch (error) {
    console.log(error.message)
   }
}


export { registerUser, loginUser, getProfileData, updateProfile, bookAppointment, getMyAppointment, cancelAppointment, paymentRazorpay, verifyRazorPay };