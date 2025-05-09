import React, { useContext, useEffect, useState } from 'react'
import { AdminContex } from '../context/AdminContexr';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';


function Login() {
  const [state, setState] = useState('Admin');
  const {dtoken, setDtoken} = useContext(DoctorContext)
  const {setAtoken, atoken, backendUrl} = useContext(AdminContex);
  const [email, setEmail] = useState('')
  const [password,  setPassword] = useState('')
   
  const onSubmitHandler = async (e)=>{
       e.preventDefault();

       try {
        if(state === 'Admin'){
          const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password});
          
          if(data.success){
             localStorage.setItem('atoken', data.token)
             setAtoken(data.token)
          }else{
            toast.error(data.message)
          }
       
        }else{
              
          try {
            
            const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password});
          
            if(data.success){
               localStorage.setItem('dtoken', data.token)
               setDtoken(data.token)
            }else{
              toast.error(data.message)
            }
          } catch (error) {
            console.log(error.message)
          }
        }
        
       } catch (error) {
          console.log(error.message)
       }
   
  }

  

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
         <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
         <div className='w-full'>
           <p>Email</p>
           <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required/>
         </div>
         <div className='w-full'>
           <p>Password</p>
           <input value={password} onChange={(e)=>setPassword(e.target.value)}  className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required/>
         </div>
         <button className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
        { state === 'Admin'
          ?<p>Doctor Login? <span onClick={()=>setState('Doctor')}  className='text-primary underline cursor-pointer'>Click here</span></p>
          :<p>Admin Login? <span onClick={()=>setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
         }
       </div>
    </form>
  )
}

export default Login