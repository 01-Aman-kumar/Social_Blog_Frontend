"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-8">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-slate-400 text-sm">Please read these terms carefully before using our platform.</p>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using BlogSphere, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Content Guidelines</h2>
            <p>You are responsible for the content you post. Content that is illegal, offensive, harmful, or violates the rights of others is strictly prohibited and may result in immediate account termination.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Account Termination</h2>
            <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
            <p>In no event shall BlogSphere, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>
          </section>
        </div>

      </div>
    </div>
  );
}
