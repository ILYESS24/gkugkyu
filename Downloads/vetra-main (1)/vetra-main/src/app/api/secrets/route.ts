"use server";

import { NextRequest, NextResponse } from "next/server";
import { secureAPI, getSecurityHeaders } from "@/lib/security/middleware";
import { logAuditEvent } from "@/lib/security/audit-log";
import { z } from "zod";
import {
  storeSecret,
  getSecret,
  deleteSecret,
  generateAPIToken,
  verifyAPIToken,
  revokeAPIToken,
  listAPITokens,
} from "@/lib/security/secrets-manager";

/**
 * GET /api/secrets
 * Liste les secrets de l'utilisateur (noms uniquement, pas les valeurs)
 */
export async function GET(request: NextRequest) {
  const endpoint = "/api/secrets";

  const security = await secureAPI(request, {
    requireAuth: true,
    rateLimit: true,
    action: "list_secrets",
    resourceType: "secrets",
  });

  if (!security.success) {
    return security.response;
  }

  const { context } = security;

  try {
    const secrets = await listAPITokens(context.user.id);

    await logAuditEvent({
      user_id: context.user.id,
      action: "secrets_listed",
      resource_type: "secrets",
      endpoint,
      method: "GET",
      ip_address: context.ip,
      user_agent: context.userAgent,
      status: "success",
    });

    return NextResponse.json(
      { secrets },
      { headers: getSecurityHeaders() }
    );
  } catch (error: any) {
    await logAuditEvent({
      user_id: context.user.id,
      action: "secrets_list_error",
      resource_type: "secrets",
      endpoint,
      method: "GET",
      ip_address: context.ip,
      user_agent: context.userAgent,
      status: "failure",
      error_message: error.message,
    });

    return NextResponse.json(
      { error: error.message || "Failed to list secrets", code: "INTERNAL_ERROR" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

/**
 * POST /api/secrets
 * Crée un nouveau secret ou génère un token API
 */
export async function POST(request: NextRequest) {
  const endpoint = "/api/secrets";

  const security = await secureAPI(request, {
    requireAuth: true,
    rateLimit: true,
    validateSchema: z.object({
      action: z.enum(["store", "generate_token"]),
      name: z.string().min(1).max(255),
      value: z.string().optional(), // Requis pour "store"
      type: z.enum(["api_key", "token", "password", "credential"]).optional(),
    }),
    action: "create_secret",
    resourceType: "secrets",
  });

  if (!security.success) {
    return security.response;
  }

  const { context } = security;
  const body = await request.json();

  try {
    if (body.action === "generate_token") {
      const { token, tokenId } = await generateAPIToken(context.user.id, body.name);

      await logAuditEvent({
        user_id: context.user.id,
        action: "api_token_generated",
        resource_type: "secrets",
        endpoint,
        method: "POST",
        ip_address: context.ip,
        user_agent: context.userAgent,
        status: "success",
        metadata: { tokenId, name: body.name },
      });

      return NextResponse.json(
        {
          success: true,
          token, // Retourné une seule fois, jamais stocké
          tokenId,
          message: "Token généré. Sauvegardez-le maintenant, il ne sera plus affiché.",
        },
        { headers: getSecurityHeaders() }
      );
    } else if (body.action === "store") {
      if (!body.value) {
        return NextResponse.json(
          { error: "Value is required for store action", code: "VALIDATION_ERROR" },
          { status: 400, headers: getSecurityHeaders() }
        );
      }

      const secretId = await storeSecret(
        context.user.id,
        body.name,
        body.value,
        body.type || "api_key"
      );

      await logAuditEvent({
        user_id: context.user.id,
        action: "secret_stored",
        resource_type: "secrets",
        endpoint,
        method: "POST",
        ip_address: context.ip,
        user_agent: context.userAgent,
        status: "success",
        metadata: { secretId, name: body.name, type: body.type },
      });

      return NextResponse.json(
        {
          success: true,
          secretId,
          message: "Secret stocké de manière sécurisée",
        },
        { headers: getSecurityHeaders() }
      );
    }

    return NextResponse.json(
      { error: "Invalid action", code: "INVALID_ACTION" },
      { status: 400, headers: getSecurityHeaders() }
    );
  } catch (error: any) {
    await logAuditEvent({
      user_id: context.user.id,
      action: "secret_creation_error",
      resource_type: "secrets",
      endpoint,
      method: "POST",
      ip_address: context.ip,
      user_agent: context.userAgent,
      status: "failure",
      error_message: error.message,
    });

    return NextResponse.json(
      { error: error.message || "Failed to create secret", code: "INTERNAL_ERROR" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

/**
 * DELETE /api/secrets
 * Supprime un secret ou révoque un token
 */
export async function DELETE(request: NextRequest) {
  const endpoint = "/api/secrets";

  const security = await secureAPI(request, {
    requireAuth: true,
    rateLimit: true,
    validateSchema: z.object({
      name: z.string().min(1).max(255).optional(),
      tokenId: z.string().uuid().optional(),
    }),
    action: "delete_secret",
    resourceType: "secrets",
  });

  if (!security.success) {
    return security.response;
  }

  const { context } = security;
  const body = await request.json();

  try {
    if (body.tokenId) {
      await revokeAPIToken(context.user.id, body.tokenId);
    } else if (body.name) {
      await deleteSecret(context.user.id, body.name);
    } else {
      return NextResponse.json(
        { error: "name or tokenId is required", code: "VALIDATION_ERROR" },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    await logAuditEvent({
      user_id: context.user.id,
      action: "secret_deleted",
      resource_type: "secrets",
      endpoint,
      method: "DELETE",
      ip_address: context.ip,
      user_agent: context.userAgent,
      status: "success",
      metadata: { name: body.name, tokenId: body.tokenId },
    });

    return NextResponse.json(
      { success: true, message: "Secret supprimé" },
      { headers: getSecurityHeaders() }
    );
  } catch (error: any) {
    await logAuditEvent({
      user_id: context.user.id,
      action: "secret_deletion_error",
      resource_type: "secrets",
      endpoint,
      method: "DELETE",
      ip_address: context.ip,
      user_agent: context.userAgent,
      status: "failure",
      error_message: error.message,
    });

    return NextResponse.json(
      { error: error.message || "Failed to delete secret", code: "INTERNAL_ERROR" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

