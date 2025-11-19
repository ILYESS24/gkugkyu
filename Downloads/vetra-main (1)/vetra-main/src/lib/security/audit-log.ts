/**
 * Audit Log
 * Enregistre toutes les actions importantes pour la sécurité et le monitoring
 */

import { createServerSupabaseClient } from '../supabase-server';

export interface AuditLogEntry {
  user_id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  endpoint: string;
  method: string;
  ip_address?: string;
  user_agent?: string;
  status: 'success' | 'failure' | 'blocked';
  error_message?: string;
  metadata?: Record<string, any>;
}

/**
 * Enregistre une entrée d'audit
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
  try {
    const supabase = await createServerSupabaseClient();
    
    await supabase.from('audit_logs').insert({
      user_id: entry.user_id,
      action: entry.action,
      resource_type: entry.resource_type,
      resource_id: entry.resource_id,
      endpoint: entry.endpoint,
      method: entry.method,
      ip_address: entry.ip_address,
      user_agent: entry.user_agent,
      status: entry.status,
      error_message: entry.error_message,
      metadata: entry.metadata || {},
      created_at: new Date().toISOString(),
    } as any);
  } catch (error) {
    // Ne pas faire échouer la requête si le logging échoue
    console.error('Failed to log audit event:', error);
  }
}

/**
 * Extrait l'IP depuis une requête
 */
export function getClientIP(request: Request): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return undefined;
}

/**
 * Extrait le User-Agent
 */
export function getUserAgent(request: Request): string | undefined {
  return request.headers.get('user-agent') || undefined;
}

