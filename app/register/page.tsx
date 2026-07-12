"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/lib/auth";

export default function RegisterPage() {
  const { registerUser, loading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Input Validations
    if (!email || !password || !confirmPassword) {
      setError("Please fill out all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser(email, password, fullName || null);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md bg-card border border-secondary/10 rounded-3xl p-8 shadow-luxury transition-all duration-300">
        
        {/* Logo and Headings */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-accent text-sm font-bold">
              E
            </span>
            <span className="font-serif font-bold text-xl text-primary">
              EcoStay <span className="text-accent">AI</span>
            </span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary mb-1">
            Create an Account
          </h2>
          <p className="text-muted text-sm italic">
            Begin your journey to sustainable luxury
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Aryan"
              className="w-full px-4 py-3 bg-white/50 border border-secondary/20 rounded-2xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full px-4 py-3 bg-white/50 border border-secondary/20 rounded-2xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/50 border border-secondary/20 rounded-2xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/50 border border-secondary/20 rounded-2xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Login redirect link */}
        <div className="mt-8 pt-6 border-t border-secondary/10 text-center text-sm">
          <span className="text-muted">Already have an account? </span>
          <Link href="/login" className="text-accent font-semibold hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}
