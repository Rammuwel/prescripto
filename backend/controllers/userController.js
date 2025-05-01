import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import validator from 'validator'

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
         console.log(user)
        const  token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        return res.json({success:true, token})

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}



//lofin api
const loginUser = async (req, res)=>{
    try {
        const { email, password } = req.body

        if (!password || !email) {
            return res.json({ success: false, message: "Missing Details" })
        }

         const user = await userModel.findOne({email});

         if(!user){
            return res.json({success:false, message:'User not found'})
         }

         const isMatch = await bcrypt.compare(password, user.password)

         if(!isMatch){
            return res.json({ success: false, message: "Invalid credentials" })
         }

        
        const  token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        return res.json({success:true, token})
        
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
  
    }
}


export {registerUser, loginUser};