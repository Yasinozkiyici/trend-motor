import { requireAdmin } from '@/lib/auth';
import { createServiceRoleClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MotorForm from '../_components/motor-form';

export default async function AdminMotorsNewPage() {
  await requireAdmin();

  // Get brands for the form
  const supabase = createServiceRoleClient();
  const { data: brands } = await supabase
    .from('brands')
    .select('id, name, slug')
    .order('name');

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
              Yeni Motor Ekle
            </h1>
            <p className="text-gray-600">
              Yeni bir motosiklet modeli ekleyin.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <MotorForm brands={brands || []} />
      </div>
    </div>
  );
}