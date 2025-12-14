
"use client";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import CommentList from "@/components/CommentList";
import Swal from "sweetalert2";
import Link from "next/link";
import { ThumbsUp, Bookmark, CheckCircle2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user: currentUser } = useContext(AuthContext);
  const [realCommentCount, setRealCommentCount] = useState(0);

  const [post, setPost] = useState(null);
  const [authorProfile, setAuthorProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [refreshComments, setRefreshComments] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Follow System
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followLoading, setFollowLoading] = useState(false);

  // 1. Fetch Related Posts
  const fetchRelated = async (currentPost) => {
    if (!currentPost?.category?._id) return;
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          category: currentPost.category._id,
          limit: 10,
          sort: "popular",
        },
      });
      setRelatedPosts(res.data.posts.filter((p) => p._id !== currentPost._id));
    } catch (err) {
      console.error(err);
    }
  };

  // 2. Fetch Post & Author Data
  const fetchPostData = async () => {
    try {
      setLoading(true);
      const postRes = await axiosInstance.get(`/posts/id/${id}`);
      const postData = postRes.data.post;
      setPost(postData);

      if (postData?.author?._id) {
        const userRes = await axiosInstance.get(`/users/${postData.author._id}`);
        const authorData = userRes.data.user;
        setAuthorProfile(authorData);

        const followers = authorData.followers || [];
        setFollowersCount(followers.length);

        if (currentUser) {
          setIsFollowing(followers.includes(currentUser._id));
        }
      }
      fetchRelated(postData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPostData();
  }, [id, currentUser?._id]);

  // --- ACTIONS ---
  const handleFollowToggle = async () => {
    if (!currentUser) return router.push("/login");
    if (!authorProfile) return;
    if (followLoading) return;
    setFollowLoading(true);

    const previousIsFollowing = isFollowing;
    setIsFollowing(!previousIsFollowing);
    setFollowersCount((prev) => (previousIsFollowing ? prev - 1 : prev + 1));

    try {
      await axiosInstance.post(`/users/${authorProfile._id}/follow`);
    } catch (err) {
      setIsFollowing(previousIsFollowing);
      setFollowersCount((prev) => (previousIsFollowing ? prev + 1 : prev - 1));
      toast.error("Something went wrong.");
    } finally {
      setFollowLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!currentUser) return toast.error("Login required");
    try {
      await axiosInstance.post(`/posts/${post._id}/like`);
      const res = await axiosInstance.get(`/posts/id/${id}`);
      setPost((prev) => ({ ...prev, likes: res.data.post.likes }));
    } catch (error) { console.error(error); }
  };

  const toggleBookmark = async () => {
    if (!currentUser) return toast.error("Login required");
    try {
      await axiosInstance.post(`/posts/${post._id}/bookmark`);
      const res = await axiosInstance.get(`/posts/id/${id}`);
      setPost((prev) => ({ ...prev, bookmarks: res.data.post.bookmarks }));
    } catch (error) { console.error(error); }
  };

  // const deletePost = async () => {
  //   if (!confirm("Are you sure you want to delete this post?")) return;
  //   try {
  //     await axiosInstance.delete(`/posts/${post._id}`);
  //     toast.success("Post deleted successfully");
  //     router.push("/");
  //   } catch (error) { console.error(error); alert("Failed to delete post"); }
  // };



const deletePost = async () => {
  const result = await Swal.fire({
    title: "Delete Post?",
    text: "This action cannot be undone.",
    icon: "warning",
    background: "#1e293b",
    color: "#fff",
    showCancelButton: true,
    confirmButtonColor: "#e11d48",   // red
    cancelButtonColor: "#475569",    // slate gray
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    customClass: {
      popup: "rounded-xl border border-slate-700 shadow-xl",
      confirmButton: "rounded-lg px-4 py-2 font-bold",
      cancelButton: "rounded-lg px-4 py-2 font-bold",
    }
  });

  // If user confirmed delete
  if (result.isConfirmed) {
    try {
      await axiosInstance.delete(`/posts/${post._id}`);

      Swal.fire({
        title: "Deleted!",
        text: "Your post has been deleted.",
        icon: "success",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
        customClass: {
          popup: "rounded-xl border border-slate-700 shadow-xl",
        },
      });

      router.push("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete post.",
        icon: "error",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  }
};


  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await axiosInstance.post("/comments", { postId: post._id, text: commentText });
      setCommentText("");
      setRefreshComments((prev) => prev + 1);
    } catch (err) { toast.error("Login required"); }
  };

  // Reusable Component for Related Post Item
  const RelatedPostItem = ({ item }) => (
    <Link href={`/posts/id/${item._id}`} className="group flex gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
      {/* Thumbnail */}
      <div className="relative min-w-[140px] w-[140px] h-20 bg-slate-800 rounded-lg overflow-hidden shrink-0 border border-slate-700">
        <img 
          src={item.coverImage || "/placeholder-blog.jpg"} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.category && (
          <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
            {item.category.name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 min-w-0">
        <h4 className="text-sm font-semibold line-clamp-2 leading-snug text-gray-200 group-hover:text-blue-400 transition-colors">
          {item.title}
        </h4>
        <div className="text-xs text-gray-500">
          <div className="flex items-center gap-1 hover:text-gray-300 mb-0.5">
            <span>{item.author?.name}</span>
            <CheckCircle2 className="w-3 h-3 text-blue-400" />
          </div>
          <div>
            {item.views || 0} views • {new Date(item.createdAt).toLocaleDateString(undefined, { month:'short', year:'numeric' })}
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading || !post) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const liked = currentUser && post.likes.includes(currentUser._id);
  const bookmarked = currentUser && post.bookmarks.includes(currentUser._id);
  const isOwner = currentUser && (currentUser._id === post.author?._id || currentUser.role === "admin");

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-6 px-4 sm:px-6 lg:px-8 pb-20">
      
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-2">
          
          {/* Cover Image */}
          <div className="w-full aspect-video bg-[#1e293b] rounded-xl overflow-hidden shadow-2xl mb-6 relative border border-slate-800">
            {post.coverImage ? (
              <img src={post.coverImage} className="w-full h-full object-cover" alt="Cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
            )}
            {post.category && (
              <span className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10 shadow-lg">
                {post.category.name}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-4 text-white">
             {post.title}
          </h1>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Link href={`/profile/${post.author?._id}`}>
                <div className="p-0.5 bg-linear-to-tr from-blue-500 to-purple-500 rounded-full">
                  <img src={post.author?.avatar || "/default-avatar.png"} className="w-10 h-10 rounded-full object-cover border-2 border-[#0f172a]" alt="Author" />
                </div>
              </Link>
              <div className="flex flex-col">
                <Link href={`/profile/${post.author?._id}`} className="font-bold text-sm hover:text-blue-400 transition-colors">
                  {post.author?.name || "Unknown"}
                </Link>
                <span className="text-xs text-gray-400">{followersCount} followers</span>
              </div>
              {!isOwner && (
                <button 
                  onClick={handleFollowToggle}
                  disabled={followLoading}
                  className={`ml-4 px-5 py-2 text-sm font-bold rounded-full transition-all ${
                    isFollowing 
                    ? "bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700" 
                    : "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10"
                  }`}
                >
                  {followLoading ? "..." : isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleLike} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium ${
                  liked 
                  ? "bg-blue-500/10 border-blue-500/50 text-blue-400" 
                  : "bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-gray-300"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${liked ? "fill-current" : ""}`} /> <span>{post.likes?.length || 0}</span>
              </button>
              
              <button 
                onClick={toggleBookmark} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium ${
                  bookmarked 
                  ? "bg-purple-500/10 border-purple-500/50 text-purple-400" 
                  : "bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-gray-300"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} /> {bookmarked ? "Saved" : "Save"}
              </button>

              {isOwner && (
                <div className="flex gap-2 ml-2 pl-4 border-l border-slate-700">
                  <Link href={`/posts/edit/${post._id}`}>
                    <button className="px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">Edit</button>
                  </Link>
                  <button onClick={deletePost} className="px-3 py-2 text-xs font-bold text-white bg-red-600/80 hover:bg-red-600 rounded-lg transition-colors">Delete</button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 shadow-xl">
             <div className="flex gap-3 font-semibold text-sm mb-4 text-gray-400 border-b border-slate-700 pb-4">
               <span>{post.views || 0} views</span> • <span>{new Date(post.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
             </div>
             <article className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
               {post.content}
             </article>
             {post.tags && (
               <div className="mt-6 pt-4 border-t border-slate-700 flex flex-wrap gap-2">
                  {post.tags.map(t => (
                    <span key={t} className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded text-sm hover:text-blue-300 cursor-pointer transition-colors">
                      #{t}
                    </span>
                  ))}
               </div>
             )}
          </div>

          {/* Comments */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              {realCommentCount} Comments
            </h3>
            
            <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 mb-8"> 
              <div className="flex gap-4">
                <img src={currentUser?.avatar || "/default-avatar.png"} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
                <div className="flex-1">
                   {currentUser ? (
                     <form onSubmit={submitComment}>
                        <input 
                          type="text" 
                          value={commentText} 
                          onChange={(e) => setCommentText(e.target.value)} 
                          placeholder="Add a comment..." 
                          className="w-full bg-transparent border-b border-slate-600 pb-2 outline-none text-sm text-white placeholder-slate-500 focus:border-blue-500 transition-colors" 
                        />
                        <div className="flex justify-end gap-3 mt-3">
                          <button 
                            type="button" 
                            onClick={() => setCommentText("")} 
                            className="px-4 py-2 text-sm font-medium rounded-full text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            disabled={!commentText.trim()} 
                            className="px-5 py-2 text-sm font-bold rounded-full bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            Comment
                          </button>
                        </div>
                     </form>
                   ) : (
                      <Link href="/login" className="text-sm text-blue-400 hover:text-blue-300 font-medium">Log in to join the discussion</Link>
                   )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <CommentList postId={post._id} refreshTrigger={refreshComments} onLoaded={(count) => setRealCommentCount(count)} />
            </div>
          </div>

          {/* --- MOBILE ONLY: RELATED POSTS --- */}
          <div className="lg:hidden mt-10 pt-8 border-t border-slate-800">
            <h3 className="text-lg font-bold mb-4 text-white">More to Watch</h3>
            <div className="flex flex-col gap-4">
              {relatedPosts.map((item) => (
                <RelatedPostItem key={item._id} item={item} />
              ))}
              {relatedPosts.length === 0 && <p className="text-sm text-gray-500">No related posts found.</p>}
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN (Desktop Sidebar) ================= */}
        <div className="hidden lg:block lg:col-span-1 pl-4">
           <h3 className="text-lg font-bold mb-4 text-white">More from {post.category?.name || "BlogSphere"}</h3>
           <div className="flex flex-col gap-2">
            {relatedPosts.map((item) => (
              <RelatedPostItem key={item._id} item={item} />
            ))}
            {relatedPosts.length === 0 && (
              <div className="p-8 text-center border border-dashed border-slate-700 rounded-xl text-slate-500 text-sm">
                No related posts found.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
