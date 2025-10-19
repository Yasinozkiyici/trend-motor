-- Slider Table
CREATE TABLE IF NOT EXISTS slider (
  id TEXT PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  mobile_image_url TEXT,
  image_alt TEXT,
  cta_text TEXT,
  cta_href TEXT,
  alignment TEXT DEFAULT 'center' CHECK (alignment IN ('left', 'center', 'right')),
  overlay BOOLEAN DEFAULT false,
  side_actions JSONB,
  is_active BOOLEAN DEFAULT true NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL
);

-- Models Table
CREATE TABLE IF NOT EXISTS models (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  images JSONB,
  specs JSONB,
  price BIGINT,
  price_formatted TEXT,
  badge TEXT,
  kyc_required BOOLEAN DEFAULT false,
  requires_wallet BOOLEAN DEFAULT false,
  tags TEXT[],
  categories TEXT[],
  getting_started TEXT[],
  discord_roles JSONB,
  has_dashboard BOOLEAN DEFAULT false,
  dashboard_url TEXT,
  total_raised_usd BIGINT,
  meta JSONB,
  published_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Prefooter Banner Table
CREATE TABLE IF NOT EXISTS prefooter_banner (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  image_url TEXT,
  mobile_image_url TEXT,
  image_alt TEXT,
  height TEXT DEFAULT 'md' CHECK (height IN ('sm', 'md', 'lg')),
  cta_text TEXT,
  cta_href TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Contact Settings Table
CREATE TABLE IF NOT EXISTS contact_settings (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  address TEXT,
  phone TEXT,
  email TEXT,
  hours TEXT,
  map JSONB
);

-- FAQ Table
CREATE TABLE IF NOT EXISTS faq (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL
);

-- Footer Links Table
CREATE TABLE IF NOT EXISTS footer_links (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  columns JSONB,
  socials JSONB
);

-- Function to automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for models table
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON models
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
