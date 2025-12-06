# 🚀 Déploiement Rapide sur Render

## Étapes Rapides (5 minutes)

### 1. Préparer votre dépôt Git
```bash
# Assurez-vous que ces fichiers sont dans votre dépôt:
# - Dockerfile-collab-render
# - render.yaml
# - env.example (pour référence)

git add .
git commit -m "Ajout configuration Render"
git push
```

### 2. Créer un compte Render
1. Allez sur [render.com](https://render.com)
2. Créez un compte (gratuit)
3. Connectez votre compte GitHub/GitLab/Bitbucket

### 3. Créer la base de données PostgreSQL
1. Dashboard Render → "New +" → "PostgreSQL"
2. **Name**: `zed-postgres`
3. **Plan**: Starter (256 MB) ou Standard (1 GB)
4. **Region**: Choisissez votre région
5. Cliquez sur "Create Database"
6. **Notez l'Internal Database URL** (format: `postgresql://...`)

### 4. Déployer le service web

#### Option A : Via Blueprint (Recommandé)
1. Dashboard Render → "New +" → "Blueprint"
2. Connectez votre dépôt Git
3. Render détectera automatiquement `render.yaml`
4. Cliquez sur "Apply"

#### Option B : Manuellement
1. Dashboard Render → "New +" → "Web Service"
2. Connectez votre dépôt Git
3. Configurez :
   - **Name**: `zed-collab`
   - **Region**: Même région que la base de données
   - **Branch**: `main`
   - **Root Directory**: `/`
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile-collab-render`
   - **Docker Context**: `.`
   - **Plan**: Starter (512 MB) ou Standard (1 GB)

### 5. Configurer les variables d'environnement

Dans les paramètres du service web, ajoutez :

```bash
HTTP_PORT=10000
DATABASE_URL=<votre_internal_database_url>
API_TOKEN=<générez_un_token>
INVITE_LINK_PREFIX=https://zed.dev/invite/
ZED_ENVIRONMENT=production
DATABASE_MAX_CONNECTIONS=20
RUST_LOG=info
LOG_JSON=true
```

**Pour générer API_TOKEN :**
```bash
openssl rand -hex 32
```

### 6. Lier la base de données
1. Dans les paramètres du service web
2. Section "Connections"
3. Cliquez sur "Link Database"
4. Sélectionnez `zed-postgres`
5. Render ajoutera automatiquement `DATABASE_URL`

### 7. Déployer
1. Cliquez sur "Create Web Service"
2. Attendez 15-20 minutes (build Rust)
3. Vérifiez les logs
4. Testez : `https://votre-service.onrender.com/healthz`

## ✅ Vérification

```bash
# Health check
curl https://votre-service.onrender.com/healthz

# Devrait retourner: {"status":"ok"}
```

## 📋 Checklist

- [ ] Dépôt Git avec les fichiers de configuration
- [ ] Compte Render créé
- [ ] Base de données PostgreSQL créée
- [ ] Service web créé
- [ ] Variables d'environnement configurées
- [ ] Base de données liée
- [ ] Build réussi
- [ ] Health check fonctionne

## 🆘 Problèmes ?

### Build échoue
- Vérifiez que `Dockerfile-collab-render` existe
- Vérifiez les logs de build

### Erreur de connexion à la base de données
- Vérifiez que `DATABASE_URL` est correcte
- Vérifiez que la base de données est "Available"
- Vérifiez qu'elle est dans la même région

### Out of memory
- Passez au plan Standard (1 GB)
- Réduisez `DATABASE_MAX_CONNECTIONS` à 10

## 📚 Documentation Complète

Voir `DEPLOIEMENT_RENDER.md` pour plus de détails.

