'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  brandName: string;
  brandSlug: string;
  heroImageUrl: string | null;
  basePrice: number;
  currency: string;
  stockStatus: string;
  isNew?: boolean;
  isFeatured?: boolean;
  badges?: string[];
  className?: string;
};

export default function ProductCard({
  id,
  name,
  slug,
  brandName,
  brandSlug,
  heroImageUrl,
  basePrice,
  currency,
  stockStatus,
  isNew = false,
  isFeatured = false,
  badges = [],
  className
}: ProductCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency === 'TRY' ? 'TRY' : currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'Stokta';
      case 'low_stock':
        return 'Az Stok';
      case 'out_of_stock':
        return 'Stok Yok';
      default:
        return 'Bilinmiyor';
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const message = `Merhaba, ${name} modeli hakkında bilgi almak istiyorum.`;
    // Telefon numarası: +90 532 152 51 45
    const phoneNumber = '905321525145';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={cn(
      "group bg-white border border-gray-100 transition-all duration-200",
      className
    )}>
      {/* Görsel */}
      <Link href={`/modeller/${slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">🏍️</span>
                </div>
                <p className="text-sm">Görsel Yok</p>
              </div>
            </div>
          )}
          
          {/* Minimal Badge'ler - sadece çok gerekirse */}
          {(isNew || isFeatured) && (
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {isNew && (
                <span className="px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider bg-white/90 text-gray-600 backdrop-blur-sm">
                  Yeni
                </span>
              )}
              {isFeatured && (
                <span className="px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider bg-white/90 text-gray-600 backdrop-blur-sm">
                  Öne Çıkan
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* İçerik - Kurumsal ve Sade */}
      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
        {/* Marka - minimal */}
        <Link href={`/modeller?brand=${brandSlug}`}>
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-gray-400 font-medium">
            {brandName}
          </p>
        </Link>

        {/* Model Adı - kurumsal */}
        <Link href={`/modeller/${slug}`}>
          <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-1 leading-tight tracking-tight">
            {name}
          </h3>
        </Link>

        {/* Ayırıcı Çizgi */}
        <div className="border-t border-gray-100"></div>

        {/* Fiyat ve WhatsApp - Kurumsal Düzen */}
        <div className="space-y-2">
          {/* Fiyat */}
          <div className="flex items-baseline justify-between">
            <span className="text-sm md:text-lg font-semibold text-gray-900 tracking-tight">
              {formatPrice(basePrice, currency)}
            </span>
            
            {/* Minimal Stok Göstergesi */}
            {stockStatus === 'out_of_stock' && (
              <span className="text-[8px] md:text-[9px] uppercase tracking-wider text-gray-400">
                Tükendi
              </span>
            )}
          </div>

          {/* WhatsApp Butonu - Kurumsal */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full flex items-center justify-center gap-2 px-2 md:px-3 py-2 bg-gray-900 text-white text-[10px] md:text-xs font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200"
            disabled={stockStatus === 'out_of_stock'}
          >
            <MessageCircle className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>İletişime Geç</span>
          </button>
        </div>
      </div>
    </div>
  );
}

