'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Leaf, Zap, Map } from 'lucide-react';

const properties = [
  {
    name: "Mountain View Homestay",
    location: "Manali, Himachal Pradesh",
    price: "8,500",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop"
  },
  {
    name: "Forest Eco Retreat",
    location: "Coorg, Karnataka",
    price: "12,000",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Lake Side Villa",
    location: "Nainital, Uttarakhand",
    price: "15,500",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Sunset Pool Villa",
    location: "Goa, North Goa",
    price: "22,000",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Valley Escape Retreat",
    location: "Rishikesh, Uttarakhand",
    price: "9,000",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop"
  },
  {
    name: "Riverside Luxury Stay",
    location: "Udaipur, Rajasthan",
    price: "18,500",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
  }
];

const destinations = [
  { name: "Goa", image: "https://images.unsplash.com/photo-1512757776214-26d36777b513?q=80&w=2000&auto=format&fit=crop", count: "45+ Villas" },
  { name: "Manali", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000&auto=format&fit=crop", count: "32+ Homestays" },
  { name: "Nainital", image: "https://images.unsplash.com/photo-1621213032549-c16e7f1e63a3?q=80&w=2000&auto=format&fit=crop", count: "28+ Villas" },
  { name: "Rishikesh", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop", count: "15+ Retreats" },
  { name: "Udaipur", image: "https://images.unsplash.com/photo-1602643163983-ed0babc39797?q=80&w=2000&auto=format&fit=crop", count: "22+ Palaces" },
  { name: "Coorg", image: "https://images.unsplash.com/photo-1581451241191-237cd2290f67?q=80&w=2000&auto=format&fit=crop", count: "18+ Estates" }
];

const Home = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Properties Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 italic">Featured Properties</h2>
            <p className="text-muted text-lg leading-relaxed font-medium">
              Explore our handpicked selection of the finest luxury villas and eco-friendly stays across the most breathtaking landscapes of India.
            </p>
          </div>
          <button className="px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-md">
            View All Properties
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, idx) => (
            <PropertyCard key={idx} {...prop} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-primary text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-lg">Why Choose <span className="text-secondary">EcoStay AI</span></h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
            Experience the future of travel where luxury meets sustainability, powered by AI to ensure your stay is as unique as you are.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: "Premium Properties", desc: "Every stay is vetted for luxury, comfort, and sustainable standards." },
            { icon: Leaf, title: "Verified Hosts", desc: "Our community of hosts are local experts committed to ethical hospitality." },
            { icon: Zap, title: "Sustainable Tourism", desc: "Carbon-neutral stays that support local ecosystems and communities." },
            { icon: Map, title: "AI Travel Recommendations", desc: "Personalized itineraries crafted by our advanced AI for your preferences." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 text-center"
            >
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 italic">Popular Destinations</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            From the serene mountains of Manali to the sun-kissed beaches of Goa, discover your next favorite escape.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((dest, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <h4 className="text-white font-bold text-xl">{dest.name}</h4>
                <p className="text-white/60 text-xs">{dest.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;