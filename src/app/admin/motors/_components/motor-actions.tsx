'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { togglePublishMotor, toggleFeaturedMotor, deleteMotor } from '@/actions/motors';

export default function MotorActions({
  motorId,
  motorSlug,
  isPublished,
  isFeatured
}: {
  motorId: string;
  motorSlug: string;
  isPublished: boolean;
  isFeatured: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleTogglePublish = () => {
    startTransition(async () => {
      const result = await togglePublishMotor(motorId, !isPublished);
      
      if (result.success) {
        toast.success(isPublished ? 'Motor yayından kaldırıldı' : 'Motor yayınlandı');
        router.refresh();
      } else {
        toast.error(result.error || 'İşlem başarısız');
      }
    });
  };
  
  const handleToggleFeatured = () => {
    startTransition(async () => {
      const result = await toggleFeaturedMotor(motorId, !isFeatured);
      
      if (result.success) {
        toast.success(isFeatured ? 'Öne çıkandan kaldırıldı' : 'Öne çıkarıldı');
        router.refresh();
      } else {
        toast.error(result.error || 'İşlem başarısız');
      }
    });
  };
  
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteMotor(motorId);
      
      if (result.success) {
        toast.success('Motor silindi');
        router.refresh();
      } else {
        toast.error(result.error || 'Silme başarısız');
      }
      
      setShowDeleteConfirm(false);
    });
  };
  
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/modeller/${motorSlug}`}
        target="_blank"
        className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title="Önizle"
      >
        👁️
      </Link>
      
      <Link
        href={`/admin/motors/${motorId}`}
        className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title="Düzenle"
      >
        ✏️
      </Link>
      
      <button
        onClick={handleTogglePublish}
        disabled={isPending}
        className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        title={isPublished ? 'Yayından Kaldır' : 'Yayınla'}
      >
        {isPublished ? '🔓' : '🔒'}
      </button>
      
      <button
        onClick={handleToggleFeatured}
        disabled={isPending}
        className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        title={isFeatured ? 'Öne Çıkandan Kaldır' : 'Öne Çıkar'}
      >
        {isFeatured ? '⭐' : '☆'}
      </button>
      
      {showDeleteConfirm ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
          >
            Evet, Sil
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            disabled={isPending}
            className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            İptal
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isPending}
          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          title="Sil"
        >
          🗑️
        </button>
      )}
    </div>
  );
}


