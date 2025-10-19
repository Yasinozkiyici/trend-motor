'use client';

import { useState, useEffect } from 'react';
import { ContactSettings } from '@/types';

export default function ContactSection() {
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchContactSettings();
  }, []);

  const fetchContactSettings = async () => {
    try {
      const response = await fetch('/api/contact-settings');
      const result = await response.json();
      if (result.success) {
        setContactSettings(result.data);
      }
    } catch (error) {
      console.error('Error fetching contact settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Burada iletişim formu API'si çağrılacak
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simülasyon
      setSubmitMessage('Mesajınız başarıyla gönderildi!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!contactSettings) {
    return null;
  }

  return (
    <div className="py-16 bg-white contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kurumsal Başlık */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
            İLETİŞİM FORMU
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Sorularınız için bize ulaşın. Size en kısa sürede dönüş yapalım.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Formu */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* İsim ve E-posta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Adınız Soyadınız"
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-posta Adresiniz"
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Telefon ve Konu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Telefon Numaranız"
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                  />
                </div>
                <div>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                    required
                  >
                    <option value="">Konu Seçiniz</option>
                    <option value="genel">Genel Bilgi</option>
                    <option value="urun">Ürün Bilgisi</option>
                    <option value="kredi">Kredi Başvurusu</option>
                    <option value="servis">Servis</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
              </div>

              {/* Mesaj */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Mesajınızı yazınız..."
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Gönder Butonu */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-600 transition-all duration-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gönderiliyor
                    </span>
                  ) : (
                    'Mesajı Gönder'
                  )}
                </button>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-lg border ${
                  submitMessage.includes('başarıyla') 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                  <p className="text-sm font-medium">{submitMessage}</p>
                </div>
              )}
            </form>
          </div>

          {/* Google Haritası */}
          <div>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 h-full">
              <div className="relative h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.5!2d27.7036489!3d38.4928158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b9a775518b2a67%3A0xfa34620b5bb0bff9!2sTrend%20MoToR%27S%20Turgutlu!5e0!3m2!1str!2str!4v1640000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Trend MoToR'S Turgutlu Konum"
                />
                
                {/* Harita Alt Butonları */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-3">
                    <a
                      href="https://www.google.com/maps/place/Trend+MoToR'S+Turgutlu/@38.4928158,27.7036489,17z/data=!3m1!4b1!4m6!3m5!1s0x14b9a775518b2a67:0xfa34620b5bb0bff9!8m2!3d38.4928158!4d27.7036489!16s%2Fg%2F11c0q8q8q8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white rounded-lg p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow text-center"
                    >
                      <span className="text-sm font-medium text-gray-900">Google Maps'te Aç</span>
                    </a>
                    
                    <a
                      href="https://www.google.com/maps/dir//Trend+MoToR'S+Turgutlu,+Acarlar,+Han%C4%B1meli+Sk.+No:20+D:1A,+45400+Turgutlu%2FManisa/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x14b9a775518b2a67:0xfa34620b5bb0bff9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white rounded-lg p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow text-center"
                    >
                      <span className="text-sm font-medium text-gray-900">Yol Tarifi</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}