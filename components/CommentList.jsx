// "use client";
// import { useEffect, useState, useContext } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import { AuthContext } from "@/context/AuthContext";
// import { MoreVertical, Trash2 } from "lucide-react";
// import Link from "next/link";

// export default function CommentList({ postId, refreshTrigger, onLoaded }) {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useContext(AuthContext);

//   const fetchComments = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(`/comments/${postId}`);
//       setComments(res.data.comments);
      
//       // Update parent count
//       if (onLoaded) onLoaded(res.data.comments.length);
      
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [postId, refreshTrigger]);

//   const deleteComment = async (commentId) => {
//     if (!confirm("Delete this comment?")) return;
//     try {
//       await axiosInstance.delete(`/comments/${commentId}`);
//       const newComments = comments.filter((c) => c._id !== commentId);
//       setComments(newComments);
//       if (onLoaded) onLoaded(newComments.length);
//     } catch (err) {
//       alert("Failed to delete comment.");
//     }
//   };

//   const timeAgo = (dateString) => {
//     const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
//     let interval = seconds / 31536000;
//     if (interval > 1) return Math.floor(interval) + "y";
//     interval = seconds / 2592000;
//     if (interval > 1) return Math.floor(interval) + "mo";
//     interval = seconds / 86400;
//     if (interval > 1) return Math.floor(interval) + "d";
//     interval = seconds / 3600;
//     if (interval > 1) return Math.floor(interval) + "h";
//     interval = seconds / 60;
//     if (interval > 1) return Math.floor(interval) + "m";
//     return "now";
//   };

//   if (loading) return <div className="py-4 text-gray-400 text-sm">Loading comments...</div>;

//   return (
//     <div className="flex flex-col">
//       {comments.length === 0 && (
//         <div className="py-10 text-center">
//           <p className="text-gray-500 font-medium">No comments yet</p>
//           <p className="text-sm text-gray-400">Be the first to share your thoughts!</p>
//         </div>
//       )}

//       {comments.map((c) => {
//         const isOwner = user && (user._id === c.user?._id || user.role === "admin");
        
//         return (
//           <div 
//             key={c._id} 
//             className="group flex gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors duration-200 rounded-lg"
//           >
//             {/* Avatar */}
//             <Link href={`/profile/${c.user?._id}`} className="shrink-0 pt-1">
//               <div className="relative">
//                 <img 
//                   src={c.user?.avatar || "/default-avatar.png"} 
//                   alt={c.user?.name}
//                   className="w-10 h-10 rounded-full object-cover border border-gray-100 group-hover:border-gray-200 transition-colors shadow-sm"
//                 />
//               </div>
//             </Link>

//             {/* Content Body */}
//             <div className="flex-1 min-w-0">
//               {/* Header Row */}
//               <div className="flex items-center justify-between mb-1">
//                 <div className="flex items-center gap-2">
//                   <Link 
//                     href={`/profile/${c.user?._id}`} 
//                     className="text-sm font-bold text-gray-900 hover:text-blue-600 hover:underline decoration-2 underline-offset-2 transition-all"
//                   >
//                     {c.user?.name || "Unknown"}
//                   </Link>
//                   <span className="text-xs text-gray-400 font-medium">
//                     {timeAgo(c.createdAt)}
//                   </span>
//                 </div>

//                 {/* Actions Menu (Hidden by default, visible on hover) */}
//                 <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
//                   {isOwner ? (
//                     <button 
//                       onClick={() => deleteComment(c._id)}
//                       className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   ) : (
//                     <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-all">
//                       <MoreVertical className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Comment Text */}
//               <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
//                 {c.text}
//               </p>

//               {/* Footer Actions */}
//               <div className="flex items-center gap-4 mt-2">
//                  <button className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors py-1">
//                    Reply
//                  </button>
//                  <button className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors py-1">
//                    Like
//                  </button>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
"use client";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import { MoreVertical, Trash2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CommentList({ postId, refreshTrigger, onLoaded }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/comments/${postId}`);
      setComments(res.data.comments);
      
      // Update parent count
      if (onLoaded) onLoaded(res.data.comments.length);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, refreshTrigger]);

  const deleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      const newComments = comments.filter((c) => c._id !== commentId);
      setComments(newComments);
      if (onLoaded) onLoaded(newComments.length);
    } catch (err) {
      alert("Failed to delete comment.");
    }
  };

  const timeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return "now";
  };

  if (loading) return <div className="py-8 text-center text-slate-500 text-sm">Loading discussion...</div>;

  return (
    <div className="flex flex-col space-y-1">
      {comments.length === 0 && (
        <div className="py-12 text-center border border-dashed border-slate-700 rounded-xl bg-[#1e293b]/50">
          <p className="text-slate-400 font-medium">No comments yet</p>
          <p className="text-xs text-slate-500 mt-1">Start the conversation!</p>
        </div>
      )}

      {comments.map((c) => {
        const isOwner = user && (user._id === c.user?._id || user.role === "admin");
        
        return (
          <div 
            key={c._id} 
            className="group flex gap-4 p-4 hover:bg-slate-800/50 transition-colors duration-200 rounded-xl border-b border-slate-800 last:border-0"
          >
            {/* Avatar */}
            <Link href={`/profile/${c.user?._id}`} className="shrink-0 pt-1">
              <div className="relative">
                <img 
                  src={c.user?.avatar || "/default-avatar.png"} 
                  alt={c.user?.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-600 group-hover:border-slate-500 transition-colors"
                />
              </div>
            </Link>

            {/* Content Body */}
            <div className="flex-1 min-w-0">
              
              {/* Header Row */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/profile/${c.user?._id}`} 
                    className="text-sm font-bold text-white hover:text-blue-400 hover:underline decoration-2 underline-offset-2 transition-all flex items-center gap-1"
                  >
                    {c.user?.name || "Unknown"}
                    {/* Optional verified badge placeholder if needed */}
                    {/* <CheckCircle2 className="w-3 h-3 text-blue-500" /> */}
                  </Link>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {timeAgo(c.createdAt)}
                  </span>
                </div>

                {/* Actions Menu (Hidden by default, visible on hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                  {isOwner ? (
                    <button 
                      onClick={() => deleteComment(c._id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded-full transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Comment Text */}
              <p className="text-[14px] text-slate-300 leading-relaxed whitespace-pre-wrap wrap-break-word">
                {c.text}
              </p>

              {/* Footer Actions */}
              <div className="flex items-center gap-4 mt-2.5">
                 <button className="text-[11px] font-bold text-slate-500 hover:text-slate-300 transition-colors">
                   Reply
                 </button>
                 <button className="text-[11px] font-bold text-slate-500 hover:text-slate-300 transition-colors">
                   Like
                 </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
