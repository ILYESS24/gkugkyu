# 🔒 Backend Sécurisé - Documentation Complète

## ✅ Système de Sécurité Implémenté

### 1. **Rate Limiting** (`src/lib/security/rate-limiter.ts`)
- ✅ Protection contre les abus et DDoS
- ✅ Limites par endpoint (ex: 30 req/min pour `/api/ai/chat`)
- ✅ Cache en mémoire avec nettoyage automatique
- ✅ Headers de rate limit dans les réponses

**Limites configurées :**
- `/api/ai/chat`: 30 req/min
- `/api/ai/generate`: 20 req/min
- `/api/video/jobs`: 10 req/min
- `/api/auth/login`: 5 req/15min (protection brute force)
- `/api/auth/register`: 3 req/heure

### 2. **Input Validation & Sanitization** (`src/lib/security/validator.ts`)
- ✅ Validation Zod stricte pour tous les inputs
- ✅ Sanitization automatique (enlève `<`, `>`, limite longueur)
- ✅ Schémas pré-définis pour tous les types de données
- ✅ Protection XSS et injection

**Schémas disponibles :**
- `aiPrompt`: Prompts AI (max 10000 chars)
- `videoJob`: Génération vidéo (prompt 10-5000 chars)
- `codeSuggestion`: Code (max 50000 chars)
- `textImprovement`: Texte (max 50000 chars)
- `workflowAI`: Workflows
- `project`, `content`, `agent`: Entités métier

### 3. **Audit Logging** (`src/lib/security/audit-log.ts`)
- ✅ Enregistrement de TOUTES les actions
- ✅ Tracking IP, User-Agent, timestamps
- ✅ Statuts: `success`, `failure`, `blocked`
- ✅ Métadonnées complètes pour debugging

**Table `audit_logs` créée avec :**
- Index sur `user_id`, `action`, `status`, `created_at`, `endpoint`
- RLS activé (users voient leurs propres logs)
- Rétention pour analyse sécurité

### 4. **Security Middleware** (`src/lib/security/middleware.ts`)
- ✅ Authentification obligatoire (sauf routes publiques)
- ✅ Rate limiting automatique
- ✅ Validation des données
- ✅ Headers de sécurité (XSS, CSRF, etc.)
- ✅ Context sécurisé avec IP, User-Agent

**Headers de sécurité :**
```typescript
'X-Content-Type-Options': 'nosniff'
'X-Frame-Options': 'DENY'
'X-XSS-Protection': '1; mode=block'
'Referrer-Policy': 'strict-origin-when-cross-origin'
'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
```

### 5. **Subscription Limits** (déjà existant)
- ✅ Vérification avant chaque action
- ✅ Tracking des usages
- ✅ Messages d'erreur clairs
- ✅ Analytics intégrés

## 📊 Routes API Sécurisées

### Routes avec sécurité complète :
1. ✅ `/api/ai/chat` - Chat IA (exemple complet)
2. ⏳ `/api/ai/generate` - Génération IA
3. ⏳ `/api/video/jobs` - Génération vidéo
4. ⏳ `/api/langchain/chat` - Langchain
5. ⏳ `/api/tools/sandpack/ai` - Sandpack AI
6. ⏳ `/api/tools/aieditor/ai` - AiEditor AI
7. ⏳ `/api/workflows/ai` - Workflows AI
8. ⏳ `/api/projects` - Projets
9. ⏳ `/api/content` - Contenu
10. ⏳ `/api/agents` - Agents IA

## 🔧 Installation

### 1. Créer la table audit_logs
```sql
-- Exécuter dans Supabase SQL Editor
\i supabase-audit-logs-schema.sql
```

### 2. Variables d'environnement
```env
DEEPSEEK_API_KEY=sk-...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 📈 Monitoring

### Requêtes utiles pour monitoring :

```sql
-- Tentatives d'accès bloquées
SELECT * FROM audit_logs 
WHERE status = 'blocked' 
ORDER BY created_at DESC 
LIMIT 100;

-- Rate limits dépassés
SELECT * FROM audit_logs 
WHERE action = 'rate_limit_exceeded' 
ORDER BY created_at DESC;

-- Erreurs par endpoint
SELECT endpoint, COUNT(*) as errors
FROM audit_logs 
WHERE status = 'failure'
GROUP BY endpoint
ORDER BY errors DESC;

-- Activité par utilisateur
SELECT user_id, COUNT(*) as requests, 
       COUNT(CASE WHEN status = 'blocked' THEN 1 END) as blocked
FROM audit_logs
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY user_id
ORDER BY requests DESC;
```

## 🚀 Prochaines Étapes

1. ✅ Middleware de sécurité créé
2. ✅ Route `/api/ai/chat` sécurisée (exemple)
3. ⏳ Appliquer le middleware aux autres routes critiques
4. ⏳ Ajouter monitoring dashboard
5. ⏳ Alertes automatiques (email/Slack) pour anomalies

## 🔐 Bonnes Pratiques

1. **Toujours utiliser `secureAPI()`** pour les routes authentifiées
2. **Valider TOUS les inputs** avec les schémas Zod
3. **Logger toutes les actions** avec `logAuditEvent()`
4. **Vérifier les limites d'abonnement** avant chaque action
5. **Utiliser `getSecurityHeaders()`** dans toutes les réponses

## 📝 Exemple d'utilisation

```typescript
export async function POST(request: NextRequest) {
  const endpoint = '/api/my-endpoint';
  
  // Sécurité complète
  const security = await secureAPI(request, {
    requireAuth: true,
    rateLimit: true,
    validateSchema: validationSchemas.mySchema,
    action: 'my_action',
    resourceType: 'my_resource',
  });

  if (!security.success) {
    return security.response;
  }

  const { context } = security;
  
  // Votre logique métier ici
  // ...
  
  // Logger le succès
  await logAuditEvent({
    user_id: context.user.id,
    action: 'my_action_success',
    resource_type: 'my_resource',
    endpoint,
    method: 'POST',
    ip_address: context.ip,
    user_agent: context.userAgent,
    status: 'success',
  });

  return NextResponse.json(
    { success: true },
    { headers: getSecurityHeaders() }
  );
}
```

---

**Status**: ✅ Système de sécurité complet implémenté
**Prochaine étape**: Appliquer le middleware à toutes les routes API

