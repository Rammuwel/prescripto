import React, { useContext, useEffect } from 'react'
import { AdminContex } from '../../context/AdminContexr'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'


function Dashboard() {

  const { atoken, getDashData, dashData } = useContext(AdminContex)
  const {slotDataFormats} = useContext(AppContext)


  useEffect(() => {
    if (atoken) {
      getDashData()
    }
  }, [atoken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex flex-wrap items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div className='flex flex-col items-start'>
            <p className='text-xl font-semibold'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div className='flex flex-col items-start'>
            <p className='text-xl font-semibold'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div className='flex flex-col items-start'>
            <p className='text-xl font-semibold'>{dashData.users}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2 px-4 py-4 mt-10 rounded-t border-1 border-gray-300'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>
        <div className='pt4 border border-gray-400 border-t-0'>
          {
           dashData.latestAppointment && dashData.latestAppointment.map((item, index) => (
              <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
                <img className='w-10 rounded-full' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className=' text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{slotDataFormats(item.slotDate)}</p>
                </div>
                {
                  item.cancelled
                    ? <p className='text-red-500 text-xs font-medium'>Cacelled</p>
                    : <img className=' cursor-pointer hover:scale-[80%] transition' onClick={() => canncelAppointment(item._id)} src={assets.cancel_icon} alt="" />

                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard