'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Wrench, X, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount: _cartCount = 0 }: NavbarProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsMobileSearchOpen(false);
  };

  const brandLinks = [
    { href: '/modeller?brand=kanuni', src: '/kanuni.svg', alt: 'KANUNİ' },
    { href: '/modeller?brand=bajaj', src: '/bajaj.svg', alt: 'BAJAJ' },
    { href: '/yedek-parca', src: '/yedek-parca.svg', alt: 'YEDEK PARÇA' }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      {/* Masaüstü */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
          <div className="grid h-24 grid-cols-[auto_auto_1fr_auto] items-center divide-x divide-gray-200 lg:h-28">
            {/* Sol grup: logo + markalar */}
            <div className="flex h-full">
              <Link
                href="/"
                className="inline-flex items-center self-stretch border-r border-gray-200 px-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                aria-label="Ana sayfa"
              >
                <Image
                  src="/logo.svg"
                  alt="Trend Motor"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                  priority
                  quality={100}
                />
              </Link>

              <div className="hidden h-full xl:flex">
                {brandLinks.map((brand, index) => (
                  <Link
                    key={brand.alt}
                    href={brand.href}
                    className={`inline-flex items-center self-stretch px-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                      index < brandLinks.length - 1 ? 'border-r border-gray-200' : ''
                    }`}
                    aria-label={`${brand.alt} modelleri`}
                  >
                    <Image
                      src={brand.src}
                      alt={brand.alt}
                      width={120}
                      height={30}
                      className="h-8 w-auto max-h-8"
                      quality={100}
                      sizes="(max-width: 1200px) 100px, 120px"
                      style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '120px',
                        maxHeight: '32px',
                      }}
                      unoptimized
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Orta: arama formu */}
            <div className="flex h-full items-center justify-center px-6">
              <form onSubmit={handleSearch} className="relative w-full max-w-md">
                <label htmlFor="desktop-search" className="sr-only">
                  Motosiklet ara
                </label>
                <input
                  id="desktop-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Motosiklet ara..."
                  className="h-12 w-full rounded-full border border-gray-200 bg-white pl-5 pr-12 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/40"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                  aria-label="Ara"
                >
                  <Search className="size-5" aria-hidden="true" />
                </button>
              </form>
            </div>

            {/* Sağ: Servis + Dil */}
            <div className="flex h-full items-center justify-end gap-4 px-6">
              <Link
                href="/servis-noktalari"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
              >
                <Wrench className="size-5 text-gray-500" aria-hidden="true" />
                <span>Servis Noktaları</span>
              </Link>

              <button
                onClick={() => setIsLanguageOpen((prev) => !prev)}
                aria-label="Dil seçimi"
                aria-expanded={isLanguageOpen}
                className="relative inline-flex size-11 items-center justify-center rounded-md transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
              >
                <span className="inline-flex size-6 items-center justify-center overflow-hidden rounded-[6px] ring-1 ring-black/5">
                  <Image
                    src="/flag-tr.svg"
                    alt="Türkçe"
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobil */}
      <div className="md:hidden">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" aria-label="Ana sayfa" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Trend Motor"
                width={48}
                height={48}
                className="h-12 w-auto"
                priority
                quality={100}
                sizes="(max-width: 480px) 40px, 48px"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                }}
              />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="inline-flex size-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 shadow-sm"
                aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu-panel"
              >
                {isMobileMenuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div id="mobile-menu-panel" className="pb-4">
              <nav className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
                <Link href="/" className="block rounded-xl px-4 py-3 text-gray-900 hover:bg-gray-50">Ana Sayfa</Link>
                <Link href="/modeller" className="block rounded-xl px-4 py-3 text-gray-900 hover:bg-gray-50">Modeller</Link>
                <Link href="/senetli-satis" className="block rounded-xl px-4 py-3 text-gray-900 hover:bg-gray-50">Senetli Satış</Link>
                <Link href="/kredi" className="block rounded-xl px-4 py-3 text-gray-900 hover:bg-gray-50">Kredi</Link>
                <Link href="/servis" className="block rounded-xl px-4 py-3 text-gray-900 hover:bg-gray-50">Servis</Link>
                <Link href="/iletisim" className="block rounded-xl px-4 py-3 text-gray-900 hover:bg-gray-50">İletişim</Link>
              </nav>

              <div className="mt-4 flex items-center gap-3 overflow-x-auto scrollbar-hide">
                {brandLinks.map((brand) => (
                  <Link
                    key={brand.alt}
                    href={brand.href}
                    className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50 min-w-fit"
                    aria-label={brand.alt}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src={brand.src}
                      alt={brand.alt}
                      width={80}
                      height={20}
                      className="h-5 w-auto max-h-5"
                      priority
                      sizes="(max-width: 480px) 60px, 80px"
                      style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '80px',
                        maxHeight: '20px',
                      }}
                      unoptimized
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dil Dropdown */}
      {isLanguageOpen && (
        <div className="absolute right-4 top-full z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg md:right-6">
          <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50">
            <Image src="/flag-tr.svg" alt="Türkçe" width={16} height={16} className="rounded-sm" />
            Türkçe
          </button>
          <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50">
            <span className="inline-block h-3 w-4 rounded-sm bg-blue-600" aria-hidden="true" />
            English
          </button>
        </div>
      )}
    </header>
  );
}
