'use client';

import Link from 'next/link';
import { deleteSlide, reorderSlides } from '@/actions/slider';
import { toast } from 'sonner';
import { useState } from 'react';

interface Slide {
  id: string;
  title: string;
  eyebrow: string | null;
  is_published: boolean;
  sort_order: number;
  desktop_image_path: string;
  created_at: string;
}

interface SlidesListProps {
  slides: Slide[];
  sliderId: string;
}

export function SlidesList({ slides, sliderId }: SlidesListProps) {
  const [isReordering, setIsReordering] = useState(false);

  const handleDelete = async (slideId: string, title: string) => {
    if (!confirm(`"${title}" slide'ını silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      const result = await deleteSlide(slideId);
      
      if (result.success) {
        toast.success('Slide başarıyla silindi');
        window.location.reload();
      } else {
        toast.error(result.error || 'Slide silinemedi');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };

  const handleReorder = async (newOrder: Slide[]) => {
    setIsReordering(true);
    
    try {
      const slideIds = newOrder.map(slide => slide.id);
      const result = await reorderSlides(sliderId, slideIds);
      
      if (result.success) {
        toast.success('Sıralama güncellendi');
        window.location.reload();
      } else {
        toast.error(result.error || 'Sıralama güncellenemedi');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setIsReordering(false);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    
    const newOrder = [...slides];
    [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    handleReorder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === slides.length - 1) return;
    
    const newOrder = [...slides];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    handleReorder(newOrder);
  };

  if (slides.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Henüz slide eklenmemiş</p>
        <Link
          href="/admin/slider/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          İlk Slide'ı Ekle
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Drag Handle */}
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0 || isReordering}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  title="Yukarı taşı"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === slides.length - 1 || isReordering}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  title="Aşağı taşı"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Slide Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{slide.title}</h3>
                  {slide.is_published ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yayında
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Taslak
                    </span>
                  )}
                </div>
                {slide.eyebrow && (
                  <p className="text-sm text-gray-600 mt-1">{slide.eyebrow}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Sıra: {slide.sort_order} • Oluşturulma: {new Date(slide.created_at).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Link
                href={`/admin/slider/${slide.id}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Düzenle
              </Link>
              <button
                onClick={() => handleDelete(slide.id, slide.title)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

