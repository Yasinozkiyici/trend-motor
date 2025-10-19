'use server';

import { revalidateTag } from 'next/cache';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { uploadToStorage, deleteFromStorage } from '@/lib/images';
import { SlideInputSchema, SliderSettingsSchema } from '@/lib/slider-schemas';
import { requireAdmin } from '@/lib/auth';

export async function createSlide(formData: FormData) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    // FormData'dan değerleri al - null check ekle
    const sliderId = formData.get('slider_id') as string;
    const imageSource = formData.get('image_source') as string;
    const imageUrl = formData.get('image_url') as string;
    
    if (!sliderId) {
      throw new Error('Slider ID gerekli');
    }
    
    console.log('createSlide - sliderId:', sliderId);
    console.log('createSlide - imageSource:', imageSource);
    console.log('createSlide - imageUrl:', imageUrl);
    
    const data = {
      eyebrow: formData.get('eyebrow') as string || undefined,
      title: formData.get('title') as string || undefined, // Opsiyonel yapıldı
      description: formData.get('description') as string || undefined,
      cta_label: formData.get('cta_label') as string || undefined,
      cta_url: formData.get('cta_url') as string || undefined,
      text_align: formData.get('text_align') as 'left' | 'center' | 'right' || 'left',
      overlay_opacity: parseFloat(formData.get('overlay_opacity') as string) || 0.35,
      text_color: formData.get('text_color') as string || '#FFFFFF',
      button_variant: formData.get('button_variant') as string || 'primary',
      desktop_image: formData.get('desktop_image') as File,
      mobile_image: formData.get('mobile_image') as File || undefined,
      is_published: formData.get('is_published') === 'true',
      publish_at: formData.get('publish_at') as string || undefined,
      unpublish_at: formData.get('unpublish_at') as string || undefined,
    };
    
    const validatedData = SlideInputSchema.parse(data);
    
    let desktopImagePath = null;
    let mobileImagePath = null;
    
    if (imageSource === 'url' && imageUrl) {
      // URL ile görsel ekleme
      desktopImagePath = imageUrl;
    } else if (validatedData.desktop_image) {
      // Dosya yükleme
      const desktopUpload = await uploadToStorage(validatedData.desktop_image, 'slides');
      if (!desktopUpload) {
        throw new Error('Desktop görsel yüklenemedi');
      }
      desktopImagePath = desktopUpload.path;
    } else {
      throw new Error('Desktop görsel gerekli');
    }
    
    if (validatedData.mobile_image) {
      const mobileUpload = await uploadToStorage(validatedData.mobile_image, 'slides');
      if (mobileUpload) {
        mobileImagePath = mobileUpload.path;
      }
    }
    
    // Get next sort order
    const { data: maxOrder } = await supabase
      .from('slides')
      .select('sort_order')
      .eq('slider_id', sliderId)
      .order('sort_order', { ascending: false })
      .limit(1)
      .single();
    
    const nextOrder = (maxOrder?.sort_order || 0) + 1;
    
    // Insert slide
    const { data: slide, error } = await supabase
      .from('slides')
      .insert({
        slider_id: sliderId,
        eyebrow: validatedData.eyebrow,
        title: validatedData.title,
        description: validatedData.description,
        cta_label: validatedData.cta_label,
        cta_url: validatedData.cta_url,
        desktop_image_path: desktopImagePath,
        mobile_image_path: mobileImagePath,
        alt: validatedData.title || validatedData.alt || 'Slide',
        overlay_opacity: validatedData.overlay_opacity,
        text_align: validatedData.text_align,
        text_color: validatedData.text_color,
        button_variant: validatedData.button_variant,
        sort_order: nextOrder,
        is_published: validatedData.is_published,
        publish_at: validatedData.publish_at ? new Date(validatedData.publish_at).toISOString() : null,
        unpublish_at: validatedData.unpublish_at ? new Date(validatedData.unpublish_at).toISOString() : null,
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(`Slide oluşturulamadı: ${error.message}`);
    }
    
    revalidateTag('slider:home-hero');
    
    return { success: true, data: slide };
  } catch (error) {
    console.error('Create slide error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function updateSlide(slideId: string, formData: FormData) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const imageSource = formData.get('image_source') as string;
    const imageUrl = formData.get('image_url') as string;
    
    const data = {
      eyebrow: formData.get('eyebrow') as string || undefined,
      title: formData.get('title') as string || undefined, // Opsiyonel yapıldı
      description: formData.get('description') as string || undefined,
      cta_label: formData.get('cta_label') as string || undefined,
      cta_url: formData.get('cta_url') as string || undefined,
      text_align: formData.get('text_align') as 'left' | 'center' | 'right' || 'left',
      overlay_opacity: parseFloat(formData.get('overlay_opacity') as string) || 0.35,
      text_color: formData.get('text_color') as string || '#FFFFFF',
      button_variant: formData.get('button_variant') as string || 'primary',
      desktop_image: formData.get('desktop_image') as File,
      mobile_image: formData.get('mobile_image') as File || undefined,
      is_published: formData.get('is_published') === 'true',
      publish_at: formData.get('publish_at') as string || undefined,
      unpublish_at: formData.get('unpublish_at') as string || undefined,
    };
    
    const validatedData = SlideInputSchema.parse(data);
    
    // Get current slide
    const { data: currentSlide, error: fetchError } = await supabase
      .from('slides')
      .select('desktop_image_path, mobile_image_path')
      .eq('id', slideId)
      .single();
    
    if (fetchError) {
      throw new Error('Slide bulunamadı');
    }
    
    let desktopImagePath = currentSlide.desktop_image_path;
    let mobileImagePath = currentSlide.mobile_image_path;
    
    // Handle desktop image update
    if (imageSource === 'url' && imageUrl) {
      // URL ile görsel ekleme
      desktopImagePath = imageUrl;
    } else if (validatedData.desktop_image) {
      // Dosya yükleme
      const desktopUpload = await uploadToStorage(validatedData.desktop_image, 'slides');
      if (desktopUpload) {
        // Delete old desktop image
        if (currentSlide.desktop_image_path) {
          await deleteFromStorage(currentSlide.desktop_image_path);
        }
        desktopImagePath = desktopUpload.path;
      }
    }
    
    if (validatedData.mobile_image) {
      const mobileUpload = await uploadToStorage(validatedData.mobile_image, 'slides');
      if (mobileUpload) {
        // Delete old mobile image
        if (currentSlide.mobile_image_path) {
          await deleteFromStorage(currentSlide.mobile_image_path);
        }
        mobileImagePath = mobileUpload.path;
      }
    }
    
    // Update slide
    const { data: slide, error } = await supabase
      .from('slides')
      .update({
        eyebrow: validatedData.eyebrow,
        title: validatedData.title,
        description: validatedData.description,
        cta_label: validatedData.cta_label,
        cta_url: validatedData.cta_url,
        desktop_image_path: desktopImagePath,
        mobile_image_path: mobileImagePath,
        alt: validatedData.title || validatedData.alt || 'Slide',
        overlay_opacity: validatedData.overlay_opacity,
        text_align: validatedData.text_align,
        text_color: validatedData.text_color,
        button_variant: validatedData.button_variant,
        is_published: validatedData.is_published,
        publish_at: validatedData.publish_at ? new Date(validatedData.publish_at).toISOString() : null,
        unpublish_at: validatedData.unpublish_at ? new Date(validatedData.unpublish_at).toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', slideId)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Slide güncellenemedi: ${error.message}`);
    }
    
    revalidateTag('slider:home-hero');
    
    return { success: true, data: slide };
  } catch (error) {
    console.error('Update slide error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function deleteSlide(slideId: string) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    // Get slide to delete images
    const { data: slide, error: fetchError } = await supabase
      .from('slides')
      .select('desktop_image_path, mobile_image_path')
      .eq('id', slideId)
      .single();
    
    if (fetchError) {
      throw new Error('Slide bulunamadı');
    }
    
    // Delete slide
    const { error } = await supabase
      .from('slides')
      .delete()
      .eq('id', slideId);
    
    if (error) {
      throw new Error(`Slide silinemedi: ${error.message}`);
    }
    
    // Delete images
    if (slide.desktop_image_path) {
      await deleteFromStorage(slide.desktop_image_path);
    }
    if (slide.mobile_image_path) {
      await deleteFromStorage(slide.mobile_image_path);
    }
    
    revalidateTag('slider:home-hero');
    
    return { success: true };
  } catch (error) {
    console.error('Delete slide error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function reorderSlides(sliderId: string, slideIds: string[]) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const updates = slideIds.map((id, index) => ({
      id,
      sort_order: index + 1,
    }));
    
    for (const update of updates) {
      const { error } = await supabase
        .from('slides')
        .update({ sort_order: update.sort_order })
        .eq('id', update.id)
        .eq('slider_id', sliderId);
      
      if (error) {
        throw new Error(`Sıralama güncellenemedi: ${error.message}`);
      }
    }
    
    revalidateTag('slider:home-hero');
    
    return { success: true };
  } catch (error) {
    console.error('Reorder slides error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function updateSliderSettings(sliderId: string, settings: Record<string, unknown>) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const validatedSettings = SliderSettingsSchema.parse(settings);
    
    const { data, error } = await supabase
      .from('slider_settings')
      .upsert({
        slider_id: sliderId,
        ...validatedSettings,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(`Ayarlar güncellenemedi: ${error.message}`);
    }
    
    revalidateTag('slider:home-hero');
    
    return { success: true, data };
  } catch (error) {
    console.error('Update slider settings error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}