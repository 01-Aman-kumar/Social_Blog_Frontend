// "use client";
// import { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";

// export default function AdminPage() {
//   const [tab, setTab] = useState("users"); // users | posts | categories
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get("/admin/users");
//       setUsers(res.data.users);
//     } catch (err) { console.error(err); }
//     setLoading(false);
//   };
//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get("/admin/posts");
//       setPosts(res.data.posts);
//     } catch (err) { console.error(err); }
//     setLoading(false);
//   };
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get("/admin/categories");
//       setCategories(res.data.categories);
//     } catch (err) { console.error(err); }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (tab === "users") fetchUsers();
//     if (tab === "posts") fetchPosts();
//     if (tab === "categories") fetchCategories();
//   }, [tab]);

//   const toggleBan = async (id) => {
//     if (!confirm("Toggle ban for this user?")) return;
//     await axiosInstance.put(`/admin/users/${id}/ban`);
//     fetchUsers();
//   };

//   const deletePost = async (id) => {
//     if (!confirm("Delete this post?")) return;
//     await axiosInstance.delete(`/admin/posts/${id}`);
//     fetchPosts();
//   };

//   const createCategory = async () => {
//     const name = prompt("Category name");
//     if (!name) return;
//     await axiosInstance.post("/admin/categories", { name });
//     fetchCategories();
//   };

//   const deleteCategory = async (id) => {
//     if (!confirm("Delete category?")) return;
//     await axiosInstance.delete(`/admin/categories/${id}`);
//     fetchCategories();
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//       <div className="flex gap-2 mb-6">
//         <button onClick={() => setTab("users")} className={tab==="users"?"font-bold":""}>Users</button>
//         <button onClick={() => setTab("posts")} className={tab==="posts"?"font-bold":""}>Posts</button>
//         <button onClick={() => setTab("categories")} className={tab==="categories"?"font-bold":""}>Categories</button>
//       </div>

//       {loading && <div>Loading...</div>}

//       {tab === "users" && (
//         <div className="space-y-2">
//           {users.map(u => (
//             <div key={u._id} className="p-3 border rounded flex justify-between">
//               <div>
//                 <div className="font-semibold">{u.name} ({u.username})</div>
//                 <div className="text-sm">{u.email}</div>
//                 <div className="text-sm">Role: {u.role} • Banned: {u.banned ? "Yes" : "No"}</div>
//               </div>
//               <div className="flex gap-2">
//                 <button onClick={() => toggleBan(u._id)} className="px-3 py-1 border rounded">{u.banned ? "Unban" : "Ban"}</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {tab === "posts" && (
//         <div className="space-y-2">
//           {posts.map(p => (
//             <div key={p._id} className="p-3 border rounded flex justify-between">
//               <div>
//                 <div className="font-semibold">{p.title}</div>
//                 <div className="text-sm">By: {p.author?.name} • {p.category?.name}</div>
//               </div>
//               <div>
//                 <button onClick={() => deletePost(p._id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {tab === "categories" && (
//         <div>
//           <div className="mb-3">
//             <button onClick={createCategory} className="px-3 py-1 bg-blue-600 text-white rounded">Create Category</button>
//           </div>
//           <div className="space-y-2">
//             {categories.map(c => (
//               <div key={c._id} className="p-3 border rounded flex justify-between">
//                 <div>{c.name}</div>
//                 <div><button onClick={() => deleteCategory(c._id)} className="text-red-600">Delete</button></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import { 
//   Users, 
//   FileText, 
//   Tags, 
//   Trash2, 
//   Ban, 
//   CheckCircle, 
//   Plus, 
//   Loader2,
//   LayoutDashboard,
//   Search
// } from "lucide-react";

// export default function AdminPage() {
//   const [tab, setTab] = useState("users"); // users | posts | categories
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // --- Fetch Data Functions ---
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get("/admin/users");
//       setUsers(res.data.users);
//     } catch (err) { console.error(err); }
//     setLoading(false);
//   };

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get("/admin/posts");
//       setPosts(res.data.posts);
//     } catch (err) { console.error(err); }
//     setLoading(false);
//   };

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get("/admin/categories");
//       setCategories(res.data.categories);
//     } catch (err) { console.error(err); }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (tab === "users") fetchUsers();
//     if (tab === "posts") fetchPosts();
//     if (tab === "categories") fetchCategories();
//     setSearchTerm(""); // Reset search on tab change
//   }, [tab]);

//   // --- Actions ---
//   const toggleBan = async (id) => {
//     if (!confirm("Toggle ban for this user?")) return;
//     try {
//       await axiosInstance.put(`/admin/users/${id}/ban`);
//       // Optimistic update
//       setUsers(users.map(u => u._id === id ? { ...u, banned: !u.banned } : u));
//     } catch (err) {
//       alert("Failed to update user status");
//     }
//   };

//   const deletePost = async (id) => {
//     if (!confirm("Delete this post? This action cannot be undone.")) return;
//     try {
//       await axiosInstance.delete(`/admin/posts/${id}`);
//       setPosts(posts.filter(p => p._id !== id));
//     } catch (err) {
//       alert("Failed to delete post");
//     }
//   };

//   const createCategory = async () => {
//     const name = prompt("Enter new category name:");
//     if (!name) return;
//     try {
//       const res = await axiosInstance.post("/admin/categories", { name });
//       setCategories([...categories, res.data.category]); // Assuming backend returns the new object
//       fetchCategories(); // Refresh to be safe
//     } catch (err) {
//       alert("Failed to create category");
//     }
//   };

//   const deleteCategory = async (id) => {
//     if (!confirm("Delete category?")) return;
//     try {
//       await axiosInstance.delete(`/admin/categories/${id}`);
//       setCategories(categories.filter(c => c._id !== id));
//     } catch (err) {
//       alert("Failed to delete category");
//     }
//   };

//   // --- Filtering Logic ---
//   const filteredUsers = users.filter(u => 
//     u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     u.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredPosts = posts.filter(p => 
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-slate-800 text-white flex">
      
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-slate-800 border-r border-slate-700 hidden md:flex flex-col p-6 fixed h-full">
//         <div className="flex items-center gap-3 mb-10">
//           <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
//             <LayoutDashboard className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-xl font-bold tracking-tight">Admin Panel</span>
//         </div>

//         <nav className="flex flex-col gap-2">
//           <SidebarItem 
//             active={tab === "users"} 
//             onClick={() => setTab("users")} 
//             icon={<Users className="w-5 h-5" />} 
//             label="Users" 
//           />
//           <SidebarItem 
//             active={tab === "posts"} 
//             onClick={() => setTab("posts")} 
//             icon={<FileText className="w-5 h-5" />} 
//             label="Posts" 
//           />
//           <SidebarItem 
//             active={tab === "categories"} 
//             onClick={() => setTab("categories")} 
//             icon={<Tags className="w-5 h-5" />} 
//             label="Categories" 
//           />
//         </nav>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <main className="flex-1 md:ml-64 p-6 md:p-10">
        
//         {/* Top Bar */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-bold capitalize">{tab} Management</h1>
//             <p className="text-slate-400 text-sm">Manage your platform's content and users.</p>
//           </div>

//           {/* Search & Actions */}
//           <div className="flex gap-3">
//             {tab !== "categories" && (
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//                 <input 
//                   type="text" 
//                   placeholder={`Search ${tab}...`}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-full md:w-64 transition-all"
//                 />
//               </div>
//             )}
//             {tab === "categories" && (
//               <button 
//                 onClick={createCategory}
//                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-600/20"
//               >
//                 <Plus className="w-4 h-4" /> Add Category
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Content Table Area */}
//         <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
//           {loading ? (
//             <div className="p-20 flex items-center justify-center">
//               <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//             </div>
//           ) : (
//             <>
//               {/* --- USERS TAB --- */}
//               {tab === "users" && (
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left">
//                     <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-medium">
//                       <tr>
//                         <th className="p-4">User</th>
//                         <th className="p-4">Role</th>
//                         <th className="p-4">Status</th>
//                         <th className="p-4 text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-700">
//                       {filteredUsers.map((u) => (
//                         <tr key={u._id} className="hover:bg-slate-800/30 transition-colors">
//                           <td className="p-4">
//                             <div className="flex items-center gap-3">
//                               <img src={u.avatar || "/default-avatar.png"} className="w-8 h-8 rounded-full bg-slate-700 object-cover" />
//                               <div>
//                                 <div className="font-medium text-white">{u.name}</div>
//                                 <div className="text-xs text-slate-500">@{u.username}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <span className={`px-2 py-1 rounded text-xs font-medium ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-slate-700 text-slate-300'}`}>
//                               {u.role}
//                             </span>
//                           </td>
//                           <td className="p-4">
//                             <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${u.banned ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
//                               {u.banned ? <Ban className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
//                               {u.banned ? "Banned" : "Active"}
//                             </span>
//                           </td>
//                           <td className="p-4 text-right">
//                             <button 
//                               onClick={() => toggleBan(u._id)}
//                               className="text-xs font-medium hover:underline text-slate-400 hover:text-white"
//                             >
//                               {u.banned ? "Unban User" : "Ban User"}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {/* --- POSTS TAB --- */}
//               {tab === "posts" && (
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left">
//                     <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-medium">
//                       <tr>
//                         <th className="p-4">Post Title</th>
//                         <th className="p-4">Author</th>
//                         <th className="p-4">Category</th>
//                         <th className="p-4 text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-700">
//                       {filteredPosts.map((p) => (
//                         <tr key={p._id} className="hover:bg-slate-800/30 transition-colors">
//                           <td className="p-4 font-medium text-white max-w-xs truncate">
//                             {p.title}
//                           </td>
//                           <td className="p-4 text-sm text-slate-300">
//                             {p.author?.name || "Unknown"}
//                           </td>
//                           <td className="p-4">
//                             <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
//                               {p.category?.name || "Uncategorized"}
//                             </span>
//                           </td>
//                           <td className="p-4 text-right">
//                             <button 
//                               onClick={() => deletePost(p._id)}
//                               className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
//                               title="Delete Post"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {/* --- CATEGORIES TAB --- */}
//               {tab === "categories" && (
//                 <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {categories.map((c) => (
//                     <div key={c._id} className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center justify-between group hover:border-blue-500/50 transition-all">
//                       <span className="font-medium text-slate-200">{c.name}</span>
//                       <button 
//                         onClick={() => deleteCategory(c._id)}
//                         className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// // --- Helper Component ---
// function SidebarItem({ active, onClick, icon, label }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//         active 
//           ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
//           : "text-slate-400 hover:bg-slate-800 hover:text-white"
//       }`}
//     >
//       {icon}
//       {label}
//     </button>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Users, 
  FileText, 
  Tags, 
  Trash2, 
  Ban, 
  CheckCircle, 
  Plus, 
  Loader2,
  LayoutDashboard,
  Search,
  Menu
} from "lucide-react";

export default function AdminPage() {
  const [tab, setTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Fetch Data ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/posts");
      setPosts(res.data.posts);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/categories");
      setCategories(res.data.categories);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => {
    if (tab === "users") fetchUsers();
    if (tab === "posts") fetchPosts();
    if (tab === "categories") fetchCategories();
    setSearchTerm("");
  }, [tab]);

  // --- Actions ---
  const toggleBan = async (id) => {
    if (!confirm("Toggle ban for this user?")) return;
    try {
      await axiosInstance.put(`/admin/users/${id}/ban`);
      setUsers(users.map(u => u._id === id ? { ...u, banned: !u.banned } : u));
    } catch {
      alert("Failed to update user status");
    }
  };

  const deletePost = async (id) => {
    if (!confirm("Delete this post? This action cannot be undone.")) return;
    try {
      await axiosInstance.delete(`/admin/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    } catch {
      alert("Failed to delete post");
    }
  };

  const createCategory = async () => {
    const name = prompt("Enter new category name:");
    if (!name) return;
    try {
      const res = await axiosInstance.post("/admin/categories", { name });
      setCategories([...categories, res.data.category]);
      fetchCategories();
    } catch {
      alert("Failed to create category");
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Delete category?")) return;
    try {
      await axiosInstance.delete(`/admin/categories/${id}`);
      setCategories(categories.filter(c => c._id !== id));
    } catch {
      alert("Failed to delete category");
    }
  };

  // --- Filtering ---
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-800 text-white flex">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-800 border-r border-slate-700
          flex-col p-6 z-40 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex
        `}
      >
        {/* Mobile close button */}
        {/* <button
          className="md:hidden mb-5 text-slate-400 hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          Close ✕
        </button> */}

        <div className="flex items-center gap-18 mt-15 mb-10">
          {/* <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div> */}
          <span className="text-xl font-bold tracking-tight">Admin Panel</span>
          <button
          className="md:hidden  text-slate-400 hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem 
            active={tab === "users"} 
            onClick={() => { setTab("users"); setSidebarOpen(false); }}
            icon={<Users className="w-5 h-5" />} 
            label="Users" 
          />
          <SidebarItem 
            active={tab === "posts"} 
            onClick={() => { setTab("posts"); setSidebarOpen(false); }}
            icon={<FileText className="w-5 h-5" />} 
            label="Posts" 
          />
          <SidebarItem 
            active={tab === "categories"} 
            onClick={() => { setTab("categories"); setSidebarOpen(false); }}
            icon={<Tags className="w-5 h-5" />} 
            label="Categories" 
          />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden p-2 mb-4 bg-slate-700 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold capitalize">{tab} Management</h1>
            <p className="text-slate-400 text-sm">Manage your platform's content and users.</p>
          </div>

          {/* Search & Actions */}
          <div className="flex gap-3">
            {tab !== "categories" && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder={`Search ${tab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-full md:w-64 transition-all"
                />
              </div>
            )}
            {tab === "categories" && (
              <button 
                onClick={createCategory}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" /> Add Category
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-20 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <>
              {/* USERS */}
              {tab === "users" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-medium">
                      <tr>
                        <th className="p-2 md:p-4">User</th>
                        <th className="p-2 md:p-4">Role</th>
                        <th className="p-2 md:p-4">Status</th>
                        <th className="p-2 md:p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredUsers.map((u) => (
                        <tr key={u._id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-2 md:p-4">
                            <div className="flex items-center gap-3">
                              <img src={u.avatar || "/default-avatar.png"} className="w-8 h-8 rounded-full bg-slate-700 object-cover" />
                              <div>
                                <div className="font-medium text-white">{u.name}</div>
                                <div className="text-xs text-slate-500">@{u.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 md:p-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-slate-700 text-slate-300'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-2 md:p-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${u.banned ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                              {u.banned ? <Ban className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                              {u.banned ? "Banned" : "Active"}
                            </span>
                          </td>
                          <td className="p-2 md:p-4 text-right">
                            <button 
                              onClick={() => toggleBan(u._id)}
                              className="text-xs font-medium hover:underline text-slate-400 hover:text-white"
                            >
                              {u.banned ? "Unban User" : "Ban User"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* POSTS */}
              {tab === "posts" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-medium">
                      <tr>
                        <th className="p-4">Post Title</th>
                        <th className="p-4">Author</th>
                        <th className="p-4">Category</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredPosts.map((p) => (
                        <tr key={p._id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-medium text-white max-w-xs truncate">
                            {p.title}
                          </td>
                          <td className="p-4 text-sm text-slate-300">
                            {p.author?.name || "Unknown"}
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {p.category?.name || "Uncategorized"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => deletePost(p._id)}
                              className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                              title="Delete Post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* CATEGORIES */}
              {tab === "categories" && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((c) => (
                    <div key={c._id} className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center justify-between group hover:border-blue-500/50 transition-all">
                      <span className="font-medium text-slate-200">{c.name}</span>
                      <button 
                        onClick={() => deleteCategory(c._id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper Component
function SidebarItem({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
