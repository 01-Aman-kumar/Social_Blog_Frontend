// "use client";
// import { useEffect, useState, useContext } from "react";
// import { useRouter, useParams } from "next/navigation";
// import axiosInstance from "@/utils/axiosInstance";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { AuthContext } from "@/context/AuthContext";

// export default function EditPostPage() {
//   const router = useRouter();
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//     status: "draft",
//   });

//   const [file, setFile] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // 🔥 Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const res = await axiosInstance.get("/categories");
//       setCategories(res.data.categories);
//     } catch (error) {
//       console.error("Failed to load categories", error);
//     }
//   };

//   // 🔥 Fetch existing post
//   const fetchPost = async () => {
//     try {
//       const res = await axiosInstance.get(`/posts/id/${id}`); // you must have this route
//       const post = res.data.post;

//       // Only owner can edit
//       // Only owner or admin can edit
// if (post.author?._id !== user?._id && user?.role !== "admin") {
//   alert("You are not allowed to edit this post!");
//   router.push("/");
//   return;
// }


//       setForm({
//         title: post.title,
//         content: post.content,
//         category: post.category,
//         tags: post.tags.join(","),
//         status: post.status,
//       });
//     } catch (error) {
//       console.error("Failed to load post:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load post + categories on mount
//   useEffect(() => {
//     if (id && user) {
//       fetchCategories();
//       fetchPost();
//     }
//   }, [id, user]);

//   // 🔥 Submit updated post
//   const updatePost = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("content", form.content);
//     fd.append("category", form.category);
//     fd.append("tags", form.tags);
//     fd.append("status", form.status);
//     if (file) fd.append("coverImage", file);

//     try {
//       setSaving(true);
//       await axiosInstance.put(`/posts/${id}`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Post updated successfully!");
//       router.push(`/posts/id/${id}`);
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert(error.response?.data?.message || "Failed to update post");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="p-6">Loading post...</div>;

//   return (
//     <ProtectedRoute>
//       <div className="max-w-3xl mx-auto p-6">
//         <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

//         <form onSubmit={updatePost} className="space-y-4">

//           {/* Title */}
//           <input
//             type="text"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className="w-full border p-2 rounded"
//             placeholder="Title"
//             required
//           />

//           {/* Category */}
//           <select
//             className="w-full border p-2 rounded"
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//             required
//           >
//             <option value="">Select category</option>
//             {categories.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           {/* Content */}
//           <textarea
//             value={form.content}
//             onChange={(e) => setForm({ ...form, content: e.target.value })}
//             className="w-full border p-2 rounded"
//             rows={8}
//             placeholder="Write post content..."
//             required
//           />

//           {/* Tags */}
//           <input
//             type="text"
//             value={form.tags}
//             onChange={(e) => setForm({ ...form, tags: e.target.value })}
//             className="w-full border p-2 rounded"
//             placeholder="Comma separated tags"
//           />

//           {/* Cover image */}
//           <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

//           {/* Status */}
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 checked={form.status === "draft"}
//                 onChange={() => setForm({ ...form, status: "draft" })}
//               />
//               Draft
//             </label>

//             <label className="ml-4">
//               <input
//                 type="radio"
//                 checked={form.status === "published"}
//                 onChange={() => setForm({ ...form, status: "published" })}
//               />
//               Publish
//             </label>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="px-4 py-2 border rounded"
//             disabled={saving}
//           >
//             {saving ? "Updating..." : "Update Post"}
//           </button>
//         </form>
//       </div>
//     </ProtectedRoute>
//   );
// }
"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthContext } from "@/context/AuthContext";
import { 
  ImagePlus, 
  PenTool, 
  Save, 
  Send, 
  Sparkles, 
  Hash, 
  LayoutTemplate, 
  ChevronDown, 
  AlignLeft, 
  Type, 
  X,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    status: "draft",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔥 Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  // 🔥 Fetch existing post
  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get(`/posts/id/${id}`);
      const post = res.data.post;

      // Only owner or admin can edit
      if (post.author?._id !== user?._id && user?.role !== "admin") {
        toast.error("You are not allowed to edit this post!");
        router.push("/");
        return;
      }

      setForm({
        title: post.title,
        content: post.content,
        category: post.category?._id || post.category, // Handle populated vs unpopulated
        tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags,
        status: post.status,
      });

      if (post.coverImage) {
        setPreview(post.coverImage);
      }
    } catch (error) {
      console.error("Failed to load post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && user) {
      fetchCategories();
      fetchPost();
    }
  }, [id, user]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  // 🔥 Submit updated post
  const updatePost = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("content", form.content);
    fd.append("category", form.category);
    fd.append("tags", form.tags);
    fd.append("status", form.status);
    if (file) fd.append("coverImage", file);

    try {
      setSaving(true);
      await axiosInstance.put(`/posts/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Post updated successfully!");
      router.push(`/posts/id/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row text-white font-sans bg-[#0f172a]">
        
        {/* --- LEFT SIDE: INFO BANNER --- */}
        <div className="hidden lg:flex lg:w-[30%] flex-col justify-between p-10 relative border-r border-slate-800 bg-[#0b0f14]/50 overflow-hidden">
           
           {/* Abstract Glows */}
           <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
           <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-12">
                 <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 shadow-lg">
                    <PenTool className="w-6 h-6 text-blue-400" />
                 </div>
                 <span className="text-lg font-bold tracking-wide text-slate-200">BlogSphere Studio</span>
              </div>

              <h1 className="text-4xl font-extrabold mb-6 leading-tight bg-linear-to-br from-white to-slate-400 bg-clip-text text-transparent">
                  Refine Your Masterpiece.
              </h1>
              <p className="text-slate-400 text-base mb-8 leading-relaxed">
                  Editing gives you a second chance to make your voice clearer, stronger, and more impactful.
              </p>

              <div className="space-y-6">
                 <div className="flex items-start gap-4 p-5 rounded-xl bg-[#1e293b]/50 border border-slate-800 backdrop-blur-sm">
                    <div className="bg-purple-500/10 p-2 rounded-lg border border-purple-500/20">
                       <Sparkles className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                       <h3 className="font-bold text-sm text-slate-200 mb-1">Update & Improve</h3>
                       <p className="text-xs text-slate-500 leading-relaxed">Keep your content fresh and relevant for your audience.</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="relative z-10 pt-8 border-t border-slate-800/50">
              <p className="text-xs text-slate-500 italic">
                  "The first draft is just you telling yourself the story." 📝
              </p>
           </div>
        </div>

        {/* --- RIGHT SIDE: EDIT FORM --- */}
        <div style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto h-screen bg-[#0f172a]">
           <div className="max-w-4xl mx-auto pb-20">
             
             {/* Header */}
             <div className="mb-8 flex items-center justify-between">
                <div>
                   <h1 className="text-2xl font-bold text-white">Edit Post</h1>
                   <p className="text-slate-400 text-sm mt-1">Update your content details below.</p>
                </div>
                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${form.status === 'published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                   {form.status === 'published' ? 'Published' : 'Draft'}
                </div>
             </div>

             <form onSubmit={updatePost} className="space-y-6">
                
                {/* CARD 1: Basic Details */}
                <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <LayoutTemplate size={16} /> Basic Information
                   </h3>
                   
                   {/* Title Input */}
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Post Title <span className="text-red-400">*</span></label>
                      <div className="relative">
                         <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                         <input
                           placeholder="Title"
                           value={form.title}
                           onChange={(e) => setForm({ ...form, title: e.target.value })}
                           className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                           required
                         />
                      </div>
                   </div>

                   {/* Grid: Category & Tags */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-300">Category <span className="text-red-400">*</span></label>
                         <div className="relative">
                            <select
                              className="w-full appearance-none bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 pr-10 text-slate-200 focus:border-blue-500 outline-none transition-all cursor-pointer"
                              value={form.category}
                              onChange={(e) => setForm({ ...form, category: e.target.value })}
                              required
                            >
                              <option value="">Select Category</option>
                              {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-300">Tags</label>
                         <div className="relative">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                              placeholder="comma, separated, tags"
                              value={form.tags}
                              onChange={(e) => setForm({ ...form, tags: e.target.value })}
                              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all"
                            />
                         </div>
                      </div>
                   </div>
                </div>

                {/* CARD 2: Media */}
                <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <ImagePlus size={16} /> Media
                   </h3>
                   
                   {!preview ? (
                     <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800/50 hover:border-blue-500/50 transition-all group">
                       <div className="p-3 bg-slate-800 rounded-full mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all text-slate-500 border border-slate-700 group-hover:border-blue-500">
                           <ImagePlus size={24} />
                       </div>
                       <p className="text-sm font-medium text-slate-300">Click to upload new cover image</p>
                       <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                     </label>
                   ) : (
                     <div className="relative w-full h-64 rounded-xl overflow-hidden group border border-slate-700">
                       <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                          <button
                            type="button"
                            onClick={removeImage}
                            className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 font-medium"
                          >
                            <X size={16} /> Remove Image
                          </button>
                       </div>
                     </div>
                   )}
                </div>

                {/* CARD 3: Content Editor */}
                <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
                   <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                         <AlignLeft size={16} /> Content
                         <span className="text-red-400">*</span>
                      </h3>
                      <span className="text-xs text-slate-500">{form.content.length} characters</span>
                   </div>
                   
                   <textarea
                     placeholder="Write your amazing story here..."
                     value={form.content}
                     onChange={(e) => setForm({ ...form, content: e.target.value })}
                     rows={15}
                     className="w-full px-5 py-4 rounded-xl border border-slate-700 bg-[#0f172a] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none text-slate-200 leading-relaxed text-base placeholder:text-slate-600"
                     required
                   />
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
                   
                   {/* Status Toggles */}
                   <div className="flex bg-[#1e293b] p-1 rounded-lg border border-slate-700">
                     <button
                       type="button"
                       onClick={() => setForm({ ...form, status: "draft" })}
                       className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                         form.status === "draft"
                           ? "bg-slate-700 text-white shadow-sm"
                           : "text-slate-500 hover:text-slate-300"
                       }`}
                     >
                       Draft
                     </button>
                     <button
                       type="button"
                       onClick={() => setForm({ ...form, status: "published" })}
                       className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                         form.status === "published"
                           ? "bg-green-500/20 text-green-400 border border-green-500/20"
                           : "text-slate-500 hover:text-slate-300"
                       }`}
                     >
                       Publish
                     </button>
                   </div>

                   {/* Main Action Buttons */}
                   <div className="flex items-center gap-3 w-full sm:w-auto">
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
                         className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                         {saving ? (
                           <>
                             <Loader2 size={16} className="animate-spin" /> Updating...
                           </>
                         ) : (
                           <>
                             <Save size={16} /> Update Post
                           </>
                         )}
                      </button>
                   </div>
                </div>

             </form>
           </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}
