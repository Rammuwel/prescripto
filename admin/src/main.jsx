
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContexProvider from './context/AdminContexr.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <AdminContexProvider>
        <DoctorContextProvider>
            <AppContextProvider>
               <App />
            </AppContextProvider>
        </DoctorContextProvider>
     </AdminContexProvider>
  </BrowserRouter>


)
