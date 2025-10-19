import { z } from 'zod';

// Base schemas
export const SliderSchema = z.object({
  id: z.number().optional(),
  title: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  button_text: z.string().nullable().optional(),
  button_url: z
    .string()
    .url('Geçerli bir URL giriniz')
    .nullable()
    .optional(),
  image_url: z.string().url('Geçerli bir resim URL\'si giriniz'),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const ModelSchema = z.object({
  id: z.number().optional(),
  brand: z.string().nullable().optional(),
  name: z.string().min(1, 'Model adı gerekli'),
  slug: z.string().min(1, 'Slug gerekli').regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir'),
  short_description: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  price: z.number().nonnegative('Fiyat pozitif olmalı').nullable().optional(),
  currency: z.string().default('TRY'),
  status: z.string().nullable().optional(),
  engine_cc: z.number().nonnegative().nullable().optional(),
  power_hp: z.number().nonnegative().nullable().optional(),
  color_options: z.array(z.string()).nullable().optional(),
  hero_image_url: z
    .string()
    .url('Geçerli bir resim URL\'si giriniz')
    .nullable()
    .optional(),
  hero_image_path: z.string().nullable().optional(),
  published: z.boolean().default(true),
  updated_at: z.string().optional(),
  created_at: z.string().optional(),
});

export const ModelImageSchema = z.object({
  id: z.number().optional(),
  model_id: z.number().positive('Model ID gerekli'),
  image_url: z.string().url('Geçerli bir resim URL\'si giriniz'),
  image_path: z.string().optional(),
  sort_order: z.number().default(0),
});

export const FaqSchema = z.object({
  id: z.number().optional(),
  question: z.string().min(1, 'Soru gerekli'),
  answer: z.string().min(1, 'Cevap gerekli'),
  sort_order: z.number().default(0),
  published: z.boolean().default(true),
  updated_at: z.string().optional(),
});

export const BannerSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Başlık gerekli'),
  description: z.string().optional(),
  button_text: z.string().optional(),
  button_url: z.string().url('Geçerli bir URL giriniz').optional(),
  image_url: z.string().url('Geçerli bir resim URL\'si giriniz').optional(),
  image_path: z.string().optional(),
  published: z.boolean().default(true),
  sort_order: z.number().default(0),
  updated_at: z.string().optional(),
});

export const FooterLinkSchema = z.object({
  id: z.number().optional(),
  group_title: z.string().min(1, 'Grup başlığı gerekli'),
  label: z.string().min(1, 'Etiket gerekli'),
  url: z.string().url('Geçerli bir URL giriniz'),
  sort_order: z.number().default(0),
  published: z.boolean().default(true),
});

export const ContactSchema = z.object({
  id: z.number().optional(),
  phone: z.string().optional(),
  email: z.string().email('Geçerli bir email adresi giriniz').optional(),
  address: z.string().optional(),
  google_maps_iframe: z.string().optional(),
  working_hours: z.string().optional(),
  updated_at: z.string().optional(),
});

export const SiteSettingsSchema = z.object({
  id: z.number().default(1),
  site_name: z.string().optional(),
  logo_url: z.string().url('Geçerli bir resim URL\'si giriniz').optional(),
  logo_path: z.string().optional(),
  social_instagram: z.string().url('Geçerli bir URL giriniz').optional(),
  social_facebook: z.string().url('Geçerli bir URL giriniz').optional(),
  social_twitter: z.string().url('Geçerli bir URL giriniz').optional(),
  last_updated: z.string().optional(),
});

export const TestDriveRequestSchema = z.object({
  id: z.number().optional(),
  full_name: z.string().min(1, 'Ad soyad gerekli'),
  phone: z.string().min(1, 'Telefon numarası gerekli'),
  model_id: z.number().positive('Geçerli bir model seçiniz').optional(),
  preferred_date: z.string().optional(),
  note: z.string().optional(),
  created_at: z.string().optional(),
  processed: z.boolean().default(false),
});

export const CreditApplicationSchema = z.object({
  id: z.number().optional(),
  full_name: z.string().min(1, 'Ad soyad gerekli'),
  phone: z.string().min(1, 'Telefon numarası gerekli'),
  income_range: z.string().optional(),
  model_id: z.number().positive('Geçerli bir model seçiniz').optional(),
  created_at: z.string().optional(),
  processed: z.boolean().default(false),
});

// Type exports
export type Slider = z.infer<typeof SliderSchema>;
export type Model = z.infer<typeof ModelSchema>;
export type ModelImage = z.infer<typeof ModelImageSchema>;
export type Faq = z.infer<typeof FaqSchema>;
export type Banner = z.infer<typeof BannerSchema>;
export type FooterLink = z.infer<typeof FooterLinkSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
export type TestDriveRequest = z.infer<typeof TestDriveRequestSchema>;
export type CreditApplication = z.infer<typeof CreditApplicationSchema>;

// API Response types
export interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
