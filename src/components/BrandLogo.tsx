'use client';

import Image from 'next/image';

export type BrandType = 'kanuni' | 'bajaj' | 'spare';

interface BrandLogoProps {
  brand: BrandType;
  className?: string;
  alt?: string;
}

const brandConfig = {
  kanuni: {
    src: '/kanuni.svg',
    alt: 'Kanuni Motor',
    className: 'brand-logo-kanuni',
  },
  bajaj: {
    src: '/bajaj.svg',
    alt: 'Bajaj Motor',
    className: 'brand-logo-bajaj',
  },
  spare: {
    src: '/spare.svg',
    alt: 'Yedek Parça',
    className: 'brand-logo-spare',
  },
};

export default function BrandLogo({ brand, className = '', alt }: BrandLogoProps) {
  const config = brandConfig[brand];
  
  return (
    <Image
      src={config.src}
      alt={alt || config.alt}
      width={229} // Kanuni'nin genişliği (en büyük)
      height={57}  // Kanuni'nin yüksekliği (en büyük)
      className={`${config.className} ${className}`}
      priority
      quality={100}
    />
  );
}

// Kullanım örnekleri:
// <BrandLogo brand="kanuni" />
// <BrandLogo brand="bajaj" className="mx-auto" />
// <BrandLogo brand="spare" alt="Özel yedek parça logosu" />
