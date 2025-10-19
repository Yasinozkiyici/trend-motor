import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './supabase/server';
import { ApiResponse, PaginatedResponse } from './schemas';

// Rate limiting (simple in-memory store for Edge compatibility)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  request: NextRequest,
  limit: number = 3,
  windowMs: number = 60000 // 1 minute
): boolean {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const key = `rate_limit_${ip}`;
  
  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= limit) {
    return false;
  }
  
  current.count++;
  return true;
}

export function createErrorResponse(
  message: string,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data, message }, { status });
}

export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): NextResponse<PaginatedResponse<T[]>> {
  const totalPages = Math.ceil(total / limit);
  
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  });
}

export async function requireAuth(request: NextRequest) {
  const supabase = createClient();
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return { error: 'Kimlik doğrulama gerekli', status: 401 };
    }
    
    // Check if user has admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (!profile || profile.role !== 'admin') {
      return { error: 'Admin yetkisi gerekli', status: 403 };
    }
    
    return { user, profile };
  } catch (error) {
    return { error: 'Kimlik doğrulama hatası', status: 401 };
  }
}

export function parsePaginationParams(request: NextRequest) {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '10')));
  const offset = (page - 1) * limit;
  
  return { page, limit, offset };
}

type SupabaseError = {
  message?: string;
  code?: string;
};

export function handleSupabaseError(
  error: SupabaseError,
): { message: string; status: number } {
  if (error.code === '23505') {
    return { message: 'Bu kayıt zaten mevcut', status: 409 };
  }
  
  if (error.code === '23503') {
    return { message: 'Bağlı kayıtlar nedeniyle silinemez', status: 409 };
  }
  
  if (error.code === '42501') {
    return { message: 'Bu işlem için yetkiniz yok', status: 403 };
  }
  
  if (error.message?.includes('JWT')) {
    return { message: 'Oturum süresi dolmuş', status: 401 };
  }
  
  return { 
    message: error.message || 'Veritabanı hatası', 
    status: 400 
  };
}


