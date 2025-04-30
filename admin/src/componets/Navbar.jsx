import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContex } from '../context/AdminContexr'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const { atoken, setAtoken} = useContext(AdminContex)
  const navigate = useNavigate()

  const logout = ()=> {
     navigate('/')
     atoken && setAtoken('')
     atoken && localStorage.removeItem('atoken')

  }


  return (
    <div className='flex justify-between items-center px-4 sm:px py-3 border-b bg-white border-b-gray-500'>
      <div className=' flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500'>{atoken ? "Admin" : "Doctor"}</p>
        
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm py-2 px-10 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar