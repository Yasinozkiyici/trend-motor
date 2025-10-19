import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { getSignedUrl } from '@/lib/images';
import { SlideForm } from '@/app/admin/slider/_components/slide-form';
import { DeleteSlideButton } from '@/app/admin/slider/_components/delete-slide-button';

export default async function EditSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const supabase = createServiceRoleClient();
  const { data: slide, error } = await supabase
    .from('slides')
    .select(
      `
        id,
        slider_id,
        eyebrow,
        title,
        description,
        cta_label,
        cta_url,
        text_align,
        overlay_opacity,
        text_color,
        button_variant,
        alt,
        is_published,
        publish_at,
        unpublish_at,
        desktop_image_path,
        mobile_image_path,
        sliders(id, name, slug)
      `
    )
    .eq('id', id)
    .maybeSingle();

  if (error || !slide) {
    notFound();
  }

  const [desktopImageUrl, mobileImageUrl] = await Promise.all([
    getSignedUrl(slide.desktop_image_path ?? ''),
    getSignedUrl(slide.mobile_image_path ?? ''),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">
            Slide Düzenle – {slide.sliders?.name ?? 'Bilinmeyen Slider'}
          </h1>
          <p className="text-sm text-slate-300">
            Slayt içeriklerini güncelleyin ve yayın durumunu yönetin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/slider?highlight=${slide.slider_id}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Slider listesine dön
          </Link>
          <DeleteSlideButton slideId={slide.id} redirectTo="/admin/slider" />
        </div>
      </div>

      <SlideForm
        sliderId={slide.slider_id}
        mode="edit"
        slide={{
          id: slide.id,
          eyebrow: slide.eyebrow,
          title: slide.title,
          description: slide.description,
          ctaLabel: slide.cta_label,
          ctaUrl: slide.cta_url,
          textAlign: slide.text_align,
          overlayOpacity: Number(slide.overlay_opacity ?? 0.35),
          textColor: slide.text_color ?? '#ffffff',
          buttonVariant: slide.button_variant ?? 'primary',
          alt: slide.alt,
          isPublished: slide.is_published,
          publishAt: slide.publish_at,
          unpublishAt: slide.unpublish_at,
          desktopImagePath: slide.desktop_image_path, // Eklendi
          mobileImagePath: slide.mobile_image_path, // Eklendi
          desktopImageUrl: desktopImageUrl,
          mobileImageUrl: mobileImageUrl,
        }}
      />
    </div>
  );
}
