import type { Slider, Model } from '@/types';

type BooleanLike = boolean | 'true' | 'false' | '1' | '0' | number | null | undefined;

type SliderRow = {
  id: number;
  title: string | null;
  subtitle: string | null;
  button_text: string | null;
  button_url: string | null;
  image_url: string | null;
  sort_order: number | null;
  published: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

type ModelRow = {
  id: number;
  slug: string;
  name: string;
  brand: string | null;
  short_description: string | null;
  description: string | null;
  hero_image_url: string | null;
  price: number | null;
  currency: string | null;
  status: string | null;
  engine_cc: number | null;
  power_hp: number | null;
  color_options: string[] | null;
  published: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

const booleanFromLike = (value: BooleanLike): boolean | undefined => {
  if (typeof value === 'boolean') return value;
  if (value === 'true' || value === '1' || value === 1) return true;
  if (value === 'false' || value === '0' || value === 0) return false;
  return undefined;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toNullableString = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str.length === 0 ? null : str;
};

const toNullableNumber = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const toStringArray = (value: unknown): string[] | null => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    const items = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    return items.length > 0 ? items : null;
  }
  return null;
};

export const mapSliderRow = (row: SliderRow): Slider => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  imageUrl: row.image_url ?? '',
  buttonText: row.button_text,
  buttonUrl: row.button_url,
  sortOrder: row.sort_order ?? 0,
  published: Boolean(row.published ?? true),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const normalizeSliderPayload = (raw: unknown) => {
  if (!isRecord(raw)) return raw;
  const source = raw as Record<string, unknown>;

  return {
    id: source['id'],
    title: toNullableString(source['title']),
    subtitle: toNullableString(source['subtitle']),
    button_text: toNullableString(
      source['button_text'] ?? source['buttonText'] ?? source['ctaText'],
    ),
    button_url: toNullableString(
      source['button_url'] ?? source['buttonUrl'] ?? source['ctaHref'],
    ),
    image_url: toNullableString(source['image_url'] ?? source['imageUrl']),
    sort_order: toNullableNumber(source['sort_order'] ?? source['sortOrder']) ?? 0,
    published:
      booleanFromLike(source['published'] as BooleanLike) ??
      booleanFromLike(source['isActive'] as BooleanLike),
  };
};
export const mapModelRow = (row: ModelRow): Model => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  brand: row.brand,
  shortDescription: row.short_description,
  description: row.description,
  heroImageUrl: row.hero_image_url,
  price: row.price,
  currency: row.currency ?? 'TRY',
  status: row.status,
  engineCc: row.engine_cc,
  powerHp: row.power_hp,
  colorOptions: row.color_options ?? [],
  published: Boolean(row.published ?? true),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const normalizeModelPayload = (raw: unknown) => {
  if (!isRecord(raw)) return raw;
  const source = raw as Record<string, unknown>;

  const slugSource = toNullableString(source['slug']) ?? toNullableString(source['name']);
  const slug = slugSource
    ? slugSource
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    : null;

  return {
    id: source['id'],
    name: toNullableString(source['name'] ?? source['title']),
    slug: slug ?? undefined,
    brand: toNullableString(source['brand']),
    short_description: toNullableString(
      source['short_description'] ?? source['shortDescription'],
    ),
    description: toNullableString(source['description'] ?? source['longDescription']),
    price: toNullableNumber(source['price'] ?? source['priceFormatted']),
    currency: toNullableString(source['currency']) ?? 'TRY',
    status: toNullableString(source['status'] ?? source['badge']),
    engine_cc: toNullableNumber(source['engine_cc'] ?? source['engineCc']),
    power_hp: toNullableNumber(source['power_hp'] ?? source['powerHp']),
    color_options: toStringArray(source['color_options'] ?? source['colorOptions']),
    hero_image_url: toNullableString(source['hero_image_url'] ?? source['heroImageUrl']),
    hero_image_path: toNullableString(source['hero_image_path'] ?? source['heroImagePath']),
    published:
      booleanFromLike(source['published'] as BooleanLike) ??
      booleanFromLike(source['isActive'] as BooleanLike),
  };
};

