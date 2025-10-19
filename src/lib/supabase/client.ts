import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mjgvkbuwepbszhrhzfkx.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ3ZrYnV3ZXBic3pocmh6Zmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDU0NjQsImV4cCI6MjA3NTk4MTQ2NH0.tj064NgyKWaCULLVth-yIwxOToSOeCicFXGamZsBVM0'
  );
}