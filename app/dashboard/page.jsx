"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await axiosInstance.get("/auth/logout");
    logout();
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome, {user?.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}
