"use client";
import { Users, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Hero */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            We are BlogSphere.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A community of thinkers, storytellers, and creators dedicated to sharing knowledge and inspiring the world.
          </p>
        </div>

        {/* Stats / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            icon={<Users className="w-8 h-8 text-blue-500" />}
            title="Community First"
            desc="Built for readers and writers to connect authentically."
          />
          <Card 
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            title="Fast & Modern"
            desc="Powered by the latest tech for a seamless reading experience."
          />
          <Card 
            icon={<Globe className="w-8 h-8 text-green-500" />}
            title="Global Reach"
            desc="Stories that travel across borders and cultures."
          />
        </div>

        {/* Story Section */}
        <div className="bg-[#1e293b] rounded-2xl p-8 md:p-12 border border-slate-800 leading-relaxed text-slate-300 space-y-6">
          <h2 className="text-2xl font-bold text-white">Our Story</h2>
          <p>
            Started in 2024, BlogSphere began as a simple idea: a place where quality content matters more than clickbait. We wanted to build a haven for writers who care about their craft and readers who hunger for substance.
          </p>
          <p>
            Today, we are a growing diverse team of engineers, designers, and community managers working from all over the world to keep the platform open, safe, and inspiring.
          </p>
        </div>

      </div>
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors">
      <div className="bg-[#0f172a] w-14 h-14 rounded-xl flex items-center justify-center mb-4 border border-slate-800">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  );
}
