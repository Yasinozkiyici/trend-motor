import { requireAdmin } from '@/lib/auth';
import { AddImagesForm } from './_components/add-images-form';

export default async function AddImagesPage() {
  await requireAdmin();

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Slider&apos;a Resim Ekle
        </h1>
        <p className="text-gray-600 mb-8">
          Mevcut slider&apos;a 7-8 resim ekleyebilirsiniz. Resimler otomatik olarak mobil için optimize edilir.
        </p>
        
        <AddImagesForm />
      </div>
    </div>
  );
}

