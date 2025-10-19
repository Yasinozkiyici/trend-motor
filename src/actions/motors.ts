'use server';

import { revalidateTag } from 'next/cache';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { uploadToStorage, deleteFromStorage } from '@/lib/images';
import { requireAdmin } from '@/lib/auth';

// ============================================================================
// MARKA İŞLEMLERİ
// ============================================================================

export async function listBrands() {
  try {
    const supabase = createServiceRoleClient();
    
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('List brands error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function createBrand(formData: FormData) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const logoFile = formData.get('logo') as File | null;
    
    if (!name || !slug) {
      throw new Error('Marka adı ve slug gerekli');
    }
    
    let logoPath: string | null = null;
    
    if (logoFile && logoFile.size > 0) {
      const upload = await uploadToStorage(logoFile, 'brands', 'motors');
      if (upload) {
        logoPath = upload.path;
      }
    }
    
    const { data, error } = await supabase
      .from('brands')
      .insert({
        name,
        slug,
        logo_path: logoPath,
        is_active: true
      })
      .select()
      .single();
    
    if (error) throw error;
    
    revalidateTag('motors:list');
    revalidateTag('home:featured');
    
    return { success: true, data };
  } catch (error) {
    console.error('Create brand error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function updateBrand(brandId: string, formData: FormData) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const logoFile = formData.get('logo') as File | null;
    const isActive = formData.get('is_active') === 'true';
    
    // Mevcut markayı al
    const { data: currentBrand } = await supabase
      .from('brands')
      .select('logo_path')
      .eq('id', brandId)
      .single();
    
    let logoPath = currentBrand?.logo_path;
    
    if (logoFile && logoFile.size > 0) {
      // Eski logoyu sil
      if (logoPath) {
        await deleteFromStorage(logoPath, 'motors');
      }
      
      // Yeni logoyu yükle
      const upload = await uploadToStorage(logoFile, 'brands', 'motors');
      if (upload) {
        logoPath = upload.path;
      }
    }
    
    const { data, error } = await supabase
      .from('brands')
      .update({
        name,
        slug,
        logo_path: logoPath,
        is_active: isActive,
        updated_at: new Date().toISOString()
      })
      .eq('id', brandId)
      .select()
      .single();
    
    if (error) throw error;
    
    revalidateTag('motors:list');
    revalidateTag('home:featured');
    
    return { success: true, data };
  } catch (error) {
    console.error('Update brand error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

// ============================================================================
// MOTOR İŞLEMLERİ
// ============================================================================

export async function createMotor(formData: FormData) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const brandId = formData.get('brand_id') as string;
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const subtitle = formData.get('subtitle') as string || null;
    const sku = formData.get('sku') as string || null;
    const basePrice = parseFloat(formData.get('base_price') as string) || 0;
    const currency = formData.get('currency') as string || 'TRY';
    const priceNote = formData.get('price_note') as string || null;
    const stockStatus = formData.get('stock_status') as string || 'in_stock';
    const isFeatured = formData.get('is_featured') === 'true';
    const isPublished = formData.get('is_published') === 'true';
    const publishAt = formData.get('publish_at') as string || null;
    const unpublishAt = formData.get('unpublish_at') as string || null;
    const heroFile = formData.get('hero_image') as File | null;
    
    if (!brandId || !name || !slug) {
      throw new Error('Marka, ad ve slug gerekli');
    }
    
    let heroImagePath: string | null = null;
    
    if (heroFile && heroFile.size > 0) {
      const upload = await uploadToStorage(heroFile, 'motorcycles', 'motors');
      if (upload) {
        heroImagePath = upload.path;
      }
    }
    
    // Get next sort order
    const { data: maxOrder } = await supabase
      .from('motorcycles')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single();
    
    const nextOrder = (maxOrder?.sort_order || 0) + 1;
    
    const { data, error } = await supabase
      .from('motorcycles')
      .insert({
        brand_id: brandId,
        name,
        slug,
        subtitle,
        sku,
        base_price: basePrice,
        currency,
        price_note: priceNote,
        stock_status: stockStatus,
        is_featured: isFeatured,
        is_published: isPublished,
        publish_at: publishAt ? new Date(publishAt).toISOString() : null,
        unpublish_at: unpublishAt ? new Date(unpublishAt).toISOString() : null,
        hero_image_path: heroImagePath,
        sort_order: nextOrder
      })
      .select()
      .single();
    
    if (error) throw error;
    
    revalidateTag('motors:list');
    revalidateTag('home:featured');
    revalidateTag(`motor:${slug}`);
    
    return { success: true, data };
  } catch (error) {
    console.error('Create motor error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function updateMotor(motorId: string, formData: FormData) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const brandId = formData.get('brand_id') as string;
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const subtitle = formData.get('subtitle') as string || null;
    const sku = formData.get('sku') as string || null;
    const basePrice = parseFloat(formData.get('base_price') as string) || 0;
    const currency = formData.get('currency') as string || 'TRY';
    const priceNote = formData.get('price_note') as string || null;
    const stockStatus = formData.get('stock_status') as string || 'in_stock';
    const isFeatured = formData.get('is_featured') === 'true';
    const isPublished = formData.get('is_published') === 'true';
    const publishAt = formData.get('publish_at') as string || null;
    const unpublishAt = formData.get('unpublish_at') as string || null;
    const heroFile = formData.get('hero_image') as File | null;
    
    // Mevcut motoru al
    const { data: currentMotor } = await supabase
      .from('motorcycles')
      .select('hero_image_path, slug')
      .eq('id', motorId)
      .single();
    
    let heroImagePath = currentMotor?.hero_image_path;
    
    if (heroFile && heroFile.size > 0) {
      // Eski görseli sil
      if (heroImagePath) {
        await deleteFromStorage(heroImagePath, 'motors');
      }
      
      // Yeni görseli yükle
      const upload = await uploadToStorage(heroFile, 'motorcycles', 'motors');
      if (upload) {
        heroImagePath = upload.path;
      }
    }
    
    const { data, error } = await supabase
      .from('motorcycles')
      .update({
        brand_id: brandId,
        name,
        slug,
        subtitle,
        sku,
        base_price: basePrice,
        currency,
        price_note: priceNote,
        stock_status: stockStatus,
        is_featured: isFeatured,
        is_published: isPublished,
        publish_at: publishAt ? new Date(publishAt).toISOString() : null,
        unpublish_at: unpublishAt ? new Date(unpublishAt).toISOString() : null,
        hero_image_path: heroImagePath,
        updated_at: new Date().toISOString()
      })
      .eq('id', motorId)
      .select()
      .single();
    
    if (error) throw error;
    
    revalidateTag('motors:list');
    revalidateTag('home:featured');
    revalidateTag(`motor:${currentMotor?.slug}`);
    revalidateTag(`motor:${slug}`);
    
    return { success: true, data };
  } catch (error) {
    console.error('Update motor error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function deleteMotor(motorId: string) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    // Mevcut motoru al
    const { data: motor } = await supabase
      .from('motorcycles')
      .select('slug, hero_image_path')
      .eq('id', motorId)
      .single();
    
    if (!motor) {
      throw new Error('Motor bulunamadı');
    }
    
    // Hero görseli sil
    if (motor.hero_image_path) {
      await deleteFromStorage(motor.hero_image_path, 'motors');
    }
    
    // Galeri görsellerini al ve sil
    const { data: images } = await supabase
      .from('motorcycle_images')
      .select('path')
      .eq('motorcycle_id', motorId);
    
    if (images) {
      for (const img of images) {
        await deleteFromStorage(img.path, 'motors');
      }
    }
    
    // Motoru sil (cascade ile ilişkiler de silinir)
    const { error } = await supabase
      .from('motorcycles')
      .delete()
      .eq('id', motorId);
    
    if (error) throw error;
    
    revalidateTag('motors:list');
    revalidateTag('home:featured');
    revalidateTag(`motor:${motor.slug}`);
    
    return { success: true };
  } catch (error) {
    console.error('Delete motor error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function togglePublishMotor(motorId: string, isPublished: boolean) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const { data, error } = await supabase
      .from('motorcycles')
      .update({ 
        is_published: isPublished,
        updated_at: new Date().toISOString()
      })
      .eq('id', motorId)
      .select('slug')
      .single();
    
    if (error) throw error;
    
    revalidateTag('motors:list');
    revalidateTag('home:featured');
    revalidateTag(`motor:${data.slug}`);
    
    return { success: true };
  } catch (error) {
    console.error('Toggle publish error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function toggleFeaturedMotor(motorId: string, isFeatured: boolean) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const { data, error } = await supabase
      .from('motorcycles')
      .update({ 
        is_featured: isFeatured,
        updated_at: new Date().toISOString()
      })
      .eq('id', motorId)
      .select('slug')
      .single();
    
    if (error) throw error;
    
    revalidateTag('motors:list');
    revalidateTag('home:featured');
    revalidateTag(`motor:${data.slug}`);
    
    return { success: true };
  } catch (error) {
    console.error('Toggle featured error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

// ============================================================================
// GÖRSEL İŞLEMLERİ
// ============================================================================

export async function uploadMotorImage(motorId: string, formData: FormData) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const imageFile = formData.get('image') as File;
    const alt = formData.get('alt') as string || '';
    const isPrimary = formData.get('is_primary') === 'true';
    
    if (!imageFile || imageFile.size === 0) {
      throw new Error('Görsel gerekli');
    }
    
    const upload = await uploadToStorage(imageFile, `motorcycles/${motorId}`, 'motors');
    
    if (!upload) {
      throw new Error('Görsel yüklenemedi');
    }
    
    // Get next sort order
    const { data: maxOrder } = await supabase
      .from('motorcycle_images')
      .select('sort_order')
      .eq('motorcycle_id', motorId)
      .order('sort_order', { ascending: false })
      .limit(1)
      .single();
    
    const nextOrder = (maxOrder?.sort_order || 0) + 1;
    
    // Primary ise diğerlerini primary değil yap
    if (isPrimary) {
      await supabase
        .from('motorcycle_images')
        .update({ is_primary: false })
        .eq('motorcycle_id', motorId);
    }
    
    const { data, error } = await supabase
      .from('motorcycle_images')
      .insert({
        motorcycle_id: motorId,
        path: upload.path,
        alt,
        sort_order: nextOrder,
        is_primary: isPrimary
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Motor slug'ını al ve revalidate et
    const { data: motor } = await supabase
      .from('motorcycles')
      .select('slug')
      .eq('id', motorId)
      .single();
    
    if (motor) {
      revalidateTag(`motor:${motor.slug}`);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Upload motor image error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function reorderImages(motorId: string, imageIds: string[]) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    for (let i = 0; i < imageIds.length; i++) {
      await supabase
        .from('motorcycle_images')
        .update({ sort_order: i })
        .eq('id', imageIds[i])
        .eq('motorcycle_id', motorId);
    }
    
    // Motor slug'ını al ve revalidate et
    const { data: motor } = await supabase
      .from('motorcycles')
      .select('slug')
      .eq('id', motorId)
      .single();
    
    if (motor) {
      revalidateTag(`motor:${motor.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Reorder images error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function deleteImage(imageId: string, motorId: string) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    // Görseli al
    const { data: image } = await supabase
      .from('motorcycle_images')
      .select('path')
      .eq('id', imageId)
      .single();
    
    if (!image) {
      throw new Error('Görsel bulunamadı');
    }
    
    // Storage'dan sil
    await deleteFromStorage(image.path, 'motors');
    
    // Veritabanından sil
    const { error } = await supabase
      .from('motorcycle_images')
      .delete()
      .eq('id', imageId);
    
    if (error) throw error;
    
    // Motor slug'ını al ve revalidate et
    const { data: motor } = await supabase
      .from('motorcycles')
      .select('slug')
      .eq('id', motorId)
      .single();
    
    if (motor) {
      revalidateTag(`motor:${motor.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Delete image error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

// ============================================================================
// ÖZELLİK İŞLEMLERİ
// ============================================================================

export async function saveSpecsJson(motorId: string, specs: Record<string, unknown>) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    const { error } = await supabase
      .from('motorcycle_specs')
      .upsert({
        motorcycle_id: motorId,
        specs
      });
    
    if (error) throw error;
    
    // Motor slug'ını al ve revalidate et
    const { data: motor } = await supabase
      .from('motorcycles')
      .select('slug')
      .eq('id', motorId)
      .single();
    
    if (motor) {
      revalidateTag(`motor:${motor.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Save specs error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}

export async function upsertSpecItems(motorId: string, items: Array<{
  id?: string;
  group_name: string;
  key_name: string;
  value_text: string;
  sort_order: number;
}>) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    
    // Önce mevcut öğeleri sil
    await supabase
      .from('motorcycle_spec_items')
      .delete()
      .eq('motorcycle_id', motorId);
    
    // Yeni öğeleri ekle
    if (items.length > 0) {
      const { error } = await supabase
        .from('motorcycle_spec_items')
        .insert(
          items.map(item => ({
            motorcycle_id: motorId,
            group_name: item.group_name,
            key_name: item.key_name,
            value_text: item.value_text,
            sort_order: item.sort_order
          }))
        );
      
      if (error) throw error;
    }
    
    // Motor slug'ını al ve revalidate et
    const { data: motor } = await supabase
      .from('motorcycles')
      .select('slug')
      .eq('id', motorId)
      .single();
    
    if (motor) {
      revalidateTag(`motor:${motor.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Upsert spec items error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}


