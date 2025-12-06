# Guide de Déploiement sur Render

Ce guide vous explique comment déployer le serveur Zed Collab sur Render avec 512 MB de RAM.

## 📋 Prérequis

1. Un compte Render (gratuit disponible sur [render.com](https://render.com))
2. Un dépôt Git (GitHub, GitLab, ou Bitbucket) contenant ce code
3. Compréhension de base de Docker et PostgreSQL

## 🚀 Déploiement Rapide

### Option 1 : Déploiement via render.yaml (Recommandé)

1. **Connecter votre dépôt Git à Render**
   - Allez sur [dashboard.render.com](https://dashboard.render.com)
   - Cliquez sur "New +" → "Blueprint"
   - Connectez votre dépôt Git
   - Render détectera automatiquement le fichier `render.yaml`

2. **Créer la base de données PostgreSQL**
   - Dans le dashboard Render, créez une nouvelle base de données PostgreSQL
   - Notez l'URL de connexion (format: `postgresql://user:pass@host:port/dbname`)

3. **Configurer les variables d'environnement**
   - Dans les paramètres du service web, ajoutez :
     - `DATABASE_URL` : L'URL de votre base de données PostgreSQL
     - `API_TOKEN` : Générez un token sécurisé (ex: `openssl rand -hex 32`)

4. **Déployer**
   - Render va automatiquement :
     - Construire l'image Docker
     - Exécuter les migrations de base de données
     - Démarrer le serveur

### Option 2 : Déploiement Manuel

1. **Créer un nouveau service Web**
   - Type: Web Service
   - Runtime: Docker
   - Dockerfile Path: `./Dockerfile-collab`
   - Docker Context: `.`
   - Plan: Starter (512 MB) ou Standard (1 GB recommandé)

2. **Créer une base de données PostgreSQL**
   - Plan: Starter (256 MB) ou Standard (1 GB)
   - Notez l'URL de connexion

3. **Configurer les variables d'environnement** (voir section ci-dessous)

4. **Déployer**

## 🔧 Variables d'Environnement Requises

### Variables Obligatoires

```bash
# Port HTTP (Render utilise PORT, mais on mappe vers HTTP_PORT)
HTTP_PORT=10000

# Base de données PostgreSQL
DATABASE_URL=postgresql://user:password@host:port/dbname

# Token API (générez un token sécurisé)
API_TOKEN=votre_token_securise_ici

# Préfixe pour les liens d'invitation
INVITE_LINK_PREFIX=https://zed.dev/invite/

# Environnement
ZED_ENVIRONMENT=production

# Configuration base de données
DATABASE_MAX_CONNECTIONS=20

# Logging
RUST_LOG=info
LOG_JSON=true
```

### Variables Optionnelles

```bash
# LiveKit (pour audio/vidéo)
LIVEKIT_SERVER=
LIVEKIT_KEY=
LIVEKIT_SECRET=

# Blob Store (pour stockage de fichiers)
BLOB_STORE_URL=
BLOB_STORE_REGION=
BLOB_STORE_ACCESS_KEY=
BLOB_STORE_SECRET_KEY=
BLOB_STORE_BUCKET=

# LLM Database (pour fonctionnalités IA)
LLM_DATABASE_URL=
LLM_DATABASE_MAX_CONNECTIONS=10
LLM_API_SECRET=

# Clés API pour modèles IA
OPENAI_API_KEY=
GOOGLE_AI_API_KEY=
ANTHROPIC_API_KEY=
```

## 📝 Étapes Détaillées

### 1. Préparer le Code

Assurez-vous que votre dépôt contient :
- ✅ `Dockerfile-collab`
- ✅ `render.yaml` (optionnel mais recommandé)
- ✅ Le code source complet

### 2. Créer la Base de Données

1. Dans Render Dashboard → "New +" → "PostgreSQL"
2. Choisissez :
   - **Name**: `zed-postgres`
   - **Plan**: Starter (256 MB) ou Standard (1 GB)
   - **Region**: Même région que votre service web
3. Notez l'**Internal Database URL** (pour les services dans le même réseau)
   - Format: `postgresql://user:password@host:port/dbname`

### 3. Créer le Service Web

1. Dans Render Dashboard → "New +" → "Web Service"
2. Connectez votre dépôt Git
3. Configurez :
   - **Name**: `zed-collab`
   - **Region**: Même région que la base de données
   - **Branch**: `main` (ou votre branche)
   - **Root Directory**: `/` (racine)
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile-collab`
   - **Docker Context**: `.`
   - **Plan**: Starter (512 MB) ou Standard (1 GB)

### 4. Configurer les Variables d'Environnement

Dans les paramètres du service web, ajoutez :

**Variables Obligatoires :**
```
HTTP_PORT=10000
DATABASE_URL=<votre_url_postgres>
API_TOKEN=<générez_un_token>
INVITE_LINK_PREFIX=https://zed.dev/invite/
ZED_ENVIRONMENT=production
DATABASE_MAX_CONNECTIONS=20
RUST_LOG=info
LOG_JSON=true
```

**Pour générer un API_TOKEN sécurisé :**
```bash
# Sur Linux/Mac
openssl rand -hex 32

# Ou en ligne
# https://www.random.org/strings/
```

### 5. Lier la Base de Données

1. Dans les paramètres du service web
2. Section "Connections"
3. Cliquez sur "Link Database"
4. Sélectionnez votre base de données PostgreSQL
5. Render ajoutera automatiquement `DATABASE_URL` si vous utilisez l'Internal Database URL

### 6. Déployer

1. Cliquez sur "Create Web Service"
2. Render va :
   - Cloner votre dépôt
   - Construire l'image Docker (peut prendre 10-20 minutes)
   - Exécuter les migrations automatiquement
   - Démarrer le serveur

### 7. Vérifier le Déploiement

1. Attendez que le build soit terminé (statut "Live")
2. Vérifiez les logs pour voir si le serveur démarre correctement
3. Testez l'endpoint de santé : `https://votre-service.onrender.com/healthz`
4. Devrait retourner : `{"status":"ok"}`

## 🔍 Vérification et Dépannage

### Vérifier que le serveur fonctionne

```bash
# Health check
curl https://votre-service.onrender.com/healthz

# Devrait retourner: {"status":"ok"}
```

### Vérifier les logs

Dans le dashboard Render :
1. Allez dans votre service web
2. Cliquez sur "Logs"
3. Vérifiez qu'il n'y a pas d'erreurs

### Problèmes Courants

#### ❌ Erreur: "Failed to connect to database"
- Vérifiez que `DATABASE_URL` est correctement configurée
- Vérifiez que la base de données est dans la même région
- Vérifiez que la base de données est "Available"

#### ❌ Erreur: "Out of memory"
- Passez au plan Standard (1 GB) au lieu de Starter (512 MB)
- Réduisez `DATABASE_MAX_CONNECTIONS` à 10

#### ❌ Erreur: "Migration failed"
- Vérifiez que la base de données est accessible
- Vérifiez les logs pour plus de détails
- Les migrations s'exécutent automatiquement au démarrage

#### ❌ Build échoue
- Vérifiez que le Dockerfile est correct
- Vérifiez que toutes les dépendances sont disponibles
- Le build peut prendre 15-20 minutes (normal pour Rust)

## 💰 Coûts Estimés

### Plan Starter (512 MB)
- **Web Service**: Gratuit (avec limitations) ou $7/mois
- **PostgreSQL**: Gratuit (256 MB) ou $7/mois
- **Total**: Gratuit (avec limitations) ou $14/mois

### Plan Standard (1 GB) - Recommandé
- **Web Service**: $25/mois
- **PostgreSQL**: $20/mois (1 GB)
- **Total**: $45/mois

## 🎯 Optimisations pour 512 MB

Si vous devez absolument utiliser 512 MB :

1. **PostgreSQL externe** (obligatoire)
   - Ne pas installer PostgreSQL sur le même serveur
   - Utiliser Render Postgres séparé

2. **Réduire les connexions**
   ```bash
   DATABASE_MAX_CONNECTIONS=10  # Au lieu de 20
   ```

3. **Réduire les logs**
   ```bash
   RUST_LOG=warn  # Au lieu de info
   ```

4. **Désactiver LiveKit**
   - Ne pas configurer les variables LiveKit
   - Le serveur fonctionnera sans audio/vidéo

5. **Configuration PostgreSQL optimisée**
   - Dans Render Postgres, limitez les connexions
   - Utilisez le plan Starter (256 MB)

## 📚 Ressources

- [Documentation Render](https://render.com/docs)
- [Documentation Docker](https://docs.docker.com/)
- [Documentation PostgreSQL](https://www.postgresql.org/docs/)

## ✅ Checklist de Déploiement

- [ ] Compte Render créé
- [ ] Dépôt Git connecté
- [ ] Base de données PostgreSQL créée
- [ ] Service web créé
- [ ] Variables d'environnement configurées
- [ ] Base de données liée au service
- [ ] Build réussi
- [ ] Health check fonctionne
- [ ] Logs sans erreurs

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans Render Dashboard
2. Vérifiez que toutes les variables d'environnement sont configurées
3. Consultez la documentation Render
4. Vérifiez que la base de données est accessible

---

**Note importante** : Pour un déploiement en production avec de nombreux utilisateurs, le plan Standard (1 GB) est fortement recommandé.

