// "use client";

// import { useContext, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import { AuthContext } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function Login() {
//   const router = useRouter();
//   const { login } = useContext(AuthContext);

//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axiosInstance.post("/auth/login", form);
//       login(res.data.user);
//       router.push("/dashboard");
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={{
//     background: `
//       radial-gradient(
//         1200px 700px at 80% -10%,
//         #1b2b44 0%,
//         rgba(27, 43, 68, 0) 60%
//       ),
//       #0b0f14
//     `
//   }} className="h-[calc(100vh-70px)] w-screen flex overflow-hidden relative">

//       {/* BLOBS */}
//       {/* <div className="absolute w-72 h-72 bg-blue-900/40 rounded-full blur-3xl top-10 left-10 animate-blob"></div>
//       <div className="absolute w-72 h-72 bg-purple-800/40 rounded-full blur-3xl bottom-10 right-10 animate-blob delay-3000"></div>
//       <div className="absolute w-72 h-72 bg-cyan-700/30 rounded-full blur-3xl bottom-20 left-1/3 animate-blob delay-1500"></div> */}

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">

//         {/* LEFT SIDE */}
//         <div className="hidden md:flex flex-col justify-center px-12 relative text-white">
//           <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-r-2xl border-r border-black/20"></div>

//           <div className="relative z-10">
//             <h1 className="text-4xl font-extrabold drop-shadow mb-4 leading-snug">
//               Welcome to  
//               <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 to-purple-400 ml-2">BlogSphere</span>
//             </h1>

//             <p className="text-gray-300 text-lg max-w-md leading-relaxed">
//               A premium platform where creators write, connect, and express themselves.
//               <br /><br />
//               Follow leaders, explore ideas, and build your network.
//             </p>

//             {/* FEATURES */}
//             <div className="mt-8 grid grid-cols-2 gap-6 text-gray-300 text-sm">
//               <div className="flex items-center gap-3"><span className="text-blue-400 text-xl">🔥</span> Trending Blogs</div>
//               <div className="flex items-center gap-3"><span className="text-purple-400 text-xl">⭐</span> Creator Profiles</div>
//               <div className="flex items-center gap-3"><span className="text-cyan-300 text-xl">💬</span> Real-time Comments</div>
//               <div className="flex items-center gap-3"><span className="text-pink-300 text-xl">👥</span> Follow & Connect</div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT LOGIN CARD */}
//         <div className="flex items-center justify-center p-6">
//           <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.1)] rounded-2xl p-8">

//             {/* LOGO */}
//             <div className="flex justify-center mb-6">
//               <img src="/logo.png" className="w-16 opacity-90 drop-shadow-2xl" />
//             </div>

//             <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
//             <p className="text-center text-gray-400 mb-6">Log in to continue your creative journey.</p>

//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* EMAIL */}
//               <div>
//                 <label className="text-gray-300 font-medium">Email</label>
//                 <input
//                   type="email"
//                   required
//                   placeholder="Enter your email"
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   className="w-full mt-1 px-4 py-2 bg-black/30 border border-white/20 placeholder-gray-400 text-white rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 />
//               </div>

//               {/* PASSWORD */}
//               <div>
//                 <label className="text-gray-300 font-medium">Password</label>
//                 <input
//                   type="password"
//                   required
//                   placeholder="Enter your password"
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                   className="w-full mt-1 px-4 py-2 bg-black/30 border border-white/20 placeholder-gray-400 text-white rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 />
//               </div>

//               {/* FORGOT */}
//               <div className="text-right">
//                 <Link href="/forgot-password" className="text-blue-300 hover:underline text-sm">Forgot Password?</Link>
//               </div>

//               {/* BUTTON */}
//               <button
//                 type="submit"
//                 className="w-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 text-white py-2.5 rounded-lg text-lg font-semibold shadow-[0_0_25px_rgba(100,100,255,0.4)] transition"
//               >
//                 Login
//               </button>
//             </form>

//             <div className="text-center text-gray-300 mt-6">
//               Don’t have an account?
//               <Link href="/signup" className="text-blue-400 ml-1 font-semibold hover:underline">Sign up</Link>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import { useContext, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, PenTool } from "lucide-react"; // Added icons for polish

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", form);
      login(res.data.user);
      router.push("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-66px)] w-full flex overflow-hidden relative bg-[#0f172a] text-white">
      
      {/* ABSTRACT BACKGROUND SHAPES (Matches Profile Page) */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative z-10">

        {/* LEFT SIDE: BRANDING */}
        <div className="hidden md:flex flex-col justify-center px-16 relative">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-400"></span>
              Join the Community
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                BlogSphere
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-lg leading-relaxed mb-8">
              A premium platform where creators write, connect, and express themselves. 
              Discover ideas, share knowledge, and build your network.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-slate-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                   <span className="text-blue-400">🔥</span>
                </div>
                <span className="font-medium">Trending Blogs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                   <span className="text-purple-400">⭐</span>
                </div>
                <span className="font-medium">Creator Profiles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                   <span className="text-cyan-300">💬</span>
                </div>
                <span className="font-medium">Real-time Chat</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                   <span className="text-pink-300">👥</span>
                </div>
                <span className="font-medium">Grow Audience</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="flex items-center justify-center p-6 w-full">
          <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 shadow-2xl rounded-2xl p-8 md:p-10 relative overflow-hidden">
            
            {/* Subtle glow inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

            {/* Header */}
            <div className="mb-8 text-center">
               <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
               <p className="text-slate-400">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2.5 rounded-lg font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
                  Sign up for free
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
