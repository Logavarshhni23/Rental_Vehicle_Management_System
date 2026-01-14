import {Link, useNavigate} from "react-router-dom";
import React from 'react'
import { UserRound,House, LogOut } from 'lucide-react';

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
        <h1 className="text-2xl italic">Rentigo</h1>
        <nav className="flex gap-5">
            <Link to="/" className="p-2 transition duration-300 hover:text-teal-600"><House size={25}/></Link>
            {role === "admin" && (
                <Link to="/admin" className="p-2 transition duration-300 hover:text-teal-600"><UserRound size={25}/></Link>
            )}
            {role === "user" && (
                <Link to="/user" className="p-2 transition duration-300 hover:text-teal-600"><UserRound size={25}/></Link>
            )}
            {!isLoggedIn ? (
            <>
              <Link to="/login" className="p-2 rounded-md transition duration-300 hover:text-teal-600">Login</Link>
              <Link to="/register" className="p-2 rounded-md transition duration-300 hover:text-teal-600">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-white text-teal-800 px-3 py-1 rounded-md"><LogOut/></button>
          )}
        </nav>
    </div>
  )
}

export default Header;