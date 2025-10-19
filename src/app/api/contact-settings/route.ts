import { NextRequest, NextResponse } from 'next/server';

// TODO: Replace with actual database client
const mockContactSettings = {
  id: 'singleton',
  address: 'Acarlar, Hanımeli Sk. No:20 D:1A, 45400 Turgutlu/Manisa',
  phone: '+90 532 152 51 45',
  email: 'info@trendmotor.com',
  hours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
  map: {
    lat: 38.4928158,
    lng: 27.7036489,
    zoom: 14,
    provider: 'google' as const
  }
};

export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with actual database query
    // const { data: settings, error } = await supabase
    //   .from('contact_settings')
    //   .select('*')
    //   .eq('id', 'singleton')
    //   .single();

    // if (error) throw error;

    return NextResponse.json(
      { success: true, data: mockContactSettings },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching contact settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact settings' },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Add authentication check here
    // TODO: Replace with actual database update
    // const { data, error } = await supabase
    //   .from('contact_settings')
    //   .update(body)
    //   .eq('id', 'singleton')
    //   .select()
    //   .single();

    // if (error) throw error;

    // Revalidate cache tags
    // await revalidateTag('contact');
    // await revalidateTag('home');

    return NextResponse.json(
      { success: true, message: 'Contact settings updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating contact settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contact settings' },
      { status: 500 }
    );
  }
}

