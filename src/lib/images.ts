import { createServiceRoleClient } from './supabase/server';

export async function getSignedUrl(path: string, expiresIn = 86400, bucket = 'sliders'): Promise<string | null> {
  try {
    if (!path) return null;
    
    const supabase = createServiceRoleClient();
    
    // Önce public URL'i dene
    const publicUrl = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    // Public URL'i test et
    try {
      const response = await fetch(publicUrl.data.publicUrl, { method: 'HEAD' });
      if (response.ok) {
        return publicUrl.data.publicUrl;
      }
    } catch (e) {
      // Public URL başarısız olursa signed URL'e geç
    }
    
    // Public URL çalışmazsa signed URL oluştur
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
    
    if (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }
    
    return data.signedUrl;
  } catch (error) {
    console.error('Error in getSignedUrl:', error);
    return null;
  }
}

export async function uploadToStorage(file: File, keyPrefix: string, bucket = 'sliders'): Promise<{ path: string } | null> {
  try {
    const supabase = createServiceRoleClient();
    
    const fileName = `${keyPrefix}/${Date.now()}-${file.name}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }
    
    return { path: data.path };
  } catch (error) {
    console.error('Error in uploadToStorage:', error);
    return null;
  }
}

export async function deleteFromStorage(path: string, bucket = 'sliders'): Promise<boolean> {
  try {
    const supabase = createServiceRoleClient();
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteFromStorage:', error);
    return false;
  }
}