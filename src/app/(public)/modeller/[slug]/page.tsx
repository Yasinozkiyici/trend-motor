import { notFound } from 'next/navigation';
import { createStaticClient } from '@/lib/supabase/server';
import { getSignedUrl } from '@/lib/images';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2, ArrowLeft, Phone, MessageCircle, MapPin, Clock, CheckCircle, MessageSquare, Car } from 'lucide-react';
import ProductCard from '@/app/(public)/components/ProductCard/ProductCard';

export const revalidate = 60;
export const fetchCache = 'force-cache';

type MotorcycleDetail = {
  id: string;
  name: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  basePrice: number;
  currency: string;
  stockStatus: string;
  isNew: boolean;
  isFeatured: boolean;
  badges: string[];
  heroImageUrl: string | null;
  images: Array<{
    id: string;
    url: string;
    alt: string | null;
    sortOrder: number;
    isPrimary: boolean;
  }>;
  brand: {
    id: string;
    name: string;
    slug: string;
  } | null;
  specs: Array<{
    id: string;
    name: string;
    value: string;
    category: string;
    sortOrder: number;
  }>;
};

type RelatedMotorcycle = {
  id: string;
  name: string;
  slug: string;
  brandName: string;
  brandSlug: string;
  heroImageUrl: string | null;
  basePrice: number;
  currency: string;
  stockStatus: string;
  isNew: boolean;
  isFeatured: boolean;
  badges: string[];
};

async function getMotorcycleBySlug(slug: string): Promise<MotorcycleDetail | null> {
  try {
    const supabase = createStaticClient();

    const { data: motor, error } = await supabase
      .from('motorcycles')
      .select(`
        id,
        name,
        slug,
        subtitle,
        base_price,
        currency,
        stock_status,
        is_new,
        is_featured,
        badges,
        hero_image_path,
        brands (
          id,
          name,
          slug
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Motor query error:', error);
      return null;
    }

    if (!motor) {
      return null;
    }

    // Get additional images
    const { data: images } = await supabase
      .from('motorcycle_images')
      .select('id, path, alt, sort_order, is_primary')
      .eq('motorcycle_id', motor.id)
      .order('sort_order');

    // Get specs
    const { data: specs } = await supabase
      .from('motorcycle_spec_items')
      .select('id, spec_name, spec_value, category, sort_order')
      .eq('motorcycle_id', motor.id)
      .order('category, sort_order');

    // Get hero image URL
    const heroImageUrl = motor.hero_image_path
      ? await getSignedUrl(motor.hero_image_path, 3600, 'motors')
      : null;

    // Get additional image URLs
    const imageUrls = await Promise.all(
      (images || []).map(async (img) => {
        if (!img.path) {
          return {
            id: img.id,
            url: '',
            alt: img.alt,
            sortOrder: img.sort_order,
            isPrimary: img.is_primary ?? false
          };
        }

        const signedUrl = await getSignedUrl(img.path, 3600, 'motors');

        return {
          id: img.id,
          url: signedUrl ?? '',
          alt: img.alt,
          sortOrder: img.sort_order,
          isPrimary: img.is_primary ?? false
        };
      })
    );

    return {
      id: motor.id,
      name: motor.name,
      slug: motor.slug,
      subtitle: motor.subtitle,
      description: null, // Description kolonu yok
      basePrice: motor.base_price,
      currency: motor.currency,
      stockStatus: motor.stock_status ?? 'in_stock',
      isNew: motor.is_new ?? false,
      isFeatured: motor.is_featured ?? false,
      badges: motor.badges ?? [],
      heroImageUrl,
      images: imageUrls,
      brand: motor.brands
        ? {
            id: motor.brands.id,
            name: motor.brands.name,
            slug: motor.brands.slug
          }
        : null,
      specs: (specs || []).map(spec => ({
        id: spec.id,
        name: spec.spec_name,
        value: spec.spec_value,
        category: spec.category,
        sortOrder: spec.sort_order
      }))
    };
  } catch (error) {
    console.error('Error fetching motorcycle:', error);
    return null;
  }
}

async function getRelatedMotorcycles(brandId: string, excludeId: string): Promise<RelatedMotorcycle[]> {
  try {
    const supabase = createStaticClient();

    const { data, error } = await supabase
      .from('motorcycles')
      .select(`
        id,
        name,
        slug,
        base_price,
        currency,
        stock_status,
        is_new,
        is_featured,
        badges,
        hero_image_path,
        brands (
          name,
          slug
        )
      `)
      .eq('brand_id', brandId)
      .eq('is_published', true)
      .neq('id', excludeId)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(4);

    if (error || !data) {
      return [];
    }

    const motorcyclesWithUrls = await Promise.all(
      data.map(async (motor) => {
        const heroImageUrl = motor.hero_image_path
          ? await getSignedUrl(motor.hero_image_path, 3600, 'motors')
          : null;

        return {
          id: motor.id,
          name: motor.name,
          slug: motor.slug,
          brandName: motor.brands?.name ?? 'Bilinmeyen Marka',
          brandSlug: motor.brands?.slug ?? 'bilinmeyen-marka',
          heroImageUrl,
          basePrice: motor.base_price,
          currency: motor.currency,
          stockStatus: motor.stock_status ?? 'in_stock',
          isNew: motor.is_new ?? false,
          isFeatured: motor.is_featured ?? false,
          badges: motor.badges ?? []
        };
      })
    );

    return motorcyclesWithUrls;
  } catch (error) {
    console.error('Error fetching related motorcycles:', error);
    return [];
  }
}

export default async function MotorcycleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const motorcycle = await getMotorcycleBySlug(slug);

  if (!motorcycle) {
    notFound();
  }

  const relatedMotorcycles = motorcycle.brand
    ? await getRelatedMotorcycles(motorcycle.brand.id, motorcycle.id)
    : [];

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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  // Group specs by category
  const groupedSpecs = motorcycle.specs.reduce((acc, spec) => {
    if (!acc[spec.category]) {
      acc[spec.category] = [];
    }
    acc[spec.category].push(spec);
    return acc;
  }, {} as Record<string, typeof motorcycle.specs>);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        ></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative">
          {/* Breadcrumb */}
          <div className="mb-6 md:mb-8">
            <Link
              href="/modeller"
              className="inline-flex items-center text-sm text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Modellere Dön
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div className="space-y-4 md:space-y-6">
              {/* Brand */}
              {motorcycle.brand ? (
                <Link
                  href={`/modeller?brand=${motorcycle.brand.slug}`}
                  className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-white transition-colors"
                >
                  {motorcycle.brand.name}
                </Link>
              ) : (
                <span className="inline-flex items-center text-sm font-medium text-blue-200">
                  Marka bilgisi güncelleniyor
                </span>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {motorcycle.name}
              </h1>

              {/* Subtitle */}
              {motorcycle.subtitle && (
                <p className="text-lg md:text-xl text-blue-100">{motorcycle.subtitle}</p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {motorcycle.isNew && (
                  <Badge className="bg-green-500 text-white border-0 px-3 py-1">
                    YENİ
                  </Badge>
                )}
                {motorcycle.isFeatured && (
                  <Badge className="bg-blue-500 text-white border-0 px-3 py-1">
                    ÖNE ÇIKAN
                  </Badge>
                )}
                {motorcycle.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {badge}
                  </Badge>
                ))}
                <Badge className={`${getStockStatusColor(motorcycle.stockStatus)} border`}>
                  {getStockStatusText(motorcycle.stockStatus)}
                </Badge>
              </div>

              {/* Price */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-blue-200 text-sm font-medium">Başlangıç Fiyatı</p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Garantili</span>
                  </div>
                </div>
                <p className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {formatPrice(motorcycle.basePrice, motorcycle.currency)}
                </p>
                <p className="text-blue-200 text-sm">KDV Dahil • Taksit İmkanı</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                <a
                  href="https://wa.me/905321525145?text=Merhaba, bu motor hakkında bilgi almak istiyorum:"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold text-base md:text-lg py-3 md:py-4 px-4 md:px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={motorcycle.stockStatus === 'out_of_stock'}
                >
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  <span className="text-sm md:text-base">{motorcycle.stockStatus === 'out_of_stock' ? 'Stokta Yok' : 'WhatsApp ile İletişim'}</span>
                </a>
                <Link
                  href="/iletisim"
                  className="flex-1 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold text-base md:text-lg py-3 md:py-4 px-4 md:px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <Car className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  <span className="text-sm md:text-base">Test Sürüşü</span>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
                {motorcycle.heroImageUrl ? (
                  <Image
                    src={motorcycle.heroImageUrl}
                    alt={motorcycle.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-4xl">🏍️</span>
                      </div>
                      <p className="text-lg">Görsel Hazırlanıyor</p>
                    </div>
                  </div>
                )}
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Heart className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Description */}
        {motorcycle.description && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Hakkında</h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">{motorcycle.description}</p>
          </div>
        )}

        {/* Specifications */}
        {Object.keys(groupedSpecs).length > 0 && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8 md:mb-16">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Teknik Özellikler</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {Object.entries(groupedSpecs).map(([category, specs]) => (
                <div key={category} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 pb-3 border-b-2 border-blue-600 flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {category}
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {specs.map((spec) => (
                      <div key={spec.id} className="flex justify-between items-center py-3 md:py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                        <span className="text-gray-700 font-medium text-xs md:text-sm">{spec.name}</span>
                        <span className="font-bold text-gray-900 text-right text-xs md:text-sm bg-blue-50 px-2 md:px-3 py-1 rounded-full">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Gallery */}
        {motorcycle.images.length > 0 && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 p-10 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Galeri</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {motorcycle.images.map((image, index) => (
                <div key={image.id} className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                  {image.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || motorcycle.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                      <span className="text-sm">Görsel hazırlanıyor</span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🔍</span>
                      </div>
                    </div>
                  </div>
                  {/* Image Number */}
                  <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 rounded-3xl p-12 mb-16 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          ></div>
          <div className="relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">İletişim Bilgileri</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <a href="tel:+905321525145" className="group text-center hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
                  <Phone className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Telefon</h3>
                <p className="text-blue-200 text-lg font-medium">+90 532 152 51 45</p>
                <p className="text-blue-300 text-sm mt-2">7/24 Destek</p>
              </a>
              <a href="https://wa.me/905321525145" target="_blank" rel="noopener noreferrer" className="group text-center hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3">WhatsApp</h3>
                <p className="text-blue-200 text-lg font-medium">Hemen İletişim</p>
                <p className="text-blue-300 text-sm mt-2">Anında Yanıt</p>
              </a>
              <div className="group text-center hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
                  <MapPin className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Adres</h3>
                <p className="text-blue-200 text-lg font-medium">Turgutlu/Manisa</p>
                <p className="text-blue-300 text-sm mt-2">Merkez Ofis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedMotorcycles.length > 0 && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 p-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Benzer Modeller</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
              <p className="text-gray-600 text-lg mt-4">Aynı kategorideki diğer modellerimizi keşfedin</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedMotorcycles.map((motor) => (
                <ProductCard key={motor.id} {...motor} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
