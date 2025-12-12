"use client";
import { Search, HelpCircle, FileText, MessageCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">How can we help?</h1>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-3.5 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className="w-full bg-[#1e293b] border border-slate-700 rounded-full py-3 pl-12 pr-6 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <FAQItem question="How do I reset my password?" />
          <FAQItem question="Can I edit my posts after publishing?" />
          <FAQItem question="How do I contact support?" />
          <FAQItem question="Is BlogSphere free to use?" />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
           <SupportBox icon={<FileText />} label="Documentation" />
           <SupportBox icon={<MessageCircle />} label="Live Chat" />
           <SupportBox icon={<HelpCircle />} label="FAQs" />
        </div>

      </div>
    </div>
  );
}

function FAQItem({ question }) {
  return (
    <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-800 transition-colors">
      <span className="font-medium text-slate-200">{question}</span>
      <span className="text-slate-500 text-xl">+</span>
    </div>
  );
}

function SupportBox({ icon, label }) {
  return (
    <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl flex flex-col items-center gap-3 hover:border-blue-500/50 cursor-pointer transition-colors">
      <div className="text-blue-500">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}
