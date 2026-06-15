'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <motion.div 
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop")' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-8 md:p-12 mx-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] shadow-2xl overflow-hidden"
      >
        {/* Subtle inner bloom */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="bg-secondary p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-tight">EcoStay AI</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 italic">Welcome Back</h1>
          <p className="text-white/60 text-sm">Experience luxury without compromise.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-secondary transition-colors" />
              <input 
                type="email" 
                placeholder="aryan@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-secondary transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/60 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-secondary" />
              <span className="group-hover:text-white transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-secondary hover:underline font-medium">Forgot password?</a>
          </div>

          <button className="w-full py-4 bg-secondary text-primary rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-white hover:scale-[1.02] shadow-xl mt-8">
            Login
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm mb-6">Or continue with</p>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
              <Shield className="w-5 h-5" />
              GitHub
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.136 2.536-7.112 2.536-6.424 0-11.392-5.176-11.392-11.6s4.968-11.6 11.392-11.6c3.48 0 6.008 1.376 7.848 3.12l2.312-2.312c-2.112-2.024-5.112-3.528-10.16-3.528-8.848 0-16 7.152-16 16s7.152 16 16 16c4.896 0 8.608-1.616 11.536-4.64 3.016-3.04 3.968-7.232 3.968-10.592 0-.912-.08-1.808-.232-2.656h-15.272z" />
              </svg>
              Google
            </button>
          </div>
          <p className="mt-10 text-white/50 text-sm">
            Don't have an account? <Link href="/login" className="text-secondary font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
      
      {/* Decorative dots */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full" />
      <div className="absolute bottom-40 right-20 w-64 h-64 border border-white/10 rounded-full" />
    </main>
  );
};

export default LoginPage;