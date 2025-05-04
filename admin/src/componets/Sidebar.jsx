import React, { useContext } from 'react'
import { AdminContex } from '../context/AdminContexr'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

function Sidebar() {
   
    const {atoken} = useContext(AdminContex)
    const {dtoken} = useContext(DoctorContext)
  
  
    return (
    <div className='min-h-screen bg-white border-r border-r-gray-400 '>
       {
        atoken && <ul className='text-[#515151]'>
            <NavLink className={({isActive})=>`flex  gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/admin-dashboard'}>
                 <img src={assets.home_icon} alt="" />
                 <p className='hidden md:block'>Dashboard</p>
            </NavLink >
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/all-appointment'}>
                 <img src={assets.appointment_icon} alt="" />
                 <p className='hidden md:block'>Appointment</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/add-doctor'}>
                 <img src={assets.add_icon} alt="" />
                 <p className='hidden md:block'>Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/doctor-list'}>
                 <img src={assets.people_icon} alt="" />
                 <p className='hidden md:block'>Doctors List</p>
            </NavLink>
        </ul>
       }
       {
        dtoken && <ul className='text-[#515151]'>
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/doctor-dashboard'}>
                 <img src={assets.home_icon} alt="" />
                 <p className='hidden md:block'>Dashboard</p>
            </NavLink >
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/doctor-appointments'}>
                 <img src={assets.appointment_icon} alt="" />
                 <p className='hidden md:block'>Appointment</p>
            </NavLink>
            
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/doctor-profile'}>
                 <img src={assets.people_icon} alt="" />
                 <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
       }
    </div>
  )
}

export default Sidebar