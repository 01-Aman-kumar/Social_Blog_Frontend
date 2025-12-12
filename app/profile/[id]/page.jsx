"use client";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { 
  MapPin, 
  Calendar, 
  Grid, 
  Bookmark, 
  User, 
  Settings, 
  UserPlus, 
  UserCheck 
} from "lucide-react";

export default function UserProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user: me } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(`/users/${id}`);
      setProfile(res.data.user);
      setPosts(res.data.posts);
      setBookmarked(res.data.bookmarked);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProfile();
  }, [id]);

  const isOwner = me && profile && me._id === profile._id;
  const isFollowing = me && profile?.followers?.some((f) => f === me._id);

  const handleFollowToggle = async () => {
    if (!me) return router.push("/login");
    setFollowLoading(true);
    try {
      await axiosInstance.post(`/users/${id}/follow`);
      fetchProfile(); 
    } catch (err) {
      alert("Failed to follow/unfollow");
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profile) return <div className="min-h-screen bg-[#0f172a] text-white p-10 text-center">User not found</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] pb-20">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        
        {/* 1. PROFILE CARD (Matches Hero Style) */}
        <div className="relative rounded-2xl overflow-hidden bg-[#1e293b] text-white shadow-2xl mb-8 border border-slate-700/50">
          
          {/* Abstract Background Shapes */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 px-6 py-8 md:px-10">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              
              {/* Avatar */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-linear-to-br from-blue-400 to-indigo-500 shadow-lg">
                  <img
                    src={profile.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover border-4 border-[#1e293b]"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left w-full">
                <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-2">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">
                      {profile.name}
                    </h1>
                    <p className="text-blue-400 font-medium">@{profile.username}</p>
                  </div>

                  {/* Action Buttons */}
                  <div>
                    {isOwner ? (
                      <Link href="/profile/edit">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors border border-slate-600">
                          <Settings className="w-4 h-4" />
                          Edit Profile
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={handleFollowToggle}
                        disabled={followLoading}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all ${
                          isFollowing
                            ? "bg-slate-700 text-gray-300 hover:bg-red-500/20 hover:text-red-400 border border-slate-600"
                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25"
                        }`}
                      >
                        {followLoading ? "..." : isFollowing ? <><UserCheck className="w-4 h-4"/> Following</> : <><UserPlus className="w-4 h-4"/> Follow</>}
                      </button>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mb-4 mx-auto md:mx-0">
                    {profile.bio}
                  </p>
                )}

                {/* Meta & Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400 mb-5">
                  {profile.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>Joined {new Date(profile.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex justify-center md:justify-start gap-8 pt-4 border-t border-slate-700/50">
                  <Link href={`/profile/${id}/following`} className="group flex flex-col items-center md:items-start cursor-pointer">
                    <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {profile.following?.length || 0}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Following</span>
                  </Link>
                  <Link href={`/profile/${id}/followers`} className="group flex flex-col items-center md:items-start cursor-pointer">
                    <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {profile.followers?.length || 0}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Followers</span>
                  </Link>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold text-white">
                      {posts.length || 0}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Posts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TABS */}
        <div className="flex gap-8 border-b border-slate-800 mb-8 px-2">
          {["posts", "bookmarks", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold tracking-wide transition-all relative capitalize ${
                activeTab === tab
                  ? "text-blue-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab === "posts" && <span className="flex items-center gap-2"><Grid className="w-4 h-4"/> Posts</span>}
              {tab === "bookmarks" && <span className="flex items-center gap-2"><Bookmark className="w-4 h-4"/> Saved</span>}
              {tab === "about" && <span className="flex items-center gap-2"><User className="w-4 h-4"/> About</span>}
              
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-blue-400 to-indigo-400" />
              )}
            </button>
          ))}
        </div>

        {/* 3. CONTENT GRID */}
        <div className="min-h-[300px]">
          {activeTab === "posts" && (
            <>
              {posts.length === 0 ? (
                <div className="text-center py-16 text-gray-500 bg-[#1e293b]/50 rounded-xl border border-dashed border-slate-700">
                  <Grid className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p>No posts to show.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((p) => (
                    <Link key={p._id} href={`/posts/id/${p._id}`}>
                      <div className="group relative bg-[#1e293b] rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 h-full flex flex-col">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
                        
                        <div className="h-48 w-full bg-slate-800 overflow-hidden relative">
                           {p.coverImage ? (
                             <img src={p.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           ) : (
                             <div className="flex items-center justify-center h-full text-slate-600"><Grid className="w-8 h-8"/></div>
                           )}
                        </div>

                        <div className="p-5 flex-1 flex flex-col relative z-10">
                          <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                            {p.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
                            {p.content}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-slate-700 pt-3 mt-auto">
                            <span>{new Date(p.createdAt || Date.now()).toLocaleDateString()}</span>
                            <span className="text-blue-400 group-hover:underline">Read Article →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "bookmarks" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {bookmarked.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-gray-500">No bookmarks yet.</div>
               ) : (
                 bookmarked.map((p) => (
                    <Link key={p._id} href={`/posts/id/${p._id}`}>
                      <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
                        <h3 className="font-bold text-white mb-2">{p.title}</h3>
                        <p className="text-xs text-indigo-400">Saved Post</p>
                      </div>
                    </Link>
                 ))
               )}
            </div>
          )}

          {activeTab === "about" && (
            <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Full Name</span>
                    <span className="text-lg text-white font-medium">{profile.name}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Username</span>
                    <span className="text-lg text-white font-medium">@{profile.username}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Email</span>
                    <span className="text-lg text-white font-medium">{profile.email || "Hidden"}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Member Since</span>
                    <span className="text-lg text-white font-medium">{new Date(profile.createdAt).toLocaleDateString()}</span>
                  </div>
               </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
