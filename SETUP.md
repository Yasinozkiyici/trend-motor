# Trend Motor - Supabase Kurulum Rehberi

## 🔧 Environment Variables

`.env.local` dosyası oluşturun ve aşağıdaki değerleri ekleyin:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mjgvkbuwepbszhrhzfkx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDU0NjQsImV4cCI6MjA3NTk4MTQ2NH0.tj064NgyKWaCULLVth-yIwxOToSOeCicFXGamZsBVM0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQwNTQ2NCwiZXhwIjoyMDc1OTgxNDY0fQ.haD_WuH7btZbLw9d3711EtYwFjzQPClibcEnkE3_cp0

# Database URL
DATABASE_URL=postgresql://postgres:4Cy3bxC9IgRy9W25@db.mjgvkbuwepbszhrhzfkx.supabase.co:5432/postgres

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🚀 Kurulum Adımları

### 1. Bağımlılıkları Yükleyin
```bash
pnpm install
```

### 2. Environment Dosyasını Oluşturun
Yukarıdaki environment variables'ları `.env.local` dosyasına kopyalayın.

### 3. Veritabanını Kurun
```bash
# Supabase'de tabloları oluştur
pnpm db:setup

# Örnek verileri ekle
pnpm db:seed
```

### 4. Development Server'ı Başlatın
```bash
pnpm dev
```

## 📊 Veritabanı Tabloları

Aşağıdaki tablolar otomatik olarak oluşturulacak:

- **slider** - Ana sayfa slider'ları
- **models** - Motosiklet modelleri  
- **contact_settings** - İletişim bilgileri
- **faq** - Sıkça sorulan sorular
- **footer_links** - Footer linkleri
- **prefooter_banner** - Prefooter banner

## 🎯 Test Etme

Kurulum tamamlandıktan sonra:

1. **Ana Sayfa**: http://localhost:3000
2. **Admin Paneli**: http://localhost:3000/admin
3. **API Test**: http://localhost:3000/api/slider

## 🔍 Sorun Giderme

### Tablolar Oluşturulmadıysa
```bash
# Manuel olarak Supabase Dashboard'dan SQL çalıştırın
# sql/migration.sql dosyasındaki SQL kodlarını kopyalayın
```

### API'ler Çalışmıyorsa
- Environment variables'ların doğru olduğundan emin olun
- Supabase Dashboard'dan bağlantıyı kontrol edin
- Console'da hata mesajlarını kontrol edin

### Mock Data Kullanılıyorsa
- Supabase bağlantısı kurulmamış demektir
- Environment variables'ları kontrol edin
- `pnpm db:seed` komutunu tekrar çalıştırın

## ✅ Başarılı Kurulum Kontrolü

1. Ana sayfa yükleniyor ✓
2. API'ler veri döndürüyor ✓  
3. Admin paneli erişilebilir ✓
4. Slider ve modeller görünüyor ✓

## 🎉 Sonraki Adımlar

- [ ] Gerçek görselleri ekleyin
- [ ] Admin paneli için authentication ekleyin
- [ ] Vercel'e deploy edin
- [ ] Custom domain bağlayın
