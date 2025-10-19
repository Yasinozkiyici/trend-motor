import { ReactNode } from 'react';
import { createStaticClient } from '@/lib/supabase/server';
import { getSignedUrl } from '@/lib/images';
import ProductCarousel from '@/app/(public)/components/ProductCarousel/ProductCarousel';

export const revalidate = 60;
export const fetchCache = 'force-cache';

export type FeaturedMotorcycle = {
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
};

async function getFeaturedMotorcycles(): Promise<FeaturedMotorcycle[]> {
  try {
    const supabase = createStaticClient();
    
    // Supabase bağlantısını kontrol et
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://mock.supabase.co') {
      console.warn('Supabase environment variables not configured. Skipping featured motorcycles fetch.');
      return [];
    }
    
    const { data, error } = await supabase
      .from('motorcycles')
      .select(`
        id,
        name,
        slug,
        base_price,
        currency,
        stock_status,
        hero_image_path,
        is_new,
        is_featured,
        badges,
        brands (
          name,
          slug
        )
      `)
      .eq('is_published', true)
      .order('is_featured', { ascending: false })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(12);
    
    if (error) {
      console.error('Featured motorcycles fetch error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return [];
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Hero görselleri için signed URL'ler al
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
    console.error('Error in getFeaturedMotorcycles:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error: error
    });
    return [];
  }
}

export default async function HomeFeaturedProvider({
  children
}: {
  children: ReactNode;
}) {
  const motorcycles = await getFeaturedMotorcycles();
  
  return (
    <>
      {motorcycles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-[1600px] px-8 lg:px-6 md:px-4">
            <ProductCarousel products={motorcycles} />
          </div>
        </section>
      )}
      {children}
    </>
  );
}

