'use client';

import Image from 'next/image';

const BankPartners = () => {
  const banks = [
    { id: 1, name: 'İş Bankası', logo: '/bank1.png' },
    { id: 2, name: 'Garanti BBVA', logo: '/bank2.png' },
    { id: 3, name: 'TEB', logo: '/bank3.png' },
    { id: 4, name: 'HSBC', logo: '/bank4.png' },
    { id: 5, name: 'Akbank', logo: '/bank5.png' },
    { id: 6, name: 'VakıfBank', logo: '/bank6.png' },
    { id: 7, name: 'QNB Finansbank', logo: '/bank7.png' },
    { id: 8, name: 'Ziraat Bankası', logo: '/bank8.png' },
    { id: 9, name: 'KuveytTürk', logo: '/bank9.png' },
    { id: 10, name: 'ING', logo: '/bank10.png' },
    { id: 11, name: 'Odeabank', logo: '/bank11.png' },
    { id: 12, name: 'YapıKredi', logo: '/bank12.png' },
    { id: 13, name: 'DenizBank', logo: '/bank13.png' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-gray-50 py-12 lg:py-16 overflow-hidden border-t border-gray-100">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Anlaşmalı Bankalarımız
          </h2>
        </div>

        {/* Banka Logoları */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-20 bg-gradient-to-r from-white via-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-20 bg-gradient-to-l from-white via-white to-transparent z-10"></div>
          
          <div className="flex space-x-4 lg:space-x-6 overflow-x-auto scrollbar-hide py-6 px-2">
            {banks.map((bank, index) => (
              <div
                key={bank.id}
                className="flex-shrink-0 group transition-all duration-300 ease-out opacity-100"
              >
                <div className="relative w-24 h-16 lg:w-28 lg:h-18 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 border border-gray-100 hover:border-blue-200 overflow-hidden">
                  <Image
                    src={bank.logo}
                    alt={`${bank.name} logosu`}
                    fill
                    sizes="(max-width: 768px) 96px, 112px"
                    className="object-contain p-3 lg:p-4 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    quality={95}
                    priority={index < 6}
                  />
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Subtle Border Glow */}
                  <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-blue-200/50 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default BankPartners;
