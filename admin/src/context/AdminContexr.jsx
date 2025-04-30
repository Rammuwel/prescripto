import { createContext, useState } from "react";


export const AdminContex = createContext()


const AdminContexProvider = (props)=>{

    const [atoken, setAtoken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const backendUrl = import.meta.env.VITE_BACKEND_URL;



    const value = {
         atoken, setAtoken,
         backendUrl,
    }

    return (
        <AdminContex.Provider value={value}>
            {props.children}
        </AdminContex.Provider>
    )
}


export default AdminContexProvider;