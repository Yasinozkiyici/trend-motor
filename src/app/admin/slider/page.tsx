import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import Link from 'next/link';
import { SliderSettingsForm } from './components/SliderSettingsForm';
import { SlidesList } from './components/SlidesList';

export default async function SliderManagementPage() {
  await requireAdmin();
  
  const supabase = createServiceRoleClient();
  
  // Get home-hero slider
  const { data: slider } = await supabase
    .from('sliders')
    .select(`
      id,
      name,
      slug,
      is_active,
      slider_settings (*)
    `)
    .eq('slug', 'home-hero')
    .single();
  
  // Get slides
  const { data: slides } = await supabase
    .from('slides')
    .select('*')
    .eq('slider_id', slider?.id)
    .order('sort_order');

  if (!slider) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Hata</h3>
          <p className="text-red-700 mt-1">
            Home-hero slider bulunamadı. Lütfen migration'ı çalıştırın.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Slider Yönetimi
            </h1>
            <p className="text-gray-600">
              Anasayfa slider'ını ve slide'larını yönetin
            </p>
          </div>
          <Link
            href="/admin/slider/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Yeni Slide Ekle
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Slider Settings */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Slider Ayarları
              </h2>
            </div>
            <div className="p-6">
              <SliderSettingsForm 
                sliderId={slider.id} 
                settings={slider.slider_settings?.[0]} 
              />
            </div>
          </div>
        </div>

        {/* Slides List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Slide'lar ({slides?.length || 0})
              </h2>
            </div>
            <div className="p-6">
              <SlidesList 
                slides={slides || []} 
                sliderId={slider.id} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}