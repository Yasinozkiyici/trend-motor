# Vercel Deployment Rehberi

Bu rehber, Trend Motor projesini Vercel'e deploy etmek için gerekli tüm adımları içerir.

## 🚀 Deployment Öncesi Hazırlık

### 1. GitHub Repository
Projenizi GitHub'a push edin:
```bash
git add .
git commit -m "Deploy hazırlığı tamamlandı"
git push origin main
```

### 2. Supabase Veritabanı
Supabase Dashboard'da şu migration'ları çalıştırın:
1. `supabase/migrations/20251016_trendmotor.sql`
2. `supabase/migrations/20250317_slider.sql`
3. `supabase/migrations/20250119000000_motors_additions.sql`
4. `supabase/migrations/20251201_add_brand_to_models.sql`
5. `supabase/migrations/20251201_allow_nullable_slider_title.sql`

### 3. Supabase Storage
`supabase/storage.rules.sql` dosyasındaki storage bucket politikalarını uygulayın.

## 📋 Vercel Deployment Adımları

### 1. Vercel'e Giriş
- [vercel.com](https://vercel.com) adresine gidin
- GitHub hesabınızla giriş yapın

### 2. Yeni Proje Oluştur
- "New Project" butonuna tıklayın
- GitHub repository'nizi seçin
- "Import" butonuna tıklayın

### 3. Proje Ayarları
- **Framework Preset**: Next.js (otomatik algılanacak)
- **Root Directory**: `./` (proje root'u)
- **Build Command**: `pnpm build` (otomatik)
- **Output Directory**: `.next` (otomatik)
- **Install Command**: `pnpm install` (otomatik)

### 4. Environment Variables
Vercel Dashboard'da "Environment Variables" sekmesine gidin ve şu değişkenleri ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL=https://mjgvkbuwepbszhrhzfkx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDU0NjQsImV4cCI6MjA3NTk4MTQ2NH0.tj064NgyKWaCULLVth-yIwxOToSOeCicFXGamZsBVM0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQwNTQ2NCwiZXhwIjoyMDc1OTgxNDY0fQ.haD_WuH7btZbLw9d3711EtYwFjzQPClibcEnkE3_cp0
```

**Önemli**: Her environment variable için "Production", "Preview" ve "Development" seçeneklerini işaretleyin.

### 5. Deploy
- "Deploy" butonuna tıklayın
- Build süreci başlayacak (yaklaşık 2-3 dakika)

## 🔧 Post-Deployment Ayarları

### 1. Domain Ayarları
- Vercel Dashboard'da "Domains" sekmesine gidin
- Özel domain ekleyebilir veya vercel.app subdomain kullanabilirsiniz

### 2. Supabase CORS Ayarları
Supabase Dashboard'da "Settings" > "API" bölümünde:
- **Site URL**: `https://your-domain.vercel.app`
- **Redirect URLs**: `https://your-domain.vercel.app/**`

### 3. Seed Data
Production veritabanına örnek veriler eklemek için:
```bash
# Local'de çalıştırın (production DB'e bağlanacak)
pnpm seed
```

## 🚨 Sorun Giderme

### Build Hataları
- Environment variables'ların doğru eklendiğinden emin olun
- Supabase URL ve key'lerin doğru olduğunu kontrol edin

### Runtime Hataları
- Vercel Dashboard'da "Functions" sekmesinden log'ları kontrol edin
- Supabase RLS politikalarının doğru kurulduğundan emin olun

### Database Bağlantı Sorunları
- Supabase project'inin aktif olduğundan emin olun
- Service role key'in doğru olduğunu kontrol edin

## 📊 Monitoring

### Vercel Analytics
- Vercel Dashboard'da "Analytics" sekmesinden performans metriklerini izleyebilirsiniz

### Supabase Monitoring
- Supabase Dashboard'da "Logs" ve "Metrics" bölümlerinden veritabanı performansını izleyebilirsiniz

## 🔄 Güncelleme Süreci

1. Local'de değişiklikleri yapın
2. Test edin: `pnpm build`
3. GitHub'a push edin: `git push origin main`
4. Vercel otomatik olarak yeni deployment başlatacak

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- Vercel Documentation: https://vercel.com/docs
- Supabase Documentation: https://supabase.com/docs
- Proje README.md dosyasını kontrol edin
