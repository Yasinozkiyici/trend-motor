-- BMW Tarzı Slider Migration
-- Supabase şeması ve RLS politikaları

-- 1) Profiles (is_admin için)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Profiles: self read"
on public.profiles for select
to authenticated
using (auth.uid() = id);

-- 2) Sliders (tek veya birden çok slider seti)
create table if not exists public.sliders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.sliders enable row level security;

-- Yayınlanmış içeriği herkese aç
create policy "Sliders: anon select"
on public.sliders for select
to anon
using (is_active = true);

-- Admin'e full
create policy "Sliders: admin all"
on public.sliders
for all
to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

-- 3) Slide'lar
create type public.text_align as enum ('left','center','right');

create table if not exists public.slides (
  id uuid primary key default gen_random_uuid(),
  slider_id uuid not null references public.sliders(id) on delete cascade,
  eyebrow text,
  title text not null,
  description text,
  cta_label text,
  cta_url text,
  desktop_image_path text not null, -- storage path
  mobile_image_path text,
  alt text,
  overlay_opacity numeric not null default 0.35 check (overlay_opacity >= 0 and overlay_opacity <= 1),
  text_align public.text_align not null default 'left',
  text_color text not null default '#FFFFFF',
  button_variant text not null default 'primary',
  sort_order int not null default 0,
  is_published boolean not null default false,
  publish_at timestamptz,
  unpublish_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists slides_slider_idx on public.slides(slider_id, sort_order);
alter table public.slides enable row level security;

-- Yayın penceresi ve slider aktiflik şartı ile anon select
create policy "Slides: anon published select"
on public.slides for select
to anon
using (
  is_published = true
  and (publish_at is null or publish_at <= now())
  and (unpublish_at is null or unpublish_at > now())
  and exists (select 1 from public.sliders s where s.id = slides.slider_id and s.is_active = true)
);

-- Admin full
create policy "Slides: admin all"
on public.slides
for all
to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

-- 4) Slider ayarları
create table if not exists public.slider_settings (
  slider_id uuid primary key references public.sliders(id) on delete cascade,
  autoplay_ms int not null default 6000,
  transition_ms int not null default 600,
  loop boolean not null default true,
  pause_on_hover boolean not null default true,
  show_arrows boolean not null default false,
  show_dots boolean not null default false,
  show_progress boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.slider_settings enable row level security;

create policy "Slider settings anon select"
on public.slider_settings for select
to anon
using (true);

create policy "Slider settings admin all"
on public.slider_settings
for all
to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

-- 5) Varsayılan slider seed
insert into public.sliders (name, slug, is_active)
values ('Anasayfa Kahraman', 'home-hero', true)
on conflict (slug) do nothing;

insert into public.slider_settings (slider_id)
select id from public.sliders where slug = 'home-hero'
on conflict (slider_id) do nothing;

-- 6) Storage bucket için trigger (Supabase panelinden 'sliders' bucket'ı oluşturun)
-- Bucket: 'sliders', public: false

