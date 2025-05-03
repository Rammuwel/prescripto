import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{
  const currency = '$'
  const months = ["", "Jan", "Mar", "Apr", "May", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // format date
  const slotDataFormats = (slotdate)=>{
    const dateArray = slotdate.split('-')
    return dateArray[0]+ " " + months[dateArray[1]]+ " " + dateArray[2]
  }



  // calculate age using user dob
    const calculateAge = (dob)=>{
       const today = new Date()
       const birthDate = new Date(dob)

       let age = today.getFullYear() - birthDate.getFullYear()
       return age
    }


    const value = {
        calculateAge,
        slotDataFormats,
        currency
    }

    return (
        <AppContext.Provider value={value}>
             {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;