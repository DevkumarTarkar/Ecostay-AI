import React from 'react';
import Link from 'next/link';
import { Leaf, Camera, Share2, Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl transition-transform group-hover:scale-110">
              <Leaf className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-tight">
              EcoStay <span className="text-secondary">AI</span>
            </span>
          </Link>
          <p className="text-white/60 leading-relaxed max-w-xs">
            Redefining luxury travel through sustainable architecture and AI-driven personalized experiences across the heart of India.
          </p>
          <div className="flex items-center gap-4">
            {[Camera, Share2, Globe].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all hover:bg-secondary hover:text-primary"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-serif font-bold mb-6 text-secondary">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'About Us', 'Our Villas', 'Sustainable Vision', 'Contact'].map((link) => (
              <li key={link}>
                <Link href="#" className="text-white/60 hover:text-white transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="text-lg font-serif font-bold mb-6 text-secondary">Top Destinations</h4>
          <ul className="space-y-4">
            {['Goa Luxury Collections', 'Manali Hill Retreats', 'Udaipur Heritage Stays', 'Coorg Coffee Estates', 'Rishikesh Yoga Centers'].map((link) => (
              <li key={link}>
                <Link href="#" className="text-white/60 hover:text-white transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-lg font-serif font-bold mb-6 text-secondary">Get in Touch</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
              <p className="text-white/60">123 Krishna Vihaar, Mathura, Uttar Pradesh, India</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-secondary shrink-0" />
              <p className="text-white/60">+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-secondary shrink-0" />
              <p className="text-white/60">contact@ecostay.ai</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
        <p>© 2024 EcoStay AI. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;