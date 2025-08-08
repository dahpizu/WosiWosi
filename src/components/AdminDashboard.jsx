// src/components/AdminDashboard.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/signin");
  };

  return (
    <div className="admin-dashboard">
      <h1>Welcome, Admin {user?.username}</h1>
      <p>This is your dashboard. Only admin users can access this route.</p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}

export default AdminDashboard;
