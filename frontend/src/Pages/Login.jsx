import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate()
  const {token,setToken,backendUrl} = useContext(AppContext)
  const[state,setstate] = useState('Sign Up');
  const[email,setEmail] = useState('')
    const[password,setpassword] = useState('')
     const[name,setName] = useState('')
     const onSubmitHandler =async (e) =>{
   e.preventDefault();
   try {
    if(state === 'Sign Up'){
const {data} = await axios.post(backendUrl+'/api/user/register',{name,password,email})
if(data.success){

  localStorage.setItem('token',data.token)
  setToken(data.token)
   toast.success("Account Created successfully!")
   setstate("Login")
}else{
  toast.error(data.message)
}
}else{
const {data} = await axios.post(backendUrl+'/api/user/login',{password,email})
if(data.success){
  localStorage.setItem('token',data.token)
  setToken(data.token)
  toast.success("Login successfully!")
  navigate('/')
}else{
  toast.error(data.message)
}
    }
   } catch (error) {
     toast.error(error.message || "Something went wrong")
}
   }
     
     
  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start
      p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg ">
        <p className='text-2xl font-semibold'>{state==='Sign Up'?"Create Account" : "Login"}</p>
        <p>Please {state==='Sign Up'?"Create Account" : "Login"} to book appointment</p>
        {state==="Sign Up" &&<div className='w-full'>
          <p>Full Name</p>    
          <input className='border border-zinc-300 w-full p-2 mt-1' type="text" value={name} onChange={(e)=>setName(e.target.value)} />
       </div>  }
           
       <div className='w-full'>
            <p>Email</p>
          <input className='border border-zinc-300 w-full p-2 mt-1' type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
           </div>  
            <div className='w-full'>
              <p>Password</p>
          <input className='border border-zinc-300 w-full p-2 mt-1' type="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
   </div>
        <button type='submit' className='bg-primary text-white w-full
        py-2 rounded-md text-base'>{state==='Sign Up'?"Create Account" : "Login"}</button>
       {
        state==='Sign Up' ? <p className="p">Already have an account? <span onClick={()=>setstate('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>:
        <p>Create an new account? <span onClick={()=>setstate('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span> </p>
       }
      </div>
    </form>
  )
}

export default Login
