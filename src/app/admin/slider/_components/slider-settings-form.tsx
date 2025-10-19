'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { updateSliderSettings } from '@/actions/slider';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

const schema = z.object({
  autoplay_ms: z
    .number({ invalid_type_error: 'Sayı giriniz' })
    .min(2000)
    .max(15000),
  transition_ms: z
    .number({ invalid_type_error: 'Sayı giriniz' })
    .min(200)
    .max(1200),
  loop: z.boolean().default(true),
  pause_on_hover: z.boolean().default(true),
  show_arrows: z.boolean().default(false),
  show_dots: z.boolean().default(false),
  show_progress: z.boolean().default(true),
});

type FormValues = z.infer<typeof schema>;

type SliderSettingsFormProps = {
  sliderId: string;
  defaultValues: FormValues;
};

export function SliderSettingsForm({
  sliderId,
  defaultValues,
}: SliderSettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await updateSliderSettings(sliderId, values);
      if (result?.success) {
        toast.success('Ayarlar güncellendi');
      } else {
        toast.error(result?.error ?? 'Ayarlar güncellenemedi');
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Autoplay (ms)" required>
          <Input
            type="number"
            min={2000}
            max={15000}
            step={500}
            {...form.register('autoplay_ms', { valueAsNumber: true })}
          />
        </FormField>

        <FormField label="Geçiş Süresi (ms)" required>
          <Input
            type="number"
            min={200}
            max={1200}
            step={100}
            {...form.register('transition_ms', { valueAsNumber: true })}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex items-center gap-3 text-sm text-gray-700">
          <input type="checkbox" {...form.register('loop')} />
          Döngü açık
        </label>
        <label className="flex items-center gap-3 text-sm text-gray-700">
          <input type="checkbox" {...form.register('pause_on_hover')} />
          Hover ile duraklat
        </label>
        <label className="flex items-center gap-3 text-sm text-gray-700">
          <input type="checkbox" {...form.register('show_arrows')} />
          Okları göster
        </label>
        <label className="flex items-center gap-3 text-sm text-gray-700">
          <input type="checkbox" {...form.register('show_dots')} />
          Noktaları göster
        </label>
        <label className="flex items-center gap-3 text-sm text-gray-700">
          <input type="checkbox" {...form.register('show_progress')} />
          Progress bar göster
        </label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Kaydediliyor…' : 'Ayarları Kaydet'}
        </Button>
      </div>
    </form>
  );
}
