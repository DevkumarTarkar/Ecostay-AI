"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/lib/auth";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // When NextAuth session arrives after OAuth, sync backend token to localStorage
  useEffect(() => {
    const backendToken = (session as any)?.backendToken;
    const backendUser = (session as any)?.backendUser;
    if (backendToken && backendUser) {
      localStorage.setItem("ecostay_token", backendToken);
      localStorage.setItem("ecostay_user", JSON.stringify(backendUser));
      // Redirect to dashboard
      window.location.href = "/dashboard";
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (err) {
      setError(`Failed to start ${provider} login. Please try again.`);
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
            Welcome Back
          </h2>
          <p className="text-muted text-sm italic">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Email Address
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
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold text-primary">
                Password
              </label>
              <a href="#" className="text-xs text-accent hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 text-center">
          <hr className="border-secondary/10" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-card text-xs text-muted font-medium">
            OR CONTINUE WITH
          </span>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="py-3 bg-white hover:bg-slate-50 border border-secondary/20 hover:border-secondary/35 text-foreground font-semibold rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.5 5.5 0 0 1 8.5 13a5.5 5.5 0 0 1 5.491-5.518c1.396 0 2.67.572 3.6 1.5l3.117-3.116A9.93 9.93 0 0 0 13.99 3c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.753 0 9.818-4.045 9.818-9.975 0-.677-.072-1.316-.24-1.74H12.24Z"
              />
            </svg>
            Google
          </button>

          <button
            onClick={() => handleOAuthLogin("github")}
            className="py-3 bg-white hover:bg-slate-50 border border-secondary/20 hover:border-secondary/35 text-foreground font-semibold rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#24292F"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            GitHub
          </button>
        </div>

        {/* Register link */}
        <div className="mt-8 pt-6 border-t border-secondary/10 text-center text-sm">
          <span className="text-muted">Don't have an account? </span>
          <Link href="/register" className="text-accent font-semibold hover:underline">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}