"use client";

import axiosInstance from "@/utils/axiosInstance";
import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load User on Refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
