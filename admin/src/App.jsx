import React, { useContext } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './Pages/Login'
import { AppContext } from './Context/AppContext'
import { AdminContext } from './Context/AdminContext'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Admin/Dashboard'
import Allappointments from './Pages/Admin/Allappointments'
import AddDoctor from './Pages/Admin/AddDoctor'
import Doctorslist from './Pages/Admin/Doctorslist'

const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken ? (
    <div className='bg-[#F8F9FD]' >
    <ToastContainer />
    <Navbar />
    <div className='flex items-start'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashboard' element={<Dashboard />}/>
        <Route path='/all-appointments' element={<Allappointments />}/>
         <Route path='/add-doctor' element={<AddDoctor />}/>
          <Route path='/doctor-list' element={<Doctorslist />}/>
      </Routes>
    </div>
    </div>
  ): (
    <div >
    <Login />
    <ToastContainer />
    </div>)
  
}

export default App
