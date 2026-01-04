import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import HomeLayout from './layouts/HomeLayout'
import Register from './components/Register'
import Home from './components/Home'
import Vehicles from './components/Vehicles'
import Booking from './components/Booking'
import AdminRoute from './components/AdminRoute';
import Admin from './components/Admin';

const App = () => {
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route element={<HomeLayout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/vehicles' element={<Vehicles/>}/>
            <Route path='/booking' element={<Booking/>}/>
            <Route path="/admin" element={
                <AdminRoute>
                    <Admin />
                </AdminRoute>
            }/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;


