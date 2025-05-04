import { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContex } from './context/AdminContexr';
import Navbar from './componets/Navbar';
import Sidebar from './componets/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AllAppointment from './pages/admin/AllAppointment';
import Dashboard from './pages/admin/Dashboard';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorList from './pages/admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/doctor/doctorDashboard';
import DoctorAppointments from './pages/doctor/doctorAppointments';
import DoctorProfile from './pages/doctor/doctorProfile';

function App() {
 
  const { atoken } = useContext(AdminContex)
  const { dtoken } = useContext(DoctorContext)



  return atoken || dtoken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>
        <div className='flex items-start'>
           <Sidebar/>
            <Routes>
                {/* doctor's route */}
               <Route path='/' element={<></>}/>
               <Route path='/admin-dashboard' element={<Dashboard/>}/>
               <Route path='/all-appointment' element={<AllAppointment/>}/>
               <Route path='/add-doctor' element={<AddDoctor/>}/>
               <Route path='/doctor-list' element={<DoctorList/>}/>
              
                {/* doctor's route */}
               <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
               <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
               <Route path='/doctor-profile' element={<DoctorProfile/>}/>
            </Routes>
        </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />

    </>
  )
}

export default App
