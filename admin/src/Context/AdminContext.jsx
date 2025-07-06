import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = (props) =>{
    const[aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const BackendURL = import.meta.env.VITE_BACKEND_URL
    const[doctors,setdoctors] = useState([])
    const getAllDoctors = async () =>{
        try {
            const {data} = await axios.post(BackendURL+'/api/admin/all-doctors',{},{headers:{aToken}})
            if(data.success){
                setdoctors(data.doctors)
                console.log(data.doctors)
            }else{
               toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
aToken,setAToken,BackendURL,doctors,getAllDoctors
    }
    return (
        <AdminContext.Provider value={value}>
{props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider