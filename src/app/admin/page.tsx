import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';

export default async function AdminDashboard() {
  await requireAdmin();
  
  const supabase = createServiceRoleClient();
  
  // Get slider stats
  const { data: sliders } = await supabase
    .from('sliders')
    .select('id, name, slug, is_active');
  
  const { data: slides } = await supabase
    .from('slides')
    .select('id, is_published');

  const stats = [
    { label: 'Aktif Slider', value: sliders?.filter(s => s.is_active).length || 0, href: '/admin/slider' },
    { label: 'Toplam Slide', value: slides?.length || 0, href: '/admin/slider' },
    { label: 'Yayınlanmış Slide', value: slides?.filter(s => s.is_published).length || 0, href: '/admin/slider' },
    { label: 'Son Güncelleme', value: '2 saat önce', href: null }
  ];

  const quickActions = [
    {
      title: 'Motor Yönetimi',
      description: 'Motorları yönetin, fiyat ve stok güncelleyin',
      href: '/admin/motors',
      icon: '🏍️'
    },
    {
      title: 'Resim Ekle',
      description: 'Slider\'a 7-8 resim ekleyin',
      href: '/admin/slider/add-images',
      icon: '📸'
    },
    {
      title: 'Yeni Slide Ekle',
      description: 'Slider için yeni slide oluşturun',
      href: '/admin/slider/new',
      icon: '➕'
    },
    {
      title: 'Canlı Önizleme',
      description: 'Slider\'ın nasıl göründüğünü kontrol edin',
      href: '/',
      icon: '👁️'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Trend Motor admin paneline hoş geldiniz. Slider içeriklerinizi buradan yönetebilirsiniz.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              {stat.href && (
                <Link
                  href={stat.href}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Görüntüle →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Hızlı İşlemler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{action.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Son Aktiviteler
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Yeni slide eklendi</span>
              <span className="text-gray-400">2 saat önce</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Slider ayarları güncellendi</span>
              <span className="text-gray-400">1 gün önce</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Slide sıralaması değiştirildi</span>
              <span className="text-gray-400">3 gün önce</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}