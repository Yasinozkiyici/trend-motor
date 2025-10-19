-- Seed data for the slider table
INSERT INTO slider (id, title, subtitle, image_url, cta_text, cta_href, side_actions, overlay, is_active, sort_order) VALUES
('slide-1', 'Hayalinizdeki motosiklete', 'Senetli satış imkânıyla sahip olun', '/assets/hero-1.jpg', 'Hemen Başvur', '/kredi', '[{"icon":"steering","label":"Test Sürüşü","href":"/test-surusu"},{"icon":"map","label":"Konum","href":"https://maps.google.com/?q=38.5,27.72"},{"icon":"whatsapp","label":"WhatsApp","href":"https://wa.me/90..."}]'::jsonb, true, true, 1)
ON CONFLICT (id) DO NOTHING;

-- Seed data for the models table
INSERT INTO models (id, slug, brand, title, images, price_formatted, specs, badge, is_active) VALUES
('m1', 'pulsar-150', 'BAJAJ', 'Pulsar 150', '[{"url":"/assets/pulsar-150-1.jpg"}]'::jsonb, '₺20.500', '[{"key":"Motor","value":"149 cc"}]'::jsonb, 'Stokta', true),
('m2', 'avenger-160', 'BAJAJ', 'Avenger 160', '[{"url":"/assets/avenger-160.jpg"}]'::jsonb, '₺52.000', null, null, true)
ON CONFLICT (id) DO NOTHING;

-- Seed data for contact_settings
INSERT INTO contact_settings (id, address, phone, email, map) VALUES
('singleton', 'Acarlar, Hanımeli Sk. No:20', '+90 532 152 51 45', 'info@trendmotor.com', '{"lat":38.5007,"lng":27.7210,"zoom":14}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
address = EXCLUDED.address,
phone = EXCLUDED.phone,
email = EXCLUDED.email,
map = EXCLUDED.map;

-- Example seed for footer_links (can be expanded)
INSERT INTO footer_links (id, columns, socials) VALUES
('singleton', '[{"title": "Kurumsal", "links": [{"label": "Hakkımızda", "href": "/hakkimizda"}, {"label": "İletişim", "href": "/iletisim"}]}]'::jsonb, '[{"type": "instagram", "href": "#"}, {"type": "facebook", "href": "#"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
columns = EXCLUDED.columns,
socials = EXCLUDED.socials;

-- Example seed for prefooter_banner (can be expanded)
INSERT INTO prefooter_banner (id, image_url, cta_text, cta_href, is_active) VALUES
('singleton', '/assets/prefooter-banner.jpg', 'Tüm Modelleri Gör', '/modeller', true)
ON CONFLICT (id) DO UPDATE SET
image_url = EXCLUDED.image_url,
cta_text = EXCLUDED.cta_text,
cta_href = EXCLUDED.cta_href,
is_active = EXCLUDED.is_active;

-- Example seed for faq (can be expanded)
INSERT INTO faq (id, question, answer, sort_order) VALUES
('faq-1', 'Kredi kartına taksit yapıyor musunuz?', 'Evet, anlaşmalı kredi kartlarına vade farksız taksit imkanımız bulunmaktadır.', 1),
('faq-2', 'Test sürüşü yapabilir miyim?', 'Elbette, randevu alarak dilediğiniz model ile test sürüşü yapabilirsiniz.', 2)
ON CONFLICT (id) DO NOTHING;
