import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const role = sessionStorage.getItem("role");

  if (!isLoggedIn || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;