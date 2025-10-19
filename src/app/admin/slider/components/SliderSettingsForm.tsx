'use client';

import { useState } from 'react';
import { updateSliderSettings } from '@/actions/slider';
import { toast } from 'sonner';

interface SliderSettingsFormProps {
  sliderId: string;
  settings?: {
    autoplay_ms: number;
    transition_ms: number;
    loop: boolean;
    pause_on_hover: boolean;
    show_arrows: boolean;
    show_dots: boolean;
    show_progress: boolean;
  };
}

export function SliderSettingsForm({ sliderId, settings }: SliderSettingsFormProps) {
  const [formData, setFormData] = useState({
    autoplay_ms: settings?.autoplay_ms || 6000,
    transition_ms: settings?.transition_ms || 600,
    loop: settings?.loop ?? true,
    pause_on_hover: settings?.pause_on_hover ?? true,
    show_arrows: settings?.show_arrows ?? false,
    show_dots: settings?.show_dots ?? false,
    show_progress: settings?.show_progress ?? true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateSliderSettings(sliderId, formData);
      
      if (result.success) {
        toast.success('Ayarlar başarıyla güncellendi');
      } else {
        toast.error(result.error || 'Ayarlar güncellenemedi');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Autoplay */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Autoplay Süresi (ms)
        </label>
        <input
          type="number"
          min="2000"
          max="15000"
          step="1000"
          value={formData.autoplay_ms}
          onChange={(e) => handleChange('autoplay_ms', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Slide'lar arası geçiş süresi (2000-15000ms)
        </p>
      </div>

      {/* Transition */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Geçiş Animasyonu (ms)
        </label>
        <input
          type="number"
          min="200"
          max="1200"
          step="100"
          value={formData.transition_ms}
          onChange={(e) => handleChange('transition_ms', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Animasyon süresi (200-1200ms)
        </p>
      </div>

      {/* Loop */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="loop"
          checked={formData.loop}
          onChange={(e) => handleChange('loop', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="loop" className="ml-2 block text-sm text-gray-700">
          Sonsuz döngü
        </label>
      </div>

      {/* Pause on Hover */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="pause_on_hover"
          checked={formData.pause_on_hover}
          onChange={(e) => handleChange('pause_on_hover', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="pause_on_hover" className="ml-2 block text-sm text-gray-700">
          Hover'da duraklat
        </label>
      </div>

      {/* Show Arrows */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="show_arrows"
          checked={formData.show_arrows}
          onChange={(e) => handleChange('show_arrows', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="show_arrows" className="ml-2 block text-sm text-gray-700">
          Ok tuşlarını göster
        </label>
      </div>

      {/* Show Dots */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="show_dots"
          checked={formData.show_dots}
          onChange={(e) => handleChange('show_dots', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="show_dots" className="ml-2 block text-sm text-gray-700">
          Nokta navigasyonunu göster
        </label>
      </div>

      {/* Show Progress */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="show_progress"
          checked={formData.show_progress}
          onChange={(e) => handleChange('show_progress', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="show_progress" className="ml-2 block text-sm text-gray-700">
          Progress bar'ı göster
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
      </button>
    </form>
  );
}

