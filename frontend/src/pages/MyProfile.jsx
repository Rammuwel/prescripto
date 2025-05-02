import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { AppContext } from '../contexts/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function MyProfile() {
  const {userData, setUserData, loadUserProfileData, token, backendUrl} = useContext(AppContext)
  const [image, setImage] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const updateUserProfileData = async ()=>{
    try {
        const formData = new FormData()
        formData.append('name', userData.name)
        formData.append('phone', userData.phone)
        formData.append('address', JSON.stringify(userData.address))
        formData.append('gender', userData.gender)
        formData.append('dob', userData.dob)
        
        image && formData.append('image', image)

       
        const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}})
        
        if(data.success){
          toast.success(data.message)
          await loadUserProfileData()
          setIsEdit(false)
          setImage(false)
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      console.log(error.message)
    }
  }


  const handleCencle = async ()=>{
    await loadUserProfileData()
    setIsEdit(false)
  }

  return userData && (
    <div className='mt-5 max-w-lg flex flex-col gap-2 text-sm'>
       {
        isEdit
         ? <label htmlFor="image" className='flex gap-2 flex-col sm:flex-row'>
            <img src={image? URL.createObjectURL(image): userData.image} alt="" className='w-36 rounded'/>
            <img src={assets.upload_icon} alt="" className='w-36 bg-indigo-100 cursor-pointer rounded' />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
         </label>
         : <img src={userData.image} alt="" className='w-36 rounded' />

      }
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
                <input type="text" className='bg-gray-50 ' onChange={(e)=>setUserData(prev=>({...prev, address:{...prev.address, line1:e.target.value}}))} value={userData.address.line1 || ''} placeholder='address1' />
                <br />
                <input type="text" className='bg-gray-50 ' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2 || ''}  placeholder='address2'/>
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
              ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob}/>
              : <p className='font-semibold text-gray-400 mt-4'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {isEdit
          ? <div className='m-0 p-0 flex flex-col sm:flex-row items-start gap-2'>
             <button className='border cursor-pointer border-primary px-8 py-2  rounded-full' onClick={updateUserProfileData}>Save Information</button>
             <button className='border cursor-pointer border-primary px-8 py-2  rounded-full' onClick={handleCencle}>Cencle</button>
          </div>
          :<button className='border cursor-pointer border-primary px-8 py-2  rounded-full' onClick={()=>setIsEdit(true)}>Edit</button>
        }
        
      </div>
    </div>
  )
}

export default MyProfile