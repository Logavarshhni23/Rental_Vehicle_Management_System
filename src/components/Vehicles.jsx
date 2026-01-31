import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import VehicleItems from './VehicleItems';
import Form from './VehicleForm';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const role = sessionStorage.getItem('role');

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('http://localhost:3000/vehicles');
      setVehicles(res.data);
    } catch (err) {
      console.error('Error fetching vehicles:', err.message);
      toast.error('Failed to fetch vehicles');
    }
  };

  const handleDelete = async (vehicleId) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        const token = sessionStorage.getItem('token');
        console.log("Delete token:", token);
        const response = await axios.delete(`http://localhost:3000/vehicles/${vehicleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Delete response:", response.data);
        toast.success('Vehicle deleted successfully');
        fetchVehicles();
      } catch (err) {
        console.error("Delete error:", err.response?.data || err.message);
        toast.error('Failed to delete vehicle');
      }
    }
  };

  const handleEdit = (vehicle) => {
    setVehicleToEdit(vehicle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditComplete = () => {
    setVehicleToEdit(null);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className='p-6'>
      {role === 'admin' && vehicleToEdit && (
        <div className='fixed inset-0 bg-gray-900/30 flex justify-center items-center z-50'>
          <div 
            onClick={() => handleEditComplete()}
            className='absolute inset-0'
          />
          <div className='relative z-10'>
            <Form
              onSuccess={fetchVehicles}
              vehicleToEdit={vehicleToEdit}
              onEditComplete={handleEditComplete}
            />
          </div>
        </div>
      )}

      <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {vehicles.map((vehicle) => (
          <VehicleItems
            key={vehicle._id}
            vehicle={vehicle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;