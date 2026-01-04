import {Link, useNavigate} from "react-router-dom";
import React from 'react'

const Header = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");
  const role = sessionStorage.getItem("role");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex justify-between bg-teal-900 text-white items-center font-bold p-5 shadow-lg">
        <h1 className="text-2xl">Rental</h1>
        <nav className="flex gap-5">
            <Link to="/" className="p-2 transition duration-300 hover:text-teal-600">Home</Link>
            <Link to="/vehicles" className="p-2 transition duration-300 hover:text-teal-600">Vehicles</Link>
            <Link to="/booking" className="p-2 transition duration-300 hover:text-teal-600">Bookings</Link>
            {role === "admin" && (
                <Link to="/admin" className="p-2 transition duration-300 hover:text-teal-600">Admin</Link>
            )}
            {!isLoggedIn ? (
            <>
              <Link to="/login" className="p-2 rounded-md transition duration-300 hover:text-teal-600">Login</Link>
              <Link to="/register" className="p-2 rounded-md transition duration-300 hover:text-teal-600">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-white text-teal-800 px-3 py-1 rounded-md">Logout</button>
          )}
        </nav>
    </div>
  )
}

export default Header;