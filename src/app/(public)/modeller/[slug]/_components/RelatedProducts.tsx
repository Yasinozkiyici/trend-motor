import Link from 'next/link';
import Image from 'next/image';

type RelatedMotorcycle = {
  id: string;
  name: string;
  slug: string;
  subtitle: string | null;
  base_price: number;
  currency: string;
  stock_status: string;
  hero_image_url: string | null;
  brand: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export default function RelatedProducts({
  motorcycles
}: {
  motorcycles: RelatedMotorcycle[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {motorcycles.map((motor) => {
        const priceFormatted = new Intl.NumberFormat('tr-TR', {
          style: 'currency',
          currency: motor.currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(motor.base_price);
        
        const stockLabel = {
          in_stock: 'Stokta',
          preorder: 'Ön Sipariş',
          out_of_stock: 'Stokta Yok'
        }[motor.stock_status] || 'Stokta';
        
        const stockColor = {
          in_stock: 'bg-green-100 text-green-800',
          preorder: 'bg-yellow-100 text-yellow-800',
          out_of_stock: 'bg-red-100 text-red-800'
        }[motor.stock_status] || 'bg-gray-100 text-gray-800';
        
        return (
          <Link
            key={motor.id}
            href={`/modeller/${motor.slug}`}
            className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Görsel */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
              {motor.hero_image_url ? (
                <Image
                  src={motor.hero_image_url}
                  alt={motor.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Stok Etiketi */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockColor}`}>
                  {stockLabel}
                </span>
              </div>
            </div>
            
            {/* İçerik */}
            <div className="p-4">
              {/* Marka */}
              {motor.brand && (
                <div className="text-sm text-gray-500 mb-1">
                  {motor.brand.name}
                </div>
              )}
              
              {/* Model Adı */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {motor.name}
              </h3>
              
              {/* Subtitle */}
              {motor.subtitle && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {motor.subtitle}
                </p>
              )}
              
              {/* Fiyat */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span className="text-xl font-bold text-gray-900">
                  {priceFormatted}
                </span>
                <span className="text-sm text-blue-600 group-hover:translate-x-1 transition-transform">
                  Detaylar →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

