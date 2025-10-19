import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreditApplicationSchema } from '@/lib/schemas';
import { 
  requireAuth, 
  createErrorResponse, 
  createSuccessResponse, 
  createPaginatedResponse,
  parsePaginationParams,
  checkRateLimit,
  handleSupabaseError 
} from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return createErrorResponse(authResult.error, authResult.status);
    }
    
    const supabase = createClient();
    const { page, limit, offset } = parsePaginationParams(request);
    
    const { data, error, count } = await supabase
      .from('credit_applications')
      .select(`
        *,
        models(name, slug)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) {
      const { message, status } = handleSupabaseError(error);
      return createErrorResponse(message, status);
    }
    
    return createPaginatedResponse(data || [], page, limit, count || 0);
  } catch (error) {
    return createErrorResponse('Kredi başvuruları alınamadı', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for public endpoint
    if (!checkRateLimit(request, 3, 60000)) {
      return createErrorResponse('Çok fazla istek gönderdiniz. Lütfen bir dakika bekleyin.', 429);
    }
    
    const body = await request.json();
    const validatedData = CreditApplicationSchema.parse(body);
    
    const supabase = createClient();
    const { data, error } = await supabase
      .from('credit_applications')
      .insert([validatedData])
      .select(`
        *,
        models(name, slug)
      `)
      .single();
    
    if (error) {
      const { message, status } = handleSupabaseError(error);
      return createErrorResponse(message, status);
    }
    
    return createSuccessResponse(data, 'Kredi başvurunuz başarıyla alındı', 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes('validation')) {
      return createErrorResponse(error.message, 400);
    }
    return createErrorResponse('Kredi başvurusu oluşturulamadı', 500);
  }
}


