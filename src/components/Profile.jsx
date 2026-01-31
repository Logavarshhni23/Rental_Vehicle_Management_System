import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Phone, ShieldCheck, Calendar, LogOut, Activity } from "lucide-react";
import { toast } from "react-toastify";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        toast.error("Profile sync failed");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center text-teal-900 font-bold animate-pulse italic text-xl">RENTIGO...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-b from-teal-800 to-teal-950 rounded-4xl p-10 text-white mb-10 shadow-2xl shadow-teal-900/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-inner">
              <User size={48} className="text-teal-100" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Welcome, {userData?.name}!</h1>
              <p className="text-teal-200 font-medium opacity-80 uppercase text-xs tracking-[0.3em] mt-1">Verified {userData?.role}</p>
            </div>
          </div>
          <button 
            onClick={() => { sessionStorage.clear(); window.location.href="/"; }}
            className="px-8 py-3 bg-white/10 backdrop-blur-md hover:bg-red-500/20 border border-white/20 rounded-2xl transition-all font-bold flex items-center gap-2 group"
          >
            <LogOut size={18} className="group-hover:text-red-400" /> Sign Out
          </button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group">
          <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <Mail size={24} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
          <p className="text-lg font-bold text-gray-900 truncate">{userData?.email}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <Phone size={24} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone Number</p>
          <p className="text-lg font-bold text-gray-900">{userData?.phone || "+91 — Not Added"}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Calendar size={24} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Member Since</p>
          <p className="text-lg font-bold text-gray-900">{new Date(userData?.createdAt).getFullYear()}</p>
        </div>
      </div>

    </div>
  );
};

export default Profile;