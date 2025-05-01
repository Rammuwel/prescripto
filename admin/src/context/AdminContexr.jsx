import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContex = createContext()


const AdminContexProvider = (props)=>{

    const [atoken, setAtoken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([])
 
  const getAllDocters = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/admin/get-doctors', {headers:{atoken}})
      if(data.success){
        setDoctors(data.doctors);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  const changeAvailability = async (docId)=>{
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/change-availability', {docId}, {headers:{atoken}})
      if(data.success){
        toast.success(data.message)
        getAllDocters()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }




    const value = {
         atoken, setAtoken,
         backendUrl,
         doctors, getAllDocters,
         changeAvailability,
    }

    return (
        <AdminContex.Provider value={value}>
            {props.children}
        </AdminContex.Provider>
    )
}


export default AdminContexProvider;