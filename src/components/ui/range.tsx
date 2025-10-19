'use client';

import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type RangeProps = InputHTMLAttributes<HTMLInputElement>;

const Range = forwardRef<HTMLInputElement, RangeProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      className={cn(
        'h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300',
        className
      )}
      {...props}
    />
  )
);
Range.displayName = 'Range';

export { Range };
