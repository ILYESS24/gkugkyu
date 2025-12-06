# 📦 Fichiers de Configuration pour Render

Ce dossier contient tous les fichiers nécessaires pour déployer le serveur Zed Collab sur Render.

## 📁 Fichiers Inclus

### Fichiers de Configuration
- **`render.yaml`** - Configuration Blueprint pour Render (déploiement automatique)
- **`Dockerfile-collab-render`** - Dockerfile optimisé pour Render
- **`env.example`** - Exemple de variables d'environnement

### Documentation
- **`QUICK_START_RENDER.md`** - Guide de démarrage rapide (5 minutes)
- **`DEPLOIEMENT_RENDER.md`** - Guide de déploiement complet et détaillé
- **`ANALYSE_DEPLOIEMENT_RENDER.md`** - Analyse technique des besoins mémoire

## 🚀 Démarrage Rapide

1. **Lisez** `QUICK_START_RENDER.md` pour un déploiement en 5 minutes
2. **Consultez** `DEPLOIEMENT_RENDER.md` pour les détails complets
3. **Référez-vous** à `env.example` pour les variables d'environnement

## 📋 Prérequis

- Compte Render (gratuit disponible)
- Dépôt Git (GitHub, GitLab, ou Bitbucket)
- Base de données PostgreSQL (créée via Render ou externe)

## ⚙️ Configuration Minimale

Pour un déploiement avec 512 MB, vous avez besoin de :

```bash
HTTP_PORT=10000
DATABASE_URL=postgresql://user:pass@host:port/dbname
API_TOKEN=<générez_un_token>
INVITE_LINK_PREFIX=https://zed.dev/invite/
ZED_ENVIRONMENT=production
DATABASE_MAX_CONNECTIONS=20
RUST_LOG=info
LOG_JSON=true
```

## 🎯 Options de Déploiement

### Option 1 : Blueprint (Recommandé)
- Utilisez `render.yaml`
- Render configure tout automatiquement
- Plus rapide et moins d'erreurs

### Option 2 : Manuel
- Créez les services manuellement
- Plus de contrôle
- Suivez `DEPLOIEMENT_RENDER.md`

## 💡 Recommandations

- **512 MB** : Fonctionne mais serré (PostgreSQL externe requis)
- **1 GB** : Recommandé pour la production (plan Standard)

## 📚 Ressources

- [Documentation Render](https://render.com/docs)
- [Guide de déploiement complet](./DEPLOIEMENT_RENDER.md)
- [Guide de démarrage rapide](./QUICK_START_RENDER.md)

## 🆘 Support

En cas de problème :
1. Vérifiez les logs dans Render Dashboard
2. Consultez `DEPLOIEMENT_RENDER.md` section "Dépannage"
3. Vérifiez que toutes les variables d'environnement sont configurées

---

**Note** : Pour un déploiement en production, le plan Standard (1 GB) est fortement recommandé.

