'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Modeller', href: '/modeller' },
    { name: 'Senetli Satış', href: '/senetli-satis' },
    { name: 'Kredi Başvurusu', href: '/kredi' },
    { name: 'Servis', href: '/servis' },
    { name: 'İletişim', href: '/iletisim' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TM</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-gray-900">
                  Trend Motor
                </h1>
                <p className="text-sm text-gray-600">
                  Hayalinizdeki Motosiklet
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/test-surusu"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Test Sürüşü
            </Link>
            <Link
              href="/kredi"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Kredi Başvurusu
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <Link
                href="/test-surusu"
                className="block px-3 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Test Sürüşü
              </Link>
              <Link
                href="/kredi"
                className="block mx-3 my-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Kredi Başvurusu
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
