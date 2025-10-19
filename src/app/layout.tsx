import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PromoBanner from '@/components/PromoBanner';
import NewsletterSection from '@/components/NewsletterSection';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trend Motor - Hayalinizdeki Motosiklet',
  description: 'BAJAJ ve diğer marka motosikletler. Senetli satış, kredi başvurusu ve test sürüşü imkanları. Trend Motor\'da hayalinizdeki motosiklete sahip olun.',
  keywords: 'motosiklet, BAJAJ, Pulsar, Avenger, senetli satış, kredi, test sürüşü',
  authors: [{ name: 'Trend Motor' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Trend Motor - Hayalinizdeki Motosiklet',
    description: 'BAJAJ ve diğer marka motosikletler. Senetli satış, kredi başvurusu ve test sürüşü imkanları.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <TopBar />
        <Navbar cartCount={0} />
        <main className="min-h-screen">
          {children}
        </main>
        <PromoBanner />
        <NewsletterSection />
        <Footer />
      </body>
    </html>
  );
}