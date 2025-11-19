import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique des Cookies | AURION',
  description: 'Politique d\'utilisation des cookies sur AURION',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique des Cookies</h1>
        <p className="text-gray-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Qu'est-ce qu'un Cookie ?</h2>
            <p className="text-gray-700 mb-4">
              Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. 
              Les cookies permettent au site de mémoriser vos préférences et d'améliorer votre expérience.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types de Cookies Utilisés</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Cookies Essentiels</h3>
            <p className="text-gray-700 mb-4">
              Ces cookies sont nécessaires au fonctionnement du site. Ils incluent :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Cookies d'authentification</strong> : pour maintenir votre session</li>
              <li><strong>Cookies de sécurité</strong> : pour protéger contre les attaques</li>
              <li><strong>Cookies de préférences</strong> : pour mémoriser vos paramètres</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Cookies Analytiques</h3>
            <p className="text-gray-700 mb-4">
              Ces cookies nous aident à comprendre comment vous utilisez notre site :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Pages visitées</li>
              <li>Temps passé sur le site</li>
              <li>Erreurs rencontrées</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Cookies de Fonctionnalité</h3>
            <p className="text-gray-700 mb-4">
              Ces cookies permettent d'améliorer les fonctionnalités :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Préférences de langue</li>
              <li>Thème (clair/sombre)</li>
              <li>Paramètres d'affichage</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies Tiers</h2>
            <p className="text-gray-700 mb-4">Nous utilisons des services tiers qui peuvent placer des cookies :</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Stripe</strong> : pour le traitement des paiements</li>
              <li><strong>Supabase</strong> : pour l'authentification et la base de données</li>
              <li><strong>Vercel</strong> : pour l'analytics et les performances</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Gestion des Cookies</h2>
            <p className="text-gray-700 mb-4">
              Vous pouvez contrôler et gérer les cookies de plusieurs façons :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Paramètres du navigateur</strong> : la plupart des navigateurs permettent de bloquer ou supprimer les cookies</li>
              <li><strong>Banner de consentement</strong> : vous pouvez accepter ou refuser les cookies non essentiels</li>
              <li><strong>Outils de gestion</strong> : utilisez les outils de votre navigateur pour gérer les cookies</li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-gray-700">
                <strong>Note :</strong> Le blocage des cookies essentiels peut affecter le fonctionnement du site.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Durée de Conservation</h2>
            <p className="text-gray-700 mb-4">
              Les cookies sont conservés pour différentes durées :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Cookies de session</strong> : supprimés à la fermeture du navigateur</li>
              <li><strong>Cookies persistants</strong> : conservés jusqu'à 12 mois maximum</li>
              <li><strong>Cookies d'authentification</strong> : selon votre session (renouvelable)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Vos Droits</h2>
            <p className="text-gray-700 mb-4">
              Conformément au RGPD, vous avez le droit de :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Être informé de l'utilisation des cookies</li>
              <li>Donner ou retirer votre consentement</li>
              <li>Accéder aux données collectées via les cookies</li>
              <li>Demander la suppression des cookies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact</h2>
            <p className="text-gray-700 mb-4">
              Pour toute question concernant notre utilisation des cookies, contactez-nous :
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email :</strong> privacy@aurion.ai</p>
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

