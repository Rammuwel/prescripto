import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

function MyAppoinments() {
  const navigate = useNavigate()
  const { token, backendUrl, getDoctorsData} = useContext(AppContext)
  
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Mar", "Apr", "May", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"]

 // get user appointment
  const getUserAppointments = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})

      if(data.success){
        setAppointments(data.appointments.reverse())
       
      }else{
        toast.error(data.message)
      }
    } catch (error) {
       console.log(error.message)
    }
  }
  
  // format date
  const slotDataFormats = (slotdate)=>{
    const dateArray = slotdate.split('-')
    return dateArray[0]+ " " + months[dateArray[1]]+ " " + dateArray[2]
  }


  // cancel appointment
  const cancelAppointment = async (appointmentId)=>{
    try {
       const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})
       if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  // first add javascript link from razorpay in index.html file
   // init payment config..
   const initPay = (order)=>{
        const options = {
          key: '' ,//razor pay kry id
          amount: order.currency,
          name: 'Appointment Payment',
          description: 'Appointment Payment',
          order_id: order.id,
          receipt: order.receipt,
          handler: async (response)=>{
            console.log(response)
            try {
              const {data} = await axios.post(backendUrl + '/api/user/verify-razorpay', response, {headers:{token}})
            
              if(data.success){
                  toast.success(data.message)
                  navigate('/my-appointments')
                  
              }else{
                toast.error(data.message)
                navigate('/my-appointments')
              }
            } catch (error) {
              console.log(error.message)
            }
          }
        }

        const rxp = new window.Razorpay(options)
        rzp.open()
   }

  // razorpay payment api call

  const appointmentRazorPay = async(req, res)=>{
         try {
           if(data.success){
              initPay(data.order)
           }
         } catch (error) {
           console.log(error.message)
         }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b border-b-gray-300'>My appointments</p>
      <div >
         {
          appointments.map((item, index)=>(
            <div className='grid grid-cols-[1fr_2fr]  gap-4 sm:flex sm:gap-6 py-2 border-b border-b-gray-300' key={index}>
                <div>
                  <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                  <p className='text-zinc-700 font-medium mt-1'>{item.docData.speciality}</p>
                  <p>Address:</p>
                  <p className='text-xs'>{item.docData.address.line1}</p>
                  <p className='text-xs'>{item.docData.address.line2}</p>
                  <p className='text-xs mt-1'><span className='text-sm text-neutral-700'>Date & Time:</span> {slotDataFormats(item.slotDate)} | {item.slotTime}</p>
                </div>
                <div></div>
                <div className='flex flex-col gap-2 justify-end'>
                 {!item.cancelled && item.payment && !item.isCompleted && <button className='text-sm bg-indigo-50 text-stone-500 text-center sm:min-w-48 py-2 border rounded'>Paid</button>}
                 {!item.cancelled && !item.isCompleted &&  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>}
                  {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500'>Cancel appointment</button>}
                  {item.cancelled && !item.isCompleted &&<button className='text-sm text-red-400 text-center sm:min-w-48 py-2 border rounded border-red-400'>Appointment cancelled</button>}
                  {item.isCompleted && <button className='text-sm text-green-400 text-center sm:min-w-48 py-2 border rounded border-green-400'>Completed</button>}
                  
                </div>
            </div>
          ))
         }
      </div>
    </div>
  )
}

export default MyAppoinments