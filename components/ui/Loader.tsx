'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils';

/**
 * Props for the Loader component
 * @typedef {Object} LoaderProps
 * @property {'spinner' | 'dots' | 'skeleton'} [variant='spinner'] - The type of loader
 * @property {string} [className] - Additional CSS classes
 */
export interface LoaderProps {
  variant?: 'spinner' | 'dots' | 'skeleton';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ variant = 'spinner', className }) => {
  if (variant === 'skeleton') {
    return (
      <div className={cn('animate-pulse bg-secondary/10 rounded-xl', className)} />
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" />
      </div>
    );
  }

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
      <div className="absolute w-6 h-6 border-4 border-primary/20 border-b-primary rounded-full animate-spin [animation-direction:reverse]" />
    </div>
  );
};

export { Loader };
