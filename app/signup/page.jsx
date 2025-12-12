
"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { User, Mail, Lock, AtSign, ArrowRight, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [agree, setAgree] = useState(false);


  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Email Validation Regex
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Live Validation
  useEffect(() => {
    if (form.email && !validateEmail(form.email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    const isValid =
      form.name.length > 0 &&
      form.username.length > 0 &&
      validateEmail(form.email) &&
      form.password.length >= 6;

    setIsFormValid(isValid);
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      setEmailError("Invalid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/send-otp", {...form,termsAccepted: agree,});

      toast.success("OTP sent to your email!");

      router.push(`/verify-otp?email=${form.email}`);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-66px)] w-full flex overflow-hidden relative bg-slate-900 text-white">

      {/* ABSTRACT SHAPES */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative z-10">

        {/* LEFT SECTION */}
        <div className="hidden md:flex flex-col justify-center px-16">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-purple-400"></span>
              Start Your Journey
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Join <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                BlogSphere
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-lg leading-relaxed mb-10">
              Become part of a thriving community where creators share stories,
              build connections, and inspire the world.
            </p>

            <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-slate-300">
              <Feature icon="✍️" label="Write & Share" />
              <Feature icon="📈" label="Grow Audience" />
              <Feature icon="💬" label="Engage Readers" />
              <Feature icon="👥" label="Follow Creators" />
            </div>
          </div>
        </div>

        {/* RIGHT SIGNUP CARD */}
        <div className="flex items-center justify-center p-6 w-full">
          <div className="w-full max-w-md bg-slate-800 border border-slate-700 shadow-2xl rounded-2xl p-8 md:p-10 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-slate-400">Start your creative journey today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAME */}
              <InputField
                icon={<User className="h-5 w-5" />}
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              {/* USERNAME */}
              <InputField
                icon={<AtSign className="h-5 w-5" />}
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />

              {/* EMAIL */}
              <div>
                <InputField
                  icon={<Mail className={`h-5 w-5 ${emailError ? "text-red-400" : ""}`} />}
                  placeholder="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  error={emailError}
                  errorMessage={emailError}
                />
                {emailError && (
                  <p className="flex items-center gap-1 mt-1 text-xs text-red-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {emailError}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <InputField
                icon={<Lock className="h-5 w-5" />}
                placeholder="Password (min 6 chars)"
                type="password"
                value={form.password}
                minLength={6}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <div className="flex items-start gap-2 mt-2">
  <input
    type="checkbox"
    checked={agree}
    onChange={(e) => setAgree(e.target.checked)}
    className="w-4 h-4 mt-1 accent-blue-600"
  />
  <p className="text-slate-400 text-sm">
    I agree to the 
    <Link href="/terms" className="text-blue-400 hover:underline"> Terms & Conditions</Link>
  </p>
</div>


              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading || !isFormValid || !agree}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold transition-all mt-2 ${
                  loading || !isFormValid || !agree
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white"
                }`}
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    Send OTP <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?
                <Link href="/login" className="text-blue-400 ml-1 font-bold hover:text-blue-300">
                  Login here
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* --- 🧩 Helper Components --- */

function Feature({ icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
        <span className="text-xl">{icon}</span>
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );
}

function InputField({ icon, placeholder, error, errorMessage, ...props }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
        {icon}
      </div>
      <input
        {...props}
        className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500/50 focus:ring-red-400/50"
            : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/50"
        }`}
        placeholder={placeholder}
      />
    </div>
  );
}
