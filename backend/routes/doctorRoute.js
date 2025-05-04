import express from 'express';
import { appointmentsDoctor, doctorslist, loginDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewars/authDoctor.js';

const doctorRouter = express.Router()


doctorRouter.get('/list', doctorslist)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/appointment-cancel', authDoctor, appointmentCancel)
doctorRouter.post('/appointment-complete', authDoctor, appointmentComplete)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/doctor-profile', authDoctor, doctorProfile)
doctorRouter.put('/update-profile', authDoctor, updateDoctorProfile)



export default doctorRouter;