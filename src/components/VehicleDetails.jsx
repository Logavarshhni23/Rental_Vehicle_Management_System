import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Heart, Info,UserRound } from "lucide-react";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/vehicles/${id}`);
        setVehicle(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  if (!vehicle)
    return (
      <div className="text-center mt-20 text-red-500 font-bold text-xl">
        Vehicle not found
      </div>
    );

  const featuresList = vehicle.features
    ? vehicle.features.split(",").map((f) => f.trim())
    : [];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white min-h-screen">
      {/* 🔝 Navigation & Top Actions */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-800 font-medium"
        >
          <ArrowLeft size={20} />{" "}
          <span className="hover:underline">Back</span>
        </button>
        <div className="flex gap-4">
          <Heart
            size={24}
            className="text-gray-600 cursor-pointer hover:text-red-500"
          />
        </div>
      </div>

      {/* 📷 Hero Image Section */}
      <div className="mb-8">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-[500px] object-contain rounded-3xl shadow-md"
        />
      </div>

      {/* 📄 Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column (Info & Features) */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle.name} {vehicle.model}
            </h1>
            <p className="text-gray-500 mt-1 uppercase text-sm tracking-wide">
              {vehicle.type} • {vehicle.fuelType} • {vehicle.seats} Seats
            </p>
            <span className="text-teal-600 text-sm mt-2 font-medium flex items-center gap-1">
              <UserRound size={15} className="fill-teal-600"/> Hosted by {vehicle.hostedBy}
            </span>
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Features Section */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Features</h3>
            <div className="flex flex-wrap gap-3">
              {featuresList.map((feature, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-700 flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full border border-teal-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  </div>
                  {feature}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Price & Booking Card) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white border border-gray-200 p-6 rounded-2xl shadow-xl shadow-gray-100">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-gray-400 text-sm">Price per day</p>
                <h2 className="text-3xl font-extrabold text-teal-900">
                  ₹{vehicle.pricePerDay}
                </h2>
              </div>
              <div className="text-right">
                {vehicle.availability ? (
                  <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Available
                  </span>
                ) : (
                  <span className="text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Sold Out
                  </span>
                )}
              </div>
            </div>

            <button
              disabled={!vehicle.availability}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform active:scale-95 ${
                vehicle.availability
                  ? "bg-teal-700 hover:bg-teal-800 shadow-lg shadow-teal-100"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {vehicle.availability ? "Book Vehicle" : "Currently Unavailable"}
            </button>

            <p className="text-xs text-center text-gray-400 mt-4">
              *Taxes and fees will be calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
