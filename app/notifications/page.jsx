// "use client";

// import { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import Link from "next/link";

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all notifications
//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get("/notifications");
//       setNotifications(res.data.notifications);
//     } catch (err) {
//       console.error("Failed to load notifications:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mark ALL notifications as read
//   const markAllRead = async () => {
//     try {
//       await axiosInstance.put("/notifications/read");
//       fetchNotifications();
//     } catch (err) {
//       console.error("Failed to mark all read:", err);
//     }
//   };

//   // Mark ONE notification as read
//   const markOneRead = async (id) => {
//     try {
//       await axiosInstance.put(`/notifications/${id}/read`);
//       fetchNotifications();
//     } catch (err) {
//       console.error("Failed to mark read:", err);
//     }
//   };

//   // Delete ONE notification
//   const deleteOne = async (id) => {
//     try {
//       await axiosInstance.delete(`/notifications/${id}`);
//       fetchNotifications();
//     } catch (err) {
//       console.error("Failed to delete:", err);
//     }
//   };

//   // Delete ALL notifications
//   const deleteAll = async () => {
//     try {
//       if (!confirm("Delete all notifications?")) return;
//       await axiosInstance.delete("/notifications");
//       fetchNotifications();
//     } catch (err) {
//       console.error("Failed to delete all:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   if (loading) return <div className="p-6">Loading notifications...</div>;

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>

//       {/* Top Buttons */}
//       <div className="flex gap-3 mb-4">
//         <button
//           onClick={markAllRead}
//           className="px-3 py-1 bg-blue-500 text-white rounded"
//         >
//           Mark All Read
//         </button>

//         <button
//           onClick={deleteAll}
//           className="px-3 py-1 bg-red-500 text-white rounded"
//         >
//           Clear All
//         </button>
//       </div>

//       {/* No notifications */}
//       {notifications.length === 0 ? (
//         <p>No notifications yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {notifications.map((n) => (
//             <div
//               key={n._id}
//               className={`border p-4 rounded flex justify-between items-start ${
//                 n.read
//                   ? "bg-white dark:bg-gray-800"
//                   : "bg-blue-50 dark:bg-gray-700"
//               }`}
//             >
//               <div className="flex-1">
//                 {/* User Name */}
//                 <Link href={`/profile/${n.fromUser._id}`}>
//                   <span className="font-semibold hover:underline">
//                     {n.fromUser.name}
//                   </span>
//                 </Link>

//                 {/* Notification Type */}
//                 {n.type === "follow" && <span> started following you.</span>}
//                 {n.type === "like" && (
//                   <span>
//                     {" "}
//                     liked your post{" "}
//                     <Link
//                       href={`/posts/${n.post?.slug}`}
//                       className="underline text-blue-600"
//                     >
//                       {n.post?.title}
//                     </Link>
//                   </span>
//                 )}
//                 {n.type === "comment" && (
//                   <span>
//                     {" "}
//                     commented on your post{" "}
//                     <Link
//                       href={`/posts/${n.post?.slug}`}
//                       className="underline text-blue-600"
//                     >
//                       {n.post?.title}
//                     </Link>
//                   </span>
//                 )}

//                 {/* Time */}
//                 <p className="text-xs text-gray-500 mt-1">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex flex-col items-end gap-2 ml-3">
//                 {!n.read && (
//                   <button
//                     onClick={() => markOneRead(n._id)}
//                     className="text-xs text-blue-600 hover:underline"
//                   >
//                     Mark Read
//                   </button>
//                 )}

//                 <button
//                   onClick={() => deleteOne(n._id)}
//                   className="text-xs text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Heart, 
  UserPlus, 
  MessageSquare, 
  Loader2,
  Filter
} from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all' | 'unread'
const { unreadCount, setUnreadCount } = useContext(AuthContext);

  // Fetch all notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/notifications");
      setNotifications(res.data.notifications);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      await axiosInstance.put("/notifications/read");
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all read:", err);
    }
  };

  const markOneRead = async (id) => {
    try {
      await axiosInstance.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Failed to mark read:", err);
    }
  };

  const deleteOne = async (id) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
      if (!target.read) {
      setUnreadCount(prev => Math.max(prev - 1, 0));
    }
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const deleteAll = async () => {
    if (!confirm("Delete all notifications?")) return;
    try {
      await axiosInstance.delete("/notifications");
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to delete all:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filter Logic
  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
           <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#1e293b] rounded-xl border border-slate-700 shadow-sm">
                <Bell className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                <p className="text-sm text-slate-400">
                  You have {notifications.filter(n => !n.read).length} unread messages
                </p>
              </div>
           </div>

           {/* Actions */}
           <div className="flex items-center gap-2">
             <button
               onClick={markAllRead}
               className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 bg-[#1e293b] hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors"
             >
               <CheckCheck className="w-4 h-4" /> Mark all read
             </button>
             <button
               onClick={deleteAll}
               className="p-2 text-slate-400 hover:text-red-400 hover:bg-[#1e293b] rounded-lg transition-colors"
               title="Clear all"
             >
               <Trash2 className="w-5 h-5" />
             </button>
           </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 border-b border-slate-800 mb-6">
          <button 
            onClick={() => setFilter("all")}
            className={`pb-3 text-sm font-semibold transition-all relative ${filter === "all" ? "text-blue-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            All
            {filter === "all" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />}
          </button>
          <button 
            onClick={() => setFilter("unread")}
            className={`pb-3 text-sm font-semibold transition-all relative ${filter === "unread" ? "text-blue-400" : "text-slate-500 hover:text-slate-300"}`}
          >
            Unread
            {filter === "unread" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />}
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex flex-col space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="py-16 text-center bg-[#1e293b]/50 rounded-2xl border border-dashed border-slate-800">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Bell className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-400 font-medium">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n._id}
                className={`group relative p-4 rounded-xl transition-all duration-200 border-b border-slate-800 last:border-0 hover:bg-[#1e293b]/80 flex gap-4 ${
                  !n.read ? "bg-[#1e293b]/40" : ""
                }`}
              >
                {/* Icon Indicator */}
                <div className="shrink-0 pt-1">
                  {n.type === "like" && (
                    <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </div>
                  )}
                  {n.type === "follow" && (
                    <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <UserPlus className="w-4 h-4 text-blue-500" />
                    </div>
                  )}
                  {n.type === "comment" && (
                    <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-8">
                  <div className="flex items-center gap-2 mb-1">
                     <Link href={`/profile/${n.fromUser?._id}`} className="shrink-0">
                        <img 
                          src={n.fromUser?.avatar || "/default-avatar.png"} 
                          className="w-5 h-5 rounded-full object-cover border border-slate-700" 
                        />
                     </Link>
                     <Link href={`/profile/${n.fromUser?._id}`} className="text-sm font-bold hover:text-blue-400 hover:underline">
                        {n.fromUser?.name}
                     </Link>
                     <span className="text-xs text-slate-500">• {new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {n.type === "follow" && "started following you."}
                    {n.type === "like" && (
                      <>
                        liked your post <span className="text-slate-500 font-medium">"{n.post?.title}"</span>
                      </>
                    )}
                    {n.type === "comment" && (
                      <>
                        commented on <span className="text-slate-500 font-medium">"{n.post?.title}"</span>
                      </>
                    )}
                  </p>

                  {/* Clickable Area for Post Link */}
                  {(n.type === "like" || n.type === "comment") && n.post && (
                     <Link href={`/posts/id/${n.post._id}`} className="absolute inset-0 z-0" />
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                   {!n.read && (
                     <button 
                       onClick={(e) => { e.stopPropagation(); markOneRead(n._id); }}
                       className="p-2 bg-slate-800 hover:bg-blue-600 rounded-full text-slate-400 hover:text-white transition-colors shadow-lg border border-slate-700"
                       title="Mark read"
                     >
                        <CheckCheck className="w-4 h-4" />
                     </button>
                   )}
                   <button 
                     onClick={(e) => { e.stopPropagation(); deleteOne(n._id); }}
                     className="p-2 bg-slate-800 hover:bg-red-600 rounded-full text-slate-400 hover:text-white transition-colors shadow-lg border border-slate-700"
                     title="Delete"
                   >
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>

                {/* Unread Dot */}
                {!n.read && (
                  <div className="absolute right-4 top-4 w-2 h-2 bg-blue-500 rounded-full group-hover:opacity-0 transition-opacity" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
