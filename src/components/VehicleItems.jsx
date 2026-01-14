import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, Store, User, Star } from 'lucide-react';

const VehicleItems = ({ vehicle, onDelete, onEdit }) => {
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/vehicle/${vehicle._id}`);
  };

  const handleAction = (e, callback) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div onClick={handleCardClick}  className="group bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl">
      {/* Top Section: Image with Overlay */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Admin Controls Only */}
        <div className="absolute top-4 left-4 flex gap-2">
          {role === "admin" && (
            <>
              <button 
                onClick={(e) => handleAction(e, () => onEdit(vehicle))} 
                className="bg-white/90 p-2 rounded-full shadow-sm hover:bg-teal-600 hover:text-white transition-colors"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={(e) => handleAction(e, () => onDelete(vehicle._id))} 
                className="bg-white/90 p-2 rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>

        {/* Bottom Image Overlay: Name and Specs */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 pt-16">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-white text-2xl font-bold tracking-tight">
                {vehicle.name} {vehicle.model}
              </h2>
              <p className="text-gray-300 text-sm mt-1 font-medium">
                {vehicle.type} • {vehicle.fuelType} • {vehicle.seats} Seats
              </p>
            </div>
            
            {/* Empty Rating Badge */}
            <div className="bg-black/40 border border-yellow-500/50 backdrop-blur-md text-white px-3 py-1.5 rounded-md flex items-center gap-1 min-w-[55px]">
              <Star size={14} className="fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-bold"></span> 
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Delivery & Pricing */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-700 font-bold text-base">
            <div className="bg-green-100 p-1.5 rounded-md">
              <Store size={18} />
            </div>
            <span>Delivery Available</span>
          </div>
          
          <div className="text-right">
            <p className="text-teal-950 font-black text-2xl">
              ₹{vehicle.pricePerDay}<span className="text-base font-normal text-gray-500">/hr</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section: Host Info */}
      <div className="bg-gradient-to-r from-sky-200 to-white px-5 py-2 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sky-200 rounded-full flex items-center justify-center border border-white shadow-sm">
            <User size={20} className="text-sky-600" />
          </div>
          <p className="text-sky-900 text-base font-bold italic">
            By <span>
              {vehicle.hostedBy}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleItems;