-- Trend Motor Supabase Migration
-- Roller
create type user_role as enum ('admin','editor','viewer');

-- Kullanıcı profili
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'viewer',
  full_name text,
  created_at timestamptz default now()
);

-- Ortak alan: yayın ve sıralama
create table if not exists sliders (
  id bigint generated always as identity primary key,
  title text not null,
  subtitle text,
  button_text text,
  button_url text,
  image_url text,           -- public URL
  image_path text,          -- storage path
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists models (
  id bigint generated always as identity primary key,
  name text not null,
  slug text unique not null,
  short_description text,
  description text,
  price numeric(12,2),
  currency text not null default 'TRY',
  status text default 'Stokta',        -- Admin kartı
  engine_cc int,
  power_hp int,
  color_options text[],
  hero_image_url text,
  hero_image_path text,
  published boolean not null default true,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists model_images (
  id bigint generated always as identity primary key,
  model_id bigint references models(id) on delete cascade,
  image_url text,
  image_path text,
  sort_order int default 0
);

create table if not exists faqs (
  id bigint generated always as identity primary key,
  question text not null,
  answer text not null,
  sort_order int default 0,
  published boolean not null default true,
  updated_at timestamptz default now()
);

create table if not exists prefooter_banners (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  button_text text,
  button_url text,
  image_url text,
  image_path text,
  published boolean not null default true,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists contacts (
  id bigint generated always as identity primary key,
  phone text,
  email text,
  address text,
  google_maps_iframe text,
  working_hours text,
  updated_at timestamptz default now()
);

create table if not exists footer_links (
  id bigint generated always as identity primary key,
  group_title text not null,      -- ör: Kurumsal, Destek
  label text not null,
  url text not null,
  sort_order int default 0,
  published boolean not null default true
);

create table if not exists site_settings (
  id int primary key default 1,
  site_name text,
  logo_url text,
  logo_path text,
  social_instagram text,
  social_facebook text,
  social_twitter text,
  last_updated timestamptz default now()
);

create table if not exists test_drive_requests (
  id bigint generated always as identity primary key,
  full_name text not null,
  phone text not null,
  model_id bigint references models(id),
  preferred_date date,
  note text,
  created_at timestamptz default now(),
  processed boolean default false
);

create table if not exists credit_applications (
  id bigint generated always as identity primary key,
  full_name text not null,
  phone text not null,
  income_range text,
  model_id bigint references models(id),
  created_at timestamptz default now(),
  processed boolean default false
);

-- İndeksler
create index if not exists idx_models_slug on models(slug);
create index if not exists idx_sliders_sort on sliders(sort_order);

-- RLS
alter table sliders enable row level security;
alter table models enable row level security;
alter table model_images enable row level security;
alter table faqs enable row level security;
alter table prefooter_banners enable row level security;
alter table footer_links enable row level security;
alter table contacts enable row level security;
alter table site_settings enable row level security;
alter table test_drive_requests enable row level security;
alter table credit_applications enable row level security;
alter table profiles enable row level security;

-- Politika: profiller
create policy "read own profile" on profiles for select using (auth.uid() = id);
create policy "admin all profiles" on profiles
  for all using (exists(select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Politika: yayınlanmış herkese açık
create policy "public read published sliders" on sliders
  for select using (published = true);
create policy "public read published models" on models
  for select using (published = true);
create policy "public read published faqs" on faqs
  for select using (published = true);
create policy "public read published banners" on prefooter_banners
  for select using (published = true);
create policy "public read published footer" on footer_links
  for select using (published = true);

-- Politika: admin tam yetki
do $$
begin
  for t in select tablename from pg_tables where schemaname='public' loop
    execute format('create policy "admin all %I" on %I for all using (exists(select 1 from profiles p where p.id = auth.uid() and p.role = ''admin''));', t.tablename, t.tablename);
  end loop;
end $$;


