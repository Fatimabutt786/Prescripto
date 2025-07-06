import { createContext } from "react";

export const DocotorContext = createContext()

const DoctorContextProvider = (props) =>{
    const value = {

    }
    return (
        <DocotorContext.Provider value={value}>
{props.children}
        </DocotorContext.Provider>
    )
}

export default DoctorContextProvider