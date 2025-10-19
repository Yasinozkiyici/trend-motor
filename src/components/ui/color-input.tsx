'use client';

import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ColorInputProps = InputHTMLAttributes<HTMLInputElement>;

const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="color"
      className={cn(
        'h-10 w-16 cursor-pointer rounded-md border border-gray-300 bg-white p-1 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300',
        className
      )}
      {...props}
    />
  )
);
ColorInput.displayName = 'ColorInput';

export { ColorInput };
