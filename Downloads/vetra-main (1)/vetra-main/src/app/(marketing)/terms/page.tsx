import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions d\'Utilisation | AURION',
  description: 'Conditions générales d\'utilisation de la plateforme AURION',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Conditions d'Utilisation</h1>
        <p className="text-gray-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptation des Conditions</h2>
            <p className="text-gray-700 mb-4">
              En accédant et en utilisant AURION, vous acceptez d'être lié par ces conditions d'utilisation. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description du Service</h2>
            <p className="text-gray-700 mb-4">
              AURION est une plateforme SaaS qui permet de créer des sites web, applications, générer du contenu 
              (texte, images, vidéos), utiliser des agents IA, éditer du code, et gérer des workflows automatisés.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Compte Utilisateur</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Création de compte</h3>
            <p className="text-gray-700 mb-4">
              Vous devez créer un compte pour utiliser nos services. Vous êtes responsable de :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Fournir des informations exactes et à jour</li>
              <li>Maintenir la confidentialité de vos identifiants</li>
              <li>Toutes les activités sous votre compte</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Sécurité</h3>
            <p className="text-gray-700 mb-4">
              Vous êtes responsable de la sécurité de votre compte. Notifiez-nous immédiatement en cas d'utilisation 
              non autorisée.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Utilisation Acceptable</h2>
            <p className="text-gray-700 mb-4">Vous vous engagez à ne pas :</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Utiliser le service à des fins illégales</li>
              <li>Violer les droits de propriété intellectuelle</li>
              <li>Transmettre des virus ou codes malveillants</li>
              <li>Tenter d'accéder à des zones non autorisées</li>
              <li>Utiliser des bots ou scripts automatisés de manière abusive</li>
              <li>Partager votre compte avec des tiers</li>
              <li>Créer du contenu illégal, offensant ou discriminatoire</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Propriété Intellectuelle</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Contenu créé par vous</h3>
            <p className="text-gray-700 mb-4">
              Vous conservez tous les droits sur le contenu que vous créez sur AURION. En utilisant notre service, 
              vous nous accordez une licence pour héberger, stocker et afficher ce contenu.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Propriété d'AURION</h3>
            <p className="text-gray-700 mb-4">
              Tous les droits de propriété intellectuelle sur la plateforme AURION, y compris le code, les designs, 
              et les marques, appartiennent à AURION.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Abonnements et Paiements</h2>
            <p className="text-gray-700 mb-4">
              Les abonnements sont facturés mensuellement ou annuellement selon le plan choisi. Les paiements sont 
              traités par Stripe. Consultez nos{' '}
              <Link href="/cgv" className="text-blue-600 hover:underline">Conditions Générales de Vente</Link> pour plus de détails.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limites d'Abonnement</h2>
            <p className="text-gray-700 mb-4">
              Chaque plan d'abonnement a des limites spécifiques (projets, générations IA, appels API, etc.). 
              Ces limites sont strictement appliquées. Si vous dépassez vos limites, vous devrez mettre à niveau 
              votre abonnement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disponibilité du Service</h2>
            <p className="text-gray-700 mb-4">
              Nous nous efforçons de maintenir le service disponible 24/7, mais nous ne garantissons pas une 
              disponibilité ininterrompue. Nous pouvons effectuer des maintenances planifiées ou d'urgence.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation de Responsabilité</h2>
            <p className="text-gray-700 mb-4">
              AURION est fourni "en l'état". Nous ne garantissons pas que le service sera exempt d'erreurs ou 
              ininterrompu. Dans la mesure permise par la loi, nous ne serons pas responsables des dommages 
              indirects, consécutifs ou accessoires.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Résiliation</h2>
            <p className="text-gray-700 mb-4">
              Vous pouvez résilier votre compte à tout moment. Nous pouvons suspendre ou résilier votre compte 
              en cas de violation de ces conditions. En cas de résiliation, vos données seront supprimées conformément 
              à notre politique de confidentialité.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Modifications</h2>
            <p className="text-gray-700 mb-4">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications importantes 
              seront communiquées par e-mail ou notification sur la plateforme.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Droit Applicable</h2>
            <p className="text-gray-700 mb-4">
              Ces conditions sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact</h2>
            <p className="text-gray-700 mb-4">
              Pour toute question concernant ces conditions, contactez-nous :
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email :</strong> legal@aurion.ai</p>
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

