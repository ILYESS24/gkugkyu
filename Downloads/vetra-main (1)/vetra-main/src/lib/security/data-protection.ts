/**
 * Data Protection
 * Protection des données personnelles (RGPD) et confidentialité
 */

import { encrypt, decrypt, encryptObject, decryptObject } from './encryption';
import { createServerSupabaseClient } from '../supabase-server';

/**
 * Champs sensibles à chiffrer automatiquement
 */
export const SENSITIVE_FIELDS = {
  user: ['email', 'phone', 'address', 'payment_info'],
  project: ['api_keys', 'secrets', 'credentials'],
  content: ['personal_data', 'sensitive_content'],
  agent: ['api_keys', 'secrets', 'credentials'],
} as const;

/**
 * Chiffre les données avant insertion en base
 */
export async function encryptBeforeSave(
  table: string,
  data: Record<string, any>
): Promise<Record<string, any>> {
  const sensitiveFields = SENSITIVE_FIELDS[table as keyof typeof SENSITIVE_FIELDS] || [];
  const encrypted = { ...data };
  
  for (const field of sensitiveFields) {
    if (encrypted[field] && typeof encrypted[field] === 'string') {
      encrypted[field] = encrypt(encrypted[field]);
    } else if (encrypted[field] && typeof encrypted[field] === 'object') {
      // Chiffrer les objets JSON sensibles
      encrypted[field] = encryptObject(encrypted[field]);
    }
  }
  
  return encrypted;
}

/**
 * Déchiffre les données après récupération de la base
 */
export async function decryptAfterFetch(
  table: string,
  data: Record<string, any>
): Promise<Record<string, any>> {
  const sensitiveFields = SENSITIVE_FIELDS[table as keyof typeof SENSITIVE_FIELDS] || [];
  const decrypted = { ...data };
  
  for (const field of sensitiveFields) {
    if (decrypted[field] && typeof decrypted[field] === 'string') {
      try {
        decrypted[field] = decrypt(decrypted[field]);
      } catch (error) {
        // Si le champ n'est pas chiffré, on le laisse tel quel
        console.warn(`Field ${field} in ${table} is not encrypted`);
      }
    } else if (decrypted[field] && typeof decrypted[field] === 'string' && decrypted[field].includes(':')) {
      // Tenter de déchiffrer les objets JSON
      try {
        decrypted[field] = decryptObject(decrypted[field]);
      } catch (error) {
        // Ignorer si ce n'est pas un objet chiffré
      }
    }
  }
  
  return decrypted;
}

/**
 * Supprime définitivement les données (RGPD - droit à l'oubli)
 */
export async function permanentlyDeleteUserData(userId: string): Promise<void> {
  const supabase = await createServerSupabaseClient();
  
  // Supprimer toutes les données utilisateur de manière sécurisée
  const tables = [
    'projects',
    'content_items',
    'ai_agents',
    'workflows',
    'integrated_tools',
    'realtime_activity',
    'ai_recommendations',
    'analytics',
    'video_jobs',
    'subscriptions',
    'payment_methods',
    'invoices',
    'audit_logs',
  ];
  
  for (const table of tables) {
    // Supprimer les données (RLS s'assure que seul l'utilisateur peut supprimer ses données)
    await supabase.from(table).delete().eq('user_id', userId);
  }
  
  // Supprimer le profil utilisateur
  await supabase.from('user_profiles').delete().eq('id', userId);
  
  // Supprimer le compte auth (doit être fait via Supabase Auth Admin API)
  // Note: Cette opération nécessite les droits admin
}

/**
 * Exporte les données utilisateur (RGPD - droit à la portabilité)
 */
export async function exportUserData(userId: string): Promise<Record<string, any>> {
  const supabase = await createServerSupabaseClient();
  
  const data: Record<string, any> = {};
  
  // Récupérer toutes les données utilisateur
  const tables = [
    'user_profiles',
    'projects',
    'content_items',
    'ai_agents',
    'workflows',
    'integrated_tools',
    'realtime_activity',
    'ai_recommendations',
    'analytics',
    'video_jobs',
  ];
  
  for (const table of tables) {
    const { data: tableData } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userId);
    
    if (tableData) {
      // Déchiffrer les données sensibles
      const decryptedData = await Promise.all(
        tableData.map((row) => decryptAfterFetch(table, row))
      );
      data[table] = decryptedData;
    }
  }
  
  return data;
}

/**
 * Anonymise les données pour analytics (RGPD)
 */
export function anonymizeData(data: Record<string, any>): Record<string, any> {
  const anonymized = { ...data };
  
  // Supprimer les identifiants personnels
  delete anonymized.email;
  delete anonymized.phone;
  delete anonymized.address;
  delete anonymized.user_id;
  delete anonymized.ip_address;
  
  // Hasher les IDs pour garder la cohérence sans identifier
  if (anonymized.id) {
    anonymized.id_hash = require('crypto')
      .createHash('sha256')
      .update(anonymized.id)
      .digest('hex')
      .slice(0, 16);
    delete anonymized.id;
  }
  
  return anonymized;
}

/**
 * Vérifie si une donnée contient des informations personnelles
 */
export function containsPII(data: string): boolean {
  const piiPatterns = [
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Carte bancaire
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
    /\b\d{10,}\b/, // Téléphone
    /\b\d{1,5}\s+\w+\s+street|avenue|road|boulevard/i, // Adresse
  ];
  
  return piiPatterns.some((pattern) => pattern.test(data));
}

