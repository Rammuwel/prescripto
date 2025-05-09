import React from 'react'
import { useContext } from 'react'
import { AdminContex } from '../../context/AdminContexr'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

function AllAppointment() {

  const {atoken, getAllAppointments, appointments, setAppointments, backendUrl,canncelAppointment} = useContext(AdminContex)
  const {calculateAge, slotDataFormats, currency} = useContext(AppContext)

  useEffect(()=>{
    if(atoken){
      getAllAppointments()
    }
  }, [atoken])
  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointments</p>
        <div className='bg-white  border border-gray-400 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
           <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-b-gray-400'>
              <p>#</p>
              <p>Patient</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Doctor</p>
              <p>Fees</p>
              <p>Actions</p>
           </div>
           {
            appointments.map((item, index)=>(
              <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:grid-flow-col items-center text-gray-500 py-3 px-6 border-b border-b-gray-300 hover:bg-gray-100'>
                <p className='max-sm:hidden'>{index + 1}</p>
                <div className='flex items-center gap-2'>
                  <img className='w-8 rounded-full' src={item.userData.image} alt="" />
                  <p >{item.userData.name}</p>
                </div>
                <p className='max-sm:hidden'>{calculateAge(item.userData.dob)} year</p>
                <p>{slotDataFormats(item.slotDate) }, {item.slotTime}</p>
                <div className='flex items-center gap-2'>
                  <img className='w-8 rounded-full bg-indigo-100' src={item.docData.image} alt="" />
                  <p >{item.docData.name}</p>
                </div>
                <p>{currency}{item.amount}</p>
                {
                  item.cancelled
                  ? <p className='text-red-500 text-xs font-medium'>Cacelled</p>
                  : item.isCompleted? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  :<img className=' cursor-pointer hover:scale-[80%] transition'  onClick={()=>canncelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                
                }
              </div>
            ))
           }
        </div>
    </div>
  )
}

export default AllAppointment