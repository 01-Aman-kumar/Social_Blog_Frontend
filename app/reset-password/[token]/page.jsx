"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

export default function ResetPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/auth/reset/${token}`, { password });
      setOk(true);
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  if (ok) return <div className="p-6">Password reset successful. <a href="/login" className="text-blue-600">Login</a></div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required placeholder="New password" className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Reset Password</button>
      </form>
    </div>
  );
}
