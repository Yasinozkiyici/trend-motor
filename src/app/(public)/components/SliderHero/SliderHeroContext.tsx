'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { SliderHeroData } from '../../home-hero-provider';

interface SliderHeroContextType {
  data: SliderHeroData | null;
  isLoading: boolean;
}

const SliderHeroContext = createContext<SliderHeroContextType | null>(null);

interface SliderHeroProviderProps {
  children: ReactNode;
  data: SliderHeroData | null;
  isLoading: boolean;
}

export function SliderHeroProvider({ children, data, isLoading }: SliderHeroProviderProps) {
  return (
    <SliderHeroContext.Provider value={{ data, isLoading }}>
      {children}
    </SliderHeroContext.Provider>
  );
}

export function useSliderHero() {
  const context = useContext(SliderHeroContext);
  if (!context) {
    throw new Error('useSliderHero must be used within a SliderHeroProvider');
  }
  return context;
}

// Client component wrapper for admin preview
export function HomeHeroProviderClient({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

