
import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        return res.json({ success: true, message: "Availability Changed" })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }

}

const doctorslist = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        if (!doctors) {
            return res.json({ success: false, message: "doctors not found" })
        }
        return res.json({ success: true, doctors })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}


// api to login doctor 

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body

        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}


// api to get all doctor's appointments for doc panel
const appointmentsDoctor = async (req, res) => {
    try {

        const docId = req.docId

        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}

// api to mark appointment completed
const appointmentComplete = async (req, res) => {
    try {
        const docId = req.docId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment Completed" })
        } else {
            return res.json({ success: false, message: "Mark failed" })
        }



    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}


// api to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const docId = req.docId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: "Appointment Cancelled" })
        } else {
            return res.json({ success: false, message: "Cancelation failed" })
        }



    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}


// api to get dashboard data for doctor
const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })


        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }


        res.json({ success: true, dashData })



    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}

// api to get doctor's profile

const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId

        const profileData = await doctorModel.findById(docId).select('-password')

        if (!profileData) {
            res.json({ success: true, message: "Doctor data not found" })
        }

        res.json({ success: true, profileData })


    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}

// api to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const { fees, address, available } = req.body
        const docId = req.docId

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}



export {
    changeAvailability,
    doctorslist,
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
};