import React from "react";
import {Trash2, Edit} from 'lucide-react';

const VehicleItems = ({ vehicle, onDelete, onEdit }) => {
  const role = sessionStorage.getItem("role");
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg shadow-gray-300 border border-gray-300 text-teal-900">

      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-44 object-cover rounded-lg mb-4 border border-teal-900"
      />

      <h2 className="text-2xl font-bold text-center mb-3">
        {vehicle.name}
      </h2>

      <div className="space-y-1 text-sm">
        <p><span className="font-semibold">Type:</span> {vehicle.type}</p>
        <p><span className="font-semibold">Model:</span> {vehicle.model}</p>
        <p><span className="font-semibold">Color:</span> {vehicle.color}</p>
        <p><span className="font-semibold">Price / Day:</span> ₹{vehicle.pricePerDay}</p>

        <p>
          <span className="font-semibold">Availability:</span>{" "}
          {vehicle.availability ? (
            <span className="text-green-600 font-semibold">Available</span>
          ) : (
            <span className="text-red-600 font-semibold">Not Available</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="mt-5 flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-950 hover:opacity-90 transition">Book Vehicle</button>
        {role === "admin" && (
          <>
            <button 
              className="mt-5 p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 shadow-md hover:shadow-lg cursor-pointer" 
              title="Edit Vehicle" 
              onClick={() => onEdit(vehicle)}
              type="button"
            >
              <Edit size={20} />
            </button>
            <button 
              className="mt-5 p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition duration-300 shadow-md hover:shadow-lg cursor-pointer" 
              title="Delete Vehicle" 
              onClick={() => onDelete(vehicle._id)}
              type="button"
            >
              <Trash2 size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleItems;
