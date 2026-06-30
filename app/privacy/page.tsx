'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black pt-24 transition-colors duration-500">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-serif font-bold text-primary dark:text-white mb-8">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-white/60 space-y-6">
          <p>Your privacy is important to us. It is EcoStay AI's policy to respect your privacy regarding any information we may collect from you across our website.</p>
          <h2 className="text-2xl font-bold text-primary dark:text-white mt-8">1. Information we collect</h2>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
          <h2 className="text-2xl font-bold text-primary dark:text-white mt-8">2. Use of Information</h2>
          <p>We only retain collected information for as long as necessary to provide you with your requested service.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
