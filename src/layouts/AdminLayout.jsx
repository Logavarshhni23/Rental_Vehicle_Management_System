import React from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { User, BookOpen, Car, MessageSquare, BarChart3, LogOut } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/"); // redirect to homepage/login
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-900 text-white flex flex-col fixed h-screen">
        {/* Logo / Title */}
        <div className="p-6 border-b border-teal-700">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="m-4 flex items-center gap-3 p-3 rounded-lg bg-teal-800 hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Exit
        </button>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col ml-64 h-screen">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">{pageTitle}</h2>
        </header>

        {/* Page Content */}
        <section className="p-6 flex-1 overflow-y-auto">
          <div className="bg-white rounded-xl shadow p-6 min-h-full">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
