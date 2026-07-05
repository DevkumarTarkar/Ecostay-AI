'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X, Camera, Share2, Globe, Sun, Moon } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    { name: 'Villas', href: '/villas' },
    { name: 'AI Planner', href: '/ai-planner' },
    { name: 'About', href: '/about' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-3',
        'bg-card shadow-luxury border-b border-white/5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg transition-transform group-hover:scale-110 shadow-lg">
            <Leaf className="w-6 h-6 text-accent" />
          </div>
          <span className={cn(
            "text-2xl font-serif font-bold tracking-tight transition-colors",
            "text-primary dark:text-white"
          )}>
            EcoStay <span className="text-accent">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-all hover:text-accent relative group",
                "text-primary/80 dark:text-white/80"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(
              "px-6 py-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg",
              "bg-accent text-black hover:bg-accent/90"
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
            <X className={cn("w-6 h-6", "text-primary dark:text-white")} />
          ) : (
            <Menu className={cn("w-6 h-6", "text-primary dark:text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white dark:bg-primary/95 backdrop-blur-lg z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500",
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
            className="text-2xl font-serif text-primary dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
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