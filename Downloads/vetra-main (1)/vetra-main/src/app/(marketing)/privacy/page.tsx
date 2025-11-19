import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | AURION',
  description: 'Politique de confidentialité et protection des données personnelles d\'AURION',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
        <p className="text-gray-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              AURION ("nous", "notre", "nos") s'engage à protéger votre vie privée. Cette politique de confidentialité 
              explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque 
              vous utilisez notre plateforme SaaS.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Données Collectées</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Données que vous nous fournissez</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Informations de paiement (gérées par Stripe)</li>
              <li>Contenu que vous créez sur la plateforme</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Données collectées automatiquement</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Adresse IP</li>
              <li>Type de navigateur et appareil</li>
              <li>Pages visitées et temps passé</li>
              <li>Cookies et technologies similaires</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Utilisation des Données</h2>
            <p className="text-gray-700 mb-4">Nous utilisons vos données pour :</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Fournir et améliorer nos services</li>
              <li>Traiter vos paiements et gérer votre abonnement</li>
              <li>Vous envoyer des notifications importantes</li>
              <li>Personnaliser votre expérience</li>
              <li>Analyser l'utilisation de la plateforme</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Protection des Données</h2>
            <p className="text-gray-700 mb-4">
              Nous utilisons des mesures de sécurité avancées pour protéger vos données :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Chiffrement AES-256-GCM</strong> pour toutes les données sensibles</li>
              <li><strong>HTTPS/TLS</strong> pour toutes les communications</li>
              <li><strong>Authentification sécurisée</strong> avec Supabase</li>
              <li><strong>Rate limiting</strong> et protection contre les abus</li>
              <li><strong>Audit logging</strong> complet de toutes les actions</li>
              <li><strong>Stockage sécurisé</strong> des secrets et API keys</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Partage des Données</h2>
            <p className="text-gray-700 mb-4">
              Nous ne vendons jamais vos données. Nous pouvons partager vos informations uniquement avec :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Stripe</strong> : pour le traitement des paiements</li>
              <li><strong>Supabase</strong> : pour l'hébergement de la base de données</li>
              <li><strong>Vercel</strong> : pour l'hébergement de l'application</li>
              <li><strong>Fournisseurs de services</strong> : uniquement si nécessaire pour fournir nos services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Vos Droits (RGPD)</h2>
            <p className="text-gray-700 mb-4">Conformément au RGPD, vous avez le droit de :</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Accès</strong> : consulter vos données personnelles</li>
              <li><strong>Rectification</strong> : corriger vos données inexactes</li>
              <li><strong>Suppression</strong> : demander la suppression de vos données (droit à l'oubli)</li>
              <li><strong>Portabilité</strong> : exporter vos données dans un format structuré</li>
              <li><strong>Opposition</strong> : vous opposer au traitement de vos données</li>
              <li><strong>Limitation</strong> : demander la limitation du traitement</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:privacy@aurion.ai" className="text-blue-600 hover:underline">privacy@aurion.ai</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies</h2>
            <p className="text-gray-700 mb-4">
              Nous utilisons des cookies pour améliorer votre expérience. Consultez notre{' '}
              <Link href="/cookies" className="text-blue-600 hover:underline">Politique des Cookies</Link> pour plus d'informations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Conservation des Données</h2>
            <p className="text-gray-700 mb-4">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services 
              et respecter nos obligations légales. Lorsque vous supprimez votre compte, toutes vos données sont 
              supprimées de manière sécurisée dans un délai de 30 jours.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
            <p className="text-gray-700 mb-4">
              Nous pouvons modifier cette politique de confidentialité à tout moment. Nous vous informerons de 
              tout changement important par e-mail ou via une notification sur la plateforme.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-700 mb-4">
              Pour toute question concernant cette politique de confidentialité, contactez-nous :
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email :</strong> privacy@aurion.ai</p>
              <p className="text-gray-700"><strong>Adresse :</strong> [Votre adresse]</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

