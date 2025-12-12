// "use client";
// import { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import { useParams } from "next/navigation";
// import Link from "next/link";

// export default function FollowingPage() {
//   const { id } = useParams();
//   const [following, setFollowing] = useState([]);

//   useEffect(() => {
//     const fetchFollowing = async () => {
//       const res = await axiosInstance.get(`/users/${id}/following`);
//       setFollowing(res.data.following);
//     };
//     fetchFollowing();
//   }, [id]);

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Following</h1>

//       {following.length === 0 ? (
//         <p>Not following anyone.</p>
//       ) : (
//         <div className="space-y-4">
//           {following.map((u) => (
//             <Link
//               key={u._id}
//               href={`/profile/${u._id}`}
//               className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
//             >
//               <img
//                 src={u.avatar || "/default-avatar.png"}
//                 className="w-12 h-12 rounded-full border"
//               />
//               <div>
//                 <p className="font-semibold">{u.name}</p>
//                 <p className="text-gray-600 text-sm">@{u.username}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, UserPlus, UserX } from "lucide-react";

export default function FollowingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axiosInstance.get(`/users/${id}/following`);
        setFollowing(res.data.following);
      } catch (error) {
        console.error("Failed to fetch following list:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchFollowing();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-800">
           <button 
             onClick={() => router.back()} 
             className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
           >
              <ArrowLeft className="w-5 h-5" />
           </button>
           <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                 Following <span className="text-sm font-normal text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{following.length}</span>
              </h1>
           </div>
        </div>

        {/* Content */}
        {following.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 bg-[#1e293b] rounded-2xl border border-dashed border-slate-700">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                 <UserPlus className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-400 font-medium">Not following anyone yet</p>
              <Link href="/suggested" className="mt-4 text-sm text-blue-400 hover:underline">
                Find people to follow
              </Link>
           </div>
        ) : (
          <div className="flex flex-col space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {following.map((u) => (
              <Link
                key={u._id}
                href={`/profile/${u._id}`}
                className="group flex items-center gap-4 p-4 bg-[#1e293b]/50 hover:bg-[#1e293b] border border-slate-800 hover:border-slate-700 rounded-xl transition-all duration-200"
              >
                {/* Avatar */}
                <div className="shrink-0 relative">
                  <img
                    src={u.avatar || "/default-avatar.png"}
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-700 group-hover:border-slate-500 transition-colors"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                    {u.name}
                  </h3>
                  <p className="text-sm text-slate-500 truncate">@{u.username}</p>
                </div>

                {/* Unfollow Button (Optional Logic Placeholder) */}
                {/* 
                <button 
                  onClick={(e) => { e.preventDefault(); handleUnfollow(u._id); }} 
                  className="text-xs font-semibold bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
                >
                   Unfollow
                </button> 
                */}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
