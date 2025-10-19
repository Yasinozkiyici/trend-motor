# Motor Detay + Fiyat + Stok Sistemi Kurulum

## ✅ Tamamlanan Özellikler

### 1. Supabase Veritabanı
- ✅ Brands (Markalar) tablosu
- ✅ Motorcycles (Motorlar) tablosu (fiyat, stok, yayınlama)
- ✅ Motorcycle Images (Galeri görselleri)
- ✅ Motorcycle Specs (Özellikler - JSONB + satır bazlı)
- ✅ Motorcycle Spec Items (Detaylı özellikler)
- ✅ Categories (Kategoriler)
- ✅ RLS Politikaları (Public okuma, Admin tam yetki)

### 2. Server Actions
- ✅ Brand CRUD (`createBrand`, `updateBrand`, `listBrands`)
- ✅ Motor CRUD (`createMotor`, `updateMotor`, `deleteMotor`)
- ✅ Yayınlama (`togglePublishMotor`, `toggleFeaturedMotor`)
- ✅ Görsel yönetimi (`uploadMotorImage`, `reorderImages`, `deleteImage`)
- ✅ Özellik yönetimi (`saveSpecsJson`, `upsertSpecItems`)

### 3. Public Taraf
- ✅ Landing'de öne çıkan motorlar (`/src/app/(public)/home-featured-provider.tsx`)
- ✅ Motor listesi - filtreleme + sıralama (`/src/app/(public)/modeller/page.tsx`)
- ✅ Motor detay - galeri + specs + benzer ürünler (`/src/app/(public)/modeller/[slug]/page.tsx`)
- ✅ SEO - Product Schema JSON-LD

### 4. Admin Panel
- ✅ Motor listesi (`/admin/motors`)
- ✅ Motor ekleme (`/admin/motors/new`)
- ✅ Motor düzenleme (`/admin/motors/[id]`)
- ✅ Hızlı işlemler (yayınla, öne çıkar, sil)

### 5. Image Helper
- ✅ Çoklu bucket desteği (`getSignedUrl`, `uploadToStorage`, `deleteFromStorage`)
- ✅ Otomatik signed URL oluşturma

## 🚀 Kurulum Adımları

### 1. Migration'ı Uygula

Migration dosyası oluşturuldu: `/supabase/migrations/20250119000000_motors_additions.sql`

Supabase CLI ile uygulayın:

\`\`\`bash
# Supabase'e bağlan
supabase link --project-ref YOUR_PROJECT_REF

# Migration'ı uygula
supabase db push

# VEYA manuel olarak Supabase Dashboard'dan SQL Editor'de çalıştırın
\`\`\`

### 2. Storage Bucket Oluştur

Supabase Dashboard → Storage → "motors" bucket'ı oluşturun:

- **Bucket Adı**: `motors`
- **Public**: `false` (private)
- **RLS**: `Enabled`

**RLS Politikaları** (Storage → motors → Policies):

\`\`\`sql
-- Public okuma
create policy "Motors images public read"
on storage.objects for select
to public
using (bucket_id = 'motors');

-- Admin tam yetki
create policy "Motors images admin all"
on storage.objects for all
to authenticated
using (
  bucket_id = 'motors'
  and exists (
    select 1 from public.profiles
    where id = auth.uid() and is_admin = true
  )
);
\`\`\`

### 3. ENV Kontrolü

`.env.local` dosyanızda şunların olduğundan emin olun:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

### 4. Projeyi Çalıştır

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## 📋 Kullanım

### Admin Panel

1. **Motor Ekle**: `http://localhost:3000/admin/motors/new`
   - Marka seçin (KANUNİ/BAJAJ)
   - Model adı ve slug girin
   - Fiyat ve stok durumunu belirleyin
   - Hero görsel yükleyin
   - Yayınlama ayarlarını yapın

2. **Motor Düzenle**: Motor listesinde ✏️ ikonuna tıklayın

3. **Hızlı İşlemler**:
   - 👁️ Önizle
   - 🔓/🔒 Yayınla/Yayından Kaldır
   - ⭐/☆ Öne Çıkar
   - 🗑️ Sil

### Public Taraf

1. **Anasayfa**: Öne çıkan motorlar otomatik gösterilir
2. **Motor Listesi**: `http://localhost:3000/modeller`
   - Markaya göre filtrele
   - Fiyata göre sırala
3. **Motor Detay**: `/modeller/{slug}`
   - Galeri
   - Teknik özellikler
   - Benzer modeller

## 🎨 Fiyat Gösterimi

Tüm fiyatlar Türkçe locale ile formatlanır:

\`\`\`typescript
new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: motor.currency, // TRY, USD, EUR
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(motor.base_price);
\`\`\`

**Çıktı**: `₺ 89.900`

## 🔄 Cache & Revalidation

- **Public sayfalar**: `revalidate = 60` (60 saniye)
- **Mutasyonlar**:
  - `motors:list` - Motor listesi
  - `motor:{slug}` - Motor detayı
  - `home:featured` - Anasayfa öne çıkanlar

## 📊 Veritabanı İlişkileri

\`\`\`
brands (markalar)
  ↓ (1:N)
motorcycles (motorlar)
  ↓ (1:N)
├── motorcycle_images (galeri)
├── motorcycle_spec_items (özellikler)
└── motorcycle_categories (kategoriler - M:N)
\`\`\`

## 🔐 Güvenlik

- ✅ RLS tüm tablolarda aktif
- ✅ Public: Sadece yayınlanan içerikleri okuyabilir
- ✅ Admin: `profiles.is_admin = true` ile tam yetki
- ✅ Storage: Private bucket, signed URL'ler
- ✅ Server Actions: `requireAdmin()` ile korumalı

## 🎯 Sonraki Adımlar (Opsiyonel)

1. **Galeri Yönetimi**: Çoklu görsel yükleme ve sıralama
2. **Özellik Editörü**: Grup bazlı özellik yönetimi
3. **Kategori Yönetimi**: Kategori CRUD
4. **Bulk İşlemler**: Toplu yayınlama/öne çıkarma
5. **Görsel Optimizasyonu**: Otomatik resize ve WebP dönüşümü

## ✨ Özellikler

- ✅ Türkçe dil desteği (tüm UI)
- ✅ Responsive tasarım (mobil/tablet/desktop)
- ✅ SEO optimizasyonu (JSON-LD schema)
- ✅ Stok durumu etiketleri
- ✅ Para birimi desteği (TRY/USD/EUR)
- ✅ Yayınlama planlaması (başlangıç/bitiş tarihi)
- ✅ Öne çıkan motorlar (landing'de görünür)
- ✅ Benzer ürün önerileri
- ✅ Hızlı işlem butonları (admin)

## 🐛 Sorun Giderme

### "motors bucket mevcut değil" hatası
→ Storage'da `motors` bucket'ını oluşturun (Adım 2)

### "Görsel yüklenemedi" hatası
→ Storage RLS politikalarını kontrol edin

### "Motor bulunamadı" hatası
→ Migration'ın başarıyla uygulandığından emin olun

### Fiyatlar görünmüyor
→ `base_price` ve `currency` alanlarının dolu olduğundan emin olun

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Migration loglarını kontrol edin
2. Tarayıcı konsolundaki hataları inceleyin
3. Supabase Dashboard → Logs sekmesini kontrol edin

---

**✅ Kurulum Tamamlandı!** Artık motorlarınızı yönetebilir, fiyat ve stok güncelleyebilir, landing'de öne çıkarabilirsiniz.
\`\`\`


