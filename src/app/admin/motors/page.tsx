import { Suspense } from 'react';
import { requireAdmin } from '@/lib/auth';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { getSignedUrl } from '@/lib/images';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff } from 'lucide-react';

export const revalidate = 0;

type Motorcycle = {
  id: string;
  name: string;
  slug: string;
  subtitle: string | null;
  basePrice: number;
  currency: string;
  stockStatus: string;
  isPublished: boolean;
  isFeatured: boolean;
  isNew: boolean;
  badges: string[];
  heroImageUrl: string | null;
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
};

async function getMotorcycles(): Promise<Motorcycle[]> {
  try {
    const supabase = createServiceRoleClient();

    const { data, error } = await supabase
      .from('motorcycles')
      .select(`
        id,
        name,
        slug,
        subtitle,
        base_price,
        currency,
        stock_status,
        is_published,
        is_featured,
        is_new,
        badges,
        hero_image_path,
        created_at,
        updated_at,
        brands (
          id,
          name,
          slug
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Motorcycles fetch error:', error);
      return [];
    }

    if (!data || data.length === 0) {
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
          subtitle: motor.subtitle,
          basePrice: motor.base_price,
          currency: motor.currency,
          stockStatus: motor.stock_status ?? 'in_stock',
          isPublished: motor.is_published ?? false,
          isFeatured: motor.is_featured ?? false,
          isNew: motor.is_new ?? false,
          badges: motor.badges ?? [],
          heroImageUrl,
          brand: motor.brands,
          createdAt: motor.created_at,
          updatedAt: motor.updated_at,
        };
      })
    );

    return motorcyclesWithUrls;
  } catch (error) {
    console.error('Error in getMotorcycles:', error);
    return [];
  }
}

export default async function AdminMotorsPage() {
  await requireAdmin();
  
  const motorcycles = await getMotorcycles();

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

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Motor Yönetimi
            </h1>
            <p className="text-gray-600">
              Motosikletleri yönetin, fiyat ve stok güncelleyin.
            </p>
          </div>
          <Link href="/admin/motors/new">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Motor Ekle
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Motor</p>
              <p className="text-2xl font-bold text-gray-900">{motorcycles.length}</p>
            </div>
            <div className="text-3xl">🏍️</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Yayında</p>
              <p className="text-2xl font-bold text-gray-900">
                {motorcycles.filter(m => m.isPublished).length}
              </p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Öne Çıkan</p>
              <p className="text-2xl font-bold text-gray-900">
                {motorcycles.filter(m => m.isFeatured).length}
              </p>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Yeni</p>
              <p className="text-2xl font-bold text-gray-900">
                {motorcycles.filter(m => m.isNew).length}
              </p>
            </div>
            <div className="text-3xl">🆕</div>
          </div>
        </div>
      </div>

      {/* Motor Listesi */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Motor Listesi</h2>
        </div>
        
        {motorcycles.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🏍️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz motor eklenmemiş</h3>
            <p className="text-gray-600 mb-6">İlk motorunuzu ekleyerek başlayın.</p>
            <Link href="/admin/motors/new">
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                İlk Motoru Ekle
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '30%'}}>
                    Motor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '10%'}}>
                    Marka
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '12%'}}>
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '10%'}}>
                    Stok
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '10%'}}>
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '28%'}}>
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {motorcycles.map((motor) => (
                  <tr key={motor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center max-w-md">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          {motor.heroImageUrl ? (
                            <Image
                              src={motor.heroImageUrl}
                              alt={motor.name}
                              fill
                              sizes="48px"
                              className="rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
                              <span className="text-lg text-gray-400">🏍️</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {motor.name}
                          </div>
                          {motor.subtitle && (
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {motor.subtitle}
                            </div>
                          )}
                          <div className="flex gap-1 mt-1">
                            {motor.isNew && (
                              <Badge variant="secondary" className="text-xs">YENİ</Badge>
                            )}
                            {motor.isFeatured && (
                              <Badge variant="secondary" className="text-xs">ÖNE ÇIKAN</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{motor.brand.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(motor.basePrice, motor.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`text-xs ${getStockStatusColor(motor.stockStatus)}`}>
                        {getStockStatusText(motor.stockStatus)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Badge variant={motor.isPublished ? "default" : "secondary"}>
                          {motor.isPublished ? "Yayında" : "Taslak"}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link href={`/modeller/${motor.slug}`} target="_blank">
                          <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-green-700 bg-green-50 border-2 border-green-600 rounded-lg hover:bg-green-100 transition-colors">
                            <Eye className="w-4 h-4" />
                            <span>Görüntüle</span>
                          </button>
                        </Link>
                        <Link href={`/admin/motors/${motor.id}/edit`}>
                          <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-700 bg-blue-50 border-2 border-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            <Edit className="w-4 h-4" />
                            <span>Düzenle</span>
                          </button>
                        </Link>
                        <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-700 bg-red-50 border-2 border-red-600 rounded-lg hover:bg-red-100 transition-colors">
                          <Trash2 className="w-4 h-4" />
                          <span>Sil</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
