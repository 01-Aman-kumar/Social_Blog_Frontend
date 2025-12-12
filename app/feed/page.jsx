"use client";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import PostCard from "@/components/PostCard";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { Loader2, Zap, Users, ArrowRight } from "lucide-react";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchFeed = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await axiosInstance.get("/posts/feed");
      
      if (Array.isArray(res.data)) {
         setPosts(res.data);
      } else if (res.data.posts && Array.isArray(res.data.posts)) {
         setPosts(res.data.posts);
      } else {
         setPosts([]);
      }
      
    } catch (err) {
      console.error("Feed fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [user]); 

  // 1. Not logged in state (Dark Theme)
  if (!user)
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-center p-6 text-white">
        <div className="bg-[#1e293b] p-10 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full">
           <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-blue-500" />
           </div>
           <h2 className="text-2xl font-bold mb-3">Login to view your feed</h2>
           <p className="text-slate-400 mb-8">
             Connect with your favorite creators and see their latest stories in one place.
           </p>
           <Link href="/login" className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20">
             Login Now
           </Link>
        </div>
      </div>
    );

  // 2. Loading state
  if (loading) 
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );

  // 3. Main Feed
  return (
    <div className="min-h-screen bg-[#0f172a] text-white pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#1e293b] border-b border-slate-800 py-10 mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20 text-yellow-500">
                  <Zap className="w-5 h-5" />
               </div>
               <h1 className="text-3xl font-extrabold tracking-tight">Your Feed</h1>
            </div>
            <p className="text-slate-400 max-w-2xl text-lg">
               Latest updates from the creators you follow.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#1e293b] rounded-2xl border border-dashed border-slate-700">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
               <Users className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Your feed is empty</h3>
            <p className="text-slate-400 mb-8 max-w-sm text-center">
              It looks like you haven't followed anyone yet. Find authors to populate your personalized feed.
            </p>
            <Link href="/" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20">
              Explore Creators <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} variant="compact" />
              ))}
            </div>
            
            <div className="mt-12 text-center">
               <p className="text-slate-500 text-sm">You're all caught up!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
