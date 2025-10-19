export default function TestSurusuPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Test Sürüşü
            </h1>
            <p className="text-lg text-gray-600">
              Satın almadan önce motosikletimizi test edin. Randevu alarak dilediğiniz model ile test sürüşü yapabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Requirements */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Test Sürüşü Koşulları
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Geçerli Sürücü Belgesi</h3>
                    <p className="text-sm text-gray-600">A ve A2 sınıfı sürücü belgeniz olmalıdır</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Kimlik Belgesi</h3>
                    <p className="text-sm text-gray-600">Nüfus cüzdanı veya TC kimlik kartı</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Yaş Sınırı</h3>
                    <p className="text-sm text-gray-600">18 yaşını doldurmuş olmalısınız</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Randevu</h3>
                    <p className="text-sm text-gray-600">Önceden randevu almanız gerekmektedir</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Test Sürüşü Randevusu
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
                    Test Etmek İstediğiniz Model
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Model Seçin</option>
                    <option>BAJAJ Pulsar 150</option>
                    <option>BAJAJ Avenger 160</option>
                    <option>Diğer Modeller</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tercih Ettiğiniz Tarih
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tercih Ettiğiniz Saat
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Saat Seçin</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                  </select>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Randevu İste
                </button>
              </div>
            </div>
          </div>

          {/* Safety Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 text-sm">⚠</span>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Güvenlik Uyarısı
                </h3>
                <p className="text-yellow-700 text-sm">
                  Test sürüşü sırasında kask ve koruyucu ekipman kullanımı zorunludur. 
                  Test sürüşü sırasında oluşabilecek hasarlar için kendi sigortanız geçerlidir. 
                  Lütfen trafik kurallarına uyun ve dikkatli sürün.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sorularınız mı Var?
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
