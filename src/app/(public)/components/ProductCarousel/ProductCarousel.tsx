'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard, { ProductCardProps } from '@/app/(public)/components/ProductCard/ProductCard';

interface ProductCarouselProps {
  products: ProductCardProps[];
  title?: string;
  className?: string;
}

export default function ProductCarousel({ 
  products, 
  title = "Öne Çıkan Modeller",
  className 
}: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!products.length) {
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      {/* Başlık */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        
        {/* Navigasyon */}
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!emblaApi?.canScrollPrev()}
            aria-label="Önceki"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!emblaApi?.canScrollNext()}
            aria-label="Sonraki"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_280px] min-w-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
            aria-label={`Sayfa ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
