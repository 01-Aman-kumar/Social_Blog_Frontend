// "use client";
// import { useSearchParams } from "next/navigation";
// import axiosInstance from "@/utils/axiosInstance";
// import { useEffect, useState } from "react";
// import PostCard from "@/components/PostCard";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const q = searchParams.get("q") || "";
//   const [posts, setPosts] = useState([]);

//   const fetchResults = async () => {
//     const res = await axiosInstance.get("/posts", {
//       params: { search: q }
//     });
//     setPosts(res.data.posts);
//   };

//   useEffect(() => {
//     fetchResults();
//   }, [q]);

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">Search results for "{q}"</h1>

//       {posts.length === 0 ? (
//         <div>No matching posts found.</div>
//       ) : (
//         <div className="space-y-4">
//           {posts.map((post) => (
//             <PostCard key={post._id} post={post} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useSearchParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState, Suspense } from "react";
import PostCard from "@/components/PostCard";
import { Loader2, SearchX } from "lucide-react";

// 1. Logic Component
function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    if (!q) return;
    setLoading(true);
    try {
      // Assuming your backend uses query param 'search' or 'q'
      const res = await axiosInstance.get("/posts", {
        params: { search: q } 
      });
      // Handle different API response structures just in case
      const results = res.data.posts || res.data || [];
      setPosts(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [q]);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen text-white">
      <div className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold">
          Search Results for <span className="text-blue-400">"{q}"</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {posts.length} results found
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
          <p className="text-slate-500">Searching the universe...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/50">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <SearchX className="w-8 h-8 text-slate-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-300">No matching posts found</h2>
          <p className="text-slate-500 mt-2 max-w-sm">
            We couldn't find anything for "{q}". Try searching for different keywords or check your spelling.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

// 2. Export Wrapper with Suspense
export default function SearchPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
