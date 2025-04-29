import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate } from 'react-router-dom'

function Footer() {
    const navigate= useNavigate()
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
                <div className=''>
                    <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='mb-5 w-40 cursor-pointer'/>
                   <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div className=''>
                  <p className='text-xl font-medium mb-5'>COMPANY</p> 
                  <ul className='flex flex-col gap-2 text-gray-600'>
                     <li>Home</li>
                     <li>About us</li>
                     <li>Delivery</li>
                     <li>Privacy policy</li>
                  </ul>
                </div>
                <div className=''>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p> 
                  <ul className='flex flex-col gap-2 text-gray-600'>
                     <li>+0-000-000-000</li>
                     <li>prescript@info.in</li>
                  </ul>
                </div>
            </div>
            {/* --------------copy-right text------------*/}
            <div>
                <hr className='bg-gray-400 border-none h-[2px]' />
                <p className='py-5 text-sm text-center'>Copyright 2024 @ Prescripto + All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer