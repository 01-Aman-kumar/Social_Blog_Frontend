// "use client";
// import { useEffect, useState, useContext } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import PostCard from "@/components/PostCard";
// import Pagination from "@/components/Pagination";
// import { AuthContext } from "@/context/AuthContext";
// import Link from "next/link";
// import { PenTool, TrendingUp, Sparkles, Zap } from "lucide-react";

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [trending, setTrending] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { user } = useContext(AuthContext);

//   const fetchPosts = async (p = 1, q = search, cat = selectedCategory) => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get("/posts", {
//         params: { page: p, limit: 10, search: q, category: cat },
//       });
//       setPosts(res.data.posts);
//       setPage(res.data.page);
//       setPages(res.data.pages);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axiosInstance.get("/categories");
//       setCategories(res.data.categories);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchTrending = async () => {
//     try {
//       const res = await axiosInstance.get("/posts", {
//         params: { sort: "popular", limit: 3 },
//       });
//       setTrending(res.data.posts);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(1);
//     fetchCategories();
//     fetchTrending();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50/50 dark:bg-black/20 min-h-screen">
      
//       {/* ---------- HERO SECTION (Smaller Size) ---------- */}
//       <div className="relative rounded-2xl overflow-hidden bg-[#1e293b] text-white shadow-xl mb-10">
//         {/* Abstract Background Shapes */}
//         <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl" />
//         <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl" />
        
//         {/* Reduced padding (py-8 instead of py-20) */}
//         <div className="relative z-10 px-6 py-8 md:py-10 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="max-w-xl text-center md:text-left">
//             <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
//               Share your story with <br/>
//               <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
//                 the world.
//               </span>
//             </h1>
//             <p className="text-sm md:text-base text-gray-300 mb-5">
//               Join a community of writers and readers. Discover ideas, share knowledge.
//             </p>
            
//             {user ? (
//               <Link href="/posts/create">
//                 <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all text-sm">
//                   <PenTool className="w-4 h-4" /> Start Writing
//                 </button>
//               </Link>
//             ) : (
//               <div className="flex gap-3 justify-center md:justify-start">
//                  <Link href="/login" className="px-5 py-2.5 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm">
//                    Get Started
//                  </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ---------- TRENDING SECTION ---------- */}
//       {trending.length > 0 && (
//         <section className="mb-12">
//           <div className="flex items-center gap-2 mb-6">
//             <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
//                <TrendingUp className="w-5 h-5" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {trending.map((post) => (
//               <PostCard key={post._id} post={post} variant="compact" />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* ---------- MAIN FEED (Now uses Compact Grid too) ---------- */}
//       <div className="flex flex-col gap-6">
        
//         <div className="sticky top-16 z-30 bg-gray-50/95 dark:bg-black/80 backdrop-blur-sm py-2 mb-2">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
//               <Sparkles className="w-5 h-5 text-indigo-500" />
//               Latest Reads
//             </h2>
//           </div>

//           {/* Category Chips */}
//           <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
//             <button
//               onClick={() => { setSelectedCategory(""); fetchPosts(1, search, ""); }}
//               className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
//                 selectedCategory === ""
//                   ? "bg-gray-900 text-white border-gray-900"
//                   : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
//               }`}
//             >
//               All
//             </button>
//             {categories.map((c) => (
//               <button
//                 key={c._id}
//                 onClick={() => { setSelectedCategory(c._id); fetchPosts(1, search, c._id); }}
//                 className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
//                   selectedCategory === c._id
//                     ? "bg-blue-600 text-white border-blue-600 shadow-md"
//                     : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
//                 }`}
//               >
//                 {c.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Posts List - CHANGED TO GRID like Trending */}
//         {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <div key={i} className="animate-pulse bg-white rounded-xl h-72 w-full shadow border border-gray-100"></div>
//             ))}
//           </div>
//         ) : posts.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
//             <h3 className="text-lg font-bold text-gray-700">No posts found</h3>
//           </div>
//         ) : (
//           <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            
//             {/* GRID LAYOUT for Latest Posts */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {posts.map((post) => (
//                 <PostCard key={post._id} post={post} variant="compact" />
//               ))}
//             </div>
            
//             <div className="mt-12 mb-20">
//                 <Pagination page={page} pages={pages} onChange={(p) => fetchPosts(p)} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { PenTool, TrendingUp, Sparkles, Grid } from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchPosts = async (p = 1, q = search, cat = selectedCategory) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/posts", {
        params: { page: p, limit: 12, search: q, category: cat },
      });
      setPosts(res.data.posts);
      setPage(res.data.page);
      setPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrending = async () => {
    try {
      const res = await axiosInstance.get("/posts", {
        params: { sort: "popular", limit: 3 },
      });
      setTrending(res.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts(1);
    fetchCategories();
    fetchTrending();
  }, []);

  return (
    <div className="bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-slate-900 min-h-screen text-white">
      
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-800 text-white shadow-xl mb-10 border border-slate-700/50">
        {/* Abstract Background Shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 px-6 py-8 md:py-10 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
              Share your story with <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                the world.
              </span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 mb-5">
              Join a community of writers and readers. Discover ideas, share knowledge.
            </p>
            
            {user ? (
              <Link href="/posts/create">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-500/25 transition-all text-sm">
                  <PenTool className="w-4 h-4" /> Start Writing
                </button>
              </Link>
            ) : (
              <div className="flex gap-3 justify-center md:justify-start">
                 <Link href="/login" className="px-5 py-2.5 bg-white text-slate-900 font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm">
                   Get Started
                 </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- TRENDING SECTION ---------- */}
      {trending.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-orange-500/10 text-orange-500 rounded-lg border border-orange-500/20">
               <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((post) => (
              <PostCard key={post._id} post={post} variant="compact" />
            ))}
          </div>
        </section>
      )}

      {/* ---------- MAIN FEED ---------- */}
      <div className="flex flex-col gap-6">
        
        {/* Sticky Header with Chips */}
        <div className="sticky top-16 z-30 bg-slate-900 backdrop-blur-sm py-4 mb-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Latest Reads
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            <button
              onClick={() => { setSelectedCategory(""); fetchPosts(1, search, ""); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
                selectedCategory === ""
                  ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-500"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c._id}
                onClick={() => { setSelectedCategory(c._id); fetchPosts(1, search, c._id); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
                  selectedCategory === c._id
                    ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-500"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-slate-800 rounded-xl h-72 w-full shadow border border-slate-700/50"></div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-800 rounded-xl border border-dashed border-slate-700">
            <h3 className="text-lg font-bold text-slate-400">No posts found</h3>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} variant="compact" />
              ))}
            </div>
            
            <div className="mt-12 mb-20">
               <Pagination page={page} pages={pages} onChange={(p) => fetchPosts(p)} />
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

