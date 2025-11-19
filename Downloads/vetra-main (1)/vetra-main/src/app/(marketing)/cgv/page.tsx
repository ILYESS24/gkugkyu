import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | AURION',
  description: 'CGV et conditions de vente des abonnements AURION',
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Conditions Générales de Vente</h1>
        <p className="text-gray-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-gray-700 mb-4">
              Les présentes Conditions Générales de Vente (CGV) régissent la vente d'abonnements à la plateforme 
              SaaS AURION. En souscrivant à un abonnement, vous acceptez ces CGV.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Plans d'Abonnement</h2>
            <p className="text-gray-700 mb-4">Nous proposons plusieurs plans d'abonnement :</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Basic</strong> : 10€/mois</li>
              <li><strong>Starter</strong> : 29€/mois</li>
              <li><strong>Pro</strong> : 99€/mois</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Chaque plan inclut des limites spécifiques (projets, générations IA, appels API, stockage, etc.). 
              Consultez notre page <Link href="/pricing" className="text-blue-600 hover:underline">Tarifs</Link> pour plus de détails.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Commande et Paiement</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Commande</h3>
            <p className="text-gray-700 mb-4">
              La commande est effectuée en ligne via notre site. Vous choisissez votre plan et procédez au paiement. 
              La commande est confirmée par e-mail.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Paiement</h3>
            <p className="text-gray-700 mb-4">
              Les paiements sont traités de manière sécurisée par Stripe. Nous acceptons :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Cartes bancaires (Visa, Mastercard, American Express)</li>
              <li>Paiements par virement (selon disponibilité)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Le paiement est effectué automatiquement chaque mois/année selon votre plan.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Facturation</h2>
            <p className="text-gray-700 mb-4">
              Une facture est générée automatiquement à chaque paiement. Vous pouvez consulter et télécharger 
              vos factures depuis votre espace de facturation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Droit de Rétractation</h2>
            <p className="text-gray-700 mb-4">
              Conformément à la législation européenne, vous disposez d'un délai de 14 jours à compter de la 
              souscription pour vous rétracter, sans avoir à justifier de motifs ni à payer de pénalité.
            </p>
            <p className="text-gray-700 mb-4">
              Pour exercer votre droit de rétractation, contactez-nous à : <a href="mailto:support@aurion.ai" className="text-blue-600 hover:underline">support@aurion.ai</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Changement de Plan</h2>
            <p className="text-gray-700 mb-4">
              Vous pouvez changer de plan à tout moment depuis votre espace de facturation :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Mise à niveau</strong> : prend effet immédiatement, facturation au prorata</li>
              <li><strong>Rétrogradation</strong> : prend effet à la fin de la période de facturation en cours</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Résiliation</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Résiliation par vous</h3>
            <p className="text-gray-700 mb-4">
              Vous pouvez résilier votre abonnement à tout moment depuis votre espace de facturation. 
              La résiliation prend effet à la fin de la période de facturation en cours. Aucun remboursement 
              n'est effectué pour la période déjà payée.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Résiliation par nous</h3>
            <p className="text-gray-700 mb-4">
              Nous pouvons résilier votre abonnement en cas de :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Violation des conditions d'utilisation</li>
              <li>Non-paiement</li>
              <li>Utilisation frauduleuse</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Remboursements</h2>
            <p className="text-gray-700 mb-4">
              Les remboursements sont possibles dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Exercice du droit de rétractation (14 jours)</li>
              <li>Erreur de notre part</li>
              <li>Problème technique majeur non résolu</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Les remboursements sont effectués sur le moyen de paiement utilisé initialement, dans un délai de 14 jours.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Garanties</h2>
            <p className="text-gray-700 mb-4">
              Nous nous efforçons de maintenir le service disponible et fonctionnel. Cependant, nous ne garantissons pas :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Une disponibilité ininterrompue (maintenances possibles)</li>
              <li>L'absence totale d'erreurs</li>
              <li>La compatibilité avec tous les appareils/navigateurs</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Prix</h2>
            <p className="text-gray-700 mb-4">
              Les prix sont indiqués en euros, toutes taxes comprises (TVA incluse). Nous nous réservons le droit 
              de modifier les prix à tout moment. Les modifications seront communiquées 30 jours à l'avance et ne 
              s'appliqueront qu'aux nouvelles souscriptions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact</h2>
            <p className="text-gray-700 mb-4">
              Pour toute question concernant ces CGV, contactez-nous :
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email :</strong> support@aurion.ai</p>
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

