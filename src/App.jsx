import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";

// User Pages
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Booking from "./components/Booking";
import UserLayout from "./layouts/UserLayout";
import VehicleDetails from "./components/VehicleDetails";
// Admin Pages 
import Profile from "./components/Profile";
import AdminBookings from "./components/AdminBookings";
import VehicleManagement from "./components/VehicleManagement";
import FeedBacks from "./components/FeedBacks";
import Reports from "./components/Reports";

// Route protection
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>

        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/vehicle/:id" element={<VehicleDetails/>}/>
        </Route>

        {/* ---------- Admin Routes ---------- */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="vehicles" element={<VehicleManagement />} />
          <Route path="feedbacks" element={<FeedBacks />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* ---------- User Routes ---------- */}
        <Route path="/user" element={<UserLayout/>}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="feedbacks" element={<FeedBacks />} />
        </Route>

      </Routes>

      
    </div>
  );
};

export default App;
