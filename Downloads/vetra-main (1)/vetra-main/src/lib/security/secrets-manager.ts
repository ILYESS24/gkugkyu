/**
 * Secrets Manager
 * Gestion sécurisée des secrets, API keys, tokens
 */

import { encrypt, decrypt, generateSecureToken, hashToken } from './encryption';
import { createServerSupabaseClient } from '../supabase-server';

/**
 * Stocke un secret de manière sécurisée
 */
export async function storeSecret(
  userId: string,
  name: string,
  value: string,
  type: 'api_key' | 'token' | 'password' | 'credential' = 'api_key'
): Promise<string> {
  const supabase = await createServerSupabaseClient();
  
  // Chiffrer le secret avant stockage
  const encryptedValue = encrypt(value);
  
  // Stocker dans la table secrets (à créer)
  const { data, error } = await supabase
    .from('user_secrets')
    .insert({
      user_id: userId,
      name,
      encrypted_value: encryptedValue,
      type,
      created_at: new Date().toISOString(),
    } as any)
    .select('id')
    .single();
  
  if (error) {
    throw new Error(`Failed to store secret: ${error.message}`);
  }
  
  return data.id;
}

/**
 * Récupère un secret de manière sécurisée
 */
export async function getSecret(userId: string, name: string): Promise<string | null> {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('user_secrets')
    .select('encrypted_value')
    .eq('user_id', userId)
    .eq('name', name)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  try {
    return decrypt(data.encrypted_value);
  } catch (error) {
    console.error('Failed to decrypt secret:', error);
    return null;
  }
}

/**
 * Supprime un secret
 */
export async function deleteSecret(userId: string, name: string): Promise<void> {
  const supabase = await createServerSupabaseClient();
  
  await supabase
    .from('user_secrets')
    .delete()
    .eq('user_id', userId)
    .eq('name', name);
}

/**
 * Génère et stocke un token d'API sécurisé
 */
export async function generateAPIToken(userId: string, name: string): Promise<{ token: string; tokenId: string }> {
  const supabase = await createServerSupabaseClient();
  
  // Générer un token sécurisé
  const token = generateSecureToken(64);
  const tokenHash = hashToken(token);
  
  // Stocker le hash (jamais le token en clair)
  const { data, error } = await supabase
    .from('api_tokens')
    .insert({
      user_id: userId,
      name,
      token_hash: tokenHash,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an
    } as any)
    .select('id')
    .single();
  
  if (error) {
    throw new Error(`Failed to generate API token: ${error.message}`);
  }
  
  // Retourner le token (ne sera jamais stocké en clair)
  return { token, tokenId: data.id };
}

/**
 * Vérifie un token d'API
 */
export async function verifyAPIToken(token: string): Promise<{ valid: boolean; userId?: string }> {
  const supabase = await createServerSupabaseClient();
  
  const tokenHash = hashToken(token);
  
  const { data, error } = await supabase
    .from('api_tokens')
    .select('user_id, expires_at, revoked')
    .eq('token_hash', tokenHash)
    .single();
  
  if (error || !data) {
    return { valid: false };
  }
  
  // Vérifier expiration
  if (new Date(data.expires_at) < new Date()) {
    return { valid: false };
  }
  
  // Vérifier si révoqué
  if (data.revoked) {
    return { valid: false };
  }
  
  return { valid: true, userId: data.user_id };
}

/**
 * Révoque un token d'API
 */
export async function revokeAPIToken(userId: string, tokenId: string): Promise<void> {
  const supabase = await createServerSupabaseClient();
  
  await supabase
    .from('api_tokens')
    .update({ revoked: true, revoked_at: new Date().toISOString() } as any)
    .eq('id', tokenId)
    .eq('user_id', userId);
}

/**
 * Liste les tokens d'API d'un utilisateur (sans les tokens eux-mêmes)
 */
export async function listAPITokens(userId: string): Promise<Array<{ id: string; name: string; created_at: string; expires_at: string; revoked: boolean }>> {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('api_tokens')
    .select('id, name, created_at, expires_at, revoked')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    throw new Error(`Failed to list API tokens: ${error.message}`);
  }
  
  return data || [];
}

