import React from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {User,BookOpen,Car,MessageSquare,BarChart3,LogOut} from "lucide-react";

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { name: "Profile", path: "/user/profile", icon: <User size={18} /> },
    { name: "Bookings", path: "/user/bookings", icon: <BookOpen size={18} /> },
    { name: "Feedbacks", path: "/user/feedbacks", icon: <MessageSquare size={18} /> },
  ];

  const pageTitle =
    menuItems.find((item) => location.pathname.includes(item.path))?.name ||
    "Dashboard";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-900 text-white flex flex-col">
        <div className="p-6 border-b border-teal-700">
          <h1 className="text-2xl font-bold">User Panel</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition
                 ${
                   isActive
                     ? "bg-teal-700 text-white"
                     : "text-teal-100 hover:bg-teal-800"
                 }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 flex items-center gap-3 p-3 rounded-lg bg-teal-800 hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Exit
        </button>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{pageTitle}</h2>
        </header>

        {/* Page Content */}
        <section className="p-6 flex-1">
          <div className="bg-white rounded-xl shadow p-6 h-full">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserLayout;
