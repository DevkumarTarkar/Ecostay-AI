'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black pt-24 transition-colors duration-500">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-serif font-bold text-primary dark:text-white mb-8">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-white/60 space-y-6">
          <p>Welcome to EcoStay AI. By using our website, you agree to be bound by these terms of service.</p>
          <h2 className="text-2xl font-bold text-primary dark:text-white mt-8">1. Terms</h2>
          <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use.</p>
          <h2 className="text-2xl font-bold text-primary dark:text-white mt-8">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on EcoStay AI's website for personal, non-commercial transitory viewing only.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
