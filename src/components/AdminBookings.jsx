import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, Clock, User, Car as CarIcon, Calendar } from "lucide-react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllBookings = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch all bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/bookings/status/${id}`, // Verify this matches your route
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Booking marked as ${newStatus}`);
      fetchAllBookings(); // Refresh list after update
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  if (loading) return <div className="p-10 text-center text-teal-800 font-bold">Loading Bookings...</div>;

  return (
    <div className="p-2">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-teal-900">Manage Bookings</h2>
        <p className="text-gray-500">Review and update customer rental requests</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-teal-900 text-white">
              <th className="p-4 font-bold uppercase text-xs tracking-wider rounded-tl-3xl">Customer</th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider">Vehicle</th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider">Dates</th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider">Total</th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider">Status</th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider rounded-tr-3xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-teal-50/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-teal-100 p-2 rounded-full text-teal-700">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{b.user?.name}</p>
                      <p className="text-xs text-gray-500">{b.user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <CarIcon size={16} className="text-gray-400" />
                    <span className="font-medium text-gray-800">{b.vehicle?.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-xs text-gray-600 space-y-1">
                    <p className="flex items-center gap-1 font-semibold">
                      <Calendar size={12} className="text-teal-600"/> {new Date(b.pickupDate).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-1 font-semibold">
                      <Clock size={12} className="text-orange-500"/> {new Date(b.dropDate).toLocaleDateString()}
                    </p>
                  </div>
                </td>
                <td className="p-4 font-black text-teal-900">₹{b.totalAmount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    b.status === 'confirmed' ? 'bg-green-50 text-green-600 border-green-200' :
                    b.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                    'bg-red-50 text-red-600 border-red-200'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4">
                  {b.status === "pending" && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateStatus(b._id, "confirmed")}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                        title="Confirm Booking"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        onClick={() => updateStatus(b._id, "cancelled")}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                        title="Cancel Booking"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  )}
                  {b.status !== "pending" && (
                    <span className="text-gray-400 text-xs italic">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="p-20 text-center text-gray-400 font-medium">
            No booking requests found in the system.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;