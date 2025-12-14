
"use client";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
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
  // const handleDeleteAccount = async () => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete your account? This action cannot be undone and all your posts will be removed."
  //   );

  //   if (!confirmed) return;

  //   try {
  //     setDeleting(true);
  //     await axiosInstance.delete("/users/me");
      
  //     // 1. Clear frontend auth state
  //     if (logout) logout();
      
  //     // 2. Redirect to login or home
  //     router.push("/login");
      
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.response?.data?.message || "Failed to delete account");
  //     setDeleting(false);
  //   }
  // };



const confirmDeleteAccount = () => {
  return new Promise((resolve) => {
    toast(
      (t) => (
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-2 text-red-500 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            Delete Account?
          </div>

          <p className="text-sm text-grey-600">
            This action is permanent. All your posts, followers, and data will be removed.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  });
};


 

const handleDeleteAccount = async () => {
  const confirmed = await confirmDeleteAccount();

  if (!confirmed) return;

  try {
    setDeleting(true);

    const toastId = toast.loading("Deleting your account...");

    await axiosInstance.delete("/users/me");

    toast.success("Your account has been deleted successfully", {
      id: toastId,
    });

    // Clear auth state
    if (logout) logout();

    // Redirect
    router.push("/login");

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message || "Failed to delete account. Try again.",
      { duration: 4000 }
    );

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
