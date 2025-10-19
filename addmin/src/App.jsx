import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllApointment from './pages/Admin/AllApointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import SideBar from './components/SideBar';
import { DoctorContext } from './context/DoctorContext';

const App = () => {
  const {aToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  return aToken||dToken?(
    <div className=' bg-gray-100'>
   
     <ToastContainer/>
     <Navbar/>
     <div className='flex items-start'>
      <SideBar/>

      <Routes>
      <Route path='/' element={<h1 className='text-3xl font-bold text-gray-800 p-6'>Welcome to Admin Dashboard</h1>}/>
      <Route path='/admin-dashboard' element={<Dashboard/>}/> 
      <Route path='/all-apointments' element={<AllApointment/>}/>
      <Route path='/add-doctor' element={<AddDoctor/>}/>
      <Route path='/doctor-list' element={<DoctorsList/>}/>
      


      </Routes>
     </div>
    </div>
  ):(
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
