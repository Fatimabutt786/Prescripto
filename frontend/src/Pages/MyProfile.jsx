import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const[userdata,setuserdata] = useState({
    name:"John Doe",
    image:assets.profile_pic,
    email:'john@gmail.com',
    phone:'0334-1234567'
    ,address:{
      line1:"57th Cross Richmond",
      line2:"Circle, Church Road, London"
    },
    gender:'Male',
    dob:'2000-01-20'
  })

  const[isEdit,setIsEdit] = useState(false)
  return (
    <div className='max-w-lg flx flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userdata.image} alt="" />
{
  isEdit?<input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userdata.name} onChange={(e)=> setuserdata(prev=> ({...prev,name:e.target.value}))} />:<p className='font-medium text-3xl text-neutral-800 mt-4'>{userdata.name}</p>

}
<hr  className='bg-zinc-400 h-[1px] border-none'/>
<div className="">
  <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
  <div className="grid grid-cols-[1fr_3fr] mt-3 text-neutral-700">
    <p>Email id:</p>
    <p className='text-blue-500'>{userdata.email}</p>
   <p className='font-medium'>Phone:</p>
   {
  isEdit?<input type="text" className='bg-gray-100 max-w-52' value={userdata.phone} onChange={(e)=> setuserdata(prev=> ({...prev,phone:e.target.value}))} />:<p className='text-blue-500'>{userdata.phone}</p>}
  <p className='font-medium'>address</p>
  {
    isEdit ?
     <p>
<input type="text" className='bg-gray-50 ' value={userdata.address.line1} onChange={(e)=> setuserdata(prev=> ({...prev,address:{...prev.address,line1:e.target.value}}) )} />
<br />
<input type="text" className='bg-gray-50 ' value={userdata.address.line2} onChange={(e)=> setuserdata(prev=> ({...prev,address:{...prev.address,line2:e.target.value}}) )} />
    </p>:<p className='text-gray-500'>{userdata.address.line1} <br /> {userdata.address.line2} </p>
  }
  </div>
  <div>
    <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
    <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ">
      <p className='font-medium'>Gender:</p>
       {
  isEdit?
  <select className='max-w-20 bg-gray-100' onChange={(e)=> setuserdata(prev=> ({...prev,gender:e.target.value}) )} value={userdata.gender} >
    <option value="Male"></option>
     <option value="Female"></option>
  </select>
  :<p className='text-gray-400'>{userdata.gender}</p>}
  <p className='font-medium'>DOB:</p>
  {
    isEdit ? <input className='max-w-28 bg-gray-100' type='date' onChange={(e)=> setuserdata(prev=> ({...prev,dob:e.target.value}) )} value={userdata.dob} />
     :
     <p className='text-gray-400'>{userdata.dob}</p>
  }
    </div>
  </div>
 <div className='mt-10'>
 {isEdit ? <button className='border hover:bg-primary hover:text-white transition-all border-primary px-8 py-2 rounded-full' onClick={()=>setIsEdit(false)}>Save Information</button> : 
  <button className='border border-primary hover:bg-primary hover:text-white transition-all px-8 py-2 rounded-full' onClick={()=>setIsEdit(true)}>Edit</button> }
</div>
</div>

    </div>
  )
}

export default MyProfile
