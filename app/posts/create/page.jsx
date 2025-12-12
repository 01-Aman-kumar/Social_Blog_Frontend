// "use client";
// import { useState, useEffect } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { useRouter } from "next/navigation";
// import { ImagePlus, PenTool, X, Save, Send, Sparkles, Hash, LayoutTemplate, ChevronDown, AlignLeft, Type } from "lucide-react";

// export default function CreatePostPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//     status: "draft",
//   });

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [submitting, setSubmitting] = useState(false);

//   // ⚡ Fetch categories from backend
//   const fetchCategories = async () => {
//     try {
//       const res = await axiosInstance.get("/categories");
//       setCategories(res.data.categories || []);
//     } catch (err) {
//       console.error("Failed to fetch categories:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };

//   // Remove selected image
//   const removeImage = () => {
//     setFile(null);
//     setPreview(null);
//   };

//   // Submit new post
//   const submit = async (e) => {
//     e.preventDefault();

//     if (!form.title || !form.content || !form.category) {
//       alert("Title, content and category are required!");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("content", form.content);
//     fd.append("category", form.category);
//     fd.append("tags", form.tags);
//     fd.append("status", form.status);
//     if (file) fd.append("coverImage", file);

//     try {
//       setSubmitting(true);
//       await axiosInstance.post("/posts", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Post created successfully!");
//       router.push("/");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to create post");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Match Navbar Gradient
//   const themeBackground = {
//     background: "radial-gradient(1200px 700px at 80% -10%, #1b2b44 0%, rgba(27, 43, 68, 0) 60%), #0b0f14",
//   };

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen flex flex-col md:flex-row text-white font-sans" style={themeBackground}>
        
//         {/* --- LEFT SIDE: INFO BANNER (Content Restored) --- */}
//         <div className="hidden lg:flex lg:w-[30%] flex-col justify-between p-10 relative  border-white/10 bg-[#0b0f14]/50">
           
//            {/* Glow Effects */}
//            <div className="absolute top-20 left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-[100px]"></div>

//            <div className="relative z-10">
//               <div className="flex items-center gap-3 mb-12">
//                  <div className="bg-blue-600/20 p-2.5 rounded-xl border border-blue-500/30">
//                     <PenTool className="w-6 h-6 text-blue-400" />
//                  </div>
//                  <span className="text-lg font-bold tracking-wide opacity-90">BlogSphere Studio</span>
//               </div>

//               <h1 className="text-4xl font-extrabold mb-6 leading-tight">
//                  Share Your Story with the World.
//               </h1>
//               <p className="text-gray-400 text-base mb-8 leading-relaxed">
//                  Create insightful articles, share technical knowledge, or tell your personal journey. Your voice matters here.
//               </p>

//               <div className="space-y-6">
//                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
//                     <div className="bg-yellow-500/10 p-2 rounded-lg">
//                        <Sparkles className="w-5 h-5 text-yellow-400" />
//                     </div>
//                     <div>
//                        <h3 className="font-bold text-sm text-gray-200 mb-1">Inspire Others</h3>
//                        <p className="text-xs text-gray-500">Your content helps thousands of readers learn something new every day.</p>
//                     </div>
//                  </div>
//               </div>
//            </div>

//            <div className="relative z-10 pt-8 border-t border-white/10">
//               <p className="text-xs text-gray-500 italic">
//                  "Writing is the painting of the voice!" 🎨
//               </p>
//            </div>
//         </div>

//         {/* --- RIGHT SIDE: CREATE FORM (Improved Structure) --- */}
//         <div style={{
//     scrollbarWidth: "none",        // Firefox
//     msOverflowStyle: "none"        // IE/Edge
//   }} className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto h-screen">
//            <div className="max-w-4xl mx-auto">
             
//              {/* Header */}
//              <div className="mb-8 flex items-center justify-between">
//                 <div>
//                    <h1 className="text-2xl font-bold text-white">Create New Post</h1>
//                    <p className="text-gray-400 text-sm mt-1">Fill in the details below to publish your content.</p>
//                 </div>
//                 {/* Status Badge */}
//                 <div className={`px-3 py-1 rounded-full text-xs font-medium border ${form.status === 'published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
//                    {form.status === 'published' ? 'Ready to Publish' : 'Draft Mode'}
//                 </div>
//              </div>

//              <form onSubmit={submit} className="space-y-6">
                
//                 {/* CARD 1: Basic Details */}
//                 <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
//                    <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
//                       <LayoutTemplate size={16} /> Basic Information
//                    </h3>
                   
//                    {/* Title Input */}
//                    <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-400">Post Title <span className="text-red-400">*</span></label>
//                       <div className="relative">
//                          <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//                          <input
//                            placeholder="e.g. The Future of Web Development"
//                            value={form.title}
//                            onChange={(e) => setForm({ ...form, title: e.target.value })}
//                            className="w-full bg-[#0b0f14] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
//                            required
//                          />
//                       </div>
//                    </div>

//                    {/* Grid: Category & Tags */}
//                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                          <label className="text-sm font-medium text-gray-400">Category <span className="text-red-400">*</span></label>
//                          <div className="relative">
//                             <select
//                               className="w-full appearance-none bg-[#0b0f14] border border-white/10 rounded-xl px-4 py-3 pr-10 text-gray-200 focus:border-blue-500 outline-none transition-all cursor-pointer"
//                               value={form.category}
//                               onChange={(e) => setForm({ ...form, category: e.target.value })}
//                               required
//                             >
//                               <option value="">Select Category</option>
//                               {categories.map((cat) => (
//                                 <option key={cat._id} value={cat._id}>{cat.name}</option>
//                               ))}
//                             </select>
//                             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
//                          </div>
//                       </div>

//                       <div className="space-y-2">
//                          <label className="text-sm font-medium text-gray-400">Tags</label>
//                          <div className="relative">
//                             <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
//                             <input
//                               placeholder="react, coding, tech"
//                               value={form.tags}
//                               onChange={(e) => setForm({ ...form, tags: e.target.value })}
//                               className="w-full bg-[#0b0f14] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-blue-500 outline-none transition-all"
//                             />
//                          </div>
//                       </div>
//                    </div>
//                 </div>

//                 {/* CARD 2: Media */}
//                 <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//                    <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
//                       <ImagePlus size={16} /> Media
//                    </h3>
                   
//                    {!preview ? (
//                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:bg-white/5 hover:border-blue-500/50 transition-all group">
//                        <div className="p-3 bg-white/5 rounded-full mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all text-gray-400">
//                            <ImagePlus size={24} />
//                        </div>
//                        <p className="text-sm font-medium text-gray-300">Click to upload cover image</p>
//                        <p className="text-xs text-gray-600 mt-1">Recommended size: 1200x630px</p>
//                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
//                      </label>
//                    ) : (
//                      <div className="relative w-full h-64 rounded-xl overflow-hidden group border border-white/10">
//                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
//                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
//                           <button
//                             type="button"
//                             onClick={removeImage}
//                             className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 font-medium"
//                           >
//                             <X size={16} /> Remove Image
//                           </button>
//                        </div>
//                      </div>
//                    )}
//                 </div>

//                 {/* CARD 3: Content Editor */}
//                 <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//                    <div className="flex items-center justify-between">
//                       <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
//                          <AlignLeft size={16} /> Content
//                          <span className="text-red-400">*</span>
//                       </h3>
//                       <span className="text-xs text-gray-500">{form.content.length} characters</span>
//                    </div>
                   
//                    <textarea
//                      placeholder="Write your amazing story here..."
//                      value={form.content}
//                      onChange={(e) => setForm({ ...form, content: e.target.value })}
//                      rows={15}
//                      className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[#0b0f14] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none text-gray-200 leading-relaxed text-base placeholder:text-gray-700"
//                      required
//                    />
//                 </div>

//                 {/* Footer Actions */}
//                 <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                   
//                    {/* Status Toggles */}
//                    <div className="flex bg-[#0b0f14] p-1 rounded-lg border border-white/10">
//                      <button
//                        type="button"
//                        onClick={() => setForm({ ...form, status: "draft" })}
//                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
//                          form.status === "draft"
//                            ? "bg-white/10 text-white"
//                            : "text-gray-500 hover:text-gray-300"
//                        }`}
//                      >
//                        Draft
//                      </button>
//                      <button
//                        type="button"
//                        onClick={() => setForm({ ...form, status: "published" })}
//                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
//                          form.status === "published"
//                            ? "bg-green-500/20 text-green-400"
//                            : "text-gray-500 hover:text-gray-300"
//                        }`}
//                      >
//                        Publish
//                      </button>
//                    </div>

//                    {/* Main Action Buttons */}
//                    <div className="flex items-center gap-3 w-full sm:w-auto">
//                       <button
//                          type="button"
//                          onClick={() => router.back()}
//                          className="px-5 py-2.5 text-sm text-gray-400 hover:text-white border border-transparent hover:border-white/10 rounded-lg transition-colors"
//                       >
//                          Cancel
//                       </button>
//                       <button
//                          type="submit"
//                          disabled={submitting}
//                          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//                       >
//                          {submitting ? (
//                            "Saving..."
//                          ) : (
//                            <>
//                              {form.status === 'published' ? <Send size={16} /> : <Save size={16} />}
//                              {form.status === 'published' ? "Publish Now" : "Save Draft"}
//                            </>
//                          )}
//                       </button>
//                    </div>
//                 </div>

//              </form>
//            </div>
//         </div>

//       </div>
//     </ProtectedRoute>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ImagePlus, PenTool, X, Save, Send, Sparkles, Hash, LayoutTemplate, ChevronDown, AlignLeft, Type } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();

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
  const [submitting, setSubmitting] = useState(false);

  // ⚡ Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Remove selected image
  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  // Submit new post
  const submit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.category) {
      alert("Title, content and category are required!");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("content", form.content);
    fd.append("category", form.category);
    fd.append("tags", form.tags);
    fd.append("status", form.status);
    if (file) fd.append("coverImage", file);

    try {
      setSubmitting(true);
      await axiosInstance.post("/posts", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post created successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

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
                  Share Your Story with the World.
              </h1>
              <p className="text-slate-400 text-base mb-8 leading-relaxed">
                  Create insightful articles, share technical knowledge, or tell your personal journey. Your voice matters here.
              </p>

              <div className="space-y-6">
                 <div className="flex items-start gap-4 p-5 rounded-xl bg-[#1e293b]/50 border border-slate-800 backdrop-blur-sm">
                    <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                       <Sparkles className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                       <h3 className="font-bold text-sm text-slate-200 mb-1">Inspire Others</h3>
                       <p className="text-xs text-slate-500 leading-relaxed">Your content helps thousands of readers learn something new every day.</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="relative z-10 pt-8 border-t border-slate-800/50">
              <p className="text-xs text-slate-500 italic">
                  "Writing is the painting of the voice!" 🎨
              </p>
           </div>
        </div>

        {/* --- RIGHT SIDE: CREATE FORM --- */}
        <div style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto h-screen bg-[#0f172a]">
           <div className="max-w-4xl mx-auto pb-20">
             
             {/* Header */}
             <div className="mb-8 flex items-center justify-between">
                <div>
                   <h1 className="text-2xl font-bold text-white">Create New Post</h1>
                   <p className="text-slate-400 text-sm mt-1">Fill in the details below to publish your content.</p>
                </div>
                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${form.status === 'published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                   {form.status === 'published' ? 'Ready to Publish' : 'Draft Mode'}
                </div>
             </div>

             <form onSubmit={submit} className="space-y-6">
                
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
                           placeholder="e.g. The Future of Web Development"
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
                              placeholder="react, coding, tech"
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
                       <p className="text-sm font-medium text-slate-300">Click to upload cover image</p>
                       <p className="text-xs text-slate-500 mt-1">Recommended size: 1200x630px</p>
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
                         disabled={submitting}
                         className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                         {submitting ? (
                           "Saving..."
                         ) : (
                           <>
                             {form.status === 'published' ? <Send size={16} /> : <Save size={16} />}
                             {form.status === 'published' ? "Publish Now" : "Save Draft"}
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
