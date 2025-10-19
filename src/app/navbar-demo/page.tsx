/* eslint-disable react/no-unescaped-entities */
import Navbar from '@/components/Navbar';

export default function NavbarDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={3} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Navbar Demo - Revizyon 5
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            ekuralkan.com ana sayfa navbar bileşeninin yenilenmiş demo sayfası
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tek Katman Tasarım
              </h3>
              <p className="text-gray-600 text-sm">
                Tek beyaz navbar (64px), mavi bar yok. 
                Hücre tabanlı grid layout ile dikey ayraçlar.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tam İçerik
              </h3>
              <p className="text-gray-600 text-sm">
                Logo + 3 marka logosu + "Ara" metni + arama ikonu + 
                Satış/Servis pill'leri + TR + Hesap + Sepet.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pixel Perfect
              </h3>
              <p className="text-gray-600 text-sm">
                İkinci görsel ile birebir eşleşen tasarım. 
                Dikey ayraçlar, doğru boyutlar ve hizalama.
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Revizyon 5 - Yeni Özellikler
            </h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Tek katman navbar: h-16 (64px), mavi bar yok
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Grid layout: grid-cols-[auto_auto_1fr_auto] + divide-x divide-gray-200
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Sol grup: Logo (h-[32px]) + 3 marka logosu (h-[22px]) + "Ara" metni
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Orta hücre: Tek arama ikonu, tam merkezde
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Sağ hücre: Satış + Servis pill'leri + TR + Hesap + Sepet
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Dikey ayraçlar: divide-x divide-gray-200 ile hücreler ayrılmış
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Container: max-w-[1600px] px-6, tüm hücreler h-16 px-6
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Sepet rozeti: cartCount prop ile dinamik (varsayılan 0)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                İkinci görsel ile pixel-perfect eşleşme
              </li>
            </ul>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Sepet sayısı: 3 (demo amaçlı)</p>
            <p>Farklı ekran boyutlarında test edin</p>
          </div>
        </div>
      </main>
    </div>
  );
}
