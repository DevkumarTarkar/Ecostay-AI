'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils';

/**
 * Props for the Button component
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - The content of the button
 * @property {'primary' | 'secondary' | 'ghost' | 'outline'} [variant='primary'] - The visual style of the button
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the button
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [isLoading] - Whether the button is in a loading state
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg active:scale-95',
      secondary: 'bg-secondary text-primary hover:bg-secondary/90 shadow-md active:scale-95',
      ghost: 'bg-transparent hover:bg-secondary/10 text-primary',
      outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-xs',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
