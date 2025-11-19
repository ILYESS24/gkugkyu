/**
 * Input Validator
 * Validation et sanitization stricte des données
 */

import { z } from 'zod';

/**
 * Sanitize string - enlève les caractères dangereux
 */
export function sanitizeString(input: string, maxLength: number = 10000): string {
  if (typeof input !== 'string') return '';
  
  return input
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Enlève < et >
    .trim();
}

/**
 * Sanitize object - nettoie récursivement un objet
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key]) as any;
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    }
  }
  
  return sanitized;
}

/**
 * Schémas de validation Zod
 */
export const validationSchemas = {
  // Prompt AI
  aiPrompt: z.object({
    prompt: z.string().min(1).max(10000).transform(sanitizeString),
    model: z.enum(['deepseek', 'openai', 'ollama']).optional(),
    options: z.object({
      temperature: z.number().min(0).max(2).optional(),
      maxTokens: z.number().min(1).max(100000).optional(),
    }).optional(),
  }),

  // Video generation
  videoJob: z.object({
    tool: z.enum(['mochi', 'open-sora', 'wan']),
    prompt: z.string().min(10).max(5000).transform(sanitizeString),
    config: z.object({
      duration: z.number().min(4).max(60).optional(),
      aspect: z.string().max(20).optional(),
      style: z.string().max(200).optional(),
    }).optional(),
  }),

  // Code suggestion
  codeSuggestion: z.object({
    code: z.string().min(1).max(50000).transform(sanitizeString),
    context: z.string().max(5000).optional().transform((val) => val ? sanitizeString(val) : undefined),
    action: z.enum(['suggest', 'explain', 'refactor', 'debug']).optional(),
  }),

  // Text improvement
  textImprovement: z.object({
    text: z.string().min(1).max(50000).transform(sanitizeString),
    action: z.enum(['improve', 'rewrite', 'summarize', 'expand']).optional(),
    style: z.string().max(200).optional(),
    tone: z.string().max(200).optional(),
  }),

  // Workflow
  workflowAI: z.object({
    workflow: z.string().max(100000).optional(),
    nodes: z.array(z.any()).optional(),
    edges: z.array(z.any()).optional(),
    action: z.enum(['suggest', 'optimize', 'debug', 'explain']).optional(),
  }),

  // Project
  project: z.object({
    name: z.string().min(1).max(200).transform(sanitizeString),
    description: z.string().max(2000).optional().transform((val) => val ? sanitizeString(val) : undefined),
    type: z.enum(['website', 'app', 'api', 'other']).optional(),
  }),

  // Content
  content: z.object({
    title: z.string().min(1).max(500).transform(sanitizeString),
    content: z.string().min(1).max(100000).transform(sanitizeString),
    type: z.enum(['text', 'image', 'video', 'code']).optional(),
  }),

  // Agent
  agent: z.object({
    name: z.string().min(1).max(200).transform(sanitizeString),
    description: z.string().max(2000).optional().transform((val) => val ? sanitizeString(val) : undefined),
    config: z.record(z.any()).optional(),
  }),
};

/**
 * Valide et sanitize les données selon un schéma
 */
export function validateAndSanitize<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return {
        success: false,
        error: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Validation failed',
    };
  }
}

