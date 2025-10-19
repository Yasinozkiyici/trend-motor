import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    
    const supabase = createServiceRoleClient();
    const formData = await request.formData();
    
    const sliderId = formData.get('slider_id') as string;
    const title = formData.get('title') as string || 'Resim';
    const alt = formData.get('alt') as string || 'Slider resmi';
    const imageSource = formData.get('image_source') as string;
    const imageUrl = formData.get('image_url') as string;
    const desktopFile = formData.get('desktop_image') as File;
    const isPublished = formData.get('is_published') === 'true';
    
    if (!sliderId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Slider ID gerekli' 
      }, { status: 400 });
    }
    
    let desktopImagePath = null;
    
    if (imageSource === 'url' && imageUrl) {
      // URL ile görsel ekleme
      desktopImagePath = imageUrl;
    } else if (desktopFile) {
      // Dosya yükleme
      const fileName = `slides/${Date.now()}-${desktopFile.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('sliders')
        .upload(fileName, desktopFile, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        throw new Error(`Dosya yüklenemedi: ${uploadError.message}`);
      }
      
      desktopImagePath = uploadData.path;
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Resim gerekli' 
      }, { status: 400 });
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
        title: title,
        alt: alt,
        desktop_image_path: desktopImagePath,
        mobile_image_path: desktopImagePath, // Aynı resmi mobil için de kullan
        overlay_opacity: 0.35,
        text_align: 'left',
        text_color: '#FFFFFF',
        button_variant: 'primary',
        sort_order: nextOrder,
        is_published: isPublished,
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(`Slide oluşturulamadı: ${error.message}`);
    }
    
    return NextResponse.json({ 
      success: true, 
      data: slide 
    });
    
  } catch (error) {
    console.error('Create slide error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Bilinmeyen hata' 
    }, { status: 500 });
  }
}

