// "use client";
// import { useState, useContext } from "react";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/utils/axiosInstance";
// import { AuthContext } from "@/context/AuthContext";
// import Link from "next/link";

// export default function Signup() {
//   const router = useRouter();
//   const { login } = useContext(AuthContext);

//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axiosInstance.post("/auth/signup", form);
//       login(res.data.user);
//       router.push("/dashboard");
//     } catch (error) {
//       alert(error.response?.data?.message || "Signup failed");
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
//   }} className="h-[calc(100vh-73px)] w-screen flex overflow-hidden relative">

      

//       {/* LAYOUT GRID (Same as login) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">

//         {/* LEFT HERO SECTION */}
//         <div className="hidden md:flex flex-col justify-center px-12 relative text-white">

//           {/* Soft overlay */}
//           <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-r-2xl"></div>

//           <div className="relative z-10">
//             <h1 className="text-4xl font-extrabold mb-4 leading-snug">
//               Join  
//               <span className="bg-clip-text text-transparent bg-linear-to-r 
//                 from-blue-300 via-white to-purple-300 ml-2">
//                 BlogSphere
//               </span>
//             </h1>

//             <p className="text-gray-300 text-lg max-w-md leading-relaxed">
//               Become part of a thriving community where creators share stories, 
//               build connections, and inspire the world.
//             </p>

//             {/* FEATURES */}
//             <div className="mt-8 grid grid-cols-2 gap-6 text-gray-300 text-sm">
//               <div className="flex items-center gap-3">
//                 <span className="text-blue-400 text-xl">✍️</span> Write & Share Blogs
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="text-purple-400 text-xl">📈</span> Grow Your Audience
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="text-cyan-300 text-xl">💬</span> Engage with Readers
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="text-pink-300 text-xl">👥</span> Follow Creators
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIGNUP CARD */}
//         <div className="flex items-center justify-center p-6">
//           <div className="w-full max-w-md bg-white/10 backdrop-blur-xl 
//             border border-white/10 shadow-2xl rounded-2xl p-8">

//             <h2 className="text-3xl font-bold text-center text-white mb-2">
//               Create Account
//             </h2>
//             <p className="text-center text-gray-400 mb-6">
//               Start your journey with our creative community.
//             </p>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//               <input
//                 className="px-4 py-2 bg-black/30 border border-white/10 text-white
//                 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 placeholder="Full Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//               />

//               <input
//                 className="px-4 py-2 bg-black/30 border border-white/10 text-white
//                 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 placeholder="Username"
//                 value={form.username}
//                 onChange={(e) => setForm({ ...form, username: e.target.value })}
//                 required
//               />

//               <input
//                 className="px-4 py-2 bg-black/30 border border-white/10 text-white
//                 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//               />

//               <input
//                 type="password"
//                 className="px-4 py-2 bg-black/30 border border-white/10 text-white
//                 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//               />

//               {/* SIGNUP BUTTON */}
//               <button
//                 type="submit"
//                 className="w-full bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600
//                 hover:opacity-90 text-white py-2.5 rounded-lg text-lg font-semibold 
//                 shadow-[0_0_18px_rgba(80,80,255,0.4)] transition"
//               >
//                 Signup
//               </button>
//             </form>

//             {/* WHY JOIN */}
//             {/* <div className="mt-6 text-gray-300 text-sm">
//               <p className="font-semibold text-white mb-2">Why join BlogSphere?</p>
//               <ul className="space-y-1 text-gray-400">
//                 <li>• Share meaningful stories</li>
//                 <li>• Build your personal brand</li>
//                 <li>• Connect with creators</li>
//                 <li>• Discover new ideas daily</li>
//               </ul>
//             </div> */}

//             {/* LOGIN LINK */}
//             <p className="text-center text-gray-400 mt-6">
//               Already have an account?
//               <Link href="/login" className="text-blue-400 ml-1 font-semibold hover:underline">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState, useContext } from "react";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/utils/axiosInstance";
// import { AuthContext } from "@/context/AuthContext";
// import Link from "next/link";
// import { User, Mail, Lock, AtSign, ArrowRight } from "lucide-react";

// export default function Signup() {
//   const router = useRouter();
//   const { login } = useContext(AuthContext);

//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axiosInstance.post("/auth/signup", form);
//       login(res.data.user);
//       router.push("/dashboard");
//     } catch (error) {
//       alert(error.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-[calc(100vh-66px)] w-full flex overflow-hidden relative bg-[#0f172a] text-white">
      
//       {/* ABSTRACT BACKGROUND SHAPES */}
//       <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

//       {/* GRID LAYOUT */}
//       <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative z-10">

//         {/* LEFT HERO SECTION */}
//         <div className="hidden md:flex flex-col justify-center px-16 relative">
//            <div className="relative z-10">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
//               <span className="flex h-2 w-2 rounded-full bg-purple-400"></span>
//               Start Your Journey
//             </div>

//             <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
//               Join <br />
//               <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
//                 BlogSphere
//               </span>
//             </h1>

//             <p className="text-slate-400 text-lg max-w-lg leading-relaxed mb-10">
//               Become part of a thriving community where creators share stories, 
//               build connections, and inspire the world.
//             </p>

//             {/* FEATURES GRID */}
//             <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-slate-300">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
//                    <span className="text-blue-400">✍️</span>
//                 </div>
//                 <span className="font-medium">Write & Share</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
//                    <span className="text-purple-400">📈</span>
//                 </div>
//                 <span className="font-medium">Grow Audience</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
//                    <span className="text-cyan-300">💬</span>
//                 </div>
//                 <span className="font-medium">Engage Readers</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
//                    <span className="text-pink-300">👥</span>
//                 </div>
//                 <span className="font-medium">Follow Creators</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIGNUP CARD */}
//         <div className="flex items-center justify-center p-6 w-full">
//           <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 shadow-2xl rounded-2xl p-8 md:p-10 relative overflow-hidden">
            
//             {/* Subtle glow inside card */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

//             <div className="mb-8 text-center">
//               <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
//               <p className="text-slate-400">Start your creative journey today.</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* FULL NAME */}
//               <div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
//                     <User className="h-5 w-5" />
//                   </div>
//                   <input
//                     className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
//                     placeholder="Full Name"
//                     value={form.name}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* USERNAME */}
//               <div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
//                     <AtSign className="h-5 w-5" />
//                   </div>
//                   <input
//                     className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
//                     placeholder="Username"
//                     value={form.username}
//                     onChange={(e) => setForm({ ...form, username: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* EMAIL */}
//               <div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
//                     <Mail className="h-5 w-5" />
//                   </div>
//                   <input
//                     className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
//                     placeholder="Email Address"
//                     value={form.email}
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* PASSWORD */}
//               <div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
//                     <Lock className="h-5 w-5" />
//                   </div>
//                   <input
//                     type="password"
//                     className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={(e) => setForm({ ...form, password: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* SIGNUP BUTTON */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2.5 rounded-lg font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] mt-2"
//               >
//                 {loading ? (
//                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     Create Account <ArrowRight className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             </form>

//             <div className="mt-8 text-center">
//               <p className="text-slate-400 text-sm">
//                 Already have an account?
//                 <Link href="/login" className="text-blue-400 ml-1 font-bold hover:text-blue-300 transition-colors">
//                   Login here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { User, Mail, Lock, AtSign, ArrowRight, AlertCircle } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

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
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Real-time validation handler
  useEffect(() => {
    if (form.email && !validateEmail(form.email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    // Check overall form validity
    const isValid = 
      form.name.length > 0 &&
      form.username.length > 0 &&
      validateEmail(form.email) &&
      form.password.length >= 6; // Simple password length check
      
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
      const res = await axiosInstance.post("/auth/signup", form);
      login(res.data.user);
      router.push("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-66px)] w-full flex overflow-hidden relative bg-[#0f172a] text-white">
      
      {/* ABSTRACT BACKGROUND SHAPES */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative z-10">

        {/* LEFT HERO SECTION */}
        <div className="hidden md:flex flex-col justify-center px-16 relative">
            <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-purple-400"></span>
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

            {/* FEATURES GRID */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-slate-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                   <span className="text-blue-400">✍️</span>
                </div>
                <span className="font-medium">Write & Share</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                   <span className="text-purple-400">📈</span>
                </div>
                <span className="font-medium">Grow Audience</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                   <span className="text-cyan-300">💬</span>
                </div>
                <span className="font-medium">Engage Readers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                   <span className="text-pink-300">👥</span>
                </div>
                <span className="font-medium">Follow Creators</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIGNUP CARD */}
        <div className="flex items-center justify-center p-6 w-full">
          <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 shadow-2xl rounded-2xl p-8 md:p-10 relative overflow-hidden">
            
            {/* Subtle glow inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-slate-400">Start your creative journey today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* FULL NAME */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* USERNAME */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <AtSign className="h-5 w-5" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* EMAIL with VALIDATION */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className={`h-5 w-5 ${emailError ? 'text-red-400' : ''}`} />
                  </div>
                  <input
                    type="email"
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      emailError 
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                    }`}
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                {/* Validation Message */}
                {emailError && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 animate-in slide-in-from-top-1">
                     <AlertCircle className="w-3.5 h-3.5" />
                     {emailError}
                  </div>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="Password (min 6 chars)"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* SIGNUP BUTTON */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold shadow-lg transition-all active:scale-[0.98] mt-2 ${
                  loading || !isFormValid 
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25"
                }`}
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?
                <Link href="/login" className="text-blue-400 ml-1 font-bold hover:text-blue-300 transition-colors">
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
