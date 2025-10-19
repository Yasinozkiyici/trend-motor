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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!emblaApi) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        setIsUserInteracting(true);
        emblaApi.scrollPrev();
        // 5 saniye sonra otomatik kaymaya devam et
        setTimeout(() => setIsUserInteracting(false), 5000);
        break;
      case 'ArrowRight':
        event.preventDefault();
        setIsUserInteracting(true);
        emblaApi.scrollNext();
        // 5 saniye sonra otomatik kaymaya devam et
        setTimeout(() => setIsUserInteracting(false), 5000);
        break;
    }
  }, [emblaApi]);

  // Embla API event listeners
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect(); // İlk yükleme için

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Otomatik kayma efekti
  useEffect(() => {
    if (!emblaApi || isUserInteracting) return;

    const autoScroll = setInterval(() => {
      if (!isUserInteracting) {
        emblaApi.scrollNext();
      }
    }, 6000); // 6 saniye

    return () => clearInterval(autoScroll);
  }, [emblaApi, isUserInteracting]);

  // Mouse hover'da otomatik kaymayı duraklat
  const handleMouseEnter = useCallback(() => {
    setIsUserInteracting(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Mouse çıktıktan 3 saniye sonra otomatik kaymaya devam et
    setTimeout(() => setIsUserInteracting(false), 3000);
  }, []);

  // Touch event'leri için otomatik kaymayı duraklat
  const handleTouchStart = useCallback(() => {
    setIsUserInteracting(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Touch bittikten 5 saniye sonra tekrar başlat
    setTimeout(() => setIsUserInteracting(false), 5000);
  }, []);

  if (!slides.length) {
    return null;
  }

  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden",
        "h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh] xl:h-[816px]", // Daha iyi responsive yükseklikler
        "bg-white" // Beyaz arkaplan
      )}
      role="region"
      aria-label="Anasayfa vitrin"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {/* Embla viewport + responsive gutters */}
      <div className="relative h-full pl-[clamp(12px,3vw,60px)] pr-[clamp(12px,3vw,60px)] md:pl-[clamp(60px,6vw,120px)] md:pr-[clamp(60px,6vw,120px)] lg:pl-[clamp(80px,8vw,152px)] lg:pr-[clamp(80px,8vw,152px)]">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {slides.map((slide, index) => (
              <div key={slide.id} className="embla__slide flex-[0_0_100%] min-w-0 relative h-full rounded-xl md:rounded-2xl overflow-hidden shadow-sm md:shadow-lg">
                {/* RESPONSIVE GÖRSEL */}
                <div className="absolute inset-0">
                  {slide.desktopImageUrl || slide.mobileImageUrl ? (
                    <>
                      {/* Desktop görsel - Daha yüksek kalite ve optimize boyutlar */}
                      {slide.desktopImageUrl && (
                        <Image
                          src={slide.desktopImageUrl}
                          alt={slide.alt || "Slide"}
                        fill
                        sizes="(min-width: 1024px) 84vw, (min-width: 768px) 90vw, 92vw"
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        quality={85}
                        style={{ 
                          objectFit: "cover", 
                          objectPosition: "center center",
                          width: "100%",
                          height: "100%"
                        }}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        className="hidden md:block"
                        />
                      )}
                      {/* Mobil görsel - Optimize edilmiş boyutlar */}
                      {slide.mobileImageUrl && (
                        <Image
                          src={slide.mobileImageUrl}
                          alt={slide.alt || "Slide"}
                          fill
                          sizes="(max-width: 767px) 92vw, 0px"
                          priority={index === 0}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          quality={85}
                          style={{ 
                            objectFit: "cover", 
                            objectPosition: "center center",
                            width: "100%",
                            height: "100%"
                          }}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          className="block md:hidden"
                        />
                      )}
                      {/* Mobil görsel yoksa desktop görseli göster - Optimize edilmiş */}
                      {!slide.mobileImageUrl && slide.desktopImageUrl && (
                        <Image
                          src={slide.desktopImageUrl}
                          alt={slide.alt || "Slide"}
                          fill
                          sizes="(max-width: 767px) 92vw, 0px"
                          priority={index === 0}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          quality={85}
                          style={{ 
                            objectFit: "cover", 
                            objectPosition: "center center",
                            width: "100%",
                            height: "100%"
                          }}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          className="block md:hidden"
                        />
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-blue-600 text-base font-medium">Görsel yükleniyor...</span>
                        <p className="text-blue-500 text-sm mt-2">Lütfen bekleyin</p>
                      </div>
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
