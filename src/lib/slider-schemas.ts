import { z } from 'zod';

export const SlideInputSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1, 'Başlık gerekli'),
  description: z.string().optional(),
  cta_label: z.string().optional(),
  cta_url: z.string().url('Geçerli bir URL giriniz').optional().or(z.literal('')),
  text_align: z.enum(['left', 'center', 'right']).default('left'),
  overlay_opacity: z.number().min(0).max(1).default(0.35),
  text_color: z.string().default('#FFFFFF'),
  button_variant: z.string().default('primary'),
  desktop_image: z.instanceof(File).optional(),
  mobile_image: z.instanceof(File).optional(),
  is_published: z.boolean().default(false),
  publish_at: z.string().optional(),
  unpublish_at: z.string().optional(),
});

export const SliderSettingsSchema = z.object({
  autoplay_ms: z.number().min(2000).max(15000).default(6000),
  transition_ms: z.number().min(200).max(1200).default(600),
  loop: z.boolean().default(true),
  pause_on_hover: z.boolean().default(true),
  show_arrows: z.boolean().default(false),
  show_dots: z.boolean().default(false),
  show_progress: z.boolean().default(true),
});

export const SliderSchema = z.object({
  name: z.string().min(1, 'Slider adı gerekli'),
  slug: z.string().min(1, 'Slug gerekli'),
  is_active: z.boolean().default(true),
});

export type SlideInput = z.infer<typeof SlideInputSchema>;
export type SliderSettings = z.infer<typeof SliderSettingsSchema>;
export type Slider = z.infer<typeof SliderSchema>;

