-- ============================================================================
-- MOTOR DETAY + FİYAT + STOK SİSTEMİ
-- Mevcut yapıyı bozmadan eklemeli migration
-- ============================================================================

-- MARKALAR
create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_path text,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.brands enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='brands' and policyname='brands anon select') then
    create policy "brands anon select" on public.brands for select to anon using (is_active = true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='brands' and policyname='brands admin all') then
    create policy "brands admin all" on public.brands for all to authenticated
    using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
    with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
  end if;
end $$;

-- PARA BİRİMİ TİPİ
do $$ begin
  if not exists (select 1 from pg_type where typname = 'currency') then
    create type public.currency as enum ('TRY','USD','EUR');
  end if;
end $$;

-- MOTORLAR (MODELLER)
create table if not exists public.motorcycles (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands(id) on delete restrict,
  name text not null,
  slug text not null unique,
  subtitle text,
  description text,
  sku text,
  base_price numeric(12,2) not null default 0,
  currency public.currency not null default 'TRY',
  price_note text,
  is_new boolean not null default true,
  is_featured boolean not null default false,
  stock_status text default 'in_stock',
  is_published boolean not null default false,
  publish_at timestamptz,
  unpublish_at timestamptz,
  hero_image_path text,
  badges text[] default '{}',
  sort_order int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Yeni sütunlar için güvenli ekleme
do $$ begin
  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='motorcycles' and column_name='description') then
    alter table public.motorcycles add column description text;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='motorcycles' and column_name='is_featured') then
    alter table public.motorcycles add column is_featured boolean not null default false;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='motorcycles' and column_name='stock_status') then
    alter table public.motorcycles add column stock_status text default 'in_stock';
  end if;
end $$;

create index if not exists idx_motor_brand_sort on public.motorcycles(brand_id, sort_order);
create index if not exists idx_motor_slug on public.motorcycles(slug);
create index if not exists idx_motor_featured on public.motorcycles(is_featured, is_published);

alter table public.motorcycles enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycles' and policyname='motorcycles anon select') then
    create policy "motorcycles anon select" on public.motorcycles for select to anon
    using (
      is_published = true
      and (publish_at is null or publish_at <= now())
      and (unpublish_at is null or unpublish_at > now())
    );
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycles' and policyname='motorcycles admin all') then
    create policy "motorcycles admin all" on public.motorcycles for all to authenticated
    using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
    with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
  end if;
end $$;

-- MOTOR GÖRSELLERİ
create table if not exists public.motorcycle_images (
  id uuid primary key default gen_random_uuid(),
  motorcycle_id uuid not null references public.motorcycles(id) on delete cascade,
  path text not null,
  alt text,
  sort_order int not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz default now()
);

create index if not exists idx_motoimg_moto_sort on public.motorcycle_images(motorcycle_id, sort_order);

alter table public.motorcycle_images enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycle_images' and policyname='images anon select') then
    create policy "images anon select" on public.motorcycle_images for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycle_images' and policyname='images admin all') then
    create policy "images admin all" on public.motorcycle_images for all to authenticated
    using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
    with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
  end if;
end $$;

-- ÖZELLİKLER (JSONB)
create table if not exists public.motorcycle_specs (
  motorcycle_id uuid primary key references public.motorcycles(id) on delete cascade,
  specs jsonb not null default '{}'::jsonb
);

alter table public.motorcycle_specs enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycle_specs' and policyname='specs anon select') then
    create policy "specs anon select" on public.motorcycle_specs for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycle_specs' and policyname='specs admin all') then
    create policy "specs admin all" on public.motorcycle_specs for all to authenticated
    using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
    with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
  end if;
end $$;

-- ÖZELLİKLER (SATIR BAZLI)
create table if not exists public.motorcycle_spec_items (
  id uuid primary key default gen_random_uuid(),
  motorcycle_id uuid not null references public.motorcycles(id) on delete cascade,
  group_name text,
  key_name text not null,
  value_text text not null,
  sort_order int not null default 0
);

create index if not exists idx_specitems_moto_sort on public.motorcycle_spec_items(motorcycle_id, sort_order);

alter table public.motorcycle_spec_items enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycle_spec_items' and policyname='specitems anon select') then
    create policy "specitems anon select" on public.motorcycle_spec_items for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycle_spec_items' and policyname='specitems admin all') then
    create policy "specitems admin all" on public.motorcycle_spec_items for all to authenticated
    using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
    with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
  end if;
end $$;

-- KATEGORİLER
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order int not null default 0
);

alter table public.categories enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='categories' and policyname='categories public select') then
    create policy "categories public select" on public.categories for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='categories' and policyname='categories admin all') then
    create policy "categories admin all" on public.categories for all to authenticated
    using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
    with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
  end if;
end $$;

-- MOTOR-KATEGORİ İLİŞKİSİ
create table if not exists public.motorcycle_categories (
  motorcycle_id uuid not null references public.motorcycles(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  primary key (motorcycle_id, category_id)
);

alter table public.motorcycle_categories enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycle_categories' and policyname='moto_cats public select') then
    create policy "moto_cats public select" on public.motorcycle_categories for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='motorcycle_categories' and policyname='moto_cats admin all') then
    create policy "moto_cats admin all" on public.motorcycle_categories for all to authenticated
    using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
    with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
  end if;
end $$;

-- ÖRNEK VERİLER (İsteğe bağlı)
insert into public.brands (name, slug, is_active) values
  ('KANUNİ', 'kanuni', true),
  ('BAJAJ', 'bajaj', true)
on conflict (slug) do nothing;

insert into public.categories (name, slug, sort_order) values
  ('Scooter', 'scooter', 1),
  ('Naked', 'naked', 2),
  ('Sport', 'sport', 3),
  ('Cruiser', 'cruiser', 4)
on conflict (slug) do nothing;

-- Storage buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('motors', 'motors', true, 52428800, '{"image/jpeg","image/png","image/webp","image/gif"}'),
  ('sliders', 'sliders', true, 52428800, '{"image/jpeg","image/png","image/webp","image/gif"}')
on conflict (id) do nothing;

-- Storage policies for motors bucket
create policy "Public read access for motors" on storage.objects
  for select using (bucket_id = 'motors');

create policy "Authenticated users can upload motors" on storage.objects
  for insert with check (bucket_id = 'motors' and auth.role() = 'authenticated');

create policy "Authenticated users can update motors" on storage.objects
  for update using (bucket_id = 'motors' and auth.role() = 'authenticated');

create policy "Authenticated users can delete motors" on storage.objects
  for delete using (bucket_id = 'motors' and auth.role() = 'authenticated');

-- Storage policies for sliders bucket
create policy "Public read access for sliders" on storage.objects
  for select using (bucket_id = 'sliders');

create policy "Authenticated users can upload sliders" on storage.objects
  for insert with check (bucket_id = 'sliders' and auth.role() = 'authenticated');

create policy "Authenticated users can update sliders" on storage.objects
  for update using (bucket_id = 'sliders' and auth.role() = 'authenticated');

create policy "Authenticated users can delete sliders" on storage.objects
  for delete using (bucket_id = 'sliders' and auth.role() = 'authenticated');

