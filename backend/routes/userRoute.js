import express from 'express';
import { bookAppointment, cancelAppointment, getMyAppointment, getProfileData, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorPay } from '../controllers/userController.js';
import authUser from '../middlewars/authUser.js';
import upload from '../middlewars/multer.js';


const userRoute = express.Router()



userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/get-profile', authUser, getProfileData);
userRoute.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRoute.post('/book-appointment', authUser, bookAppointment);
userRoute.get('/appointments', authUser, getMyAppointment);
userRoute.post('/cancel-appointment', authUser, cancelAppointment);
userRoute.post('/payment-razorpay', authUser, paymentRazorpay);
userRoute.post('/verify-razorpay', authUser, verifyRazorPay);



export default userRoute;