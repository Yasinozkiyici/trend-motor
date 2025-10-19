import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  // Geçici olarak admin authentication'ı devre dışı bırak
  return { user: null, profile: null };
  
  // const supabase = await createClient();
  // 
  // const { data: { user }, error: authError } = await supabase.auth.getUser();
  // 
  // if (authError || !user) {
  //   redirect('/login');
  // }
  // 
  // const { data: profile, error: profileError } = await supabase
  //   .from('profiles')
  //   .select('is_admin')
  //   .eq('id', user.id)
  //   .single();
  // 
  // if (profileError || !profile?.is_admin) {
  //   redirect('/login');
  // }
  // 
  // return { user, profile };
}

export async function getCurrentUser() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  return user;
}

export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return false;
    }
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();
    
    if (profileError || !profile?.is_admin) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}