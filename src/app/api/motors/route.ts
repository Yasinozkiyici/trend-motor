import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { uploadToStorage, deleteFromStorage } from '@/lib/images';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const supabase = createServiceRoleClient();

    // Extract form data
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const subtitle = formData.get('subtitle') as string;
    const description = formData.get('description') as string;
    const brandId = formData.get('brandId') as string;
    const basePrice = parseFloat(formData.get('basePrice') as string);
    const currency = formData.get('currency') as string;
    const stockStatus = formData.get('stockStatus') as string;
    const isPublished = formData.get('isPublished') === 'true';
    const isFeatured = formData.get('isFeatured') === 'true';
    const isNew = formData.get('isNew') === 'true';
    const badges = JSON.parse(formData.get('badges') as string || '[]');
    const heroImage = formData.get('heroImage') as File | null;

    // Validate required fields
    if (!name || !slug || !brandId || !basePrice) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existingMotor } = await supabase
      .from('motorcycles')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingMotor) {
      return NextResponse.json(
        { error: 'Bu URL slug zaten kullanılıyor' },
        { status: 400 }
      );
    }

    let heroImagePath = null;
    if (heroImage && heroImage.size > 0) {
      try {
        const uploadResult = await uploadToStorage(heroImage, 'hero-images', 'motors');
        if (uploadResult) {
          heroImagePath = uploadResult.path;
        }
      } catch (error) {
        console.error('Error uploading hero image:', error);
        return NextResponse.json(
          { error: 'Ana görsel yüklenirken hata oluştu' },
          { status: 500 }
        );
      }
    }

    // Insert new motorcycle
    const { data, error } = await supabase
      .from('motorcycles')
      .insert([
        {
          name,
          slug,
          subtitle: subtitle || null,
          description: description || null,
          brand_id: brandId,
          base_price: basePrice,
          currency: currency || 'TRY',
          stock_status: stockStatus || 'in_stock',
          is_published: isPublished || false,
          is_featured: isFeatured || false,
          is_new: isNew || false,
          badges: badges || [],
          hero_image_path: heroImagePath,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating motorcycle:', error);
      return NextResponse.json(
        { error: 'Motor oluşturulurken hata oluştu' },
        { status: 500 }
      );
    }

    // Handle additional images
    const additionalImages = [];
    for (let i = 0; i < 10; i++) { // Check up to 10 additional images
      const additionalImage = formData.get(`additionalImage${i}`) as File | null;
      if (additionalImage && additionalImage.size > 0) {
        additionalImages.push(additionalImage);
      }
    }

    // Upload additional images
    for (const [index, image] of additionalImages.entries()) {
      try {
        const uploadResult = await uploadToStorage(image, `motorcycles/${data.id}`, 'motors');
        if (uploadResult) {
          await supabase
            .from('motorcycle_images')
            .insert([
              {
                motorcycle_id: data.id,
                path: uploadResult.path,
                sort_order: index,
                is_primary: index === 0,
              }
            ]);
        }
      } catch (error) {
        console.error(`Error uploading additional image ${index}:`, error);
      }
    }

    revalidateTag('motors:list');
    revalidateTag('home:featured');
    if (data?.slug) {
      revalidateTag(`motor:${data.slug}`);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in POST /api/motors:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const supabase = createServiceRoleClient();

    // Extract form data
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const subtitle = formData.get('subtitle') as string;
    const description = formData.get('description') as string;
    const brandId = formData.get('brandId') as string;
    const basePrice = parseFloat(formData.get('basePrice') as string);
    const currency = formData.get('currency') as string;
    const stockStatus = formData.get('stockStatus') as string;
    const isPublished = formData.get('isPublished') === 'true';
    const isFeatured = formData.get('isFeatured') === 'true';
    const isNew = formData.get('isNew') === 'true';
    const badges = JSON.parse(formData.get('badges') as string || '[]');
    const heroImage = formData.get('heroImage') as File | null;
    const removeHeroImage = formData.get('removeHeroImage') === 'true';

    // Validate required fields
    if (!id || !name || !slug || !brandId || !basePrice) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    // Check if slug already exists for another motorcycle
    const { data: existingMotor } = await supabase
      .from('motorcycles')
      .select('id')
      .eq('slug', slug)
      .neq('id', id)
      .single();

    if (existingMotor) {
      return NextResponse.json(
        { error: 'Bu URL slug zaten kullanılıyor' },
        { status: 400 }
      );
    }

    const { data: currentMotor, error: currentMotorError } = await supabase
      .from('motorcycles')
      .select('slug, hero_image_path')
      .eq('id', id)
      .single();

    if (currentMotorError || !currentMotor) {
      return NextResponse.json(
        { error: 'Motor bulunamadı' },
        { status: 404 }
      );
    }

    let heroImagePath = currentMotor.hero_image_path;

    if (heroImage && heroImage.size > 0) {
      if (heroImagePath) {
        try {
          await deleteFromStorage(heroImagePath, 'motors');
        } catch (error) {
          console.error('Error deleting previous hero image:', error);
        }
      }

      try {
        const uploadResult = await uploadToStorage(heroImage, 'hero-images', 'motors');
        if (uploadResult) {
          heroImagePath = uploadResult.path;
        }
      } catch (error) {
        console.error('Error uploading hero image:', error);
        return NextResponse.json(
          { error: 'Ana görsel yüklenirken hata oluştu' },
          { status: 500 }
        );
      }
    } else if (removeHeroImage && heroImagePath) {
      try {
        await deleteFromStorage(heroImagePath, 'motors');
      } catch (error) {
        console.error('Error deleting hero image:', error);
      }
      heroImagePath = null;
    }

    // Update motorcycle
    const { data, error } = await supabase
      .from('motorcycles')
      .update({
        name,
        slug,
        subtitle: subtitle || null,
        description: description || null,
        brand_id: brandId,
        base_price: basePrice,
        currency: currency || 'TRY',
        stock_status: stockStatus || 'in_stock',
        is_published: isPublished || false,
        is_featured: isFeatured || false,
        is_new: isNew || false,
        badges: badges || [],
        hero_image_path: heroImagePath,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating motorcycle:', error);
      return NextResponse.json(
        { error: 'Motor güncellenirken hata oluştu' },
        { status: 500 }
      );
    }

    revalidateTag('motors:list');
    revalidateTag('home:featured');
    revalidateTag(`motor:${currentMotor.slug}`);
    if (currentMotor.slug !== slug) {
      revalidateTag(`motor:${slug}`);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in PUT /api/motors:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
