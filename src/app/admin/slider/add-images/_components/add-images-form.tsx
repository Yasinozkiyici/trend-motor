'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { FileDropzone } from '@/components/ui/file-dropzone';

export function AddImagesForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (file: File) => {
    setFiles(prev => [...prev, file]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast.error('En az bir resim seçin');
      return;
    }

    setUploading(true);
    
    try {
      // Her dosya için slide oluştur
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        
        // Slider ID'yi al
        const sliderResponse = await fetch('/api/slider-id');
        const sliderData = await sliderResponse.json();
        
        if (!sliderData.success) {
          throw new Error('Slider bulunamadı');
        }
        
        formData.append('slider_id', sliderData.sliderId);
        formData.append('title', `Resim ${i + 1}`);
        formData.append('alt', `Slider resmi ${i + 1}`);
        formData.append('image_source', 'upload');
        formData.append('desktop_image', file);
        formData.append('is_published', 'true');
        
        const response = await fetch('/api/slides', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Resim ${i + 1} yüklenemedi`);
        }
      }
      
      toast.success(`${files.length} resim başarıyla eklendi`);
      setFiles([]);
      router.refresh();
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Resim yükleme hatası');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dosya Seçimi */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Resim Seç</h2>
        <FileDropzone
          name="images"
          label="Resimler"
          description="Birden fazla resim seçebilirsiniz (JPG, PNG, WebP)"
          onFileSelect={handleFileSelect}
          multiple={true}
        />
      </div>

      {/* Seçilen Dosyalar */}
      {files.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Seçilen Resimler ({files.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <NextImage
                    src={URL.createObjectURL(file)}
                    alt={`Önizleme ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Yükleme Butonu */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={files.length === 0 || uploading || isPending}
          className="px-8"
        >
          {uploading ? 'Yükleniyor...' : `${files.length} Resmi Ekle`}
        </Button>
      </div>
    </div>
  );
}
