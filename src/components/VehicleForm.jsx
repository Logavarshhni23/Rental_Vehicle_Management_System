import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VehicleForm = ({ onSuccess, vehicleToEdit, onEditComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    model: "",
    color: "",
    pricePerDay: "",
    availability: true,
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicleToEdit) {
      setFormData(vehicleToEdit);
    } else {
      setFormData({
        name: "",
        type: "",
        model: "",
        color: "",
        pricePerDay: "",
        availability: true,
        image: "",
      });
    }
  }, [vehicleToEdit]);

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
      console.log("Token:", token);
      console.log("Vehicle to edit:", vehicleToEdit);
      console.log("Form data:", formData);

      if (vehicleToEdit) {
        // Update existing vehicle - exclude _id and timestamps
        const { _id, createdAt, updatedAt, __v, ...updateData } = formData;
        console.log("Update data:", updateData);
        const response = await axios.put(`http://localhost:3000/vehicles/${vehicleToEdit._id}`, updateData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Update response:", response.data);
        toast.success("Vehicle updated successfully");
      } else {
        // Add new vehicle
        const response = await axios.post("http://localhost:3000/vehicles", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Add response:", response.data);
        toast.success("Vehicle added successfully");
      }
      onSuccess();
      onEditComplete && onEditComplete();

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
      console.error("Full error:", err);
      console.error("Error response:", err.response);
      toast.error(vehicleToEdit ? "Failed to update vehicle" : "Failed to add vehicle");
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
          {vehicleToEdit ? "Edit Vehicle" : "Add Vehicle"}
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

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-teal-600 to-teal-950
                       hover:opacity-90 transition"
          >
            {vehicleToEdit ? "Update Vehicle" : "Add Vehicle"}
          </button>
          {vehicleToEdit && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  type: "",
                  model: "",
                  color: "",
                  pricePerDay: "",
                  availability: true,
                  image: "",
                });
                onEditComplete();
              }}
              className="flex-1 py-3 rounded-lg font-semibold text-teal-900
                         bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
