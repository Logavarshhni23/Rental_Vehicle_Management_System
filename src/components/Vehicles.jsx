import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import VehicleItems from './VehicleItems';

const Vehicles = () => {
  const [vehicles,setVehicles] = useState([]);

  useEffect(()=>{
    const fetchVehicles = async() => {
      try{
        const res = await axios.get("http://localhost:3000/vehicles");
        setVehicles(res.data);
      }catch(err){
        console.error("Error fetching vehicles:",err.message);
      }
    };
    fetchVehicles();
  },[]);
  return (
    <div className='p-6'>
       <h1 className='text-white text-2xl font-bold text-center'>Vehicles</h1>
       <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {vehicles.map((vehicle)=>(
              <VehicleItems key={vehicle._id} vehicle={vehicle}/>
          ))}
       </div>
    </div>
  )
}

export default Vehicles;