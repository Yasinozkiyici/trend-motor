# Trend Motor - Motosiklet Satış Sitesi

Modern, responsive ve admin paneli ile yönetilebilen motosiklet satış sitesi.

## 🚀 Özellikler

- **Next.js 15** App Router ile modern React uygulaması
- **Tailwind CSS v4** ile responsive tasarım
- **Supabase** ile veritabanı yönetimi
- **Admin Paneli** ile içerik yönetimi
- **ISR (Incremental Static Regeneration)** ile performans
- **Playwright** ile end-to-end testler

## 📋 Teknolojiler

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4
- **Backend**: Next.js API Routes, Supabase
- **Veritabanı**: PostgreSQL (Supabase)
- **Test**: Playwright
- **Deploy**: Vercel

## 🛠️ Kurulum

### 1. Bağımlılıkları Yükleyin

\`\`\`bash
pnpm install
\`\`\`

### 2. Environment Variables

\`.env.local\` dosyası oluşturun:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mjgvkbuwepbszhrhzfkx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDU0NjQsImV4cCI6MjA3NTk4MTQ2NH0.tj064NgyKWaCULLVth-yIwxOToSOeCicFXGamZsBVM0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQwNTQ2NCwiZXhwIjoyMDc1OTgxNDY0fQ.haD_WuH7btZbLw9d3711EtYwFjzQPClibcEnkE3_cp0

# Test Configuration
BASE_URL=http://localhost:3000
\`\`\`

### 3. Supabase Migration'larını Uygulayın

Supabase Dashboard'da SQL Editor'ü açın ve şu dosyaları sırayla çalıştırın:

1. \`supabase/migrations/20251016_trendmotor.sql\` - Veritabanı şeması
2. \`supabase/storage.rules.sql\` - Storage bucket politikaları

### 4. Seed Verilerini Ekleyin

\`\`\`bash
pnpm seed
\`\`\`

### 5. Development Server'ı Başlatın

\`\`\`bash
pnpm dev
\`\`\`

Site http://localhost:3000 adresinde çalışacak.

## 🧪 Testler

\`\`\`bash
# Tüm testleri çalıştır
pnpm test

# UI ile test
pnpm test:ui

# Headed mode
pnpm test:headed
\`\`\`

## 🎨 Navbar Bileşeni

### Kullanım

\`\`\`tsx
import Navbar from '@/components/Navbar';

export default function Page() {
  return (
    <>
      <Navbar cartCount={5} />
      <main>...</main>
    </>
  );
}
\`\`\`

### Demo Sayfası

Navbar bileşenini test etmek için:

\`\`\`bash
pnpm dev
\`\`\`

Sonra http://localhost:3000/navbar-demo adresini ziyaret edin.

### Responsive Davranış

- **≥1280px**: Tüm öğeler görünür (tam navbar)
- **1024-1279px**: Marka linkleri kalabilir
- **<1024px**: Marka linkleri gizlenir
- **<768px**: Kapsül butonlar (Satış/Servis Noktaları) gizlenir

### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `cartCount` | `number` | `0` | Sepet sayısı (rozet için) |

### Erişilebilirlik

- Tüm butonlar minimum 40×40px hit area
- Klavye navigasyonu tam destekli
- Focus ringler görünür
- ARIA etiketleri uygun
- Screen reader uyumlu

## 📁 Proje Yapısı

\`\`\`
├── src/
│   ├── app/                 # Next.js App Router sayfaları
│   │   ├── api/            # API endpoints (CRUD operations)
│   │   │   ├── sliders/    # Slider API routes
│   │   │   ├── models/     # Model API routes
│   │   │   ├── faqs/       # FAQ API routes
│   │   │   ├── banners/    # Banner API routes
│   │   │   ├── footer-links/ # Footer links API routes
│   │   │   ├── contacts/   # Contact API routes
│   │   │   ├── site-settings/ # Site settings API routes
│   │   │   ├── test-drive/ # Test drive API routes
│   │   │   ├── credit-applications/ # Credit applications API routes
│   │   │   └── health/     # Health check endpoint
│   │   ├── admin/          # Admin paneli
│   │   ├── models/         # Model sayfaları
│   │   └── ...
│   ├── components/         # React bileşenleri
│   ├── lib/               # Utilities ve Supabase client
│   │   ├── supabase/      # Supabase client configurations
│   │   ├── schemas.ts     # Zod validation schemas
│   │   ├── upload.ts      # File upload utilities
│   │   └── api-helpers.ts # API helper functions
│   └── types/             # TypeScript tipleri
│       └── supabase.ts    # Generated Supabase types
├── supabase/
│   ├── migrations/        # Database migrations
│   └── storage.rules.sql  # Storage bucket policies
├── tests/                 # Playwright testleri
├── scripts/               # Setup ve seed scriptleri
│   └── seed.ts           # Database seed data
└── public/assets/         # Statik dosyalar
\`\`\`

## 🎯 Sayfalar

- **Ana Sayfa** (\`/\`) - Hero slider ve öne çıkan modeller
- **Modeller** (\`/modeller\`) - Tüm modeller listesi
- **Model Detay** (\`/models/[slug]\`) - Model detay sayfası
- **Kredi Başvurusu** (\`/kredi\`) - Kredi başvuru formu
- **Senetli Satış** (\`/senetli-satis\`) - Senetli satış bilgileri
- **Test Sürüşü** (\`/test-surusu\`) - Test sürüşü randevusu
- **Servis** (\`/servis\`) - Servis hizmetleri
- **İletişim** (\`/iletisim\`) - İletişim bilgileri
- **Hakkımızda** (\`/hakkimizda\`) - Şirket bilgileri

## 🔧 Admin Paneli

Admin paneline \`/admin\` adresinden erişebilirsiniz:

- **Dashboard** - Genel bakış
- **Slider Yönetimi** - Ana sayfa slider'ları
- **Model Yönetimi** - Motosiklet modelleri
- **İletişim Ayarları** - İletişim bilgileri
- **SSS Yönetimi** - Sıkça sorulan sorular
- **Footer Yönetimi** - Footer linkleri

## 📊 API Endpoints

### Public Endpoints (Authentication gerektirmez)
- \`GET /api/health\` - Sistem durumu
- \`GET /api/sliders\` - Slider listesi
- \`GET /api/sliders/[id]\` - Slider detayı
- \`GET /api/models\` - Model listesi
- \`GET /api/models/[id]\` - Model detayı
- \`GET /api/models/[id]/images\` - Model resimleri
- \`GET /api/faqs\` - SSS listesi
- \`GET /api/faqs/[id]\` - SSS detayı
- \`GET /api/banners\` - Banner listesi
- \`GET /api/banners/[id]\` - Banner detayı
- \`GET /api/footer-links\` - Footer linkleri
- \`GET /api/footer-links/[id]\` - Footer link detayı
- \`GET /api/contacts\` - İletişim bilgileri
- \`GET /api/site-settings\` - Site ayarları
- \`POST /api/test-drive\` - Test sürüşü talebi (rate limited)
- \`POST /api/credit-applications\` - Kredi başvurusu (rate limited)

### Admin Endpoints (Admin authentication gerektirir)
- \`POST /api/sliders\` - Slider oluştur
- \`PATCH /api/sliders/[id]\` - Slider güncelle
- \`DELETE /api/sliders/[id]\` - Slider sil
- \`POST /api/models\` - Model oluştur
- \`PATCH /api/models/[id]\` - Model güncelle
- \`DELETE /api/models/[id]\` - Model sil
- \`POST /api/models/[id]/images\` - Model resmi ekle
- \`POST /api/faqs\` - SSS oluştur
- \`PATCH /api/faqs/[id]\` - SSS güncelle
- \`DELETE /api/faqs/[id]\` - SSS sil
- \`POST /api/banners\` - Banner oluştur
- \`PATCH /api/banners/[id]\` - Banner güncelle
- \`DELETE /api/banners/[id]\` - Banner sil
- \`POST /api/footer-links\` - Footer link oluştur
- \`PATCH /api/footer-links/[id]\` - Footer link güncelle
- \`DELETE /api/footer-links/[id]\` - Footer link sil
- \`PUT /api/contacts\` - İletişim bilgileri güncelle
- \`PUT /api/site-settings\` - Site ayarları güncelle
- \`GET /api/test-drive\` - Test sürüşü talepleri (admin)
- \`GET /api/credit-applications\` - Kredi başvuruları (admin)

## 🚀 Deploy

### Vercel'e Deploy

1. GitHub'a push edin
2. Vercel'e bağlayın
3. Environment variables'ları ekleyin
4. Deploy edin

\`\`\`bash
# Build test
pnpm build

# Production start
pnpm start
\`\`\`

## 📝 Özellikler

### ✅ Tamamlanan Özellikler
- **Supabase Şema**: Tüm tablolar, RLS politikaları ve indeksler
- **API Katmanı**: Tam CRUD operasyonları (GET, POST, PATCH, DELETE)
- **Zod Validasyon**: Tüm API endpoint'leri için şema validasyonu
- **Rate Limiting**: Public endpoint'ler için IP bazlı rate limiting
- **File Upload**: Supabase Storage entegrasyonu
- **TypeScript Types**: Generated Supabase types
- **Seed Data**: Örnek veriler ile test ortamı
- **Playwright Tests**: Smoke testler ve error handling testleri
- **Edge Compatibility**: Tüm API'ler Edge Runtime uyumlu
- **Navbar Bileşeni**: ekuralkan.com benzeri üretim kalitesinde navbar

### 🔒 Güvenlik
- **Row Level Security (RLS)**: Tüm tablolarda aktif
- **Admin Authentication**: Role-based access control
- **Input Validation**: Zod ile comprehensive validation
- **Rate Limiting**: Spam koruması
- **Error Handling**: Türkçe hata mesajları

### 🚀 Performans
- **Pagination**: Tüm list endpoint'leri sayfalama destekli
- **Optimized Queries**: Supabase ile optimized database queries
- **Edge Runtime**: Vercel Edge Functions uyumlu
- **Static Generation**: ISR ile performans optimizasyonu

### 🎨 UI Bileşenleri
- **Navbar**: ekuralkan.com **Revizyon 5** tasarımı - İkinci görsel ile pixel-perfect eşleşme
  - **Tek katman navbar**: h-16 (64px), mavi bar yok
  - **Grid layout**: grid-cols-[auto_auto_1fr_auto] + divide-x divide-gray-200
  - **max-w-[1600px]** container, px-6, tüm hücreler h-16 px-6
  - **Sol grup**: Logo (h-[32px]) + 3 marka logosu (h-[22px]) + "Ara" metni
  - **Orta hücre**: Tek arama ikonu, tam merkezde
  - **Sağ hücre**: Satış + Servis pill'leri + TR + Hesap + Sepet
  - **Dikey ayraçlar**: divide-x divide-gray-200 ile hücreler ayrılmış
  - **Sepet rozeti**: cartCount prop ile dinamik (varsayılan 0)
  - **Tam responsive**: Tüm breakpoint'lerde optimize edilmiş
  - **WCAG 2.1 AA** erişilebilirlik uyumlu
  - **SVG ikonlar** ve optimize görseller

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Commit edin (\`git commit -m 'Add amazing feature'\`)
4. Push edin (\`git push origin feature/amazing-feature\`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.