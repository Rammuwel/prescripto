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

function App() {
 
  const { atoken } = useContext(AdminContex)



  return atoken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>
        <div className='flex items-start'>
           <Sidebar/>
            <Routes>
               <Route path='/' element={<></>}/>
               <Route path='/admin-dashboard' element={<Dashboard/>}/>
               <Route path='/all-appointment' element={<AllAppointment/>}/>
               <Route path='/add-doctor' element={<AddDoctor/>}/>
               <Route path='/doctor-list' element={<DoctorList/>}/>
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
