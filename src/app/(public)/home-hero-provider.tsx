import { ReactNode } from 'react';
import { unstable_cache } from 'next/cache';
import { createStaticClient } from '@/lib/supabase/server';
import { getSignedUrl } from '@/lib/images';
import SliderHero from './components/SliderHero/SliderHero';
import BankPartners from '@/components/BankPartners';

export const revalidate = 0; // Cache'i devre dışı bırak
export const fetchCache = 'default'; // Force cache'i kaldır

export type SliderHeroSlide = {
  id: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  alt: string | null;
  overlayOpacity: number;
  textAlign: 'left' | 'center' | 'right';
  textColor: string;
  buttonVariant: 'primary' | 'secondary' | 'ghost';
  desktopImagePath: string;
  mobileImagePath: string | null;
  desktopImageUrl: string | null;
  mobileImageUrl: string | null;
};

export type SliderHeroSettings = {
  autoplayMs: number;
  transitionMs: number;
  loop: boolean;
  pauseOnHover: boolean;
  showProgress: boolean;
  showArrows: boolean;
  showDots: boolean;
};

export type SliderHeroData = {
  id: string;
  name: string;
  slug: string;
  slides: SliderHeroSlide[];
  settings: SliderHeroSettings;
};

async function getHomeHeroData(): Promise<SliderHeroData | null> {
  try {
    const supabase = createStaticClient();

    const { data, error } = await supabase
      .from('sliders')
      .select(
        `
        id,
        name,
        slug,
        slider_settings (
          autoplay_ms,
          transition_ms,
          loop,
          pause_on_hover,
          show_arrows,
          show_dots,
          show_progress
        ),
        slides (
          id,
          eyebrow,
          title,
          description,
          cta_label,
          cta_url,
          desktop_image_path,
          mobile_image_path,
          alt,
          overlay_opacity,
          text_align,
          text_color,
          button_variant,
          sort_order
        )
      `
      )
      .eq('slug', 'home-hero')
      .eq('is_active', true)
      .order('sort_order', { referencedTable: 'slides' })
      .maybeSingle();

    if (error) {
      console.error('home-hero-provider fetch error', error);
      return null;
    }

      if (!data) {
        return null;
      }

      const slides =
        (await Promise.all(
          (data.slides ?? []).map(async (slide) => {
            const [desktopImageUrl, mobileImageUrl] = await Promise.all([
              getSignedUrl(slide.desktop_image_path ?? ''),
              getSignedUrl(slide.mobile_image_path ?? ''),
            ]);


            return {
              id: slide.id,
              eyebrow: slide.eyebrow,
              title: slide.title,
              description: slide.description,
              ctaLabel: slide.cta_label,
              ctaUrl: slide.cta_url,
              alt: slide.alt,
              overlayOpacity: Number(slide.overlay_opacity ?? 0.35),
              textAlign:
                (slide.text_align as SliderHeroSlide['textAlign']) ?? 'left',
              textColor: slide.text_color ?? '#ffffff',
              buttonVariant:
                (slide.button_variant as SliderHeroSlide['buttonVariant']) ??
                'primary',
              desktopImagePath: slide.desktop_image_path,
              mobileImagePath: slide.mobile_image_path,
              desktopImageUrl,
              mobileImageUrl,
            } satisfies SliderHeroSlide;
          })
        )) ?? [];

      return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        slides,
        settings: {
          autoplayMs: data.slider_settings?.autoplay_ms ?? 8000, // 8 saniye (çoklu görseller için)
          transitionMs: data.slider_settings?.transition_ms ?? 800, // Daha smooth geçiş
          loop: data.slider_settings?.loop ?? true,
          pauseOnHover: data.slider_settings?.pause_on_hover ?? true,
          showProgress: data.slider_settings?.show_progress ?? true,
          showArrows: data.slider_settings?.show_arrows ?? true, // Çoklu görseller için oklar aktif
          showDots: data.slider_settings?.show_dots ?? true, // Çoklu görseller için noktalar aktif
        },
      };
    } catch (error) {
      console.error('Error in getHomeHeroData:', error);
      return null;
    }
}

export default async function HomeHeroProvider({
  children,
}: {
  children: ReactNode;
}) {
  const data = await getHomeHeroData();

  return (
    <>
      {data && data.slides.length > 0 && (
        <SliderHero slides={data.slides} settings={data.settings} />
      )}
      <BankPartners />
      {children}
    </>
  );
}
