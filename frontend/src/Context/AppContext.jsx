import { createContext, useEffect, useState } from "react";

import axios from 'axios'
import { toast } from "react-toastify";
export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
const[doctors,setDoctors] = useState([])
const[token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
const[userdata,setuserdata] = useState(false)
    const getDoctorsData = async () =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
setDoctors(data.doctors)
            }else{
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error)
           toast.error(error.message)
        }
    }

    const loadUserProfileData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if(data.success){
                setuserdata(data.userData)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
             console.log(error)
           toast.error(error.message)
        }
    }

        const value = {
doctors,getDoctorsData,currencySymbol,token,setToken,backendUrl,userdata,setuserdata,loadUserProfileData
    }

    useEffect(()=>{
getDoctorsData()
    },[]);

    useEffect(()=>{
if(token){
    loadUserProfileData()
} else{
    setuserdata(false)
}
    },[token])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider