'use client';

import React from 'react';
import { Star, MapPin, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PropertyCardProps {
  name: string;
  location: string;
  price: string;
  rating: number;
  image: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ name, location, price, rating, image }) => {
  return (
    <motion.div whileHover={{ y: -10 }}>
      <Link href="/villas/1" className="block group bg-white dark:bg-card rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-500 border border-secondary/10 dark:border-white/5">
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div className="w-full py-3 bg-white text-primary rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
              <Eye className="w-5 h-5" />
              View Details
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-primary dark:bg-card/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-white">{rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 mb-2 font-extrabold opacity-100 text-black dark:text-white/70">
            <MapPin className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs uppercase tracking-wider">LOC: {location}</span>
          </div>
          <h3 className="text-xl font-sans font-extrabold mb-3 group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors line-clamp-1 opacity-100 text-black dark:text-white">
            NAME: {name}
          </h3>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-sm font-extrabold opacity-100 text-black/50 dark:text-white/60">Starting from</span>
              <p className="text-xl font-extrabold text-black dark:text-yellow-400 opacity-100">
                PRICE: ₹{price} <span className="text-sm font-normal text-black/40 dark:text-white/40">/ night</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center group-hover:bg-yellow-400 transition-all duration-500">
               <Eye className="w-5 h-5 text-yellow-400 group-hover:text-primary" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
