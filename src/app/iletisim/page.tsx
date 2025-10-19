import FAQ from '@/components/FAQ';

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-lg text-gray-600">
            Trend Motor hakkında merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
