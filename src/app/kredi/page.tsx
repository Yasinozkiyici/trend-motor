export default function KrediPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kredi Başvurusu
            </h1>
            <p className="text-lg text-gray-600">
              Hayalinizdeki motosiklete kredi ile sahip olun. Kolay başvuru süreci ile hemen başlayın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefits */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kredi Avantajları
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Hızlı Onay</h3>
                    <p className="text-sm text-gray-600">24 saat içinde kredi onayı</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Düşük Faiz</h3>
                    <p className="text-sm text-gray-600">Anlaşmalı bankalarla özel faiz oranları</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Esnek Vade</h3>
                    <p className="text-sm text-gray-600">12-60 ay arası vade seçenekleri</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Erken Ödeme</h3>
                    <p className="text-sm text-gray-600">Erken ödeme cezası yok</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Bilgi Alın
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0532 XXX XX XX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ornek@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    İlgilendiğiniz Model
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Model Seçin</option>
                    <option>BAJAJ Pulsar 150</option>
                    <option>BAJAJ Avenger 160</option>
                    <option>Diğer</option>
                  </select>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Bilgi İste
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Direkt İletişim
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8">
              <a
                href="tel:+905321525145"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <span>📞</span>
                <span>+90 532 152 51 45</span>
              </a>
              <a
                href="https://wa.me/905321525145"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-600 hover:text-green-700"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
