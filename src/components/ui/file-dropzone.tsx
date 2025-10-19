'use client';

import Image from 'next/image';
import {
  useCallback,
  useRef,
  useState,
  type DragEvent,
  type InputHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

type FileDropzoneProps = {
  name: string;
  label?: string;
  description?: string;
  accept?: InputHTMLAttributes<HTMLInputElement>['accept'];
  onFileSelect?: (file: File | null) => void;
  previewUrl?: string | null;
  existingFileName?: string | null;
  required?: boolean;
};

export function FileDropzone({
  name,
  label,
  description,
  accept,
  onFileSelect,
  previewUrl,
  existingFileName,
  required,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const existingLabel = existingFileName
    ? existingFileName.split('/').pop() ?? existingFileName
    : null;

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }
      const file = files[0] ?? null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      handleFiles(event.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-600 transition',
          isDragging && 'border-blue-500 bg-blue-50 text-blue-600'
        )}
      >
        <p>
          <strong>Dosyayı sürükleyip bırakın</strong> veya
        </p>
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          onClick={() => inputRef.current?.click()}
        >
          Dosya seç
        </button>
        {description ? (
          <p className="text-xs text-gray-500">{description}</p>
        ) : null}
        {selectedFile ? (
          <p className="text-xs text-blue-600">{selectedFile.name}</p>
        ) : existingLabel ? (
          <p className="text-xs text-gray-500">
            Mevcut dosya: {existingLabel}
          </p>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        className="hidden"
        required={required}
        onChange={(event) => handleFiles(event.target.files)}
      />

      {previewUrl ? (
        <div className="relative h-32 w-full overflow-hidden rounded-md">
          <Image
            src={previewUrl}
            alt="Önizleme"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
