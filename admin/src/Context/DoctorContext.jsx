import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const DocotorContext = createContext()

const DoctorContextProvider = (props) =>{
    const backenUrl = import.meta.env.VITE_BACKEND_URL
    const[dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const[appointments,setappointments] = useState([]);
    const[dashData,setDashData]=useState({})
    const[profileData,setProfileData] = useState(false)

    const getAppointments = async () =>{
      try {
        console.log('sending token:', dToken)

        const {data} =await axios.get(backenUrl+'/api/doctor/appointments',{headers:{dtoken:dToken}})
        if(data.success) {
          setappointments(data.appointments.reverse())
        }else{
          toast.error(data.message)
        }
      } catch (error) {
            toast.error(error.message)
      }
    }
       const cancelAppointment = async (appointmentId) =>{
try {

    const {data} = await axios.post(backenUrl+ '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
    if(data.success){
        toast.success(data.message)
        getAppointments()
    }else{
        toast.error(data.message)
    }
    
} catch (error) {
      toast.error(error.message)
}
    }
        const getDashData = async () =>{
        try {
         const {data} =  await axios.get(backenUrl+'/api/doctor/dashboard',{headers:{dtoken: dToken}})

           if(data.success) {
            setDashData(data.dashData)
            console.log(data.dashData)
           } else {
            toast.error(data.message)
           }
        } catch (error) {
             toast.error(error.message)
        }
    }
    const getProfileData = async () =>{
      try {
        const {data} = await axios.get(backenUrl+'/api/doctor/profile',{headers:{dToken}})
        if(data.success){
          setProfileData(data.profileData)
          console.log(data.profileData)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    const value = {
      profileData,setProfileData,getProfileData,
      cancelAppointment,backenUrl,setDToken,dToken,appointments,getAppointments,getDashData,dashData 
    }
    return (
        <DocotorContext.Provider value={value}>
{props.children}
        </DocotorContext.Provider>
    )
}

export default DoctorContextProvider