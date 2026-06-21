'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Target, Eye, Leaf, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background dark:bg-black transition-colors duration-500 pt-24 text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
        <div className="relative text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 italic"
          >
            About EcoStay AI
          </motion.h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          <p className="text-xl max-w-2xl mx-auto text-white/80">
            Pioneering the intersection of luxury hospitality and environmental consciousness through artificial intelligence.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-secondary w-8 h-8" />
                <h2 className="text-3xl font-serif font-bold text-primary dark:text-secondary">Our Mission</h2>
              </div>
              <p className="text-foreground/80 dark:text-white/80 leading-relaxed text-lg font-medium">
                To provide travelers with unparalleled luxury experiences that are deeply rooted in sustainability. We believe that true luxury shouldn't cost the Earth. By curating the finest eco-stays, we aim to transform how India travels.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-secondary w-8 h-8" />
                <h2 className="text-3xl font-serif font-bold text-primary dark:text-secondary">Sustainable Vision</h2>
              </div>
              <p className="text-foreground/80 dark:text-white/80 leading-relaxed text-lg font-medium">
                Our vision is to build a network of 1000+ carbon-neutral villas across India by 2030, powered by AI that optimizes energy consumption and minimizes waste while maximizing guest comfort.
              </p>
            </div>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2000&auto=format&fit=crop" 
              alt="Sustainable Villa" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Travelers Choose Us */}
      <section className="py-24 bg-background dark:bg-black/50 border-y border-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-primary dark:text-secondary text-center mb-16 italic">Why Travelers Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Leaf, title: "Zero Impact", desc: "Our villas use renewable energy and water recycling systems to ensure a minimal carbon footprint." },
              { icon: Users, title: "Locally Sourced", desc: "We partner with local communities for organic food and authentic cultural experiences." },
              { icon: Users, title: "AI-Curated Comfort", desc: "From room temperature to local hidden gems, our AI personalizes every aspect of your stay." }
            ].map((feature, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/5 dark:bg-secondary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group hover:bg-secondary transition-colors duration-500">
                  <feature.icon className="w-10 h-10 text-primary dark:text-secondary transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary dark:text-white">{feature.title}</h3>
                <p className="text-foreground/60 dark:text-white/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;