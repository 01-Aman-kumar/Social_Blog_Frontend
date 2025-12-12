"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  ArrowRight, 
  Heart,
  ShieldCheck 
} from "lucide-react";

export default function Footer() {
  const { user } = useContext(AuthContext); // 🔥 Get user from context
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                B
              </div>
              <span className="text-xl font-bold text-white tracking-tight">BlogSphere</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A community-driven platform for writers, thinkers, and creators. Share your story with the world today.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {/* <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" /> */}
              <SocialLink href="https://github.com/01-Aman-kumar" icon={<Github size={18} />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/aman-kumar-258650256" icon={<Linkedin size={18} />} label="LinkedIn" />
              {/* <SocialLink href="#" icon={<Instagram size={18} />} label="Instagram" /> */}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-white font-semibold mb-6">Explore</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/">Trending Posts</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/guidelines">Community Guidelines</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>

              {/* 🔥 ADMIN LINK (Only visible to admins) */}
              {user?.role === "admin" && (
                <li className="pt-2">
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to our newsletter for the latest stories and updates.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group">
                Subscribe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} BlogSphere Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-1">
             <span>Made with</span>
             <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
             <span>by Aman Kumar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components ---

function SocialLink({ href, icon, label }) {
  return (
    <a 
      href={href} 
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link 
        href={href} 
        className="hover:text-blue-400 transition-colors flex items-center gap-1 group"
      >
        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-1 transition-all duration-300"></span>
        {children}
      </Link>
    </li>
  );
}
