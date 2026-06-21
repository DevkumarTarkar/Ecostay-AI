'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils';

/**
 * Props for the Input component
 * @typedef {Object} InputProps
 * @property {string} [label] - The label for the input
 * @property {string} [error] - Error message to display
 * @property {string} [className] - Additional CSS classes
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-bold text-primary/80 ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex w-full rounded-2xl border border-secondary/20 bg-white/50 px-4 py-3 text-sm ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
