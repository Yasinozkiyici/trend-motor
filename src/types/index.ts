// Slider Types
export interface Slider {
  id: number;
  title: string | null;
  subtitle: string | null;
  imageUrl: string;
  buttonText: string | null;
  buttonUrl: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

// Model Types
export interface Model {
  id: number;
  slug: string;
  name: string;
  brand: string | null;
  shortDescription: string | null;
  description: string | null;
  heroImageUrl: string | null;
  price: number | null;
  currency: string;
  status: string | null;
  engineCc: number | null;
  powerHp: number | null;
  colorOptions: string[];
  published: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

// Model Summary (for listings)
export type ModelSummary = Model;

// Prefooter Banner Types
export type BannerHeight = 'sm' | 'md' | 'lg';

export interface PrefooterBanner {
  id: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  imageAlt?: string;
  height: BannerHeight;
  ctaText?: string;
  ctaHref?: string;
  isActive: boolean;
}

// Contact Settings Types
export type MapProvider = 'google' | 'leaflet';

export interface MapSettings {
  lat: number;
  lng: number;
  zoom: number;
  provider: MapProvider;
}

export interface ContactSettings {
  id: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  map?: MapSettings;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

// Footer Links Types
export type SocialType = 'instagram' | 'facebook' | 'sahibinden' | 'youtube' | 'twitter';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  type: SocialType;
  href: string;
}

export interface FooterLinks {
  id: string;
  columns: FooterColumn[];
  socials: SocialLink[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}
// Query Parameters Types
export interface ModelsQueryParams {
  limit?: number;
  page?: number;
  tag?: string;
  q?: string;
  featured?: boolean;
}

