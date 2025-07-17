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
import { DocotorContext } from './Context/DoctorContext'
import DoctorDashboard from './Pages/Doctor/DoctorDashboard'
import DoctorAppointment from './Pages/Doctor/DoctorAppointment'
import DoctorProfile from './Pages/Doctor/DoctorProfile'

const App = () => {
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DocotorContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]' >
    <ToastContainer />
    <Navbar />
    <div className='flex items-start'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<></>}/>
        {/* admin route */}
        <Route path='/admin-dashboard' element={<Dashboard />}/>
        <Route path='/all-appointments' element={<Allappointments />}/>
         <Route path='/add-doctor' element={<AddDoctor />}/>
          <Route path='/doctor-list' element={<Doctorslist />}/>
          {/* doctor route */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard />}/>
               <Route path='/doctor-appointments' element={<DoctorAppointment />}/>
                  <Route path='/doctor-profile' element={<DoctorProfile />}/>
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
