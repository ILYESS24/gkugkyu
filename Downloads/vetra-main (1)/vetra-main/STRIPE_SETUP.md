# 🎯 Configuration Stripe pour AURION

## 📋 Étapes de configuration

### 1. Créer un compte Stripe
1. Allez sur [stripe.com](https://stripe.com)
2. Créez un compte (ou connectez-vous)
3. Activez le mode test pour commencer

### 2. Créer les produits et prix dans Stripe Dashboard

#### Produit "Basic"
- **Nom**: AURION Basic
- **Description**: Perfect for trying out AURION
- **Prix mensuel**: €10.00 EUR (créer un prix récurrent mensuel)
- **Prix annuel**: €100.00 EUR (créer un prix récurrent annuel, avec facturation annuelle)

#### Produit "Starter"
- **Nom**: AURION Starter
- **Description**: Perfect for solo creators and small teams
- **Prix mensuel**: $29.00 USD (créer un prix récurrent mensuel)
- **Prix annuel**: $290.00 USD (créer un prix récurrent annuel, avec facturation annuelle)

#### Produit "Pro"
- **Nom**: AURION Pro
- **Description**: For serious builders
- **Prix mensuel**: $99.00 USD (créer un prix récurrent mensuel)
- **Prix annuel**: $990.00 USD (créer un prix récurrent annuel, avec facturation annuelle)

**Important**: Notez les **Price IDs** (commencent par `price_...`) pour chaque prix créé.

### 3. Configurer les variables d'environnement

Ajoutez ces variables dans votre `.env.local` :

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_... # Votre clé secrète Stripe (trouvable dans Dashboard > Developers > API keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Votre clé publique Stripe
STRIPE_WEBHOOK_SECRET=whsec_... # Voir section Webhooks ci-dessous

# Stripe Price IDs (remplacez par vos vrais Price IDs)
STRIPE_BASIC_PRICE_ID=price_... # Prix mensuel Basic (€10)
STRIPE_BASIC_YEARLY_PRICE_ID=price_... # Prix annuel Basic (€100)
STRIPE_STARTER_PRICE_ID=price_... # Prix mensuel Starter ($29)
STRIPE_STARTER_YEARLY_PRICE_ID=price_... # Prix annuel Starter ($290)
STRIPE_PRO_PRICE_ID=price_... # Prix mensuel Pro ($99)
STRIPE_PRO_YEARLY_PRICE_ID=price_... # Prix annuel Pro ($990)

# URL de l'application
NEXT_PUBLIC_APP_URL=http://localhost:3000 # En développement
# NEXT_PUBLIC_APP_URL=https://votre-domaine.com # En production
```

### 4. Exécuter le schéma SQL

Exécutez le fichier `supabase-stripe-schema.sql` dans votre Supabase SQL Editor pour créer les tables nécessaires.

### 5. Configurer les Webhooks Stripe

1. Dans Stripe Dashboard, allez dans **Developers > Webhooks**
2. Cliquez sur **Add endpoint**
3. URL du endpoint: `https://votre-domaine.com/api/stripe/webhook` (ou `http://localhost:3000/api/stripe/webhook` en dev avec Stripe CLI)
4. Sélectionnez les événements à écouter:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
5. Copiez le **Signing secret** (commence par `whsec_...`) et ajoutez-le à `STRIPE_WEBHOOK_SECRET`

#### Pour le développement local avec Stripe CLI

```bash
# Installer Stripe CLI
# macOS: brew install stripe/stripe-cli/stripe
# Windows: télécharger depuis https://github.com/stripe/stripe-cli/releases

# Se connecter
stripe login

# Forwarder les webhooks vers localhost
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Le secret webhook sera affiché dans le terminal.

### 6. Tester l'intégration

1. **Test Checkout**:
   - Allez sur `/checkout?plan=starter&billing=monthly`
   - Utilisez la carte de test: `4242 4242 4242 4242`
   - Date d'expiration: n'importe quelle date future
   - CVC: n'importe quel 3 chiffres

2. **Vérifier dans Stripe Dashboard**:
   - Les clients sont créés
   - Les abonnements sont actifs
   - Les factures sont générées

3. **Vérifier dans Supabase**:
   - Les données sont synchronisées dans les tables `subscriptions` et `invoices`

## 🔐 Sécurité

- **Ne jamais** commiter les clés Stripe dans Git
- Utiliser des variables d'environnement
- En production, utiliser les clés **live** (commencent par `sk_live_` et `pk_live_`)
- Configurer les webhooks avec le bon secret

## 📚 Routes API créées

- `POST /api/stripe/checkout` - Créer une session de checkout
- `POST /api/stripe/webhook` - Recevoir les événements Stripe
- `GET /api/stripe/subscription` - Récupérer l'abonnement actif
- `DELETE /api/stripe/subscription` - Annuler l'abonnement
- `GET /api/stripe/invoices` - Récupérer les factures

## 🎨 Pages créées

- `/checkout` - Page de checkout avec sélection de plan
- `/billing` - Page de gestion de facturation et abonnement

## ✅ Checklist de déploiement

- [ ] Produits et prix créés dans Stripe
- [ ] Variables d'environnement configurées
- [ ] Schéma SQL exécuté dans Supabase
- [ ] Webhook configuré dans Stripe Dashboard
- [ ] Test de checkout réussi
- [ ] Vérification de la synchronisation des données
- [ ] Configuration des clés **live** pour la production

## 🐛 Dépannage

### Erreur "No signature"
- Vérifiez que `STRIPE_WEBHOOK_SECRET` est bien configuré
- Vérifiez que le webhook est correctement configuré dans Stripe

### Erreur "Invalid price ID"
- Vérifiez que les Price IDs dans `.env.local` correspondent aux prix créés dans Stripe
- Vérifiez que les prix sont bien des abonnements récurrents

### Les données ne se synchronisent pas
- Vérifiez les logs du webhook dans Stripe Dashboard
- Vérifiez que les RLS policies sont correctement configurées dans Supabase
- Vérifiez que l'utilisateur est bien authentifié

