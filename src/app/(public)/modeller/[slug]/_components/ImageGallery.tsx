'use client';

import { useState } from 'react';
import Image from 'next/image';

type GalleryImage = {
  id: string;
  url: string | null;
  alt: string | null;
  is_primary: boolean;
};

export default function ImageGallery({
  images,
  motorName
}: {
  images: GalleryImage[];
  motorName: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
        <svg className="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }
  
  const selectedImage = images[selectedIndex];
  
  return (
    <div className="space-y-4">
      {/* Ana Görsel */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
        {selectedImage.url ? (
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt || motorName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                selectedIndex === index
                  ? 'border-blue-600'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              {image.url ? (
                <Image
                  src={image.url}
                  alt={image.alt || `${motorName} - ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 16vw, (max-width: 1024px) 12vw, 6vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
