'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Trend Motor hangi markaların yetkili bayisidir?",
      answer: "Trend Motor, Kanuni ve Bajaj markalarının yetkili satış bayisidir. Tüm modellerimizi resmi distribütör garantisiyle sunuyoruz."
    },
    {
      id: 2,
      question: "Motor satın alma işlemini nasıl gerçekleştirebilirim?",
      answer: "Beğendiğiniz modeli mağazamızdan ya da web sitemiz üzerinden bize ulaşarak satın alabilirsiniz. Ekibimiz size uygun teslimat ve ödeme seçenekleri hakkında bilgi verir."
    },
    {
      id: 3,
      question: "Satış sonrası servis hizmetini siz mi sağlıyorsunuz?",
      answer: "Servis işlemleri, Kanuni ve Bajaj'ın kendi yetkili servis ağları üzerinden yürütülmektedir. Biz, size en yakın servise yönlendirme desteği sağlıyoruz."
    },
    {
      id: 4,
      question: "Satın aldığım motorun garantisi ne kadar sürüyor?",
      answer: "Tüm sıfır motorlarımız üretici garantisi altındadır. Garanti süresi genellikle 2 yıl veya 20.000 km'dir (markaya göre değişiklik gösterebilir)."
    },
    {
      id: 5,
      question: "Kredi veya taksitli ödeme imkânınız var mı?",
      answer: "Evet. Bankalarla yaptığımız anlaşmalar sayesinde uygun faizli kredi ve kredi kartına taksit seçenekleri sunuyoruz."
    },
    {
      id: 6,
      question: "Test sürüşü yapabilir miyim?",
      answer: "Evet, bazı modeller için test sürüşü yapılabilmektedir. Uygunluk durumuna göre randevu oluşturabilirsiniz."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // İlk 3 soruyu sol kolona, son 3 soruyu sağ kolona ayır
  const leftColumnFAQs = faqs.slice(0, 3);
  const rightColumnFAQs = faqs.slice(3, 6);

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kurumsal Başlık */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
            SIKÇA SORULAN SORULAR
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Trend Motor hakkında merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
          </p>
        </div>

        {/* 2 Kolonlu FAQ Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Kolon */}
          <div className="space-y-4">
            {leftColumnFAQs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-inset"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-gray-900 pr-4 text-sm leading-relaxed">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transform transition-transform flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4 border-t border-gray-200">
                    <div className="pt-4">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sağ Kolon */}
          <div className="space-y-4">
            {rightColumnFAQs.map((faq, index) => {
              const actualIndex = index + 3; // Sağ kolon için index'i ayarla
              return (
                <div
                  key={faq.id}
                  className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleFAQ(actualIndex)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-inset"
                    aria-expanded={openIndex === actualIndex}
                  >
                    <span className="font-medium text-gray-900 pr-4 text-sm leading-relaxed">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transform transition-transform flex-shrink-0 ${
                        openIndex === actualIndex ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  {openIndex === actualIndex && (
                    <div className="px-6 pb-4 border-t border-gray-200">
                      <div className="pt-4">
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Alt İletişim Bölümü */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-6 font-light">
              Aradığınız soruyu bulamadınız mı?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+905321525145"
                className="inline-flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Bizi Arayın</span>
              </a>
              
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.querySelector('.contact-section');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>İletişim Formu</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}