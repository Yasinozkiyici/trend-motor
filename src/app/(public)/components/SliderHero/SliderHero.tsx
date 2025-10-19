'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { SliderHeroSlide, SliderHeroSettings } from '../home-hero-provider';
import QuickActionsRail from './QuickActionsRail';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SliderHeroProps {
  slides: SliderHeroSlide[];
  settings?: SliderHeroSettings;
}

export default function SliderHero({ slides, settings }: SliderHeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: settings?.loop ?? true,
    skipSnaps: false,
  });

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!emblaApi) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        emblaApi.scrollPrev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        emblaApi.scrollNext();
        break;
    }
  }, [emblaApi]);

  if (!slides.length) {
    return null;
  }

  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden",
        "h-[72vh] lg:h-[816px]", // %20 artırıldı (60vh -> 72vh, 680px -> 816px)
        "bg-white" // Beyaz arkaplan
      )}
      role="region"
      aria-label="Anasayfa vitrin"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Embla viewport + gutters - 2cm (76px) boşluk */}
      <div className="relative h-full pl-[clamp(76px,8vw,152px)] pr-[clamp(76px,8vw,152px)]">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {slides.map((slide, index) => (
              <div key={slide.id} className="embla__slide flex-[0_0_100%] min-w-0 relative h-full rounded-2xl overflow-hidden">
                {/* RESPONSIVE GÖRSEL */}
                <div className="absolute inset-0">
                  {slide.desktopImageUrl ? (
                    <>
                      {/* Desktop görsel */}
                      <Image
                        src={slide.desktopImageUrl}
                        alt={slide.alt || "Slide"}
                        fill
                        sizes="(min-width:768px) 84vw, 92vw"
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        quality={80}
                        style={{ 
                          objectFit: "cover", 
                          objectPosition: "center",
                          width: "100%",
                          height: "100%"
                        }}
                        placeholder="empty"
                        className="hidden md:block"
                      />
                      {/* Mobil görsel */}
                      {slide.mobileImageUrl && (
                        <Image
                          src={slide.mobileImageUrl}
                          alt={slide.alt || "Slide"}
                          fill
                          sizes="92vw"
                          priority={index === 0}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          quality={80}
                          style={{ 
                            objectFit: "cover", 
                            objectPosition: "center",
                            width: "100%",
                            height: "100%"
                          }}
                          placeholder="empty"
                          className="block md:hidden"
                        />
                      )}
                      {/* Mobil görsel yoksa desktop görseli göster */}
                      {!slide.mobileImageUrl && (
                        <Image
                          src={slide.desktopImageUrl}
                          alt={slide.alt || "Slide"}
                          fill
                          sizes="92vw"
                          priority={index === 0}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          quality={80}
                          style={{ 
                            objectFit: "cover", 
                            objectPosition: "center",
                            width: "100%",
                            height: "100%"
                          }}
                          placeholder="empty"
                          className="block md:hidden"
                        />
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600">Görsel yüklenemedi</span>
                    </div>
                  )}
                </div>
                
                {/* İsteğe bağlı çok hafif karartma */}
                {settings?.showProgress && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Actions Rail */}
      <QuickActionsRail />
    </section>
  );
}
