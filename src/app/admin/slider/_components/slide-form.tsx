'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createSlide, updateSlide } from '@/actions/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Range } from '@/components/ui/range';
import { ColorInput } from '@/components/ui/color-input';
import { FileDropzone } from '@/components/ui/file-dropzone';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import SliderHero from '@/app/(public)/components/SliderHero/SliderHero';
import { HomeHeroProviderClient } from '@/app/(public)/components/SliderHero/SliderHeroContext';
import type { SliderHeroData } from '@/app/(public)/home-hero-provider';

const slideSchema = z.object({
  eyebrow: z.string().max(120).optional().nullable(),
  title: z.string().max(180).optional().nullable(), // Opsiyonel yapıldı
  description: z.string().max(500).optional().nullable(),
  ctaLabel: z.string().max(80).optional().nullable(),
  ctaUrl: z
    .string()
    .url('Geçerli bir URL giriniz')
    .optional()
    .or(z.literal(''))
    .nullable(),
  textAlign: z.enum(['left', 'center', 'right']),
  overlayOpacity: z.coerce.number().min(0).max(1),
  textColor: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Geçerli hex renk giriniz'),
  buttonVariant: z.enum(['primary', 'secondary', 'ghost']),
  alt: z.string().max(200).optional().nullable(), // Opsiyonel yapıldı
  isPublished: z.boolean(),
  publishAt: z.string().optional().nullable(),
  unpublishAt: z.string().optional().nullable(),
  // Yeni alanlar
  imageSource: z.enum(['upload', 'url']).default('upload'),
  imageUrl: z.string().url('Geçerli bir görsel URL giriniz').optional().or(z.literal('')),
});

type SlideFormValues = z.infer<typeof slideSchema>;

type SlideFormProps = {
  sliderId: string;
  mode: 'create' | 'edit';
  slide?: {
    id: string;
    eyebrow: string | null;
    title: string | null; // Opsiyonel yapıldı
    description: string | null;
    ctaLabel: string | null;
    ctaUrl: string | null;
    textAlign: 'left' | 'center' | 'right';
    overlayOpacity: number;
    textColor: string;
    buttonVariant: 'primary' | 'secondary' | 'ghost';
    alt: string | null;
    isPublished: boolean;
    publishAt: string | null;
    unpublishAt: string | null;
    desktopImagePath: string | null; // Eklendi
    mobileImagePath: string | null; // Eklendi
    desktopImageUrl: string | null;
    mobileImageUrl: string | null;
  };
};

function toDateInputValue(value: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 16);
}

function buildPreviewData(
  sliderId: string,
  values: Partial<SlideFormValues>,
  desktopImageUrl: string | null,
  mobileImageUrl: string | null,
  slideId?: string
): SliderHeroData {
  // URL ile eklenen görsel varsa onu kullan
  const finalDesktopImageUrl = values.imageSource === 'url' && values.imageUrl 
    ? values.imageUrl 
    : desktopImageUrl;
  return {
    id: sliderId,
    name: 'Önizleme',
    slug: 'preview',
    settings: {
      autoplayMs: 8000,
      transitionMs: 600,
      loop: true,
      pauseOnHover: true,
      showProgress: true,
      showArrows: true,
      showDots: true,
    },
    slides: [
      {
        id: slideId ?? 'preview-slide',
        eyebrow: values.eyebrow ?? null,
        title: values.title || 'Başlık henüz girilmedi',
        description: values.description ?? null,
        ctaLabel: values.ctaLabel ?? null,
        ctaUrl: values.ctaUrl ?? null,
        alt: values.alt || values.title || 'Önizleme görseli',
        overlayOpacity: Number.isFinite(values.overlayOpacity)
          ? Number(values.overlayOpacity)
          : 0.35,
        textAlign: values.textAlign ?? 'left',
        textColor: values.textColor ?? '#ffffff',
        buttonVariant: values.buttonVariant ?? 'primary',
        desktopImagePath: '',
        mobileImagePath: null,
        desktopImageUrl: finalDesktopImageUrl,
        mobileImageUrl,
      },
    ],
  };
}

export function SlideForm({ sliderId, mode, slide }: SlideFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [desktopPreview, setDesktopPreview] = useState<string | null>(
    slide?.desktopImageUrl ?? null
  );
  const [mobilePreview, setMobilePreview] = useState<string | null>(
    slide?.mobileImageUrl ?? null
  );
  const [fileError, setFileError] = useState<string | null>(null);

  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      eyebrow: slide?.eyebrow ?? '',
      title: slide?.title ?? '',
      description: slide?.description ?? '',
      ctaLabel: slide?.ctaLabel ?? '',
      ctaUrl: slide?.ctaUrl ?? '',
      textAlign: slide?.textAlign ?? 'left',
      overlayOpacity: slide?.overlayOpacity ?? 0.35,
      textColor: slide?.textColor ?? '#ffffff',
      buttonVariant: slide?.buttonVariant ?? 'primary',
      alt: slide?.alt ?? '',
      isPublished: slide?.isPublished ?? false,
      publishAt: toDateInputValue(slide?.publishAt ?? null),
      unpublishAt: toDateInputValue(slide?.unpublishAt ?? null),
      // Yeni alanlar
      imageSource: 'upload',
      imageUrl: '',
    },
  });

  const watchedValues = useWatch({ control: form.control });
  const overlayValue = Number(watchedValues?.overlayOpacity ?? 0);

  useEffect(() => {
    if (!desktopFile) {
      return;
    }
    const url = URL.createObjectURL(desktopFile);
    setDesktopPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [desktopFile]);

  useEffect(() => {
    if (!mobileFile) {
      return;
    }
    const url = URL.createObjectURL(mobileFile);
    setMobilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [mobileFile]);

  const previewData = useMemo(
    () =>
      buildPreviewData(
        sliderId,
        watchedValues ?? {},
        desktopPreview,
        mobilePreview,
        slide?.id
      ),
    [desktopPreview, mobilePreview, sliderId, slide?.id, watchedValues]
  );

  const onSubmit = (values: SlideFormValues) => {
    if (mode === 'create' && !desktopFile) {
      setFileError('Desktop görseli zorunludur');
      return;
    }

    setFileError(null);
    const formData = new FormData();
    formData.append('slider_id', sliderId);
    formData.append('title', values.title);
    formData.append('eyebrow', values.eyebrow ?? '');
    formData.append('description', values.description ?? '');
    formData.append('cta_label', values.ctaLabel ?? '');
    formData.append('cta_url', values.ctaUrl ?? '');
    formData.append('text_align', values.textAlign);
    formData.append('overlay_opacity', String(values.overlayOpacity));
    formData.append('text_color', values.textColor);
    formData.append('button_variant', values.buttonVariant);
    formData.append('alt', values.alt);
    formData.append('is_published', String(values.isPublished));
    formData.append('publish_at', values.publishAt ?? '');
    formData.append('unpublish_at', values.unpublishAt ?? '');
    formData.append('image_source', values.imageSource);
    formData.append('image_url', values.imageUrl ?? '');

    if (desktopFile) {
      formData.append('desktop_image', desktopFile);
    }
    if (mobileFile) {
      formData.append('mobile_image', mobileFile);
    }

    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createSlide(formData)
          : await updateSlide(slide!.id, formData);

      if (result?.success) {
        toast.success('Slide kaydedildi');
        if (mode === 'create') {
          form.reset();
          setDesktopFile(null);
          setMobileFile(null);
          setDesktopPreview(null);
          setMobilePreview(null);
        }
        router.refresh();
      } else {
        toast.error(result?.error ?? 'Slide kaydedilemedi');
      }
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Eyebrow"
            htmlFor="eyebrow"
            error={form.formState.errors.eyebrow?.message ?? undefined}
          >
            <Input id="eyebrow" {...form.register('eyebrow')} />
          </FormField>
          <FormField
            label="Başlık (Opsiyonel)"
            htmlFor="title"
            error={form.formState.errors.title?.message}
          >
            <Input id="title" placeholder="Başlık giriniz..." {...form.register('title')} />
          </FormField>
        </div>

        <FormField
          label="Açıklama"
          htmlFor="description"
          error={form.formState.errors.description?.message ?? undefined}
        >
          <Textarea id="description" rows={4} {...form.register('description')} />
        </FormField>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField label="CTA Metni" htmlFor="ctaLabel">
            <Input id="ctaLabel" {...form.register('ctaLabel')} />
          </FormField>
          <FormField
            label="CTA Linki"
            htmlFor="ctaUrl"
            error={form.formState.errors.ctaUrl?.message ?? undefined}
          >
            <Input id="ctaUrl" {...form.register('ctaUrl')} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FormField
            label="Hizalama"
            error={form.formState.errors.textAlign?.message ?? undefined}
          >
            <Select {...form.register('textAlign')}>
              <option value="left">Sol-Orta</option>
              <option value="center">Orta-Orta</option>
              <option value="right">Sağ-Orta</option>
            </Select>
          </FormField>
          <FormField label="Buton Stili">
            <Select {...form.register('buttonVariant')}>
              <option value="primary">Birincil</option>
              <option value="secondary">İkincil</option>
              <option value="ghost">Ghost</option>
            </Select>
          </FormField>
          <FormField label="Metin Rengi" required>
            <ColorInput {...form.register('textColor')} />
          </FormField>
        </div>

        <FormField label="Overlay Yoğunluğu" required>
          <div className="space-y-2">
            <Range
              min={0}
              max={1}
              step={0.05}
              {...form.register('overlayOpacity', { valueAsNumber: true })}
            />
            <span className="text-xs text-gray-500">
              {overlayValue.toFixed(2)}
            </span>
          </div>
        </FormField>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Alt Metin (Opsiyonel)"
            htmlFor="alt"
            error={form.formState.errors.alt?.message}
          >
            <Input id="alt" placeholder="Alt metin giriniz..." {...form.register('alt')} />
          </FormField>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-gray-700">
              <input type="checkbox" {...form.register('isPublished')} />
              Yayında
            </label>
            <FormField label="Yayın Başlangıcı" htmlFor="publishAt">
              <Input
                id="publishAt"
                type="datetime-local"
                {...form.register('publishAt')}
              />
            </FormField>
            <FormField label="Yayın Bitişi" htmlFor="unpublishAt">
              <Input
                id="unpublishAt"
                type="datetime-local"
                {...form.register('unpublishAt')}
              />
            </FormField>
          </div>
        </div>

        {/* Görsel Kaynağı Seçimi */}
        <FormField label="Görsel Kaynağı">
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="upload"
                {...form.register('imageSource')}
                className="text-blue-600"
              />
              Dosya Yükle
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="url"
                {...form.register('imageSource')}
                className="text-blue-600"
              />
              URL ile Ekle
            </label>
          </div>
        </FormField>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            {form.watch('imageSource') === 'upload' ? (
              <FileDropzone
                name="desktop_image"
                label="Desktop Görsel"
                required={mode === 'create'}
                description="1920x1080 önerilir"
                onFileSelect={setDesktopFile}
                previewUrl={desktopPreview ?? undefined}
                existingFileName={slide?.desktopImageUrl ?? undefined}
              />
            ) : (
              <FormField
                label="Görsel URL"
                htmlFor="imageUrl"
                required={mode === 'create'}
                error={form.formState.errors.imageUrl?.message}
              >
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  {...form.register('imageUrl')}
                />
              </FormField>
            )}
            {fileError ? (
              <p className="mt-2 text-xs text-red-500">{fileError}</p>
            ) : null}
          </div>

          <FileDropzone
            name="mobile_image"
            label="Mobil Görsel"
            description="Opsiyonel"
            onFileSelect={setMobileFile}
            previewUrl={mobilePreview ?? undefined}
            existingFileName={slide?.mobileImageUrl ?? undefined}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? 'Kaydediliyor…'
              : mode === 'create'
                ? 'Slide Oluştur'
                : 'Slide Güncelle'}
          </Button>
        </div>
      </form>

      <div className="hidden min-h-[420px] rounded-xl border border-gray-200 bg-gray-100 p-3 lg:block">
        <HomeHeroProviderClient data={previewData}>
          <SliderHero slides={previewData?.slides || []} settings={previewData?.settings} />
        </HomeHeroProviderClient>
      </div>
    </div>
  );
}
