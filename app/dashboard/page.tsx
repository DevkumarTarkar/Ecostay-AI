'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Heart, Star, Sparkles, MapPin, Clock, LogOut } from 'lucide-react';

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-background dark:bg-black transition-colors duration-500 pt-24">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-secondary italic leading-tight">Welcome back, <span className="text-secondary dark:text-white underline decoration-primary/20">Aryan</span></h1>
            <p className="text-muted dark:text-foreground/80 mt-2 font-medium">Manage your luxury retreats and discover AI-curated escapes.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-red-500/20 text-red-600 hover:bg-red-50 transition-all font-bold">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Bookings & Saved */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* My Bookings */}
            <div className="bg-white dark:bg-luxury-dark rounded-[2rem] p-8 shadow-luxury border border-secondary/20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-primary dark:text-foreground flex items-center gap-3">
                  <Calendar className="text-secondary w-6 h-6" />
                  My Upcoming Retreats
                </h2>
                <button className="text-primary font-bold text-sm hover:text-secondary transition-colors underline">View History</button>
              </div>

              <div className="space-y-6">
                {[
                  { name: "Sunset Pool Villa", location: "Goa", date: "June 24 - June 28", status: "Upcoming", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000" },
                  { name: "Mountain View Homestay", location: "Manali", date: "April 12 - April 15", status: "Completed", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000" }
                ].map((booking, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl border border-secondary/5 hover:border-secondary/20 transition-all group">
                    <img src={booking.image} alt={booking.name} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-primary dark:text-foreground group-hover:text-secondary transition-colors">{booking.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted dark:text-foreground/60 mt-1 font-medium">
                            <MapPin className="w-3.5 h-3.5" /> {booking.location}
                          </div>
                        </div>
                        <span className={`text-[11px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full ${booking.status === 'Upcoming' ? 'bg-primary text-secondary' : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-foreground/70'}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-4 text-sm font-bold text-primary dark:text-foreground/80">
                        <Clock className="w-4 h-4 text-secondary" />
                        {booking.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Properties */}
            <div className="bg-white dark:bg-black/40 rounded-3xl p-8 shadow-luxury border border-secondary/10 dark:border-secondary/20 transition-colors">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-primary dark:text-secondary flex items-center gap-3">
                  <Heart className="text-secondary w-6 h-6" />
                  Saved Sanctuaries
                </h2>
                <button className="text-secondary font-bold text-sm hover:underline">See All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "Forest Eco Retreat", location: "Coorg", rating: 4.8, image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000" },
                  { name: "Riverside Luxury Stay", location: "Udaipur", rating: 4.9, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000" }
                ].map((prop, idx) => (
                  <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden group">
                    <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                      <h4 className="text-white font-bold">{prop.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-white/60 text-xs">{prop.location}</span>
                        <div className="flex items-center gap-1 text-secondary">
                          <Star className="w-3 h-3 fill-secondary" />
                          <span className="text-xs font-bold">{prop.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - AI Recommendations */}
          <div className="space-y-8">
            <div className="bg-primary text-white rounded-[3rem] p-8 shadow-2xl relative overflow-hidden border border-white/10">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl opacity-50" />
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-secondary w-8 h-8 drop-shadow-[0_0_10px_rgba(226,194,117,0.5)]" />
                    <h2 className="text-2xl font-serif font-bold text-white leading-tight">AI Picks <br /><span className="text-secondary italic">For You</span></h2>
                 </div>
                 <p className="text-white/80 text-sm leading-relaxed mb-8 font-medium">
                   Based on your past preferences for hills and sustainable stays, we recommend:
                 </p>
                 
                 <div className="space-y-6">
                    {[
                      { name: "Cloud 9 Valley Lodge", location: "Nainital", desc: "Eco-certified mountain lodge with panoramic valley views." },
                      { name: "Whispering Woods", location: "Rishikesh", desc: "Private river-side retreat focused on wellness and yoga." }
                    ].map((pick, idx) => (
                      <div key={idx} className="p-5 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                        <h4 className="font-bold text-secondary group-hover:translate-x-1 transition-transform">{pick.name}</h4>
                        <p className="text-[11px] uppercase tracking-widest text-white/60 mt-1 font-bold">{pick.location}</p>
                        <p className="text-sm text-white/90 mt-3 italic leading-relaxed">"{pick.desc}"</p>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-10 py-4 bg-secondary text-primary rounded-full font-bold transition-all hover:bg-white hover:scale-[1.02] shadow-xl">
                   Explore Full Analysis
                 </button>
               </div>
            </div>

            <div className="bg-white dark:bg-luxury-dark rounded-3xl p-8 shadow-luxury border border-secondary/10">
              <h3 className="font-serif font-bold text-xl text-primary dark:text-foreground mb-4">Travel Pulse</h3>
              <div className="space-y-4">
                 {[
                  { label: "Bookings", value: "12", icon: Calendar },
                  { label: "AI Plans", value: "4", icon: MapPin },
                  { label: "Rewards", value: "2.4k", icon: Star },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center p-4 bg-primary/5 dark:bg-white/5 rounded-2xl">
                    <stat.icon className="w-5 h-5 text-secondary mb-2" />
                    <span className="text-xl font-bold text-primary dark:text-white">{stat.value}</span>
                    <span className="text-[10px] uppercase font-bold text-primary/40 dark:text-secondary/60">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Dashboard;