import React, { useContext } from 'react'
import { AdminContex } from '../context/AdminContexr'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

function Sidebar() {
   
    const {atoken} = useContext(AdminContex)
  
  
    return (
    <div className='min-h-screen bg-white border-r border-r-gray-400'>
       {
        atoken && <ul className='text-[#515151]'>
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/admin-dashboard'}>
                 <img src={assets.home_icon} alt="" />
                 <p>Dashboard</p>
            </NavLink >
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/all-appointment'}>
                 <img src={assets.appointment_icon} alt="" />
                 <p>Appointment</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/add-doctor'}>
                 <img src={assets.add_icon} alt="" />
                 <p>Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex gap-3 items-center py-3.5  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-r-primary ':''}`} to={'/doctor-list'}>
                 <img src={assets.people_icon} alt="" />
                 <p>Doctors List</p>
            </NavLink>
        </ul>
       }
    </div>
  )
}

export default Sidebar