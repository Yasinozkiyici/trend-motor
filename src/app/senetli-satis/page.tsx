import Link from 'next/link';
export default function SenetliSatisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Senetli Satış
            </h1>
            <p className="text-lg text-gray-600">
              Peşin ödeme yapmadan, taksitlerle motosiklet sahibi olun. Kolay ödeme planları ile hayalinizdeki motosiklete kavuşun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Model Seçimi
              </h3>
              <p className="text-gray-600">
                Beğendiğiniz motosiklet modelini seçin ve detaylarını inceleyin.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belge Hazırlığı
              </h3>
              <p className="text-gray-600">
                Gerekli belgeleri hazırlayın ve başvuru formunu doldurun.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Teslimat
              </h3>
              <p className="text-gray-600">
                Onay sonrası motosikletinizi teslim alın ve keyfini çıkarın.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Requirements */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Gerekli Belgeler
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Kimlik belgesi (TC kimlik kartı)</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Sürücü belgesi</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Gelir belgesi (maaş bordrosu, SGK işyeri bildirgesi)</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">İkametgah belgesi</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">2 adet vesikalık fotoğraf</span>
                </div>
              </div>
            </div>

            {/* Payment Plans */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Ödeme Planları
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">12 Ay Taksit</h3>
                  <p className="text-sm text-gray-600 mb-2">Peşin: %20</p>
                  <p className="text-sm text-gray-600">Aylık taksit: Kalan tutar / 12</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">24 Ay Taksit</h3>
                  <p className="text-sm text-gray-600 mb-2">Peşin: %15</p>
                  <p className="text-sm text-gray-600">Aylık taksit: Kalan tutar / 24</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">36 Ay Taksit</h3>
                  <p className="text-sm text-gray-600 mb-2">Peşin: %10</p>
                  <p className="text-sm text-gray-600">Aylık taksit: Kalan tutar / 36</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Başlamaya Hazır mısınız?
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/modeller"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Modelleri İncele
              </Link>
              <Link
                href="/kredi"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Kredi Başvurusu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
