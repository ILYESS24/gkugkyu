/**
 * Security Middleware
 * Middleware de sécurité pour toutes les routes API
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '../supabase-server-api';
import { checkRateLimit, RATE_LIMITS } from './rate-limiter';
import { logAuditEvent, getClientIP, getUserAgent } from './audit-log';
import { validateAndSanitize } from './validator';

export interface SecureRequestContext {
  user: { id: string; email?: string };
  ip: string | undefined;
  userAgent: string | undefined;
}

/**
 * Middleware de sécurité complet
 */
export async function secureAPI(
  request: NextRequest,
  options: {
    requireAuth?: boolean;
    rateLimit?: boolean;
    validateSchema?: any;
    action?: string;
    resourceType?: string;
  } = {}
): Promise<
  | { success: true; context: SecureRequestContext }
  | { success: false; response: NextResponse }
> {
  const {
    requireAuth = true,
    rateLimit = true,
    validateSchema,
    action = request.method,
    resourceType = 'api',
  } = options;

  const endpoint = new URL(request.url).pathname;
  const ip = getClientIP(request);
  const userAgent = getUserAgent(request);

  // 1. Authentification
  if (requireAuth) {
    const { user } = await getAuthenticatedUser(request);
    if (!user) {
      await logAuditEvent({
        user_id: 'anonymous',
        action: 'unauthorized_access',
        resource_type: resourceType,
        endpoint,
        method: request.method,
        ip_address: ip,
        user_agent: userAgent,
        status: 'blocked',
        error_message: 'Authentication required',
      });

      return {
        success: false,
        response: NextResponse.json(
          { error: 'Unauthorized', code: 'AUTH_REQUIRED' },
          { status: 401 }
        ),
      };
    }

    // 2. Rate limiting
    if (rateLimit) {
      const rateLimitConfig = RATE_LIMITS[endpoint] || { windowMs: 60000, maxRequests: 100 };
      const rateLimitResult = await checkRateLimit(user.id, endpoint, rateLimitConfig);

      if (!rateLimitResult.allowed) {
        await logAuditEvent({
          user_id: user.id,
          action: 'rate_limit_exceeded',
          resource_type: resourceType,
          endpoint,
          method: request.method,
          ip_address: ip,
          user_agent: userAgent,
          status: 'blocked',
          error_message: rateLimitResult.message,
          metadata: {
            remaining: rateLimitResult.remaining,
            resetTime: rateLimitResult.resetTime,
          },
        });

        return {
          success: false,
          response: NextResponse.json(
            {
              error: rateLimitResult.message || 'Rate limit exceeded',
              code: 'RATE_LIMIT_EXCEEDED',
              resetTime: rateLimitResult.resetTime,
            },
            {
              status: 429,
              headers: {
                'X-RateLimit-Limit': rateLimitConfig.maxRequests.toString(),
                'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
              },
            }
          ),
        };
      }
    }

    // 3. Validation des données (le body sera parsé dans la route)
    // On retourne juste le contexte, la validation se fera dans la route

    return {
      success: true,
      context: {
        user: { id: user.id, email: user.email },
        ip,
        userAgent,
      },
    };
  }

  return {
    success: true,
    context: {
      user: { id: 'anonymous' },
      ip,
      userAgent,
    },
  };
}

/**
 * Headers de sécurité
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  };
}

