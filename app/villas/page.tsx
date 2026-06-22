'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui';

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

export default function VillasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-black dark:text-white">
            !!! {filteredProperties.length} <span className="text-yellow-600 dark:text-yellow-400 italic">Exquisite Sanctuaries</span> Found !!!
          </h2>
          <p className="text-lg max-w-2xl font-semibold text-black/70 dark:text-foreground/70">
            Explore curated sustainable escapes that redefine Indian luxury hospitality.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 items-end">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
              <Input 
                placeholder="Search by destination or villa name..." 
                className="pl-12 bg-white/50 dark:bg-luxury-dark/50 border-secondary/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white font-extrabold hover:bg-black/90 transition-all shadow-lg active:scale-95">
            <SlidersHorizontal className="w-5 h-5 text-yellow-400" />
            FILTER NOW
          </button>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop, idx) => (
              <PropertyCard key={idx} {...prop} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-secondary/20 rounded-[3rem]">
              <p className="text-xl font-serif text-primary/60 dark:text-foreground/60 italic">No properties found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
