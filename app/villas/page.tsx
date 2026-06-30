'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { Input, Loader, Toast } from '@/components/ui';

export default function VillasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/homestays/')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        console.log('Villas homestays response:', response);

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
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching homestays:', error);
        setError('Failed to load villas. Please check your connection.');
        setLoading(false);
      });
  }, []);
  
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
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-700">
              <Loader variant="spinner" className="mb-6 scale-150" />
              <p className="text-xl font-serif text-primary/40 italic">Finding your exquisite sanctuary...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
          )}
        </div>

        {/* Floating Toast Notification */}
        <div className="fixed bottom-8 right-8 z-50">
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
        </div>
      </div>

      <Footer />
    </main>
  );
}
