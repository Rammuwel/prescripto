import { addDoctor, loginAdmin } from "../controllers/adminController.js";
import express from 'express';
import upload from "../middlewars/multer.js";
import authAdmin from "../middlewars/authAdmin.js";


const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image') ,addDoctor);
adminRouter.post('/login',loginAdmin);

export default adminRouter;