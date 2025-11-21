import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();
  
  // Valeurs par défaut (fallback)
  const defaultUrl = 'https://gvfuxlqvfvqdqhzjkyok.supabase.co';
  const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2ZnV4bHF2ZnZxZHFoempreW9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MTkyNzgsImV4cCI6MjA3ODk5NTI3OH0.y0f05lxJevY7wkS82FW2y2Kz4GbUauWzn0enH8-rDmE';
  
  // Récupérer les variables d'environnement, en supprimant les espaces et en vérifiant qu'elles ne sont pas vides
  let supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || defaultUrl).trim();
  let supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultKey).trim();
  
  // Si les variables sont vides après trim, utiliser les valeurs par défaut
  if (!supabaseUrl || supabaseUrl === '') {
    supabaseUrl = defaultUrl;
  }
  if (!supabaseAnonKey || supabaseAnonKey === '') {
    supabaseAnonKey = defaultKey;
  }

  // Validation de l'URL - doit commencer par http:// ou https://
  if (!supabaseUrl || (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://'))) {
    console.error('Invalid Supabase URL:', supabaseUrl);
    console.error('Environment variable NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    // Utiliser la valeur par défaut si l'URL est invalide
    supabaseUrl = defaultUrl;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

