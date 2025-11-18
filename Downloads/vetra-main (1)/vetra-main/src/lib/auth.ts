'use client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

async function getSupabase() {
  const { getSupabaseBrowserClient } = await import('./supabase-client');
  return getSupabaseBrowserClient();
}

export async function login(email: string, password: string) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message || 'Erreur de connexion');
  }

  return data;
}

export async function register(email: string, password: string, name: string) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    throw new Error(error.message || "Erreur d'inscription");
  }

  return data;
}

export async function logout() {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message || 'Erreur de déconnexion');
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    const { user } = data;

    return {
      id: user.id,
      email: user.email ?? '',
      name: (user.user_metadata?.full_name as string) ?? user.email ?? 'Utilisateur',
      role: (user.app_metadata?.role as string) ?? 'user',
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

