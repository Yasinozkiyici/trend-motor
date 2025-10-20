import Link from 'next/link';
export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hakkımızda
            </h1>
            <p className="text-lg text-gray-600">
              Trend Motor olarak, hayalinizdeki motosiklete ulaşmanız için buradayız.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h2>Misyonumuz</h2>
            <p>
              Trend Motor olarak misyonumuz, müşterilerimize en kaliteli motosiklet deneyimini sunmak 
              ve onların hayallerindeki motosiklete ulaşmalarını sağlamaktır. Senetli satış, kredi 
              imkanları ve test sürüşü gibi hizmetlerimizle müşteri memnuniyetini ön planda tutuyoruz.
            </p>

            <h2>Vizyonumuz</h2>
            <p>
              Türkiyenin önde gelen motosiklet bayisi olmak ve müşterilerimize en iyi hizmeti sunmak 
              için sürekli kendimizi geliştiriyoruz. Güvenilir, kaliteli ve müşteri odaklı hizmet 
              anlayışımızla sektörde fark yaratmaya devam ediyoruz.
            </p>

            <h2>Değerlerimiz</h2>
            <ul>
              <li><strong>Güvenilirlik:</strong> Müşterilerimizin güvenini kazanmak ve korumak en önemli önceliğimizdir.</li>
              <li><strong>Kalite:</strong> Sunduğumuz ürün ve hizmetlerde en yüksek kalite standartlarını benimseriz.</li>
              <li><strong>Müşteri Odaklılık:</strong> Müşteri memnuniyeti bizim için her şeyden önemlidir.</li>
              <li><strong>Şeffaflık:</strong> Tüm işlemlerimizde açık ve şeffaf bir yaklaşım sergileriz.</li>
              <li><strong>İnovasyon:</strong> Sürekli gelişim ve yenilik anlayışıyla hizmetlerimizi geliştiririz.</li>
            </ul>

            <h2>Hizmetlerimiz</h2>
            <ul>
              <li>Yeni motosiklet satışı</li>
              <li>Senetli satış imkanları</li>
              <li>Kredi başvuru desteği</li>
              <li>Test sürüşü</li>
              <li>Servis ve bakım</li>
              <li>Yedek parça</li>
              <li>Sigorta danışmanlığı</li>
            </ul>

            <h2>Neden Trend Motor?</h2>
            <ul>
              <li>Geniş model yelpazesi</li>
              <li>Uygun fiyat politikası</li>
              <li>Kolay ödeme seçenekleri</li>
              <li>Uzman satış danışmanları</li>
              <li>Güvenilir servis hizmeti</li>
              <li>Müşteri memnuniyeti garantisi</li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Bizimle İletişime Geçin
            </h3>
            <p className="text-gray-600 mb-6">
              Sorularınız için bize ulaşın. Size en kısa sürede dönüş yapalım.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/iletisim"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                İletişim
              </Link>
              <Link
                href="/modeller"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Modelleri İncele
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
