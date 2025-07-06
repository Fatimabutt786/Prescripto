import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../Context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
    const[state,setstate] = useState('Admin')
    const[email,setemail]= useState('')
       const[password,setpassword]= useState('')
    const {setAToken,BackendURL} = useContext(AdminContext)
const onSubmitHandler = async (e)=>{
e.preventDefault();
try {
    if(state==='Admin'){
      const {data} = await axios.post(BackendURL+'/api/admin/login',{email,password})
      if(data.success){
        console.log(data.token)
        localStorage.setItem('aToken',data.token)
        setAToken(data.token)
      }else{
        toast.error(data.message)
      }
    }
    else{

    }
} catch (error) {
    
}
}
  return (
   <form  onSubmit={onSubmitHandler}   className='min-h-[80vh] flex justify-center items-center'>
    <div className="flex flex-col gap-3  items-start p-8 min-w-[340px] sm:min-w-96 border
    rounded-xl text-[#5E5E5E]  text-sm shadow-lg">
        <p className='text-2xl font-semibold m-auto'><span className='text-blue-400'>{state}</span> Login</p>
        <div className="w-full">
            <p>Email</p>
            <input value={email} onChange={(e)=>setemail(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className="w-full">
            <p>Password</p>
            <input value={password} onChange={(e)=>setpassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1'  type="password" required />
        </div>
        <button className='bg-blue-500 text-white w-full py-2 rounded-md text-base'>Login</button>
        {
            state==='Admin'
            ? <p>Doctor Login <span className='text-blue-400 underline cursor-pointer' onClick={()=> setstate('Doctor')}>Click here</span></p>
            :
            <p>Admin Login <span className='text-blue-400 underline cursor-pointer' onClick={()=> setstate('Admin')}>Click here</span></p>
        }
    </div>
   </form>
  )
}

export default Login
