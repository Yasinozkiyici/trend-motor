'use client';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`w-full h-1 md:h-1.5 bg-black/20 overflow-hidden rounded-full ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 ease-out rounded-full shadow-sm"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}

