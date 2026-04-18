import React from "react";
import { Calendar, Timer, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

const statusStyle = {
  confirmed: "bg-green-50 text-green-600 border-green-100",
  pending: "bg-orange-50 text-orange-600 border-orange-100",
  cancelled: "bg-red-50 text-red-600 border-red-100",
  completed: "bg-blue-50 text-blue-600 border-blue-100",
};

const BookingItems = ({ booking, onCancel, cancelling }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-6">
      <div className="w-full md:w-40 h-28 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-2 flex-shrink-0">
        <img
          src={booking.vehicle?.image}
          alt={booking.vehicle?.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 space-y-2 text-center md:text-left">
        <h3 className="text-xl font-bold text-gray-900">
          {booking.vehicle?.name}{" "}
          <span className="text-gray-400 font-medium text-base">{booking.vehicle?.model}</span>
        </h3>
        <p className="text-sm text-gray-500">
          {booking.vehicle?.type} • {booking.vehicle?.fuelType} • {booking.vehicle?.seats} Seats
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-600 font-medium">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <Calendar size={14} className="text-teal-600" />
            <span>Pickup: {new Date(booking.pickupDate).toLocaleDateString("en-GB")}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <Timer size={14} className="text-teal-600" />
            <span>Drop: {new Date(booking.dropDate).toLocaleDateString("en-GB")}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
        <div className="text-right">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Amount</p>
          <p className="text-2xl font-black text-teal-950">₹{booking.totalAmount}</p>
        </div>

        <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border-2 ${statusStyle[booking.status] || statusStyle.cancelled}`}>
          {booking.status === "confirmed" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
          {booking.status}
        </div>

        {booking.status === "pending" && onCancel && (
          <button
            onClick={() => onCancel(booking._id)}
            disabled={cancelling === booking._id}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 border border-red-200 bg-red-50 hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
          >
            <XCircle size={14} />
            {cancelling === booking._id ? "Cancelling..." : "Cancel Booking"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingItems;
