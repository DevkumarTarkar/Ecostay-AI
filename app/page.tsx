'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Leaf, Zap, Map } from 'lucide-react';

const destinations = [
  { name: "Goa", image: "https://images.unsplash.com/photo-1512757776214-26d36777b513?q=80&w=2000&auto=format&fit=crop", count: "45+ Villas" },
  { name: "Manali", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000&auto=format&fit=crop", count: "32+ Homestays" },
  { name: "Nainital", image: "https://images.unsplash.com/photo-1621213032549-c16e7f1e63a3?q=80&w=2000&auto=format&fit=crop", count: "28+ Villas" },
  { name: "Rishikesh", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop", count: "15+ Retreats" },
  { name: "Udaipur", image: "https://images.unsplash.com/photo-1602643163983-ed0babc39797?q=80&w=2000&auto=format&fit=crop", count: "22+ Palaces" },
  { name: "Coorg", image: "https://images.unsplash.com/photo-1581451241191-237cd2290f67?q=80&w=2000&auto=format&fit=crop", count: "18+ Estates" }
];

const Home = () => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/homestays/')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        console.log('Homestays response:', response);

        if (response.success && Array.isArray(response.data)) {
          const formattedData = response.data.map((item: any) => ({
            name: item.title,
            location: item.location,
            price: item.price_per_night.toString(),
            rating: item.rating,
            image:
              'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop'
          }));

          setProperties(formattedData);
        } else {
          console.error('Unexpected response structure:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching homestays:', error);
      });
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Properties */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white mb-4 italic">
              Featured Properties
            </h2>
            <p className="text-black/70 dark:text-muted text-lg leading-relaxed font-medium">
              Explore our handpicked selection of the finest luxury villas and eco-friendly stays across the most breathtaking landscapes of India.
            </p>
          </div>

          <button className="px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-md">
            View All Properties
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, idx) => (
            <PropertyCard
              key={idx}
              name={prop.name}
              location={prop.location}
              price={prop.price}
              rating={prop.rating}
              image={prop.image}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-card text-card-foreground border-y border-secondary/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-black dark:text-white">
            Why Choose <span className="text-yellow-600 dark:text-yellow-400">EcoStay AI</span>
          </h2>

          <p className="text-black/60 dark:text-white/60 text-lg max-w-2xl mx-auto font-medium">
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
              className="p-8 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-3xl border border-secondary/10 dark:border-white/10 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-yellow-600/10 dark:bg-yellow-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {item.title}
              </h3>

              <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white mb-4 italic">
            Popular Destinations
          </h2>

          <p className="text-black/70 dark:text-muted text-lg max-w-2xl mx-auto font-medium">
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