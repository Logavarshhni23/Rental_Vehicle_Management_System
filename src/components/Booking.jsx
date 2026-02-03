import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, CreditCard, Car, Timer, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBookings = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-teal-800 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-800"></div>
        <p className="font-medium">Fetching your trips...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-2">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-teal-900 tracking-tight">My Trips</h2>
          <p className="text-gray-500 text-sm">Manage your current and past vehicle rentals</p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-2xl border border-teal-100">
          <span className="text-teal-700 font-bold text-lg">{bookings.length}</span>
          <span className="text-teal-600 text-sm ml-2 font-medium">Bookings</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car size={40} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings found</h3>
          <p className="text-gray-500 max-w-xs mx-auto mb-6">
            You haven't booked any vehicles yet. Explore our fleet to start your journey!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-full md:w-40 h-28 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                <img 
                  src={booking.vehicle?.image} 
                  alt="vehicle" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 space-y-3 text-center md:text-left">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {booking.vehicle?.name} <span className="text-gray-400 font-medium text-base ml-1">{booking.vehicle?.model}</span>
                  </h3>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Calendar size={16} className="text-teal-600" />
                    <span>{new Date(booking.pickupDate).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Timer size={16} className="text-teal-600" />
                    <span>to {new Date(booking.dropDate).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-3 min-w-3xl">
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Paid</p>
                  <p className="text-2xl font-black text-teal-950">₹{booking.totalAmount}</p>
                </div>
                
                <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border-2 ${
                  booking.status === 'confirmed' ? 'bg-green-50 text-green-600 border-green-100' :
                  booking.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                  'bg-red-50 text-red-600 border-red-100'
                }`}>
                  {booking.status === 'confirmed' ? <CheckCircle2 size={12}/> : <AlertCircle size={12}/>}
                  {booking.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;