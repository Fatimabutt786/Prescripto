import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const Navbar = () => {
    const navigate = useNavigate()
    const[showMenu,setshowMenu] = useState(false)
 const {token,setToken, userdata} = useContext(AppContext)

 const logout = () =>{
  setToken(false)
  localStorage.removeItem('token')
 }
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
           token && userdata ?( <div className='flex group items-center gap-2 cursor-pointer relative'>
            <img className='w-8 rounded-full bg-blue-100' src={userdata.image} alt='profile'/>
            <img  className='w-2.5' src={assets.dropdown_icon}/>
           <div className="absolute top-0 right-0 pt-14 text-base
           font-medium text-gray-600 z-20 hidden group-hover:block ">
            <div className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4">
                <p onClick={()=> navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=> navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
            </div>
           </div>

           </div>)
        :
        <button onClick={()=>navigate('/login')} className='bg-primary  text-white px-8 py-3 rounded-full
        font-light hidden sm:block'>Create account</button>}
        <img className='w-6 md:hidden' onClick={()=>setshowMenu(true)} src={assets.menu_icon} alt="" />
        {/* Mobile Menu */}
        <div className={` ${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={()=>setshowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink  onClick={()=>setshowMenu(false)} to='/'> <p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
              <NavLink onClick={()=>setshowMenu(false)}  to='/doctors'> <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                <NavLink onClick={()=>setshowMenu(false)}  to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                  <NavLink onClick={()=>setshowMenu(false)}  to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
