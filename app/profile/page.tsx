"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth, ProtectedRoute } from "@/app/lib/auth";

function ProfileContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-12">
        <div className="bg-card border border-secondary/10 rounded-3xl p-8 md:p-12 shadow-luxury">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-secondary/10 mb-8">
            <div>
              <span className="text-xs font-bold text-accent tracking-widest uppercase">
                Member Sanctuary
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mt-1">
                Your EcoProfile
              </h1>
            </div>
            <button
              onClick={logout}
              className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 font-bold rounded-2xl cursor-pointer transition-all duration-300 shadow-sm"
            >
              Log Out
            </button>
          </div>

          {/* Details Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                  Full Name
                </h3>
                <p className="text-lg font-bold text-primary">
                  {user?.full_name || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                  Email Address
                </h3>
                <p className="text-lg font-bold text-primary">
                  {user?.email || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                  Joined Since
                </h3>
                <p className="text-lg font-bold text-primary">
                  {user?.created_at 
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })
                    : "N/A"
                  }
                </p>
              </div>
            </div>

            {/* Premium Stat Card */}
            <div className="bg-primary text-white rounded-2xl p-6 shadow-luxury flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                  EcoPoints Balance
                </span>
                <h2 className="text-4xl font-serif font-bold mt-2 mb-1">
                  1,250 <span className="text-lg text-accent">EP</span>
                </h2>
                <p className="text-white/70 text-xs leading-relaxed">
                  You are saving carbon emissions! Keep choosing sustainable sanctuaries to earn more points.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-xs">
                <span>Sanctuary Level: <b>Elite</b></span>
                <span className="text-accent">View Benefits &rarr;</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
