'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 shadow-sm',
        secondary:
          'bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500 shadow-sm',
        ghost:
          'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 hover:border-gray-400 focus-visible:ring-gray-500',
        outline:
          'border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-700 focus-visible:ring-blue-500 shadow-sm',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        icon: 'h-10 w-10 rounded-full p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <div
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        />
      );
    }
    
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
