import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { secureAPI, getSecurityHeaders } from '@/lib/security/middleware';
import { logAuditEvent } from '@/lib/security/audit-log';
import { aiOrchestrator } from '@/lib/ai/orchestrator';
import { canGenerateAI, trackAIGeneration, canMakeAPICall, trackAPICall } from '@/lib/subscription-checker';

/**
 * POST /api/ai/chat
 * Chat avec l'IA (streaming support)
 */
export async function POST(request: NextRequest) {
  const endpoint = '/api/ai/chat';
  
  // Sécurité : authentification, rate limiting, validation
  const security = await secureAPI(request, {
    requireAuth: true,
    rateLimit: true,
    validateSchema: z.object({
      messages: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string().min(1).max(10000),
      })).min(1).max(100),
      model: z.enum(['deepseek', 'openai', 'ollama']).optional(),
      stream: z.boolean().optional(),
    }),
    action: 'ai_chat',
    resourceType: 'ai',
  });

  if (!security.success) {
    return security.response;
  }

  const { context } = security;
  let body: any;

  try {
    body = await request.json();
  } catch (error) {
    await logAuditEvent({
      user_id: context.user.id,
      action: 'invalid_request',
      resource_type: 'ai',
      endpoint,
      method: 'POST',
      ip_address: context.ip,
      user_agent: context.userAgent,
      status: 'blocked',
      error_message: 'Invalid JSON',
    });
    return NextResponse.json(
      { error: 'Invalid JSON', code: 'INVALID_JSON' },
      { status: 400, headers: getSecurityHeaders() }
    );
  }

  try {
    const { messages, model, stream } = body;

    // Vérifier les limites d'abonnement pour les générations AI (chat = text)
    const limitCheck = await canGenerateAI(context.user.id, 'text');
    if (!limitCheck.allowed) {
      await logAuditEvent({
        user_id: context.user.id,
        action: 'subscription_limit_exceeded',
        resource_type: 'ai',
        endpoint,
        method: 'POST',
        ip_address: context.ip,
        user_agent: context.userAgent,
        status: 'blocked',
        error_message: limitCheck.message,
      });
      return NextResponse.json(
        { 
          error: limitCheck.message || 'Limite de génération IA atteinte',
          code: 'SUBSCRIPTION_LIMIT_EXCEEDED'
        },
        { status: 403, headers: getSecurityHeaders() }
      );
    }

    // Vérifier les limites d'appels API
    const apiLimitCheck = await canMakeAPICall(context.user.id);
    if (!apiLimitCheck.allowed) {
      await logAuditEvent({
        user_id: context.user.id,
        action: 'api_limit_exceeded',
        resource_type: 'ai',
        endpoint,
        method: 'POST',
        ip_address: context.ip,
        user_agent: context.userAgent,
        status: 'blocked',
        error_message: apiLimitCheck.message,
      });
      return NextResponse.json(
        { 
          error: apiLimitCheck.message || 'Limite d\'appels API atteinte',
          code: 'SUBSCRIPTION_LIMIT_EXCEEDED'
        },
        { status: 403, headers: getSecurityHeaders() }
      );
    }

    // Construire le prompt à partir des messages
    const prompt = messages
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join('\n');

    // Support streaming
    if (stream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            // Pour le streaming, on utilise l'API directement
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY || 'sk-491b1fc66cc14b3aaf40ea6511008bfa'}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages.map((msg: any) => ({
                  role: msg.role,
                  content: msg.content,
                })),
                stream: true,
              }),
            });

            if (!response.ok) {
              throw new Error('Streaming failed');
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
              throw new Error('No reader available');
            }

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split('\n');

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') {
                    controller.close();
                    return;
                  }

                  try {
                    const json = JSON.parse(data);
                    const content = json.choices?.[0]?.delta?.content;
                    if (content) {
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                    }
                  } catch (e) {
                    // Ignore parse errors
                  }
                }
              }
            }

            controller.close();
          } catch (error: any) {
            controller.error(error);
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Mode non-streaming
    const response = await aiOrchestrator.generateText({
      task: 'chat',
      prompt,
      model,
      options: {
        temperature: 0.7,
        maxTokens: 2000,
      },
    });

    // Enregistrer la génération AI et l'appel API
    await trackAIGeneration(context.user.id, 'text', {
      task: 'chat',
      model: response.model,
      tokens: response.tokens,
      cost: response.cost,
      messagesCount: messages.length,
    });
    await trackAPICall(context.user.id, '/api/ai/chat');

    // Audit log - succès
    await logAuditEvent({
      user_id: context.user.id,
      action: 'ai_chat_success',
      resource_type: 'ai',
      endpoint,
      method: 'POST',
      ip_address: context.ip,
      user_agent: context.userAgent,
      status: 'success',
      metadata: {
        messagesCount: messages.length,
        model: response.model,
        tokens: response.tokens,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: {
          role: 'assistant',
          content: response.content,
        },
        metadata: {
          model: response.model,
          tokens: response.tokens,
          cost: response.cost,
        },
      },
      { headers: getSecurityHeaders() }
    );
  } catch (error: any) {
    console.error('AI chat error:', error);
    
    // Audit log - erreur
    await logAuditEvent({
      user_id: context.user.id,
      action: 'ai_chat_error',
      resource_type: 'ai',
      endpoint,
      method: 'POST',
      ip_address: context.ip,
      user_agent: context.userAgent,
      status: 'failure',
      error_message: error.message || 'AI chat failed',
    });

    return NextResponse.json(
      { error: error.message || 'AI chat failed', code: 'INTERNAL_ERROR' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

