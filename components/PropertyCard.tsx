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
      <Link href="/villas/1" className="block group bg-white dark:bg-black/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-500 border border-secondary/10 dark:border-secondary/20">
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div className="w-full py-3 bg-white dark:bg-secondary text-primary dark:text-luxury-dark rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
              <Eye className="w-5 h-5" />
              View Details
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-luxury-dark/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Star className="w-4 h-4 text-secondary fill-secondary" />
            <span className="text-sm font-bold text-primary dark:text-secondary">{rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 text-primary/70 dark:text-secondary/80 mb-2 font-bold">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-xs uppercase tracking-wider">{location}</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-primary dark:text-white mb-3 group-hover:text-secondary transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary/10">
            <div>
              <span className="text-sm text-primary/60 dark:text-white/60 font-medium">Starting from</span>
              <p className="text-xl font-bold text-primary dark:text-secondary">
                ₹{price} <span className="text-sm font-normal text-primary/50 dark:text-white/40">/ night</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-500">
               <Eye className="w-5 h-5 text-secondary group-hover:text-primary dark:group-hover:text-black" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
