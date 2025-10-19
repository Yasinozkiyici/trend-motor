import { Suspense } from 'react';
import { createStaticClient } from '@/lib/supabase/server';
import { getSignedUrl } from '@/lib/images';
import Link from 'next/link';
import SortSelect from './_components/SortSelect';
import ProductCard from '@/app/(public)/components/ProductCard/ProductCard';

export const revalidate = 60;
export const fetchCache = 'force-cache';

type Motorcycle = {
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

async function getMotorcycles(searchParams: {
  brand?: string;
  category?: string;
  sort?: string;
}) {
  try {
    const supabase = createStaticClient();
    
    let query = supabase
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
      .order('sort_order');
    
    // Marka filtresi
    if (searchParams.brand) {
      const { data: brand } = await supabase
        .from('brands')
        .select('id')
        .eq('slug', searchParams.brand)
        .single();
      
      if (brand) {
        query = query.eq('brand_id', brand.id);
      }
    }
    
    // Kategori filtresi
    if (searchParams.category) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', searchParams.category)
        .single();
      
      if (category) {
        const { data: motorIds } = await supabase
          .from('motorcycle_categories')
          .select('motorcycle_id')
          .eq('category_id', category.id);
        
        if (motorIds && motorIds.length > 0) {
          query = query.in('id', motorIds.map(m => m.motorcycle_id));
        }
      }
    }
    
    // Sıralama
    const sortBy = searchParams.sort || 'name';
    switch (sortBy) {
      case 'price-asc':
        query = query.order('base_price', { ascending: true });
        break;
      case 'price-desc':
        query = query.order('base_price', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      default:
        query = query.order('sort_order').order('name');
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Motorcycles fetch error:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Hero görselleri için signed URL'ler al
    const motorcyclesWithUrls: Motorcycle[] = await Promise.all(
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
    console.error('Error in getMotorcycles:', error);
    return [];
  }
}

async function getBrands() {
  try {
    const supabase = createStaticClient();
    
    const { data } = await supabase
      .from('brands')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('name');
    
    return data || [];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const supabase = createStaticClient();
    
    const { data } = await supabase
      .from('categories')
      .select('id, name, slug')
      .order('sort_order');
    
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function ModelsPage({
  searchParams
}: {
  searchParams: Promise<{ brand?: string; category?: string; sort?: string; }>
}) {
  const resolvedSearchParams = await searchParams;
  const [motorcycles, brands, categories] = await Promise.all([
    getMotorcycles(resolvedSearchParams),
    getBrands(),
    getCategories()
  ]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1600px] px-8 lg:px-6 md:px-4 py-12">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Modellerimiz
          </h1>
          <p className="text-gray-600">
            Tüm motor modellerimizi keşfedin
          </p>
        </div>
        
        {/* Filtreler */}
        <div className="mb-8 flex flex-wrap gap-4">
          {/* Marka Filtresi */}
          {brands.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marka
              </label>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/modeller"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !resolvedSearchParams.brand
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Tümü
                </Link>
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/modeller?brand=${brand.slug}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      resolvedSearchParams.brand === brand.slug
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Sıralama */}
          <div className="ml-auto">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sıralama
            </label>
            <SortSelect currentSort={resolvedSearchParams.sort || 'name'} />
          </div>
        </div>
        
        {/* Motor Listesi */}
        {motorcycles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Seçilen filtrelere uygun motor bulunamadı.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {motorcycles.map((motor) => (
              <ProductCard key={motor.id} {...motor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


