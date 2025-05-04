import { addDoctor, adminDashboard, allDoctors, appoimtmentCancel, appointmentsAdmin, loginAdmin } from "../controllers/adminController.js";
import express from 'express';
import upload from "../middlewars/multer.js";
import authAdmin from "../middlewars/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";


const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image') ,addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.get('/get-doctors',authAdmin, allDoctors);
adminRouter.post('/change-availability',authAdmin, changeAvailability);
adminRouter.get('/appointments',authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointments',authAdmin, appoimtmentCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

export default adminRouter;