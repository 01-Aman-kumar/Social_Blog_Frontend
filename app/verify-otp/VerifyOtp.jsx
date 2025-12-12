"use client";
import { useState, useEffect, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const { login } = useContext(AuthContext);

  // countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return toast.error("Enter 6-digit OTP");

    setDisabled(true);

    try {
      const res = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp: code,
      });
      login(res.data.user);
      toast.success("Account Verified!");
      router.push("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      setDisabled(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await axiosInstance.post("/auth/send-otp", { email });
      toast.success("OTP Resent!");

      setTimer(60);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-sm">

        <h2 className="text-2xl font-bold mb-3 text-center">Verify OTP</h2>
        <p className="text-slate-400 text-center mb-6">
          OTP sent to <span className="text-blue-400">{email}</span>
        </p>

        {/* OTP BOXES */}
        <div className="flex justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              disabled={disabled}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center bg-slate-900 border border-slate-700 rounded-lg text-xl focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          disabled={disabled}
          onClick={handleVerify}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg font-bold"
        >
          Verify
        </button>

        {/* Countdown + Resend */}
        <div className="text-center mt-4 text-slate-400">
          {timer > 0 ? (
            <p>Resend OTP in <span className="text-blue-400">{timer}s</span></p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-400 hover:underline font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
