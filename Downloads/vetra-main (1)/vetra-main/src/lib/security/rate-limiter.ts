/**
 * Rate Limiter
 * Protection contre les abus et attaques DDoS
 */

import { createServerSupabaseClient } from '../supabase-server';

interface RateLimitConfig {
  windowMs: number; // Fenêtre de temps en ms
  maxRequests: number; // Nombre max de requêtes
  keyGenerator?: (userId: string, endpoint: string) => string;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requêtes par minute
};

// Cache en mémoire pour le rate limiting (en production, utiliser Redis)
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

/**
 * Vérifie si une requête est autorisée selon le rate limit
 */
export async function checkRateLimit(
  userId: string,
  endpoint: string,
  config: Partial<RateLimitConfig> = {}
): Promise<{ allowed: boolean; remaining: number; resetTime: number; message?: string }> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const key = `${userId}:${endpoint}`;
  const now = Date.now();

  // Nettoyer les entrées expirées
  if (rateLimitCache.size > 10000) {
    for (const [k, v] of rateLimitCache.entries()) {
      if (v.resetTime < now) {
        rateLimitCache.delete(k);
      }
    }
  }

  const entry = rateLimitCache.get(key);

  if (!entry || entry.resetTime < now) {
    // Nouvelle fenêtre
    rateLimitCache.set(key, {
      count: 1,
      resetTime: now + finalConfig.windowMs,
    });
    return {
      allowed: true,
      remaining: finalConfig.maxRequests - 1,
      resetTime: now + finalConfig.windowMs,
    };
  }

  if (entry.count >= finalConfig.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      message: `Rate limit exceeded. Try again in ${Math.ceil((entry.resetTime - now) / 1000)} seconds.`,
    };
  }

  // Incrémenter le compteur
  entry.count++;
  rateLimitCache.set(key, entry);

  return {
    allowed: true,
    remaining: finalConfig.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Rate limits spécifiques par endpoint
 */
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/ai/chat': { windowMs: 60 * 1000, maxRequests: 30 },
  '/api/ai/generate': { windowMs: 60 * 1000, maxRequests: 20 },
  '/api/video/jobs': { windowMs: 60 * 1000, maxRequests: 10 },
  '/api/tools/sandpack/ai': { windowMs: 60 * 1000, maxRequests: 50 },
  '/api/tools/aieditor/ai': { windowMs: 60 * 1000, maxRequests: 50 },
  '/api/workflows/ai': { windowMs: 60 * 1000, maxRequests: 30 },
  '/api/langchain/chat': { windowMs: 60 * 1000, maxRequests: 30 },
  '/api/auth/login': { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 tentatives par 15 min
  '/api/auth/register': { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 inscriptions par heure
};

