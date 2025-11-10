# Guide de déploiement sur Render

Ce projet est configuré pour être déployé sur Render.

## Fichiers de configuration créés

- `render.yaml` - Configuration principale pour Render
- `render-build.sh` - Script de build pour Render
- `render-start.sh` - Script de démarrage pour Render

## Déploiement

### Option 1: Déploiement via render.yaml (Recommandé)

1. Allez sur [Render Dashboard](https://dashboard.render.com)
2. Cliquez sur "New +" → "Blueprint"
3. Connectez votre repository GitHub: `https://github.com/ILYESS24/anythingllm-cursor-.git`
4. Render détectera automatiquement le fichier `render.yaml` et configurera le service

### Option 2: Déploiement manuel

1. Allez sur [Render Dashboard](https://dashboard.render.com)
2. Cliquez sur "New +" → "Web Service"
3. Connectez votre repository: `https://github.com/ILYESS24/anythingllm-cursor-.git`
4. Configurez les paramètres suivants:
   - **Name**: void-editor
   - **Runtime**: Node
   - **Build Command**: `bash render-build.sh`
   - **Start Command**: `bash render-start.sh`
   - **Plan**: Free
   - **Region**: Oregon

## Variables d'environnement

Les variables suivantes sont configurées automatiquement:
- `NODE_ENV=production`
- `PORT` (défini automatiquement par Render)
- `VSCODE_SERVER_PORT` (utilise la valeur de PORT)

## Notes importantes

- Le build peut prendre plusieurs minutes car il compile l'ensemble du projet VS Code/Void
- Assurez-vous que votre repository est à jour avec tous les fichiers de configuration
- Le service utilisera le port fourni par Render automatiquement

