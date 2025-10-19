'use client';

import { FormEvent, useState } from 'react';
import type { Slider } from '@/types';

export interface SliderFormValues {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  sortOrder: number;
  published: boolean;
}

interface SliderFormProps {
  initialData?: Partial<Slider>;
  onSubmit: (values: SliderFormValues) => Promise<void>;
  submitting: boolean;
  submitLabel?: string;
}

const defaultValues: SliderFormValues = {
  title: '',
  subtitle: '',
  imageUrl: '',
  buttonText: '',
  buttonUrl: '',
  sortOrder: 0,
  published: true,
};

export default function SliderForm({
  initialData,
  onSubmit,
  submitting,
  submitLabel = 'Kaydet',
}: SliderFormProps) {
  const [values, setValues] = useState<SliderFormValues>(() => ({
    ...defaultValues,
    title: initialData?.title ?? '',
    subtitle: initialData?.subtitle ?? '',
    imageUrl: initialData?.imageUrl ?? '',
    buttonText: initialData?.buttonText ?? '',
    buttonUrl: initialData?.buttonUrl ?? '',
    sortOrder: initialData?.sortOrder ?? 0,
    published: initialData?.published ?? true,
  }));

  const handleChange = (field: keyof SliderFormValues, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Başlık</label>
          <input
            type="text"
            value={values.title}
            onChange={(event) => handleChange('title', event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Örn: Yeni modeller geldi"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Alt Başlık</label>
          <input
            type="text"
            value={values.subtitle}
            onChange={(event) => handleChange('subtitle', event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Örn: Senetli satış imkanı"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Görsel URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={values.imageUrl}
            onChange={(event) => handleChange('imageUrl', event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Buton Metni</label>
          <input
            type="text"
            value={values.buttonText}
            onChange={(event) => handleChange('buttonText', event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Örn: Hemen İncele"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Buton Linki</label>
          <input
            type="url"
            value={values.buttonUrl}
            onChange={(event) => handleChange('buttonUrl', event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="/modeller"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Sıra</label>
          <input
            type="number"
            value={values.sortOrder}
            onChange={(event) => handleChange('sortOrder', Number(event.target.value))}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      <label className="inline-flex items-center space-x-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(event) => handleChange('published', event.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span>Yayında</span>
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Kaydediliyor...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
