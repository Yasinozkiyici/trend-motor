import { createServiceRoleClient } from '../src/lib/supabase/server';

const supabase = createServiceRoleClient();

async function seedData() {
  console.log('🌱 Seed verileri ekleniyor...');

  try {
    // 1. Sliders
    console.log('📸 Slider verileri ekleniyor...');
    const { error: sliderError } = await supabase
      .from('sliders')
      .upsert([
        {
          title: 'Yeni Trend Motor Modelleri',
          subtitle: 'En son teknoloji ile donatılmış motorlar',
          button_text: 'Modelleri İncele',
          button_url: '/modeller',
          image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
          image_path: 'sliders/hero-1.jpg',
          sort_order: 1,
          published: true
        },
        {
          title: 'Test Sürüşü Yapın',
          subtitle: 'Motorlarımızı yakından deneyimleyin',
          button_text: 'Test Sürüşü Talep Et',
          button_url: '/test-surusu',
          image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=600&fit=crop',
          image_path: 'sliders/hero-2.jpg',
          sort_order: 2,
          published: true
        }
      ]);

    if (sliderError) {
      console.error('Slider hatası:', sliderError);
    } else {
      console.log('✅ Slider verileri eklendi');
    }

    // 2. Models
    console.log('🏍️ Model verileri ekleniyor...');
    const { data: modelData, error: modelError } = await supabase
      .from('models')
      .upsert([
        {
          id: 1,
          brand: 'Trend Motor',
          name: 'Trend Racer 250',
          slug: 'trend-racer-250',
          short_description: 'Şehir içi kullanım için ideal',
          description: 'Trend Racer 250, şehir içi kullanım için tasarlanmış hafif ve ekonomik bir motosiklet modelidir. 250cc motor hacmi ile günlük kullanımda mükemmel performans sunar.',
          price: 45000,
          currency: 'TRY',
          status: 'Stokta',
          engine_cc: 250,
          power_hp: 25,
          color_options: ['Kırmızı', 'Siyah', 'Beyaz', 'Mavi'],
          hero_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
          hero_image_path: 'models/trend-racer-250-hero.jpg',
          published: true
        }
      ])
      .select();

    if (modelError) {
      console.error('Model hatası:', modelError);
    } else {
      console.log('✅ Model verileri eklendi');
    }

    // 3. Model Images
    if (modelData && modelData.length > 0) {
      console.log('🖼️ Model resimleri ekleniyor...');
      const { error: imageError } = await supabase
        .from('model_images')
        .upsert([
          {
            model_id: modelData[0].id,
            image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
            image_path: 'models/trend-racer-250-1.jpg',
            sort_order: 1
          },
          {
            model_id: modelData[0].id,
            image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
            image_path: 'models/trend-racer-250-2.jpg',
            sort_order: 2
          }
        ]);

      if (imageError) {
        console.error('Model resim hatası:', imageError);
      } else {
        console.log('✅ Model resimleri eklendi');
      }
    }

    // 4. FAQs
    console.log('❓ FAQ verileri ekleniyor...');
    const { error: faqError } = await supabase
      .from('faqs')
      .upsert([
        {
          id: 1,
          question: 'Motorlarınızın garantisi var mı?',
          answer: 'Evet, tüm motorlarımız 2 yıl fabrika garantisi ile gelir. Garanti kapsamında motor, şanzıman ve elektriksel sistemler yer alır.',
          sort_order: 1,
          published: true
        },
        {
          id: 2,
          question: 'Test sürüşü nasıl yapabilirim?',
          answer: 'Test sürüşü için öncelikle randevu almanız gerekmektedir. İletişim formunu doldurarak veya telefon ile bizimle iletişime geçebilirsiniz.',
          sort_order: 2,
          published: true
        },
        {
          id: 3,
          question: 'Kredi ile satın alabilir miyim?',
          answer: 'Evet, bankalarla anlaşmalı kredi seçeneklerimiz bulunmaktadır. Aylık ödeme planları ve faiz oranları hakkında detaylı bilgi için bizimle iletişime geçin.',
          sort_order: 3,
          published: true
        }
      ]);

    if (faqError) {
      console.error('FAQ hatası:', faqError);
    } else {
      console.log('✅ FAQ verileri eklendi');
    }

    // 5. Prefooter Banner
    console.log('🎯 Banner verileri ekleniyor...');
    const { error: bannerError } = await supabase
      .from('prefooter_banners')
      .upsert([
        {
          id: 1,
          title: 'Özel Kampanya',
          description: 'Bu ay özel indirimli fiyatlarla motor sahibi olun!',
          button_text: 'Kampanyaları Gör',
          button_url: '/kampanyalar',
          image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop',
          image_path: 'banners/special-offer.jpg',
          published: true,
          sort_order: 1
        }
      ]);

    if (bannerError) {
      console.error('Banner hatası:', bannerError);
    } else {
      console.log('✅ Banner verileri eklendi');
    }

    // 6. Footer Links
    console.log('🔗 Footer link verileri ekleniyor...');
    const { error: footerError } = await supabase
      .from('footer_links')
      .upsert([
        {
          id: 1,
          group_title: 'Kurumsal',
          label: 'Hakkımızda',
          url: '/hakkimizda',
          sort_order: 1,
          published: true
        },
        {
          id: 2,
          group_title: 'Kurumsal',
          label: 'İletişim',
          url: '/iletisim',
          sort_order: 2,
          published: true
        },
        {
          id: 3,
          group_title: 'Hizmetler',
          label: 'Test Sürüşü',
          url: '/test-surusu',
          sort_order: 1,
          published: true
        },
        {
          id: 4,
          group_title: 'Hizmetler',
          label: 'Kredi Başvurusu',
          url: '/kredi',
          sort_order: 2,
          published: true
        }
      ]);

    if (footerError) {
      console.error('Footer link hatası:', footerError);
    } else {
      console.log('✅ Footer link verileri eklendi');
    }

    // 7. Site Settings
    console.log('⚙️ Site ayarları ekleniyor...');
    const { error: settingsError } = await supabase
      .from('site_settings')
      .upsert([
        {
          id: 1,
          site_name: 'Trend Motor',
          logo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=60&fit=crop',
          logo_path: 'settings/logo.png',
          social_instagram: 'https://instagram.com/trendmotor',
          social_facebook: 'https://facebook.com/trendmotor',
          social_twitter: 'https://twitter.com/trendmotor'
        }
      ]);

    if (settingsError) {
      console.error('Site ayarları hatası:', settingsError);
    } else {
      console.log('✅ Site ayarları eklendi');
    }

    // 8. Contact Info
    console.log('📞 İletişim bilgileri ekleniyor...');
    const { error: contactError } = await supabase
      .from('contacts')
      .upsert([
        {
          id: 1,
          phone: '+90 532 152 51 45',
          email: 'info@trendmotor.com',
          address: 'Acarlar, Hanımeli Sk. No:20 D:1A, 45400 Turgutlu/Manisa',
          working_hours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
          google_maps_iframe: '<iframe src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=38.4928158,27.7036489&zoom=14" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
        }
      ]);

    if (contactError) {
      console.error('İletişim bilgileri hatası:', contactError);
    } else {
      console.log('✅ İletişim bilgileri eklendi');
    }

    console.log('🎉 Tüm seed verileri başarıyla eklendi!');

  } catch (error) {
    console.error('❌ Seed işlemi sırasında hata:', error);
    process.exit(1);
  }
}

// Run seed if called directly
if (require.main === module) {
  seedData().then(() => {
    console.log('✅ Seed işlemi tamamlandı');
    process.exit(0);
  }).catch((error) => {
    console.error('❌ Seed işlemi başarısız:', error);
    process.exit(1);
  });
}

export { seedData };


