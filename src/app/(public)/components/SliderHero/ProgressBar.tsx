'use client';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`w-full h-1 bg-black/20 overflow-hidden ${className}`}>
      <div 
        className="h-full bg-white transition-all duration-100 ease-linear"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}

