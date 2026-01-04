import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleItems from "./VehicleItems";
import Form from "./VehicleForm";

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err.message);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold text-center p-6 text-teal-900 mb-6">Admin Dashboard</h1>
      <Form onSuccess={fetchVehicles} />
    </div>
  );
};

export default Admin;