import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Build sırasında ESLint hatalarını ignore et
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Build sırasında TypeScript hatalarını ignore et
    ignoreBuildErrors: true,
  },
  images: {
    // Daha fazla format desteği
    formats: ['image/webp', 'image/avif'],
    // Minimum kalite kontrolü
    minimumCacheTTL: 60,
    // Responsive görseller için daha iyi boyutlandırma
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Quality ayarları
    qualities: [75, 80, 90, 95, 100],
    // External domain'ler için
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Server Actions için body size limit
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 1MB'den 10MB'ye çıkarıldı
    },
  },
};

export default nextConfig;
