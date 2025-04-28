import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken] = useState(true)
    const navigate = useNavigate(true)

    return (
        <div className='flex items-center justify-between text-sm py-4 border-b border-b-gray-400'>
            <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-44 cursor-pointer ' />
            <ul className=' hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1 uppercase'>Home</li>
                    <hr className=' hidden border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1 uppercase'>All Doctors</li>
                    <hr className=' hidden border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />

                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1 uppercase'>About</li>
                    <hr className=' hidden border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />

                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1 uppercase'>Contact</li>
                    <hr className=' hidden border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />

                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token
                        ? (<div className='flex items-center gap-2 cursor-pointer group relative:'>
                            <img className='w-8 rounded-full' src={assets.profile_pic} alt="profile-pic" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="down" />
                            <div className=' absolute top-0 right-2 md:right-10 pt-14 text-base font-medium text-gray-600 z-26 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-3'>
                                    <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={()=>navigate('/my-appoinments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>)
                        : <button onClick={() => navigate('/login')} className='hidden md:block bg-primary text-white px-8 py-3 rounded-full font-light'>Create Account</button>
                }

            </div>
        </div>
    )
}

export default Navbar