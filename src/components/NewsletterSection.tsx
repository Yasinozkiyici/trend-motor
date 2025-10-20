'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setMessage('');

    try {
      // Burada e-bülten kayıt API'si çağrılacak
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simülasyon
      setMessage('Başarıyla kayıt oldunuz!');
      setEmail('');
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 text-white py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="text-center">
          {/* Kurumsal Başlık */}
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            E-BÜLTENE KAYIT OL
          </h2>
          <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto font-light">
            Duyurular ve Özel Teklifler için
          </p>
          
          {/* Kurumsal Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Tamamen Transparan Input */}
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresinizi yazınız..."
                  className="w-full px-6 py-4 bg-transparent border border-white/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-white/60 focus:ring-1 focus:ring-white/20 transition-all duration-200 text-base"
                  required
                />
              </div>
              
              {/* Minimal Gönder Butonu */}
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-lg hover:bg-white/20 hover:border-white/50 disabled:bg-white/5 disabled:border-white/20 transition-all duration-200 whitespace-nowrap min-w-[120px]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gönderiliyor
                  </span>
                ) : (
                  'Gönder'
                )}
              </button>
            </div>
            
            {message && (
              <div className={`p-4 rounded-lg border ${
                message.includes('Başarıyla') 
                  ? 'bg-emerald-500/10 text-emerald-200 border-emerald-400/30' 
                  : 'bg-red-500/10 text-red-200 border-red-400/30'
              }`}>
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}
          </form>
          
          {/* Kurumsal Alt Metin */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
              Kaydolarak{' '}
              <a href="/sartlar-ve-kosullar" className="text-white hover:text-slate-200 transition-colors underline decoration-slate-400 hover:decoration-white">
                Şartlar ve Koşullarımızı
              </a>{' '}
              ve{' '}
              <a href="/gizlilik-politikasi" className="text-white hover:text-slate-200 transition-colors underline decoration-slate-400 hover:decoration-white">
                Gizlilik Politikamızı
              </a>{' '}
              kabul etmiş olursunuz. Çıkmak için e-postalarımızdaki &quot;Aboneliği İptal Et&quot; linkini tıklayın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}