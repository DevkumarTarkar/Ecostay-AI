'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black pt-24 transition-colors duration-500">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary dark:text-white mb-6">
            Get in <span className="text-secondary italic">Touch</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-white/60 max-w-2xl mx-auto">
            Have questions about our sustainable villas or need help planning your next luxury escape? Our team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-luxury-dark rounded-[3rem] p-8 md:p-12 shadow-xl border border-secondary/10">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary dark:text-white">Our Location</h3>
                    <p className="text-slate-600 dark:text-white/60">123 Krishna Vihaar, Mathura, Uttar Pradesh, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary dark:text-white">Phone Number</h3>
                    <p className="text-slate-600 dark:text-white/60">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary dark:text-white">Email Address</h3>
                    <p className="text-slate-600 dark:text-white/60">contact@ecostay.ai</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary text-white">
              <h3 className="text-xl font-bold mb-4">Sustainable Concierge</h3>
              <p className="opacity-80 leading-relaxed mb-6">
                Our AI-driven concierge is available 24/7 to help you with personalized travel recommendations and sustainable stay planning.
              </p>
              <button className="px-6 py-3 bg-yellow-400 text-primary font-bold rounded-xl hover:scale-105 transition-transform active:scale-95">
                Chat with AI
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 dark:bg-white/5 rounded-[2.5rem] p-8 md:p-10 border border-secondary/10">
            <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-8">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/60 dark:text-white/60 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-black/20 border border-secondary/10 focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/60 dark:text-white/60 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-black/20 border border-secondary/10 focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/60 dark:text-white/60 ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Inquiry about bookings"
                  className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-black/20 border border-secondary/10 focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/60 dark:text-white/60 ml-1">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help you?"
                  className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-black/20 border border-secondary/10 focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button className="w-full py-4 bg-secondary text-primary font-bold rounded-2xl hover:bg-secondary/90 transition-all shadow-lg flex items-center justify-center gap-2 group">
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
