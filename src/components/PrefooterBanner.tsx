'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PrefooterBanner as PrefooterBannerType } from '@/types';

export default function PrefooterBanner() {
  const [banner, setBanner] = useState<PrefooterBannerType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await fetch('/api/prefooter-banner');
      const result = await response.json();
      if (result.success && result.data) {
        setBanner(result.data);
      }
    } catch (error) {
      console.error('Error fetching prefooter banner:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!banner || !banner.isActive) {
    return null;
  }

  const heightClasses = {
    sm: 'h-48 md:h-56',
    md: 'h-64 md:h-80',
    lg: 'h-80 md:h-96'
  };

  return (
    <div className={`py-16 bg-gray-100 ${heightClasses[banner.height]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
          {/* Background Image */}
          {banner.imageUrl && (
            <Image
              src={banner.imageUrl}
              alt={banner.imageAlt || 'Trend Motor Banner'}
              fill
              className="object-cover"
              quality={90}
              sizes="100vw"
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-800/60"></div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
