'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';

type Brand = {
  id: string;
  name: string;
  slug: string;
};

type MotorFormInitialData = {
  id?: string;
  name?: string;
  slug?: string;
  subtitle?: string | null;
  brandId?: string;
  basePrice?: string;
  currency?: string;
  stockStatus?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  badges?: string[];
  heroImageUrl?: string | null;
};

type MotorFormProps = {
  brands: Brand[];
  initialData?: MotorFormInitialData;
  isEdit?: boolean;
};

export default function MotorForm({ brands, initialData, isEdit = false }: MotorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    subtitle: initialData?.subtitle || '',
    brandId: initialData?.brandId || '',
    basePrice: initialData?.basePrice !== undefined ? String(initialData.basePrice) : '',
    currency: initialData?.currency || 'TRY',
    stockStatus: initialData?.stockStatus || 'in_stock',
    isPublished: initialData?.isPublished || false,
    isFeatured: initialData?.isFeatured || false,
    isNew: initialData?.isNew || false,
    badges: initialData?.badges || [],
  });

  const [badgeInput, setBadgeInput] = useState('');
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(initialData?.heroImageUrl || null);
  const [heroImageRemoved, setHeroImageRemoved] = useState(false);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalImagesRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddBadge = () => {
    if (badgeInput.trim() && !formData.badges.includes(badgeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        badges: [...prev.badges, badgeInput.trim()]
      }));
      setBadgeInput('');
    }
  };

  const handleRemoveBadge = (index: number) => {
    setFormData(prev => ({
      ...prev,
      badges: prev.badges.filter((_, i) => i !== index)
    }));
  };

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImage(file);
      setHeroImageRemoved(false);
      const reader = new FileReader();
      reader.onload = (e) => {
        setHeroImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setAdditionalImages(files);
      const previews = files.map(file => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(previews).then(setAdditionalImagePreviews);
    }
  };

  const removeHeroImage = () => {
    setHeroImage(null);
    setHeroImagePreview(null);
    if (isEdit && initialData?.heroImageUrl) {
      setHeroImageRemoved(true);
    } else {
      setHeroImageRemoved(false);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('brandId', formData.brandId);
      formDataToSend.append('basePrice', formData.basePrice.toString());
      formDataToSend.append('currency', formData.currency);
      formDataToSend.append('stockStatus', formData.stockStatus);
      formDataToSend.append('isPublished', formData.isPublished.toString());
      formDataToSend.append('isFeatured', formData.isFeatured.toString());
      formDataToSend.append('isNew', formData.isNew.toString());
      formDataToSend.append('badges', JSON.stringify(formData.badges));

      if (initialData?.id) {
        formDataToSend.append('id', initialData.id);
      }

      if (heroImage) {
        formDataToSend.append('heroImage', heroImage);
      }

      formDataToSend.append('removeHeroImage', heroImageRemoved ? 'true' : 'false');

      additionalImages.forEach((image, index) => {
        formDataToSend.append(`additionalImage${index}`, image);
      });

      const response = await fetch('/api/motors', {
        method: isEdit ? 'PUT' : 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        router.push('/admin/motors');
        router.refresh();
      } else {
        const errorResponse = await response.json().catch(() => ({}));
        const message =
          errorResponse?.error ||
          errorResponse?.message ||
          'Bilinmeyen hata';
        alert('Hata: ' + message);
      }
    } catch (error) {
      console.error('Error saving motor:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Temel Bilgiler */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
              Motor Adı *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Örn: Pulsar 200 NS"
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-semibold text-gray-800 mb-2">
              URL Slug *
            </label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="Örn: pulsar-200-ns"
              required
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-semibold text-gray-800 mb-2">
              Alt Başlık
            </label>
            <Input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="Örn: Spor Motosiklet"
            />
          </div>

          <div>
            <label htmlFor="brandId" className="block text-sm font-semibold text-gray-800 mb-2">
              Marka *
            </label>
            <Select
              id="brandId"
              name="brandId"
              value={formData.brandId}
              onChange={handleInputChange}
              required
            >
              <option value="">Marka Seçin</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Fiyat ve Stok */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiyat ve Stok</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="basePrice" className="block text-sm font-semibold text-gray-800 mb-2">
              Başlangıç Fiyatı *
            </label>
            <Input
              id="basePrice"
              name="basePrice"
              type="number"
              value={formData.basePrice}
              onChange={handleInputChange}
              placeholder="Örn: 85000"
              required
            />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-semibold text-gray-800 mb-2">
              Para Birimi
            </label>
            <Select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
            >
              <option value="TRY">TRY</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </Select>
          </div>

          <div>
            <label htmlFor="stockStatus" className="block text-sm font-semibold text-gray-800 mb-2">
              Stok Durumu
            </label>
            <Select
              id="stockStatus"
              name="stockStatus"
              value={formData.stockStatus}
              onChange={handleInputChange}
            >
              <option value="in_stock">Stokta</option>
              <option value="low_stock">Az Stok</option>
              <option value="out_of_stock">Stok Yok</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Durumlar */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Durumlar</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              checked={formData.isPublished}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm font-medium text-gray-900">
              Yayında
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="isFeatured"
              name="isFeatured"
              type="checkbox"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isFeatured" className="ml-2 block text-sm font-medium text-gray-900">
              Öne Çıkan
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="isNew"
              name="isNew"
              type="checkbox"
              checked={formData.isNew}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isNew" className="ml-2 block text-sm font-medium text-gray-900">
              Yeni
            </label>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiketler</h3>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={badgeInput}
              onChange={(e) => setBadgeInput(e.target.value)}
              placeholder="Etiket ekle..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBadge())}
            />
            <Button type="button" onClick={handleAddBadge} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {formData.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {badge}
                  <button
                    type="button"
                    onClick={() => handleRemoveBadge(index)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Görseller */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Görseller</h3>
        
        {/* Hero Image */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Ana Görsel *
            </label>
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleHeroImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Ana Görsel Seç
              </Button>
              {heroImagePreview && (
                <div className="relative">
                  <NextImage
                    src={heroImagePreview}
                    alt="Ana görsel önizlemesi"
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg border object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={removeHeroImage}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Ek Görseller
            </label>
            <div className="flex items-center gap-4">
              <input
                ref={additionalImagesRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => additionalImagesRef.current?.click()}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Ek Görseller Seç
              </Button>
            </div>
            
            {additionalImagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {additionalImagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <NextImage
                      src={preview}
                      alt={`Ek görsel ${index + 1}`}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-lg border object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Butonlar */}
      <div className="flex gap-4 pt-6">
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Kaydediliyor...' : (isEdit ? 'Güncelle' : 'Kaydet')}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/motors')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          İptal
        </Button>
      </div>
    </form>
  );
}
