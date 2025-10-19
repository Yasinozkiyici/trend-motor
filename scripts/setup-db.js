const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://mjgvkbuwepbszhrhzfkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQwNTQ2NCwiZXhwIjoyMDc1OTgxNDY0fQ.haD_WuH7btZbLw9d3711EtYwFjzQPClibcEnkE3_cp0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('🚀 Setting up Trend Motor database...');

    // Read migration file
    const migrationPath = path.join(__dirname, '../sql/migration.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Execute migration
    console.log('📝 Creating tables...');
    const { error: migrationError } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    });

    if (migrationError) {
      console.error('❌ Migration failed:', migrationError);
      return;
    }

    console.log('✅ Tables created successfully!');

    // Read seed file
    const seedPath = path.join(__dirname, '../sql/seed.sql');
    const seedSQL = fs.readFileSync(seedPath, 'utf8');

    // Execute seed
    console.log('🌱 Seeding database...');
    const { error: seedError } = await supabase.rpc('exec_sql', {
      sql: seedSQL
    });

    if (seedError) {
      console.error('❌ Seeding failed:', seedError);
      return;
    }

    console.log('✅ Database seeded successfully!');
    console.log('🎉 Database setup complete!');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Alternative approach using direct SQL execution
async function setupDatabaseAlternative() {
  try {
    console.log('🚀 Setting up Trend Motor database (alternative method)...');

    // Create tables one by one
    const tables = [
      {
        name: 'slider',
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
            sort_order INTEGER DEFAULT 0 NOT NULL
          );
        `
      },
      {
        name: 'models',
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
        `
      },
      {
        name: 'contact_settings',
        sql: `
          CREATE TABLE IF NOT EXISTS contact_settings (
            id TEXT PRIMARY KEY DEFAULT 'singleton',
            address TEXT,
            phone TEXT,
            email TEXT,
            hours TEXT,
            map JSONB
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
            sort_order INTEGER DEFAULT 0 NOT NULL
          );
        `
      },
      {
        name: 'footer_links',
        sql: `
          CREATE TABLE IF NOT EXISTS footer_links (
            id TEXT PRIMARY KEY DEFAULT 'singleton',
            columns JSONB,
            socials JSONB
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
            is_active BOOLEAN DEFAULT true NOT NULL
          );
        `
      }
    ];

    for (const table of tables) {
      console.log(`📝 Creating table: ${table.name}`);
      const { error } = await supabase.rpc('exec_sql', {
        sql: table.sql
      });

      if (error) {
        console.error(`❌ Failed to create ${table.name}:`, error);
      } else {
        console.log(`✅ Table ${table.name} created successfully`);
      }
    }

    console.log('🎉 Database setup complete!');
    console.log('💡 You can now run the seed script to populate the database with sample data.');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run setup
setupDatabaseAlternative();
