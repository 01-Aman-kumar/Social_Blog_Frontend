// "use client";
// import Link from "next/link";
// import axiosInstance from "@/utils/axiosInstance";
// import { useContext, useState } from "react";
// import { AuthContext } from "@/context/AuthContext";
// import { Heart, Bookmark, MessageSquare, Share2 } from "lucide-react";

// export default function PostCard({ post, variant = "standard" }) {
//   const { user } = useContext(AuthContext) || {};

//   if (!post) return null;

//   const [liked, setLiked] = useState(post.likes?.includes(user?._id));
//   const [bookmarked, setBookmarked] = useState(post.bookmarks?.includes(user?._id));
//   const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

//   // --- REFRESH DATA ---
//   const refreshPost = async () => {
//     try {
//       const res = await axiosInstance.get(`/posts/${post.slug || post._id}`);
//       const updated = res.data.post;
//       setLiked(updated.likes.includes(user?._id));
//       setBookmarked(updated.bookmarks.includes(user?._id));
//       setLikesCount(updated.likes.length);
//     } catch (error) {
//       console.error("Failed to refresh post:", error);
//     }
//   };

//   // --- LIKE HANDLER ---
//   const toggleLike = async (e) => {
//     e.preventDefault(); // Stop link navigation
//     e.stopPropagation(); // Stop bubbling
//     if (!user) return alert("Login required");

//     const isNowLiked = !liked;
//     setLiked(isNowLiked);
//     setLikesCount(isNowLiked ? likesCount + 1 : likesCount - 1);

//     try {
//       await axiosInstance.post(`/posts/${post._id}/like`);
//       refreshPost(); 
//     } catch (err) {
//       setLiked(!isNowLiked);
//       setLikesCount(isNowLiked ? likesCount - 1 : likesCount + 1);
//     }
//   };

//   // --- BOOKMARK HANDLER ---
//   const toggleBookmark = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!user) return alert("Login required");

//     setBookmarked(!bookmarked);
//     try {
//       await axiosInstance.post(`/posts/${post._id}/bookmark`);
//       refreshPost();
//     } catch (err) {
//       setBookmarked(!bookmarked);
//     }
//   };

//   // ------------------------------------------
//   // VARIANT: COMPACT (Grid Style - Trending & Feed)
//   // ------------------------------------------
//   if (variant === "compact") {
//     return (
//       <Link href={`/posts/id/${post._id}`} className="group block h-full">
//         <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
          
//           {/* Image */}
//           <div className="relative h-48 overflow-hidden">
//             <img
//               src={post.coverImage || "/placeholder-blog.jpg"}
//               alt={post.title}
//               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
//             <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
//               {post.category?.name || "Blog"}
//             </span>
//           </div>

//           {/* Content */}
//           <div className="p-4 flex flex-col flex-1">
//             <div className="flex items-center gap-2 mb-2">
//                <img src={post.author?.avatar || "/default-avatar.png"} className="w-5 h-5 rounded-full object-cover" />
//                <span className="text-xs text-gray-500 font-medium truncate">{post.author?.name}</span>
//             </div>
            
//             <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors mb-4">
//               {post.title}
//             </h3>

//             {/* Footer with Interactive Buttons */}
//             <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              
//               {/* Date */}
//               <span className="text-[11px] text-gray-400 font-medium">
//                 {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
//               </span>

//               {/* Action Buttons */}
//               <div className="flex items-center gap-3">
//                  <button 
//                    onClick={toggleLike}
//                    className={`flex items-center gap-1 text-xs font-semibold transition-colors p-1.5 rounded-full hover:bg-red-50 ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
//                  >
//                     <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
//                     <span>{likesCount}</span>
//                  </button>

//                  <button 
//                    onClick={toggleBookmark}
//                    className={`p-1.5 rounded-full transition-colors hover:bg-blue-50 ${bookmarked ? "text-indigo-600" : "text-gray-400 hover:text-indigo-600"}`}
//                  >
//                     <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
//                  </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   }

//   // Fallback to null or standard if needed (though now we mostly use compact)
//   return null; 
// }
"use client";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Heart, Bookmark, CheckCircle2 } from "lucide-react";

export default function PostCard({ post, variant = "compact" }) {
  const { user } = useContext(AuthContext) || {};

  if (!post) return null;

  const [liked, setLiked] = useState(post.likes?.includes(user?._id));
  const [bookmarked, setBookmarked] = useState(post.bookmarks?.includes(user?._id));
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  // --- REFRESH DATA ---
  const refreshPost = async () => {
    try {
      const res = await axiosInstance.get(`/posts/${post.slug || post._id}`);
      const updated = res.data.post;
      setLiked(updated.likes.includes(user?._id));
      setBookmarked(updated.bookmarks.includes(user?._id));
      setLikesCount(updated.likes.length);
    } catch (error) {
      console.error("Failed to refresh post:", error);
    }
  };

  // --- LIKE HANDLER ---
  const toggleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return alert("Login required");

    const isNowLiked = !liked;
    setLiked(isNowLiked);
    setLikesCount(isNowLiked ? likesCount + 1 : likesCount - 1);

    try {
      await axiosInstance.post(`/posts/${post._id}/like`);
      refreshPost(); 
    } catch (err) {
      setLiked(!isNowLiked);
      setLikesCount(isNowLiked ? likesCount - 1 : likesCount + 1);
    }
  };

  // --- BOOKMARK HANDLER ---
  const toggleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return alert("Login required");

    setBookmarked(!bookmarked);
    try {
      await axiosInstance.post(`/posts/${post._id}/bookmark`);
      refreshPost();
    } catch (err) {
      setBookmarked(!bookmarked);
    }
  };

  if (variant === "compact") {
    return (
      <Link href={`/posts/id/${post._id}`} className="group block h-full relative perspective-1000">
        
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

        <div className="h-full bg-[#1e293b] rounded-xl overflow-hidden shadow-lg border border-slate-700/50 group-hover:border-slate-600 transition-all duration-300 flex flex-col relative z-0 group-hover:-translate-y-1">
          
          {/* Image Container (Reduced Height) */}
          <div className="relative h-44 overflow-hidden">
            <img
              src={post.coverImage || "/placeholder-blog.jpg"}
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1e293b] via-transparent to-transparent opacity-60" />
            
            <span className="absolute top-2.5 left-2.5 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md border border-blue-400/20">
              {post.category?.name || "Article"}
            </span>
          </div>

          {/* Content (Compact Padding) */}
          <div className="p-4 flex flex-col flex-1 relative">
            
            {/* Author */}
            <div className="flex items-center gap-2 mb-2">
               <div className="relative shrink-0">
                 <img src={post.author?.avatar || "/default-avatar.png"} className="w-5 h-5 rounded-full object-cover border border-slate-600" />
               </div>
               <span className="text-[11px] text-slate-400 font-medium truncate flex items-center gap-1">
                 {post.author?.name}
                 <CheckCircle2 className="w-3 h-3 text-blue-500" />
               </span>
            </div>
            
            {/* Title */}
            <h3 className="font-bold text-white text-[16px] leading-snug line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
              {post.content?.substring(0, 80).replace(/<[^>]*>?/gm, '')}...
            </p>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-700/50">
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>

              <div className="flex items-center gap-2">
                 <button 
                   onClick={toggleLike}
                   className={`flex items-center gap-1 text-[10px] font-bold transition-all p-1.5 px-2 rounded-full border ${
                     liked 
                     ? "bg-red-500/10 text-red-500 border-red-500/20" 
                     : "bg-slate-800 text-slate-400 border-slate-700 hover:text-red-400 hover:border-red-500/30 hover:bg-slate-700"
                   }`}
                 >
                    <Heart className={`w-3 h-3 ${liked ? "fill-current" : ""}`} />
                    <span>{likesCount}</span>
                 </button>

                 <button 
                   onClick={toggleBookmark}
                   className={`p-1.5 rounded-full transition-all border ${
                     bookmarked 
                     ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                     : "bg-slate-800 text-slate-400 border-slate-700 hover:text-blue-400 hover:border-blue-500/30 hover:bg-slate-700"
                   }`}
                 >
                    <Bookmark className={`w-3 h-3 ${bookmarked ? "fill-current" : ""}`} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return null; 
}
