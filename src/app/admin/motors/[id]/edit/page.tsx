import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createServiceRoleClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MotorForm from '../../_components/motor-form';

export default async function AdminMotorsEditPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  
  const { id } = await params;
  const supabase = createServiceRoleClient();

  // Get motor data
  const { data: motor, error: motorError } = await supabase
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
      brand_id,
      brands (
        id,
        name,
        slug
      )
    `)
    .eq('id', id)
    .single();

  if (motorError || !motor) {
    notFound();
  }

  // Get brands for the form
  const { data: brands } = await supabase
    .from('brands')
    .select('id, name, slug')
    .order('name');

  // Transform motor data for the form
  const initialData = {
    id: motor.id,
    name: motor.name,
    slug: motor.slug,
    subtitle: motor.subtitle,
    brandId: motor.brand_id,
    basePrice: motor.base_price,
    currency: motor.currency,
    stockStatus: motor.stock_status,
    isPublished: motor.is_published,
    isFeatured: motor.is_featured,
    isNew: motor.is_new,
    badges: motor.badges || [],
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/admin/motors"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Motor listesine dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Motor Düzenle - {motor.name}
            </h1>
            <p className="text-gray-600">
              Motor bilgilerini güncelleyin.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <MotorForm 
          brands={brands || []} 
          initialData={initialData}
          isEdit={true}
        />
      </div>
    </div>
  );
}
