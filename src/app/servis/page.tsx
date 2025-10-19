export default function ServisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Servis Hizmetleri
            </h1>
            <p className="text-lg text-gray-600">
              Motosikletinizin bakım ve onarım ihtiyaçları için uzman ekibimizle hizmetinizdeyiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Services */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Servis Hizmetlerimiz
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">🔧</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Periyodik Bakım</h3>
                    <p className="text-sm text-gray-600">Motor, fren, şanzıman ve genel bakım hizmetleri</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">⚙️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Onarım Hizmetleri</h3>
                    <p className="text-sm text-gray-600">Arıza tespiti ve onarım işlemleri</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">🔍</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Diagnostik</h3>
                    <p className="text-sm text-gray-600">Elektronik arıza tespiti ve analizi</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">🛠️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Yedek Parça</h3>
                    <p className="text-sm text-gray-600">Orijinal ve kaliteli yedek parça temini</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">🎨</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Kaportaj</h3>
                    <p className="text-sm text-gray-600">Boyama ve kaportaj hizmetleri</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Servis Randevusu
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
                    Motosiklet Modeli
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Örn: BAJAJ Pulsar 150"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plaka No
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="34 ABC 123"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Servis Türü
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Servis Türü Seçin</option>
                    <option>Periyodik Bakım</option>
                    <option>Arıza Tespiti</option>
                    <option>Onarım</option>
                    <option>Kaportaj</option>
                    <option>Diğer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sorununuzu veya ihtiyacınızı açıklayın..."
                  />
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Randevu İste
                </button>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Çalışma Saatleri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Servis</h4>
                <p className="text-sm text-gray-600">Pazartesi - Cumartesi: 09:00 - 18:00</p>
                <p className="text-sm text-gray-600">Pazar: Kapalı</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Satış</h4>
                <p className="text-sm text-gray-600">Pazartesi - Cumartesi: 09:00 - 18:00</p>
                <p className="text-sm text-gray-600">Pazar: Kapalı</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Acil Durumlar İçin
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
