import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { User, BookOpen, Car, MessageSquare, BarChart3, LogOut, Menu, X } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to track if sidebar is open on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { name: "Profile", path: "/admin/profile", icon: <User size={18} /> },
    { name: "Bookings", path: "/admin/bookings", icon: <BookOpen size={18} /> },
    { name: "Vehicles", path: "/admin/vehicles", icon: <Car size={18} /> },
    { name: "Feedbacks", path: "/admin/feedbacks", icon: <MessageSquare size={18} /> },
    { name: "Reports", path: "/admin/reports", icon: <BarChart3 size={18} /> },
  ];

  const pageTitle =
    menuItems.find((item) => location.pathname.includes(item.path))?.name ||
    "Dashboard";

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-teal-900 text-white flex flex-col h-screen
        transition-transform duration-300 ease-in-out transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static
      `}>
    
        <div className="p-6 border-b border-teal-700 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)} 
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition
                  ${isActive 
                    ? "bg-teal-700 text-white shadow-md" 
                    : "text-teal-100 hover:bg-teal-800"}`
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

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center flex-shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md md:hidden"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">{pageTitle}</h2>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">Welcome back, Admin</div>
        </header>

        <section className="p-4 md:p-6 flex-1 overflow-y-auto">
          <div className="bg-white rounded-xl shadow p-6 min-h-full">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;