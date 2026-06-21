'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import { 
  Star, 
  MapPin, 
  Users, 
  BedDouble, 
  Bath, 
  Wifi, 
  Coffee, 
  ShieldCheck, 
  Leaf,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui';

const properties = [
  {
    id: "1",
    name: "Mountain View Homestay",
    location: "Manali, Himachal Pradesh",
    price: "8,500",
    rating: 4.9,
    reviews: "128",
    guests: 4,
    beds: 2,
    baths: 2,
    description: "Experience the majestic Himalayas from this eco-certified homestay. Built using local river stone and sustainable timber, this retreat offers panoramic views of the Beas River valley while maintaining a zero-carbon footprint.",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  // Add other properties if needed for simulation
];

export default function PropertyDetailPage() {
  const params = useParams();
  const idValue = typeof params?.id === 'string' ? params.id : '1';
  const property = properties.find(p => p.id === idValue) || properties[0];

  return (
    <main className="min-h-screen bg-background dark:bg-black transition-colors duration-500 pt-24 text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-sm font-bold text-primary/40 uppercase tracking-widest">
           <span>Villas</span>
           <ChevronRight className="w-4 h-4" />
           <span className="text-secondary">{property.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Gallery Section */}
            <div className="grid grid-cols-2 gap-4 aspect-[16/10] overflow-hidden rounded-[3rem] shadow-luxury">
               <img src={property.images[0]} className="w-full h-full object-cover" alt="Villa exterior" />
               <img src={property.images[1]} className="w-full h-full object-cover" alt="Villa interior" />
            </div>

            {/* Title Block */}
            <div className="space-y-4">
               <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                     <Leaf className="w-3 h-3" />
                     Level 3 Sustainability
                  </span>
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-bold text-sm">{property.rating} • </span>
                    <span className="text-sm font-medium underline">{property.reviews} Reviews</span>
                  </div>
               </div>
               <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-secondary italic leading-tight">{property.name}</h1>
               <div className="flex items-center gap-2 text-primary/60 dark:text-foreground/60 font-medium">
                  <MapPin className="w-5 h-5 text-secondary" />
                  {property.location}
               </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-secondary/10">
               {[
                 { icon: Users, label: `${property.guests} Guests` },
                 { icon: BedDouble, label: `${property.beds} Bedrooms` },
                 { icon: Bath, label: `${property.baths} Bathrooms` }
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 bg-white p-6 rounded-3xl border border-secondary/5 shadow-sm">
                    <stat.icon className="w-6 h-6 text-secondary" />
                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">{stat.label}</span>
                 </div>
               ))}
            </div>

            {/* Description */}
            <div className="space-y-6">
               <h2 className="text-3xl font-serif font-bold text-primary dark:text-secondary">About this Retreat</h2>
               <p className="text-lg text-primary/70 dark:text-foreground/70 leading-relaxed font-medium">
                 {property.description}
               </p>
               <p className="text-lg text-primary/70 dark:text-foreground/70 leading-relaxed font-medium">
                 Every aspect of this stay has been designed with the environment in mind. From the organic linen to the locally sourced breakfast, your stay directly supports the local community and conservation efforts in the {property.location.split(',')[0]} region.
               </p>
            </div>

            {/* Amenities */}
            <div className="space-y-8">
               <h2 className="text-3xl font-serif font-bold text-primary dark:text-secondary">Key Amenities</h2>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { icon: Wifi, label: "Starlink Wifi" },
                    { icon: Coffee, label: "Organic Coffee" },
                    { icon: ShieldCheck, label: "24/7 Security" },
                    { icon: Leaf, label: "Renewable Energy" },
                    { icon: Users, label: "Local Guide" },
                    { icon: Calendar, label: "Flexible Booking" }
                  ].map((ame, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                       <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors">
                          <ame.icon className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                       </div>
                       <span className="font-bold text-primary/80 dark:text-foreground/80">{ame.label}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
             <div className="sticky top-32 bg-primary text-white rounded-[3rem] p-10 shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl opacity-50" />
                <div className="relative z-10 space-y-8">
                   <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-serif font-bold text-secondary italic">₹{property.price}</span>
                      <span className="text-white/60 text-sm font-bold uppercase">per night</span>
                   </div>

                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 border border-white/10 rounded-2xl overflow-hidden">
                         <div className="p-4 bg-white/5 border-r border-white/10">
                            <p className="text-[10px] uppercase font-bold text-secondary mb-1">Check-in</p>
                            <p className="text-sm font-bold">24 June, 2024</p>
                         </div>
                         <div className="p-4 bg-white/5">
                            <p className="text-[10px] uppercase font-bold text-secondary mb-1">Check-out</p>
                            <p className="text-sm font-bold">28 June, 2024</p>
                         </div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                         <p className="text-[10px] uppercase font-bold text-secondary mb-1">Guests</p>
                         <p className="text-sm font-bold">2 Adults, 1 Child</p>
                      </div>
                   </div>

                   <Button className="w-full h-16 text-lg bg-secondary text-primary hover:bg-white shadow-xl">
                      Exclusively Book Now
                   </Button>

                   <div className="text-center space-y-2">
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Powered by AI Prediction</p>
                      <p className="text-[10px] text-white/60 leading-relaxed italic">
                        "Secure this stay now — 85% likely to be sold out within the next 48 hours for your chosen dates."
                      </p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
