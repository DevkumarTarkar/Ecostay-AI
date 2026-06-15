'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X, Camera, Share2, Globe } from 'lucide-react';
import { cn } from '@/app/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isHomePage = pathname === '/';
  const isWhiteText = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Login', href: '/login' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-luxury py-3 border-b border-secondary/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg transition-transform group-hover:scale-110 shadow-lg">
            <Leaf className="w-6 h-6 text-secondary" />
          </div>
          <span className={cn(
            "text-2xl font-serif font-bold tracking-tight transition-colors",
            isWhiteText ? "text-white" : "text-primary"
          )}>
            EcoStay <span className="text-secondary">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-all hover:text-secondary relative group",
                isWhiteText ? "text-white" : "text-primary"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/login"
            className={cn(
              "px-6 py-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg",
              isWhiteText
                ? "bg-white text-primary hover:bg-secondary"
                : "bg-primary text-white hover:bg-primary/90"
            )}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isWhiteText ? "text-white" : "text-primary")} />
          ) : (
            <Menu className={cn("w-6 h-6", isWhiteText ? "text-white" : "text-primary")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-primary/95 backdrop-blur-lg z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"
      )}>
        <button
          className="absolute top-6 right-6 p-2 text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-2xl font-serif text-white hover:text-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="/login"
          className="px-10 py-4 bg-secondary text-primary rounded-full font-bold text-lg hover:scale-105 transition-transform"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;