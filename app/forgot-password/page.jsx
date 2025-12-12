// "use client";
// import { useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [sent, setSent] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post("/auth/forgot", { email });
//       setSent(true);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed");
//     }
//   };

//   if (sent) return <div className="p-6">Reset link sent to your email if account exists.</div>;

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
//       <form onSubmit={submit} className="space-y-3">
//         <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email" className="w-full p-2 border rounded" />
//         <button className="px-4 py-2 bg-blue-600 text-white rounded">Send reset link</button>
//       </form>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await axiosInstance.post("/auth/forgot", { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl p-8 relative z-10">
        
        {sent ? (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
            <p className="text-slate-400 mb-8">
               If an account exists for <span className="text-white font-medium">{email}</span>, we have sent a password reset link.
            </p>
            <Link 
              href="/login"
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
              <p className="text-slate-400 text-sm">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                  <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    type="email" 
                    required 
                    placeholder="Enter your email" 
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link 
                href="/login" 
                className="text-slate-400 hover:text-white text-sm font-medium inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
