import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VehicleForm = ({ onSuccess, vehicleToEdit, onEditComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    seats: "",
    features: "",
    fuelType: "petrol",
    model: "",
    color: "",
    pricePerDay: "",
    availability: true,
    image: "",
    hostedBy: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicleToEdit) {
      setFormData({
        name: vehicleToEdit.name || "",
        type: vehicleToEdit.type || "",
        seats: vehicleToEdit.seats || "",
        features: vehicleToEdit.features || "",
        fuelType: vehicleToEdit.fuelType || "petrol",
        model: vehicleToEdit.model || "",
        color: vehicleToEdit.color || "",
        pricePerDay: vehicleToEdit.pricePerDay || "",
        availability: vehicleToEdit.availability ?? true,
        image: vehicleToEdit.image || "",
        hostedBy: vehicleToEdit.hostedBy || ""
      });
    } else {
      setFormData({
        name: "",
        type: "",
        seats: "",
        features: "",
        fuelType: "petrol",
        model: "",
        color: "",
        pricePerDay: "",
        availability: true,
        image: "",
        hostedBy: ""
      });
    }
  }, [vehicleToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not authenticated — please login as admin");
        return;
      }

      // Build JSON payload and coerce correct types
      const payload = {
        name: formData.name,
        type: formData.type,
        seats: Number(formData.seats),
        features: formData.features,
        fuelType: formData.fuelType,
        model: formData.model,
        color: formData.color,
        pricePerDay: Number(formData.pricePerDay),
        availability: Boolean(formData.availability),
        image: formData.image,
        hostedBy: formData.hostedBy
      };

      if (vehicleToEdit) {
        // Update existing vehicle
        const response = await axios.put(
          `http://localhost:3000/vehicles/${vehicleToEdit._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Vehicle updated successfully");
      } else {
        // Add new vehicle
        const response = await axios.post(
          "http://localhost:3000/vehicles",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Vehicle added successfully");
      }

      onSuccess();
      onEditComplete && onEditComplete();

      // Reset form
      setFormData({
        name: "",
        type: "",
        seats: "",
        features: "",
        fuelType: "petrol",
        model: "",
        color: "",
        pricePerDay: "",
        availability: true,
        image: "",
        hostedBy: ""
      });
    } catch (err) {
      console.error(err.response?.data || err);
      const serverMsg = err.response?.data?.error || err.response?.data?.message || null;
      if (!serverMsg && err.response?.status === 401) {
        toast.error("Unauthorized: please login as admin");
      } else {
        toast.error(serverMsg || (vehicleToEdit ? "Failed to update vehicle" : "Failed to add vehicle"));
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg shadow-gray-400 border border-gray-300 text-teal-900 space-y-4"
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
          type="number"
          name="seats"
          placeholder="Seats"
          value={formData.seats}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-teal-950"
        />

        <input
          type="text"
          name="features"
          placeholder="Features (AC, GPS, Airbags)"
          value={formData.features}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-teal-950"
        />

        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-teal-950"
        >
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>

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
          required
        />

        <input
          type="text"
          name="hostedBy"
          placeholder="Hosted By"
          value={formData.hostedBy}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-teal-950"
          required
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-950 hover:opacity-90 transition"
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
                  seats: "",
                  features: "",
                  fuelType: "petrol",
                  model: "",
                  color: "",
                  pricePerDay: "",
                  availability: true,
                  image: "",
                  hostedBy: ""
                });
                onEditComplete();
              }}
              className="flex-1 py-3 rounded-lg font-semibold text-teal-900 bg-gray-200 hover:bg-gray-300 transition"
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
