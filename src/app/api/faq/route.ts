import { NextRequest, NextResponse } from 'next/server';

// TODO: Replace with actual database client
const mockFAQs = [
  {
    id: 'faq-1',
    question: 'Kredi kartına taksit yapıyor musunuz?',
    answer: 'Evet, anlaşmalı kredi kartlarına vade farksız taksit imkanımız bulunmaktadır. Detaylı bilgi için bizi arayabilirsiniz.',
    sortOrder: 1
  },
  {
    id: 'faq-2',
    question: 'Test sürüşü yapabilir miyim?',
    answer: 'Elbette, randevu alarak dilediğiniz model ile test sürüşü yapabilirsiniz. Test sürüşü için geçerli sürücü belgenizi yanınızda bulundurmanız gerekmektedir.',
    sortOrder: 2
  },
  {
    id: 'faq-3',
    question: 'Senetli satış nasıl çalışır?',
    answer: 'Senetli satış sistemimizde, motosiklet bedelini taksitler halinde ödeyebilirsiniz. İlk taksiti peşin olarak ödedikten sonra, kalan tutarı belirlediğiniz vade sayısına göre ödersiniz.',
    sortOrder: 3
  },
  {
    id: 'faq-4',
    question: 'Hangi belgeler gerekiyor?',
    answer: 'Kimlik belgesi, sürücü belgesi, gelir belgesi ve ikametgah belgesi gerekmektedir. Detaylı liste için müşteri hizmetlerimizden bilgi alabilirsiniz.',
    sortOrder: 4
  }
];

export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with actual database query
    // const { data: faqs, error } = await supabase
    //   .from('faq')
    //   .select('*')
    //   .order('sort_order', { ascending: true });

    // if (error) throw error;

    const faqs = mockFAQs.sort((a, b) => a.sortOrder - b.sortOrder);

    return NextResponse.json(
      { success: true, data: faqs },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Add authentication check here
    // TODO: Replace with actual database insert
    // const { data, error } = await supabase
    //   .from('faq')
    //   .insert([body])
    //   .select()
    //   .single();

    // if (error) throw error;

    // Revalidate cache tags
    // await revalidateTag('faq');

    return NextResponse.json(
      { success: true, message: 'FAQ created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    // TODO: Add authentication check here
    // TODO: Replace with actual database update
    // const { data, error } = await supabase
    //   .from('faq')
    //   .update(updateData)
    //   .eq('id', id)
    //   .select()
    //   .single();

    // if (error) throw error;

    // Revalidate cache tags
    // await revalidateTag('faq');

    return NextResponse.json(
      { success: true, message: 'FAQ updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'FAQ ID is required' },
        { status: 400 }
      );
    }
    
    // TODO: Add authentication check here
    // TODO: Replace with actual database delete
    // const { error } = await supabase
    //   .from('faq')
    //   .delete()
    //   .eq('id', id);

    // if (error) throw error;

    // Revalidate cache tags
    // await revalidateTag('faq');

    return NextResponse.json(
      { success: true, message: 'FAQ deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}

