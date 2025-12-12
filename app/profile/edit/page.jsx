// "use client";
// import { useEffect, useState, useContext } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import { AuthContext } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function EditProfile() {
//   const { user, login } = useContext(AuthContext); // login setter if you store user on update
//   const router = useRouter();

//   const [form, setForm] = useState({ name: "", username: "", bio: "" });
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setForm({ name: user.name || "", username: user.username || "", bio: user.bio || "" });
//       setLoading(false);
//     }
//   }, [user]);

//   const submit = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("username", form.username);
//     fd.append("bio", form.bio);
//     if (avatarFile) fd.append("avatar", avatarFile);

//     try {
//       setSaving(true);
//       const res = await axiosInstance.put("/users/me", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // update auth context user (if you store in context)
//       if (login) login(res.data.user);

//       alert("Profile updated");
//       router.push(`/profile/${res.data.user._id}`);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

//       <form onSubmit={submit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Avatar</label>
//           <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0])} />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Name</label>
//           <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border p-2 rounded" required />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Username</label>
//           <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full border p-2 rounded" required />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Bio</label>
//           <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full border p-2 rounded" rows={4} />
//         </div>

//         <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-500 text-white rounded">
//           {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// }
// "use client";
// import { useEffect, useState, useContext } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import { AuthContext } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { Loader2, Camera, Save, User, AtSign, AlignLeft, ArrowLeft } from "lucide-react";

// export default function EditProfile() {
//   const { user, login } = useContext(AuthContext); 
//   const router = useRouter();

//   const [form, setForm] = useState({ name: "", username: "", bio: "" });
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setForm({ 
//         name: user.name || "", 
//         username: user.username || "", 
//         bio: user.bio || "" 
//       });
//       setPreview(user.avatar || "/default-avatar.png");
//       setLoading(false);
//     }
//   }, [user]);

//   const handleAvatarChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setAvatarFile(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("username", form.username);
//     fd.append("bio", form.bio);
//     if (avatarFile) fd.append("avatar", avatarFile);

//     try {
//       setSaving(true);
//       const res = await axiosInstance.put("/users/me", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (login) login(res.data.user);

//       // Show success toast or alert (optional)
//       // alert("Profile updated");
//       router.push(`/profile/${res.data.user._id}`);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
//       <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//            <button 
//              onClick={() => router.back()}
//              className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
//            >
//               <ArrowLeft className="w-6 h-6" />
//            </button>
//            <div>
//               <h1 className="text-2xl font-bold">Edit Profile</h1>
//               <p className="text-slate-400 text-sm">Update your personal information</p>
//            </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
//           {/* Left Column: Avatar */}
//           <div className="md:col-span-1">
//              <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
//                 <div className="relative group cursor-pointer mb-4">
//                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 group-hover:border-blue-500 transition-colors shadow-lg">
//                       <img 
//                         src={preview || "/default-avatar.png"} 
//                         alt="Avatar" 
//                         className="w-full h-full object-cover"
//                       />
//                    </div>
                   
//                    {/* Overlay Upload Icon */}
//                    <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
//                       <Camera className="w-8 h-8 text-white" />
//                       <input 
//                         type="file" 
//                         accept="image/*" 
//                         className="hidden" 
//                         onChange={handleAvatarChange} 
//                       />
//                    </label>
//                 </div>
                
//                 <h3 className="font-bold text-lg">{form.name || "Your Name"}</h3>
//                 <p className="text-slate-500 text-sm mb-4">@{form.username || "username"}</p>
//                 <p className="text-xs text-slate-400">Click image to change avatar</p>
//              </div>
//           </div>

//           {/* Right Column: Form */}
//           <div className="md:col-span-2">
//              <form onSubmit={submit} className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                
//                 {/* Name Input */}
//                 <div className="space-y-2">
//                    <label className="text-sm font-medium text-slate-300">Display Name</label>
//                    <div className="relative">
//                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
//                       <input 
//                         value={form.name} 
//                         onChange={(e) => setForm({ ...form, name: e.target.value })} 
//                         className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
//                         placeholder="John Doe"
//                         required 
//                       />
//                    </div>
//                 </div>

//                 {/* Username Input */}
//                 <div className="space-y-2">
//                    <label className="text-sm font-medium text-slate-300">Username</label>
//                    <div className="relative">
//                       <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
//                       <input 
//                         value={form.username} 
//                         onChange={(e) => setForm({ ...form, username: e.target.value })} 
//                         className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
//                         placeholder="johndoe"
//                         required 
//                       />
//                    </div>
//                 </div>

//                 {/* Bio Input */}
//                 <div className="space-y-2">
//                    <label className="text-sm font-medium text-slate-300">Bio</label>
//                    <div className="relative">
//                       <AlignLeft className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
//                       <textarea 
//                         value={form.bio} 
//                         onChange={(e) => setForm({ ...form, bio: e.target.value })} 
//                         className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
//                         rows={4}
//                         placeholder="Tell the world about yourself..."
//                       />
//                    </div>
//                    <p className="text-xs text-right text-slate-500">{form.bio.length}/160</p>
//                 </div>

//                 {/* Actions */}
//                 <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
//                    <button 
//                      type="button" 
//                      onClick={() => router.back()}
//                      className="px-5 py-2.5 text-sm text-slate-400 hover:text-white border border-transparent hover:border-slate-700 rounded-lg transition-colors"
//                    >
//                      Cancel
//                    </button>
//                    <button 
//                      type="submit" 
//                      disabled={saving} 
//                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//                    >
//                      {saving ? (
//                        <>
//                          <Loader2 className="w-4 h-4 animate-spin" /> Saving...
//                        </>
//                      ) : (
//                        <>
//                          <Save className="w-4 h-4" /> Save Changes
//                        </>
//                      )}
//                    </button>
//                 </div>

//              </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  Camera, 
  Save, 
  User, 
  AtSign, 
  AlignLeft, 
  ArrowLeft, 
  Trash2, 
  AlertTriangle 
} from "lucide-react";

export default function EditProfile() {
  const { user, login, logout } = useContext(AuthContext); // Ensure logout is destructured
  const router = useRouter();

  const [form, setForm] = useState({ name: "", username: "", bio: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ 
        name: user.name || "", 
        username: user.username || "", 
        bio: user.bio || "" 
      });
      setPreview(user.avatar || "/default-avatar.png");
      setLoading(false);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("username", form.username);
    fd.append("bio", form.bio);
    if (avatarFile) fd.append("avatar", avatarFile);

    try {
      setSaving(true);
      const res = await axiosInstance.put("/users/me", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (login) login(res.data.user);
      router.push(`/profile/${res.data.user._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // 🔥 DELETE ACCOUNT FUNCTION
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and all your posts will be removed."
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      await axiosInstance.delete("/users/me");
      
      // 1. Clear frontend auth state
      if (logout) logout();
      
      // 2. Redirect to login or home
      router.push("/login");
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete account");
      setDeleting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
           <button 
             onClick={() => router.back()}
             className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
           >
              <ArrowLeft className="w-6 h-6" />
           </button>
           <div>
              <h1 className="text-2xl font-bold">Edit Profile</h1>
              <p className="text-slate-400 text-sm">Update your personal information</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar */}
          <div className="md:col-span-1">
             <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="relative group cursor-pointer mb-4">
                   <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 group-hover:border-blue-500 transition-colors shadow-lg">
                      <img 
                        src={preview || "/default-avatar.png"} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                   </label>
                </div>
                <h3 className="font-bold text-lg">{form.name || "Your Name"}</h3>
                <p className="text-slate-500 text-sm mb-4">@{form.username || "username"}</p>
             </div>
          </div>

          {/* Right Column: Form & Danger Zone */}
          <div className="md:col-span-2 space-y-8">
             
             {/* EDIT FORM */}
             <form onSubmit={submit} className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                
                <div className="space-y-2">
                   <label className="text-sm font-medium text-slate-300">Display Name</label>
                   <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <input 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:outline-none transition-all"
                        required 
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-slate-300">Username</label>
                   <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <input 
                        value={form.username} 
                        onChange={(e) => setForm({ ...form, username: e.target.value })} 
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:outline-none transition-all"
                        required 
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-slate-300">Bio</label>
                   <div className="relative">
                      <AlignLeft className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
                      <textarea 
                        value={form.bio} 
                        onChange={(e) => setForm({ ...form, bio: e.target.value })} 
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:outline-none transition-all resize-none"
                        rows={4}
                      />
                   </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                   <button 
                     type="button" 
                     onClick={() => router.back()}
                     className="px-5 py-2.5 text-sm text-slate-400 hover:text-white border border-transparent hover:border-slate-700 rounded-lg transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit" 
                     disabled={saving} 
                     className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                   >
                     {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                     Save Changes
                   </button>
                </div>
             </form>

             {/* 🔥 DANGER ZONE 🔥 */}
             <div className="bg-[#1e293b] border border-red-900/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Red Glow Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <h3 className="text-lg font-bold text-red-500 flex items-center gap-2 mb-2">
                   <AlertTriangle className="w-5 h-5" /> Danger Zone
                </h3>
                <p className="text-slate-400 text-sm mb-6 max-w-lg">
                   Deleting your account is permanent. All your data, posts, comments, and followers will be permanently removed.
                </p>

                <button 
                  type="button" 
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 rounded-xl transition-all flex items-center gap-2 font-medium"
                >
                   {deleting ? (
                     <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                     </>
                   ) : (
                     <>
                        <Trash2 className="w-4 h-4" /> Delete Account
                     </>
                   )}
                </button>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
