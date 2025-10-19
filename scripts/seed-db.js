const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://mjgvkbuwepbszhrhzfkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQwNTQ2NCwiZXhwIjoyMDc1OTgxNDY0fQ.haD_WuH7btZbLw9d3711EtYwFjzQPClibcEnkE3_cp0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  try {
    console.log('🌱 Seeding Trend Motor database...');

    // 1. Seed Slider
    console.log('📝 Seeding slider...');
    const { error: sliderError } = await supabase
      .from('slider')
      .upsert([
        {
          id: 'slide-1',
          title: 'Hayalinizdeki motosiklete',
          subtitle: 'Senetli satış imkânıyla sahip olun',
          image_url: '/assets/placeholder.svg',
          cta_text: 'Hemen Başvur',
          cta_href: '/kredi',
          alignment: 'center',
          overlay: true,
          side_actions: [
            { icon: 'steering', label: 'Test Sürüşü', href: '/test-surusu', style: 'solid' },
            { icon: 'map', label: 'Konum', href: 'https://maps.google.com/?q=38.5,27.72', style: 'outline' },
            { icon: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/90...', style: 'solid' }
          ],
          is_active: true,
          sort_order: 1
        }
      ]);

    if (sliderError) {
      console.error('❌ Slider seeding failed:', sliderError);
    } else {
      console.log('✅ Slider seeded successfully');
    }

    // 2. Seed Models
    console.log('📝 Seeding models...');
    const { error: modelsError } = await supabase
      .from('models')
      .upsert([
        {
          id: 'm1',
          slug: 'pulsar-150',
          brand: 'BAJAJ',
          title: 'Pulsar 150',
          short_description: 'Güçlü ve ekonomik 150cc motosiklet',
          images: [{ url: '/assets/placeholder.svg', alt: 'BAJAJ Pulsar 150', sort: 1 }],
          specs: [{ key: 'Motor', value: '149 cc' }, { key: 'Güç', value: '13.8 HP' }],
          price_formatted: '₺20.500',
          badge: 'Stokta',
          tags: ['ekonomik', 'günlük-kullanım'],
          categories: ['naked', '150cc'],
          is_active: true
        },
        {
          id: 'm2',
          slug: 'avenger-160',
          brand: 'BAJAJ',
          title: 'Avenger 160',
          short_description: 'Konforlu cruiser tarzı motosiklet',
          images: [{ url: '/assets/placeholder.svg', alt: 'BAJAJ Avenger 160', sort: 1 }],
          specs: [{ key: 'Motor', value: '160 cc' }, { key: 'Güç', value: '15.2 HP' }],
          price_formatted: '₺52.000',
          badge: null,
          tags: ['cruiser', 'konforlu'],
          categories: ['cruiser', '160cc'],
          is_active: true
        }
      ]);

    if (modelsError) {
      console.error('❌ Models seeding failed:', modelsError);
    } else {
      console.log('✅ Models seeded successfully');
    }

    // 3. Seed Contact Settings
    console.log('📝 Seeding contact settings...');
    const { error: contactError } = await supabase
      .from('contact_settings')
      .upsert([
        {
          id: 'singleton',
          address: 'Acarlar, Hanımeli Sk. No:20',
          phone: '+90 532 152 51 45',
          email: 'info@trendmotor.com',
          hours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
          map: {
            lat: 38.5007,
            lng: 27.7210,
            zoom: 14,
            provider: 'google'
          }
        }
      ]);

    if (contactError) {
      console.error('❌ Contact settings seeding failed:', contactError);
    } else {
      console.log('✅ Contact settings seeded successfully');
    }

    // 4. Seed FAQ
    console.log('📝 Seeding FAQ...');
    const { error: faqError } = await supabase
      .from('faq')
      .upsert([
        {
          id: 'faq-1',
          question: 'Kredi kartına taksit yapıyor musunuz?',
          answer: 'Evet, anlaşmalı kredi kartlarına vade farksız taksit imkanımız bulunmaktadır.',
          sort_order: 1
        },
        {
          id: 'faq-2',
          question: 'Test sürüşü yapabilir miyim?',
          answer: 'Elbette, randevu alarak dilediğiniz model ile test sürüşü yapabilirsiniz.',
          sort_order: 2
        },
        {
          id: 'faq-3',
          question: 'Senetli satış nasıl çalışır?',
          answer: 'Senetli satış sistemimizde, motosiklet bedelini taksitler halinde ödeyebilirsiniz.',
          sort_order: 3
        },
        {
          id: 'faq-4',
          question: 'Hangi belgeler gerekiyor?',
          answer: 'Kimlik belgesi, sürücü belgesi, gelir belgesi ve ikametgah belgesi gerekmektedir.',
          sort_order: 4
        }
      ]);

    if (faqError) {
      console.error('❌ FAQ seeding failed:', faqError);
    } else {
      console.log('✅ FAQ seeded successfully');
    }

    // 5. Seed Footer Links
    console.log('📝 Seeding footer links...');
    const { error: footerError } = await supabase
      .from('footer_links')
      .upsert([
        {
          id: 'singleton',
          columns: [
            {
              title: 'Kurumsal',
              links: [
                { label: 'Hakkımızda', href: '/hakkimizda' },
                { label: 'İletişim', href: '/iletisim' },
                { label: 'Franchise', href: '/franchise' }
              ]
            },
            {
              title: 'Ürünler',
              links: [
                { label: 'Tüm Modeller', href: '/modeller' },
                { label: 'Yeni Modeller', href: '/modeller?filter=yeni' },
                { label: 'İkinci El', href: '/ikinci-el' }
              ]
            },
            {
              title: 'Hizmetler',
              links: [
                { label: 'Senetli Satış', href: '/senetli-satis' },
                { label: 'Kredi Başvurusu', href: '/kredi' },
                { label: 'Sigorta', href: '/sigorta' },
                { label: 'Servis', href: '/servis' }
              ]
            },
            {
              title: 'Destek',
              links: [
                { label: 'Sıkça Sorulan Sorular', href: '/sss' },
                { label: 'Garanti Koşulları', href: '/garanti' },
                { label: 'Gizlilik Politikası', href: '/gizlilik' },
                { label: 'Kullanım Şartları', href: '/kullanim-sartlari' }
              ]
            }
          ],
          socials: [
            { type: 'instagram', href: 'https://instagram.com/trendmotor' },
            { type: 'facebook', href: 'https://facebook.com/trendmotor' },
            { type: 'sahibinden', href: 'https://sahibinden.com/trendmotor' }
          ]
        }
      ]);

    if (footerError) {
      console.error('❌ Footer links seeding failed:', footerError);
    } else {
      console.log('✅ Footer links seeded successfully');
    }

    // 6. Seed Prefooter Banner
    console.log('📝 Seeding prefooter banner...');
    const { error: bannerError } = await supabase
      .from('prefooter_banner')
      .upsert([
        {
          id: 'singleton',
          image_url: '/assets/placeholder.svg',
          cta_text: 'Tüm Modelleri Gör',
          cta_href: '/modeller',
          is_active: true
        }
      ]);

    if (bannerError) {
      console.error('❌ Prefooter banner seeding failed:', bannerError);
    } else {
      console.log('✅ Prefooter banner seeded successfully');
    }

    console.log('🎉 Database seeding complete!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

// Run seeding
seedDatabase();
