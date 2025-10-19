'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export function FormField({
  label,
  htmlFor,
  description,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </label>
      {children}
      {description ? (
        <p className="text-xs text-gray-500">{description}</p>
      ) : null}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
