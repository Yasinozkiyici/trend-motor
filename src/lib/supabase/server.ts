import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mjgvkbuwepbszhrhzfkx.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDU0NjQsImV4cCI6MjA3NTk4MTQ2NH0.tj064NgyKWaCULLVth-yIwxOToSOeCicFXGamZsBVM0';

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

let cachedServiceRoleClient:
  | ReturnType<typeof createSupabaseClient>
  | undefined;

let cachedStaticClient:
  | ReturnType<typeof createSupabaseClient>
  | undefined;

export function createStaticClient() {
  if (!cachedStaticClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mjgvkbuwepbszhrhzfkx.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDU0NjQsImV4cCI6MjA3NTk4MTQ2NH0.tj064NgyKWaCULLVth-yIwxOToSOeCicFXGamZsBVM0';
    
    cachedStaticClient = createSupabaseClient(
      supabaseUrl,
      supabaseKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  return cachedStaticClient;
}

export function createServiceRoleClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  if (!cachedServiceRoleClient) {
    cachedServiceRoleClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  return cachedServiceRoleClient;
}
