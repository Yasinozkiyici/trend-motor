import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FooterLinkSchema } from '@/lib/schemas';
import { 
  requireAuth, 
  createErrorResponse, 
  createSuccessResponse, 
  createPaginatedResponse,
  parsePaginationParams,
  handleSupabaseError 
} from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { page, limit, offset } = parsePaginationParams(request);
    
    const { data, error, count } = await supabase
      .from('footer_links')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .range(offset, offset + limit - 1);
    
    if (error) {
      const { message, status } = handleSupabaseError(error);
      return createErrorResponse(message, status);
    }
    
    return createPaginatedResponse(data || [], page, limit, count || 0);
  } catch (error) {
    return createErrorResponse('Footer link listesi alınamadı', 500);
  }
}
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return createErrorResponse(authResult.error, authResult.status);
    }
    
    const body = await request.json();
    const validatedData = FooterLinkSchema.parse(body);
    
    const supabase = createClient();
    const { data, error } = await supabase
      .from('footer_links')
      .insert([validatedData])
      .select()
      .single();
    
    if (error) {
      const { message, status } = handleSupabaseError(error);
      return createErrorResponse(message, status);
    }
    
    return createSuccessResponse(data, 'Footer link başarıyla oluşturuldu', 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes('validation')) {
      return createErrorResponse(error.message, 400);
    }
    return createErrorResponse('Footer link oluşturulamadı', 500);
  }
}
