'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteSlide } from '@/actions/slider';

const deleteButtonClass =
  'inline-flex items-center justify-center rounded-full border border-red-500 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-60';

export function DeleteSlideButton({
  slideId,
  redirectTo,
}: {
  slideId: string;
  redirectTo: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm('Slaytı silmek istediğinize emin misiniz?')) {
      return;
    }

    startTransition(async () => {
      const result = await deleteSlide(slideId);
      if (result?.success) {
        toast.success('Slide silindi');
        router.push(redirectTo);
        router.refresh();
      } else {
        toast.error(result?.error ?? 'Slide silinemedi');
      }
    });
  };

  return (
    <button
      type="button"
      className={deleteButtonClass}
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? 'Siliniyor…' : 'Slaytı Sil'}
    </button>
  );
}
