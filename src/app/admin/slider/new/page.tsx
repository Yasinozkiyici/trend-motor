'use client';

import { useState, useEffect } from 'react';
import { createSlide } from '@/actions/slider';
import { toast } from 'sonner';
import Link from 'next/link';

export default function NewSlidePage() {
  const [sliderId, setSliderId] = useState<string>('');
  const [formData, setFormData] = useState({
    eyebrow: '',
    title: '',
    description: '',
    cta_label: '',
    cta_url: '',
    text_align: 'left' as 'left' | 'center' | 'right',
    overlay_opacity: 0.35,
    text_color: '#FFFFFF',
    button_variant: 'primary',
    is_published: false,
    publish_at: '',
    unpublish_at: '',
  });

  const [desktopImage, setDesktopImage] = useState<File | null>(null);
  const [mobileImage, setMobileImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get slider ID from URL or use a default
    const getSliderId = async () => {
      try {
        const response = await fetch('/api/slider-id');
        const data = await response.json();
        if (data.success) {
          setSliderId(data.sliderId);
        }
      } catch (error) {
        console.error('Error fetching slider ID:', error);
        // Fallback to a default ID if needed
        setSliderId('home-hero-slider-id');
      }
    };
    
    getSliderId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!desktopImage) {
      toast.error('Desktop görsel gerekli');
      return;
    }

    if (!sliderId) {
      toast.error('Slider ID bulunamadı');
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });
      
      // Add images
      formDataToSend.append('desktop_image', desktopImage);
      if (mobileImage) {
        formDataToSend.append('mobile_image', mobileImage);
      }

      const result = await createSlide(sliderId, formDataToSend);
      
      if (result.success) {
        toast.success('Slide başarıyla oluşturuldu');
        window.location.href = '/admin/slider';
      } else {
        toast.error(result.error || 'Slide oluşturulamadı');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (setter: (file: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setter(file);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Yeni Slide Ekle
            </h1>
            <p className="text-gray-600">
              Anasayfa slider'ı için yeni slide oluşturun
            </p>
          </div>
          <Link
            href="/admin/slider"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Geri Dön
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Temel Bilgiler</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eyebrow (Üst Metin)
              </label>
              <input
                type="text"
                value={formData.eyebrow}
                onChange={(e) => handleChange('eyebrow', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: Yeni Model"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ana başlık"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Slide açıklaması"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Call-to-Action</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buton Metni
              </label>
              <input
                type="text"
                value={formData.cta_label}
                onChange={(e) => handleChange('cta_label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: Detayları Gör"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buton URL
              </label>
              <input
                type="url"
                value={formData.cta_url}
                onChange={(e) => handleChange('cta_url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Görseller</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desktop Görsel *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange(setDesktopImage)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Önerilen boyut: 1920x1080px
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Görsel
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange(setMobileImage)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Önerilen boyut: 768x1024px
              </p>
            </div>
          </div>
        </div>

        {/* Styling */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Stil Ayarları</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin Hizalama
              </label>
              <select
                value={formData.text_align}
                onChange={(e) => handleChange('text_align', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="left">Sol</option>
                <option value="center">Orta</option>
                <option value="right">Sağ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overlay Opacity
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={formData.overlay_opacity}
                onChange={(e) => handleChange('overlay_opacity', parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(formData.overlay_opacity * 100)}%
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin Rengi
              </label>
              <input
                type="color"
                value={formData.text_color}
                onChange={(e) => handleChange('text_color', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Publish Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Yayın Ayarları</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => handleChange('is_published', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">
                Hemen yayınla
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yayın Tarihi
                </label>
                <input
                  type="datetime-local"
                  value={formData.publish_at}
                  onChange={(e) => handleChange('publish_at', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yayından Kaldırma Tarihi
                </label>
                <input
                  type="datetime-local"
                  value={formData.unpublish_at}
                  onChange={(e) => handleChange('unpublish_at', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/slider"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Kaydediliyor...' : 'Slide Oluştur'}
          </button>
        </div>
      </form>
    </div>
  );
}