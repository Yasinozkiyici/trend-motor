import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createServiceRoleClient();
    
    const { data: slider, error } = await supabase
      .from('sliders')
      .select('id')
      .eq('slug', 'home-hero')
      .single();
    
    if (error || !slider) {
      return NextResponse.json({ 
        success: false, 
        error: 'Slider bulunamadı' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      sliderId: slider.id 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Sunucu hatası' 
    }, { status: 500 });
  }
}
