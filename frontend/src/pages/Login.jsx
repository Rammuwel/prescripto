import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const {backendUrl, token, setToken} = useContext(AppContext);

  const navigate = useNavigate()

  const onSubmitHandler = async (e)=>{
     e.preventDefault()
      try {
        if(state === 'Sign Up'){
          const {data} = await axios.post(backendUrl + '/api/user/register', {name, email, password});

          if(data.success){
            localStorage.setItem('token', data.token)
            setToken(data.token)
          }else{
            toast.error(data.message)
          }
        }else{
          const {data} = await axios.post(backendUrl+'/api/user/login', { email, password});

          if(data.success){
            localStorage.setItem('token', data.token)
            setToken(data.token)
            
          }else{
            toast.error(data.message)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
  }


  useEffect(()=>{
     if(token){
      navigate('/')
     }
  },[token])


  return (
    <div className='min-h-[80hv] flex flex-col items-center mt-10 sm:mt-20'>
        <form onSubmit={onSubmitHandler} className='min-h-[80hv] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg'>
               <p className='text-2xl font-semibold'>{state === 'Sign Up'? 'Sign Up':'Login'}</p>
               <p className=''>Please {state === 'Sign Up'? 'sign up':'login'} to book appointment</p>
              {state === 'Sign Up' &&
                <div className='w-full'>
                  <p>Full Name</p>
                  <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} />
                </div>}
                <div className='w-full'>
                  <p>Email</p>
                  <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                </div>
                <div className='w-full'>
                  <p>Password</p>
                  <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                </div>
                <button type='submit' className='bg-primary text-white w-full rounded py-2 mt-1'>{state === 'Sign Up'? 'Sign Up':'Login'}</button>
                {
                  state==='Sign Up'?<p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
                  :<p>Crea te an new account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'> Click here</span></p>
                }    
            </div>
        </form>
    </div>
  )
}

export default Login