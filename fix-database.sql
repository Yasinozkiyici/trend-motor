-- Fix database schema for motorcycles table
-- Add description column if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema='public' 
    AND table_name='motorcycles' 
    AND column_name='description'
  ) THEN
    ALTER TABLE public.motorcycles ADD COLUMN description text;
  END IF;
END $$;

-- Add some test brands if they don't exist
INSERT INTO public.brands (id, name, slug, is_active) VALUES
  ('11111111-1111-1111-1111-111111111111', 'BAJAJ', 'bajaj', true),
  ('22222222-2222-2222-2222-222222222222', 'KANUNİ', 'kanuni', true)
ON CONFLICT (slug) DO NOTHING;

-- Add a test motorcycle
INSERT INTO public.motorcycles (
  id, 
  brand_id, 
  name, 
  slug, 
  subtitle, 
  description,
  base_price, 
  currency, 
  stock_status, 
  is_published, 
  is_featured, 
  is_new,
  badges,
  sort_order
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'BAJAJ Pulsar NS200',
  'bajaj-pulsar-ns200',
  'Yeni Nesil Performans',
  'BAJAJ Pulsar NS200, güçlü motoru ve modern tasarımı ile dikkat çeken bir motosiklet modelidir. 200cc tek silindirli motoru ile hem şehir içi hem de şehir dışı kullanım için idealdir.',
  45000,
  'TRY',
  'in_stock',
  true,
  true,
  true,
  ARRAY['Yeni Model', 'Özel Fiyat'],
  1
) ON CONFLICT (slug) DO NOTHING;

