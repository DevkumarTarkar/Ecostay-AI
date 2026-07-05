import React from 'react';
import Link from 'next/link';
import { Leaf, Camera, Share2, Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-black pt-20 pb-10 border-t border-secondary/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-secondary/10 dark:border-white/10 pb-16">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl transition-transform group-hover:scale-110 shadow-md">
              <Leaf className="w-6 h-6 text-accent" />
            </div>
            <span className="text-2xl font-serif font-bold text-primary dark:text-white tracking-tight">
              EcoStay <span className="text-accent">AI</span>
            </span>
          </Link>
          <p className="text-slate-600 dark:text-white/60 leading-relaxed max-w-xs font-medium">
            Redefining luxury travel through sustainable architecture and AI-driven personalized experiences across the heart of India.
          </p>
          <div className="flex items-center gap-4">
            {[Camera, Share2, Globe].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/5 dark:bg-white/10 flex items-center justify-center transition-all hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-black group border border-secondary/10"
              >
                <Icon className="w-5 h-5 text-primary dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-serif font-bold mb-6 text-primary dark:text-secondary">Quick Links</h4>
          <ul className="space-y-4">
            {[
              { name: 'Home', href: '/' },
              { name: 'About Us', href: '/about' },
              { name: 'Our Villas', href: '/villas' },
              { name: 'Sustainable Vision', href: '/about' },
              { name: 'Contact', href: '/contact' }
            ].map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-slate-600 dark:text-white/60 hover:text-primary dark:hover:text-white transition-colors font-medium cursor-pointer"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="text-lg font-serif font-bold mb-6 text-primary dark:text-secondary">Top Destinations</h4>
          <ul className="space-y-4">
            {[
              'Goa Luxury Collections', 
              'Manali Hill Retreats', 
              'Udaipur Heritage Stays', 
              'Coorg Coffee Estates', 
              'Rishikesh Yoga Centers'
            ].map((link) => (
              <li key={link}>
                <Link 
                  href="/villas" 
                  className="text-slate-600 dark:text-white/60 hover:text-primary dark:hover:text-white transition-colors font-medium cursor-pointer"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-lg font-serif font-bold mb-6 text-primary dark:text-secondary">Get in Touch</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
              <p className="text-slate-700 dark:text-white/60 font-medium">123 Krishna Vihaar, Mathura, Uttar Pradesh, India</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-secondary shrink-0" />
              <p className="text-slate-700 dark:text-white/60 font-medium">+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-secondary shrink-0" />
              <p className="text-slate-700 dark:text-white/60 font-medium">contact@ecostay.ai</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 dark:text-white/40 text-sm">
        <p>© 2024 EcoStay AI. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-primary dark:hover:text-white cursor-pointer">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary dark:hover:text-white cursor-pointer">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;