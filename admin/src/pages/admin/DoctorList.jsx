
import React, { useContext, useEffect, useState } from 'react'
import { AdminContex } from '../../context/AdminContexr'
import { toast } from 'react-toastify'

function DoctorList() {
  const { atoken, doctors, getAllDocters , changeAvailability} = useContext(AdminContex)

  useEffect(() => {
    if (atoken) {
      getAllDocters();
    }
  }, [atoken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index) => (
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-primary  transition-all duration-500' src={item.image} alt="" />
              <div className='px-2 py-1'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              </div>
              <div className='px-2 mb-4  flex items-center gap-1 text-sm'>
                <input onChange={()=>changeAvailability(item._id)}  type="checkbox" checked={item.available} />
                <span>{item.available?"Available": "Unvailable"}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList