import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function Banner() {

    const navigate = useNavigate()
  return (
    <div className='flex  bg-primary px-6 sm:px-14 lg:px-22 lg:h-80 my-20 md:mx-10 rounded-lg'>
        {/* left section */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:p-5'>
           <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
           <p>Book Appointment</p>
            <p className='mt-4'>With 100+ Trusted Doctors</p>
             
           </div>
           <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-4 hover:scale-105 transition-all duration-500 cursor-pointer'>Create Account</button>
        </div>
        {/* right section */}
        <div className='hidden md:block md:w-1/2 lg:w-[300px] relative'>
              <img src={assets.appointment_img} alt=""  className='w-full absolute bottom-0 right-0'/>
        </div>
    </div>
  )
}

export default Banner