import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dtoken, setDtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(null)
    const [profileData, setProfileData] = useState(false)


    // api call to get all appointments for login doctor
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dtoken } })

            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    //api call to complete the appointment
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/appointment-complete', { appointmentId }, { headers: { dtoken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                getDashboard()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    //api call to complete the appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/appointment-cancel', { appointmentId }, { headers: { dtoken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                getDashboard()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // api call to doctor dashboard
    const getDashboard = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dtoken } })

            if(data.success){
               setDashData(data.dashData)
               console.log(data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    // api call for get profile data

    const getProfileData = async ()=>{
       try {
        const {data} = await axios.get(backendUrl + '/api/doctor/doctor-profile', {headers:{dtoken}})

        if(data.success){
            setProfileData(data.profileData)
            console.log(data.profileData)
        }else{
            toast.error(data.message)
    
        }
       } catch (error) {
        console.log(error.message)
       }
    }


   


    const value = {
        backendUrl,
        dtoken, setDtoken,
        getAppointments, appointments,
        completeAppointment,
        cancelAppointment,
        getDashboard,dashData,setDashData,
        profileData, setProfileData, getProfileData


    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;