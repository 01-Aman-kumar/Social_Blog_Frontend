"use client";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-8">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: December 12, 2025</p>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, update your profile, post content, or communicate with us. This may include your name, email address, bio, and profile picture.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>To provide, maintain, and improve our services.</li>
              <li>To process transactions and send related information.</li>
              <li>To monitor and analyze trends, usage, and activities.</li>
              <li>To detect, investigate, and prevent fraudulent transactions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information. However, no security system is impenetrable and we cannot guarantee the security of our systems 100%.</p>
          </section>
        </div>

      </div>
    </div>
  );
}
