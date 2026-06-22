'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '@/components/ui';
import { Leaf, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-background transition-colors duration-500 pt-24 text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed">
        <div className="absolute inset-0 bg-white/40 dark:bg-black/80 backdrop-blur-sm" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md bg-card text-card-foreground rounded-[3rem] p-10 shadow-2xl border border-white/5 overflow-hidden"
        >
          {/* Decorative Gradient */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

          {/* Logo Section */}
          <div className="text-center mb-10">
            <div className="bg-accent dark:bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Leaf className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-primary dark:text-secondary italic">
              {isLogin ? 'Welcome Back' : 'Join the Collective'}
            </h2>
            <p className="text-muted dark:text-foreground/60 text-sm mt-2 font-medium">
              {isLogin ? 'Sign in to access your luxury sanctuaries.' : 'Start your journey towards sustainable luxury.'}
            </p>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
             {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-2 block">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                    <Input 
                      placeholder="Alexander Luxury" 
                      className="pl-12 h-14 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-accent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-2 block">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                <Input 
                  type="email"
                  placeholder="name@ecostay.ai" 
                  className="pl-12 h-14 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-accent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-2 block">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                <Input 
                  type="password"
                  placeholder="••••••••" 
                  className="pl-12 h-14 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-accent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                />
              </div>
              {isLogin && (
                <div className="text-right mt-2">
                  <button className="text-xs font-black text-accent hover:underline transition-colors uppercase tracking-widest">Forgot Password?</button>
                </div>
              )}
            </div>

            <Button 
              className="w-full h-14 rounded-full bg-accent text-white hover:opacity-90 shadow-lg shadow-accent/20 group text-lg font-bold"
            >
              <span className="flex items-center justify-center gap-2">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </form>

          {/* Social Auth */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-secondary/20 w-full" />
              <span className="bg-white dark:bg-slate-900 px-4 py-1 text-[10px] font-bold text-primary/40 dark:text-foreground/40 absolute uppercase tracking-widest">Or Continue With</span>
            </div>
            
            <div className="flex gap-4">
              <button className="flex-1 h-14 rounded-2xl border border-secondary/20 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.94 0 3.73.67 5.11 1.99l3.83-3.83C18.48 1.15 15.42 0 12 0 7.31 0 3.25 2.69 1.18 6.6l4.47 3.47C6.69 7.02 9.1 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.47 4.47c2.03-1.87 3.22-4.62 3.22-8.02z" />
                  <path fill="#FBBC05" d="M5.65 14.13c-.26-.79-.41-1.63-.41-2.5 0-.87.15-1.71.41-2.5L1.18 5.67C.43 7.59 0 9.75 0 12s.43 4.41 1.18 6.33l4.47-3.47z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.47-4.47c-1.11.75-2.54 1.2-4.47 1.2-3.87 0-7.13-2.61-8.31-6.13l-4.47 3.47C3.25 21.31 7.31 24 12 24z" />
                </svg>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Google</span>
              </button>
              <button className="flex-1 h-14 rounded-2xl border border-secondary/20 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                <svg className="w-6 h-6 text-slate-800 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">GitHub</span>
              </button>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {isLogin ? "Don't have a retreat account?" : "Already part of the collective?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-accent font-bold hover:underline transition-all"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}