const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://mjgvkbuwepbszhrhzfkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQwNTQ2NCwiZXhwIjoyMDc1OTgxNDY0fQ.haD_WuH7btZbLw9d3711EtYwFjzQPClibcEnkE3_cp0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  try {
    console.log('🚀 Creating Trend Motor tables...');

    // Create slider table
    console.log('📝 Creating slider table...');
    const { error: sliderError } = await supabase.rpc('exec', {
      sql: `
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
          sort_order INTEGER DEFAULT 0 NOT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    if (sliderError) {
      console.error('❌ Slider table failed:', sliderError);
    } else {
      console.log('✅ Slider table created');
    }

    // Create models table
    console.log('📝 Creating models table...');
    const { error: modelsError } = await supabase.rpc('exec', {
      sql: `
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
          badge TEXT CHECK (badge IN ('Yeni', 'Stokta', 'Tükendi')),
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
      `
    });

    if (modelsError) {
      console.error('❌ Models table failed:', modelsError);
    } else {
      console.log('✅ Models table created');
    }

    // Create other tables...
    console.log('📝 Creating other tables...');
    
    const otherTables = [
      {
        name: 'contact_settings',
        sql: `
          CREATE TABLE IF NOT EXISTS contact_settings (
            id TEXT PRIMARY KEY DEFAULT 'singleton',
            address TEXT,
            phone TEXT,
            email TEXT,
            hours TEXT,
            map JSONB,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
          );
        `
      },
      {
        name: 'faq',
        sql: `
          CREATE TABLE IF NOT EXISTS faq (
            id TEXT PRIMARY KEY,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            sort_order INTEGER DEFAULT 0 NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
          );
        `
      },
      {
        name: 'footer_links',
        sql: `
          CREATE TABLE IF NOT EXISTS footer_links (
            id TEXT PRIMARY KEY DEFAULT 'singleton',
            columns JSONB,
            socials JSONB,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
          );
        `
      },
      {
        name: 'prefooter_banner',
        sql: `
          CREATE TABLE IF NOT EXISTS prefooter_banner (
            id TEXT PRIMARY KEY DEFAULT 'singleton',
            image_url TEXT,
            mobile_image_url TEXT,
            image_alt TEXT,
            height TEXT DEFAULT 'md' CHECK (height IN ('sm', 'md', 'lg')),
            cta_text TEXT,
            cta_href TEXT,
            is_active BOOLEAN DEFAULT true NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
          );
        `
      }
    ];

    for (const table of otherTables) {
      const { error } = await supabase.rpc('exec', { sql: table.sql });
      if (error) {
        console.error(`❌ ${table.name} table failed:`, error);
      } else {
        console.log(`✅ ${table.name} table created`);
      }
    }

    console.log('🎉 All tables created successfully!');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run setup
createTables();
