import React from "react";
import Form from "./VehicleForm";

const VehicleManagement = () => {
  const handleSuccess = () => {
    // Success handler - can be used to show notifications
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <Form onSuccess={handleSuccess} />
    </div>
  );
};

export default VehicleManagement;