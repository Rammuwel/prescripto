import React, { useState } from 'react'
import { assets } from '../assets/assets'

function MyProfile() {
  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    image: assets.profile_pic,
    email: "ram@example.com",
    phone: "+0 012 345 67889",
    address: {
      line1: "57 cross, Richmod",
      line2: "Circle, Church Road, London"
    },
    gender: 'Male',
    dob: '200-01-20'
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className='mt-5 max-w-lg flex flex-col gap-2 text-sm'>
      <img src={userData.image} alt="" className='w-36 rounded' />
      {
        isEdit
          ? <input className=' bg-gray-50 text-3xl font-medium  max-w-60 mt-4' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
          : <p className='font-semibold text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium  '>Email id:</p>
          <p className=' text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className=' bg-gray-100 max-w-53' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
              : <p className=' text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <p>
                <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...address, line1: e.target.value } }))} value={userData.address.line1} />
                <br />
                <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...address, line2: e.target.value } }))} value={userData.address.line2} />
              </p>
              : <p>{userData.address.line1} <br /> {userData.address.line2}</p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className=' grid grid-cols-[1fr_3fr] gray-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400 '>{userData.gender}</p>
          }
          <p className='font-medium mt-4'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              : <p className='font-semibold text-gray-400 mt-4'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {isEdit
          ?<button className='border border-primary px-8 py-2  rounded-full' onClick={()=>setIsEdit(false)}>Save Information</button>
          :<button className='border border-primary px-8 py-2  rounded-full' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile