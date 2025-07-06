import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { useEffect } from 'react'

const Doctorslist = () => {
  const {doctors,aToken,getAllDoctors,changeAvailability} = useContext(AdminContext)
  useEffect(()=>{
if(aToken){
  getAllDoctors()
}
  },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
     <h1 className='text-lg font-medium'>All Doctors</h1>
     <div className="flex w-full flex-wrap gap-4 gap-y-6">
      {
        doctors.map((item,index)=>(
          <div key={index} className="border group border-indigo-200
          rounded-xl max-w-56 overflow-hidden">
       <img className='bg-indigo-50 group-hover:bg-blue-500
       transition-all duration-500' src={item.image} alt="" />
       <div className='p-4'>
        <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
        <p className='text-zinc-600 text-sm'>{item.speciality}</p>
        <div className='flex mt-2 gap-1 items-center text-sm'>
           <input onChange={()=>changeAvailability(item._id)} type="checkbox"  checked={item.available} />
      <p>Available</p>
        </div>
       </div>
     
          </div>
        ))
      }
     </div>
    </div>
  )
}

export default Doctorslist
