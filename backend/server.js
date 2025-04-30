import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';



//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


//middlewares
app.use(express.json());
app.use(cors())


//api end points
app.use('/api/admin', adminRouter);
app.get('/', (req, res)=>{
  res.json('api working')
});



app.listen(port, ()=>{
    console.log('server start on', port)
})