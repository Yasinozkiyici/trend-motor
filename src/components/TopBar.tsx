'use client';

import { useState } from 'react';

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          {/* Left side - Contact info */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <span>+90 532 152 51 45</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✉️</span>
              <span>info@trendmotor.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🕒</span>
              <span>Pzt-Cum: 09:00-18:00</span>
            </div>
          </div>

          {/* Right side - Social links and language */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="https://instagram.com/trendmotor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="https://facebook.com/trendmotor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="https://wa.me/905321525145"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
                aria-label="WhatsApp"
              >
                💬
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm">TR</span>
              <div className="w-px h-4 bg-white/30"></div>
              <button className="text-sm hover:text-blue-200 transition-colors">
                EN
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>+90 532 152 51 45</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <span>info@trendmotor.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🕒</span>
                <span>Pzt-Cum: 09:00-18:00</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-white/10">
              <a
                href="https://instagram.com/trendmotor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-200 transition-colors"
              >
                📷 Instagram
              </a>
              <a
                href="https://facebook.com/trendmotor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-200 transition-colors"
              >
                📘 Facebook
              </a>
              <a
                href="https://wa.me/905321525145"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-200 transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
