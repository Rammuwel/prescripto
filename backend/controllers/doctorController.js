
import doctorModel from "../models/doctorModel.js"

const changeAvailability = async (req, res)=>{
    try {
       const {docId} = req.body
       const docData = await doctorModel.findById(docId)
       await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
       return res.json({success:true, message:"Availability Changed"})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
    
}

const doctorslist = async (req, res)=>{
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        if(!doctors){
            return res.json({success:false, message:"doctors not found"})
        }
        return res.json({success:true, doctors})

    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}


export {changeAvailability, doctorslist};