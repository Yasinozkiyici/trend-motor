import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { requireAdmin } from '@/lib/auth';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { getSignedUrl } from '@/lib/images';
import { Button } from '@/components/ui/button';
import MotorForm from '../_components/motor-form';

type AdminMotorsEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminMotorsEditPage({ params }: AdminMotorsEditPageProps) {
  await requireAdmin();

  const { id } = await params;
  const supabase = createServiceRoleClient();

  const [{ data: motor, error: motorError }, { data: brands }] = await Promise.all([
    supabase
      .from('motorcycles')
      .select(
        `
          id,
          name,
          slug,
          subtitle,
          description,
          brand_id,
          base_price,
          currency,
          stock_status,
          is_published,
          is_featured,
          is_new,
          badges,
          hero_image_path
        `
      )
      .eq('id', id)
      .maybeSingle(),
    supabase
      .from('brands')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('name')
  ]);

  if (motorError || !motor) {
    notFound();
  }

  const heroImageUrl = motor.hero_image_path
    ? await getSignedUrl(motor.hero_image_path, 3600, 'motors')
    : null;

  const initialData = {
    id: motor.id,
    name: motor.name,
    slug: motor.slug,
    subtitle: motor.subtitle ?? '',
    description: motor.description ?? '',
    brandId: motor.brand_id,
    basePrice: motor.base_price !== null ? motor.base_price.toString() : '',
    currency: motor.currency,
    stockStatus: motor.stock_status ?? 'in_stock',
    isPublished: motor.is_published ?? false,
    isFeatured: motor.is_featured ?? false,
    isNew: motor.is_new ?? false,
    badges: motor.badges ?? [],
    heroImageUrl
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/admin/motors"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Motor listesine dön
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Motor Düzenle - {motor.name}
          </h1>
          <p className="text-gray-600">
            Motor bilgilerini güncelleyin, yayın durumunu yönetin ve görselleri güncel tutun.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={`/modeller/${motor.slug}`} target="_blank">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Canlı Görünüm
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-8 shadow-sm border border-gray-200 rounded-xl">
        <MotorForm brands={brands || []} initialData={initialData} isEdit />
      </div>
    </div>
  );
}
