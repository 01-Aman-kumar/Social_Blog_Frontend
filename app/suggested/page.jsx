// "use client";
// import { useEffect, useState, useContext } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import { AuthContext } from "@/context/AuthContext";
// import Link from "next/link";

// export default function SuggestedPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       const res = await axiosInstance.get("/users/suggested");
//       setUsers(res.data.users);
//       setLoading(false);
//     };
//     fetchSuggestions();
//   }, []);

//   const handleFollow = async (id) => {
//     try {
//       await axiosInstance.post(`/users/${id}/follow`);
//       setUsers((prev) => prev.filter((u) => u._id !== id)); // remove from list
//     } catch (err) {
//       console.error(err);
//       alert("Failed to follow user");
//     }
//   };

//   if (loading) return <div className="p-6">Loading suggestions...</div>;

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Suggested Users</h1>

//       {users.length === 0 ? (
//         <div>No suggestions available</div>
//       ) : (
//         <div className="space-y-4">
//           {users.map((u) => (
//             <div
//               key={u._id}
//               className="flex items-center gap-3 border p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
//             >
//               <img
//                 src={u.avatar || "/default-avatar.png"}
//                 className="w-14 h-14 rounded-full border"
//               />

//               <div className="flex-1">
//                 <Link href={`/profile/${u._id}`}>
//                   <h3 className="font-semibold hover:underline">{u.name}</h3>
//                 </Link>
//                 <p className="text-sm text-gray-600">@{u.username}</p>
//               </div>

//               <button
//                 onClick={() => handleFollow(u._id)}
//                 className="px-4 py-1 bg-blue-600 text-white rounded"
//               >
//                 Follow
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { UserPlus, Sparkles, Loader2, UserCheck } from "lucide-react";

export default function SuggestedPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axiosInstance.get("/users/suggested");
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  const handleFollow = async (id) => {
    try {
      await axiosInstance.post(`/users/${id}/follow`);
      // Optimistic update: remove user from the suggestion list immediately
      setUsers((prev) => prev.filter((u) => u._id !== id)); 
    } catch (err) {
      console.error(err);
      alert("Failed to follow user");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#1e293b] border-b border-slate-800 py-10 mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
         <div className="max-w-3xl mx-auto px-6 relative z-10">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-500">
                  <Sparkles className="w-5 h-5" />
               </div>
               <h1 className="text-3xl font-extrabold tracking-tight">Discover Creators</h1>
            </div>
            <p className="text-slate-400 text-lg">
               Find new people to follow and expand your network.
            </p>
         </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#1e293b] rounded-2xl border border-dashed border-slate-700">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <UserCheck className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">All caught up!</h3>
            <p className="text-slate-400 text-center max-w-sm">
              We don't have any new suggestions right now.
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {users.map((u) => (
              <div
                key={u._id}
                className="group flex items-center gap-4 p-4 bg-[#1e293b]/50 hover:bg-[#1e293b] border border-slate-800 hover:border-slate-700 rounded-xl transition-all duration-200"
              >
                {/* Avatar */}
                <Link href={`/profile/${u._id}`} className="shrink-0">
                  <img
                    src={u.avatar || "/default-avatar.png"}
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-700 group-hover:border-slate-500 transition-colors"
                  />
                </Link>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col">
                    <Link href={`/profile/${u._id}`} className="font-bold text-white hover:text-blue-400 hover:underline truncate">
                      {u.name}
                    </Link>
                    <span className="text-sm text-slate-500 truncate">@{u.username}</span>
                  </div>
                  {u.bio && (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {u.bio}
                    </p>
                  )}
                </div>

                {/* Follow Button */}
                <button
                  onClick={() => handleFollow(u._id)}
                  className="shrink-0 px-4 py-2 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-sm font-medium rounded-lg border border-slate-700 hover:border-blue-500 transition-all flex items-center gap-2 group/btn"
                >
                  <UserPlus className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Follow</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
