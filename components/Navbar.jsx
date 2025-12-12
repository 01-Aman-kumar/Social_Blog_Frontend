"use client";

import Link from "next/link";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { Menu, X, Search, Bell, LogOut, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const searchRef = useRef(null);
  const timerRef = useRef(null); // 🔥 FIXED: Use ref for timer so it persists

  // =========================================================
  // 🔥 Fetch unread notifications count
  // =========================================================
  const fetchUnread = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.get("/notifications");
      // Safety check in case res.data.notifications is undefined
      const list = res.data.notifications || [];
      const count = list.filter((n) => !n.read).length;
      setUnreadCount(count);
    } catch (err) {
      console.error("Notification fetch failed", err);
    }
  };

  useEffect(() => {
    fetchUnread();
  }, [user]);

  // =========================================================
  // Sticky shadow on scroll
  // =========================================================
  useEffect(() => {
    const handleScroll = () => setShadow(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =========================================================
  // Close suggestions when click outside
  // =========================================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =========================================================
  // Dark mode
  // =========================================================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // =========================================================
  // Logout
  // =========================================================
  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      logout();
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================================
  // SEARCH SUGGESTIONS (Fixed Debounce)
  // =========================================================
  const fetchSuggestions = (text) => {
    setQuery(text);

    if (text.length < 2) {
      setSuggestions([]);
      return;
    }

    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer
    timerRef.current = setTimeout(async () => {
      try {
        const res = await axiosInstance.get(`/search/suggest?q=${text}`);
        setSuggestions(res.data);
        setShowSuggest(true);
      } catch (err) {
        console.error(err);
      }
    }, 200);
  };

  // =========================================================
  // SEARCH SUBMIT
  // =========================================================
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
    setShowSuggest(false);
  };

  // =========================================================
  // GRADIENT STYLE
  // =========================================================
  const navbarStyle = {
    background:
      "radial-gradient(1200px 700px at 80% -10%, #1b2b44 0%, rgba(27, 43, 68, 0) 60%), #0b0f14",
  };

  return (
    <>
      <nav
        style={navbarStyle}
        className={`w-full text-white border-b border-white/10 transition-all duration-300 ${
          shadow ? "shadow-lg" : ""
        } sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
          
          {/* =======================
              LEFT SIDE: Hamburger & Logo
             ======================= */}
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            {/* Hamburger (Mobile Only) */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white flex items-center justify-center rounded-xl shadow-lg bg-linear-to-br from-blue-500 to-blue-700">
                <span className="font-bold text-lg">B</span>
              </div>
              <span className="font-bold text-lg md:text-xl tracking-wide hidden sm:block">
                BlogSphere
              </span>
            </Link>
          </div>

          {/* =======================
              CENTER: Search Bar
             ======================= */}
          <div className="flex-1 max-w-lg relative mx-2" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => fetchSuggestions(e.target.value)}
                onFocus={() => query.length > 1 && setShowSuggest(true)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm md:text-base text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>

            {/* SUGGESTION DROPDOWN */}
            {/* {showSuggest && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-[#161b22] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                {suggestions.map((s) => (
                  <Link
                    key={s._id}
                    href={`/posts/id/${s._id}`}
                    className="block px-4 py-3 hover:bg-white/5 text-gray-300 text-sm border-b border-white/5 last:border-0 transition-colors"
                    onClick={() => setShowSuggest(false)}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )} */}

                        {/* SUGGESTION DROPDOWN */}
            {showSuggest && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-[130%] md:w-[130%] lg:w-full left-0 bg-[#161b22] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                {suggestions.map((s) => (
                  <Link
                    key={s._id}
                    href={`/posts/id/${s._id}`}
                    className="block px-4 py-3 hover:bg-white/5 text-gray-300 text-sm border-b border-white/5 last:border-0 transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                    onClick={() => setShowSuggest(false)}
                    title={s.title} // Shows full title on hover
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}

          </div>

          {/* =======================
              RIGHT SIDE: Actions
             ======================= */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            
            {/* Dark Mode Toggle */}
            {/* <button onClick={() => setDarkMode(!darkMode)} className="text-gray-400 hover:text-yellow-400 transition">
               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button> */}

            {/* Notifications */}
            {user && (
              <Link href="/notifications" className="relative text-gray-300 hover:text-white transition">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-300">
              {user && (
                <>
                  <Link href="/posts/create" className="hover:text-blue-400 transition">
                    Create Post
                  </Link>
                  <Link href="/feed" className="hover:text-blue-400 transition">
                    Feed
                  </Link>
                  <Link href="/suggested" className="hover:text-blue-400 transition">
                    Suggested
                  </Link>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Avatar (Click -> Profile) */}
            {user ? (
              <Link href={`/profile/${user._id}`}>
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="Profile"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white/10 hover:border-blue-500 transition object-cover"
                />
              </Link>
            ) : (
              <div className="hidden md:flex gap-3">
                <Link href="/login" className="px-4 py-1.5 text-sm border border-white/20 rounded-lg hover:bg-white/5">
                  Login
                </Link>
                <Link href="/signup" className="px-4 py-1.5 text-sm bg-blue-600 rounded-lg hover:bg-blue-700">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* =======================
          MOBILE DRAWER (Left Side)
         ======================= */}
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0b0f14] border-r border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out z-70 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold text-white">Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <Link 
                  href="/posts/create" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 bg-white/5 rounded-xl text-gray-200 hover:bg-white/10 hover:text-white transition"
                >
                  Create Post
                </Link>
                <Link 
                  href="/feed" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 bg-white/5 rounded-xl text-gray-200 hover:bg-white/10 hover:text-white transition"
                >
                  Feed
                </Link>
                <Link 
                  href="/suggested" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 bg-white/5 rounded-xl text-gray-200 hover:bg-white/10 hover:text-white transition"
                >
                  Suggested Users
                </Link>
                
                <div className="my-2 border-t border-white/10" />

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10 rounded-xl transition w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link 
                  href="/login" 
                  className="px-4 py-2 border border-white/20 text-center rounded-lg text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-blue-600 text-center rounded-lg text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
