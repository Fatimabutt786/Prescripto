import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useState } from 'react'

const Navbar = () => {
    const navigate = useNavigate()
    const[showMenu,setshowMenu] = useState(false)
    const[token,settoken] = useState(true)
  return (
    <div className='flex items-center
    justify-between text-sm py-4 mb-5 border-b border-b-gray-400
    '>
      <img src={assets.logo} onClick={()=> navigate('/')} className='w-44 cursor-pointer' alt='img'/>
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 hidden  bg-primary w-3 m-auto  '/>
        </NavLink>
          <NavLink to='/doctors'>
            <li className='py-1'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 hidden bg-primary w-3 m-auto  '/>
        </NavLink>
          <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 hidden bg-primary w-3 m-auto  '/>
        </NavLink>
          <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 hidden bg-primary w-3 m-auto  '/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
           token ?( <div className='flex group items-center gap-2 cursor-pointer relative'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt='profile'/>
            <img  className='w-2.5' src={assets.dropdown_icon}/>
           <div className="absolute top-0 right-0 pt-14 text-base
           font-medium text-gray-600 z-20 hidden group-hover:block ">
            <div className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4">
                <p onClick={()=> navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=> navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={()=> settoken(false)} className='hover:text-black cursor-pointer'>Logout</p>
            </div>
           </div>

           </div>)
        :
        <button onClick={()=>navigate('/login')} className='bg-primary  text-white px-8 py-3 rounded-full
        font-light hidden md:block'>Create account</button>}
      </div>
    </div>
  )
}

export default Navbar
