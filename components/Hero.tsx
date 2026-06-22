'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-110"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop")',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase bg-yellow-400 text-primary rounded-full shadow-lg">
            Premium Escapes
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-[1.1] max-w-4xl">
            Luxury Villas & <br /> 
            <span className="luxury-text-gradient">Eco Stays</span> Across India
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
            Discover curated stays, unforgettable experiences and sustainable travel. 
            Your journey to ultimate relaxation begins here with EcoStay AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <button className="px-8 py-4 bg-yellow-400 text-primary rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-2xl">
              Explore Villas
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-white/20 hover:scale-105 active:scale-95">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-white/50">Scroll</span>
          <ChevronDown className="w-6 h-6 text-secondary" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;