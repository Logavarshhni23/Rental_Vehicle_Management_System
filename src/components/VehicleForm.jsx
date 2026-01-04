import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VehicleForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    model: "",
    color: "",
    pricePerDay: "",
    availability: true,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");

      await axios.post("http://localhost:3000/vehicles", formData, {
        headers: { Authorization: token },
      });

      toast.success("Vehicle added successfully");
      onSuccess();

      setFormData({
        name: "",
        type: "",
        model: "",
        color: "",
        pricePerDay: "",
        availability: true,
        image: "",
      });
    } catch (err) {
      toast.error("Failed to add vehicle");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl 
                   shadow-lg shadow-gray-400 border border-gray-300 
                   text-teal-900 space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Add Vehicle
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Vehicle Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />

        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-teal-950"
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-teal-950"
        />

        <input
          type="number"
          name="pricePerDay"
          placeholder="Price per day"
          value={formData.pricePerDay}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-teal-950"
        />

        <label className="flex items-center gap-2 font-semibold">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
          Available
        </label>

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-teal-950"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white
                     bg-gradient-to-r from-teal-600 to-teal-950
                     hover:opacity-90 transition"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;
