import React, { useEffect, useState } from "react";
import axios from "axios";
import { Car } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BookingItems from "./BookingItems";
import API from "../api";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const navigate = useNavigate();

  const fetchMyBookings = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) { navigate("/login"); return; }
      const res = await axios.get(`${API}/bookings/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setCancelling(bookingId);
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(`${API}/bookings/cancel/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking cancelled successfully");
      fetchMyBookings();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to cancel booking");
    } finally {
      setCancelling(null);
    }
  };

  useEffect(() => { fetchMyBookings(); }, []);

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
          <button
            onClick={() => navigate("/")}
            className="bg-teal-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-800 transition"
          >
            Browse Vehicles
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingItems
              key={booking._id}
              booking={booking}
              onCancel={handleCancel}
              cancelling={cancelling}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;