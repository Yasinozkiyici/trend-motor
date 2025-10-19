'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FooterLinks } from '@/types';

export default function Footer() {
  const [footerLinks, setFooterLinks] = useState<FooterLinks | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooterLinks();
  }, []);

  const fetchFooterLinks = async () => {
    try {
      const response = await fetch('/api/footer-links');
      const result = await response.json();
      if (result.success) {
        setFooterLinks(result.data);
      }
    } catch (error) {
      console.error('Error fetching footer links:', error);
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = {
    instagram: '📷',
    facebook: '📘',
    youtube: '📺',
    twitter: '🐦',
    sahibinden: '🏠'
  };

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Ana Footer İçeriği */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                <Image
                  src="/logo.svg"
                  alt="Trend Motor Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Trend Motor</h3>
                <p className="text-gray-400 text-sm">Hayalinizdeki Motosiklet</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              BAJAJ ve diğer marka motosikletlerde senetli satış, kredi başvurusu 
              ve test sürüşü imkanları ile hizmetinizdeyiz.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://trendmotor.sahibinden.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Sahibinden Mağaza"
              >
                <span className="text-white font-bold text-lg">S</span>
              </a>
              
              <a
                href="https://www.instagram.com/trend.motors.turgutlu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a
                href="https://www.facebook.com/p/Trend-MoTorS-100091902470421/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h4 className="font-semibold mb-4">İletişim Bilgileri</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-gray-300 mb-1">Adres</h5>
                <p className="text-gray-400 text-sm">
                  Acarlar, Hanımeli Sk. No:20 D:1A,<br />
                  45400 Turgutlu/Manisa
                </p>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-300 mb-1">Telefon</h5>
                <a 
                  href="tel:+905321525145"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  +90 532 152 51 45
                </a>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-300 mb-1">E-posta</h5>
                <a 
                  href="mailto:info@trendmotor.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  info@trendmotor.com
                </a>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-300 mb-1">Çalışma Saatleri</h5>
                <p className="text-gray-400 text-sm">
                  Pazartesi - Cumartesi:<br />
                  09:00 - 18:00
                </p>
              </div>
            </div>
          </div>

          {/* Hızlı İletişim */}
          <div>
            <h4 className="font-semibold mb-4">Hızlı İletişim</h4>
            <div className="space-y-3">
              <a
                href="tel:+905321525145"
                className="flex items-center space-x-2 bg-gray-800 text-white py-2 px-3 rounded hover:bg-gray-700 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Hemen Ara</span>
              </a>
              
              <a
                href="https://wa.me/905321525145"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks?.columns && footerLinks.columns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Trend Motor. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/gizlilik" className="hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">
                Kullanım Şartları
              </Link>
              <Link href="/cerez-politikasi" className="hover:text-white transition-colors">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}