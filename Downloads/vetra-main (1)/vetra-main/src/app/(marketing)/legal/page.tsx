import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions Légales | AURION',
  description: 'Mentions légales et informations sur AURION',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
        <p className="text-gray-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Éditeur du Site</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-gray-700"><strong>Raison sociale :</strong> AURION</p>
              <p className="text-gray-700"><strong>Forme juridique :</strong> [SAS / SARL / etc.]</p>
              <p className="text-gray-700"><strong>Capital social :</strong> [Montant]</p>
              <p className="text-gray-700"><strong>Siège social :</strong> [Adresse complète]</p>
              <p className="text-gray-700"><strong>SIRET :</strong> [Numéro SIRET]</p>
              <p className="text-gray-700"><strong>RCS :</strong> [Ville] RCS [Numéro]</p>
              <p className="text-gray-700"><strong>TVA Intracommunautaire :</strong> [Numéro TVA]</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Directeur de Publication</h2>
            <p className="text-gray-700 mb-4">
              <strong>Nom :</strong> [Nom du directeur]<br />
              <strong>Email :</strong> <a href="mailto:contact@aurion.ai" className="text-blue-600 hover:underline">contact@aurion.ai</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Hébergement</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-gray-700"><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p className="text-gray-700"><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              <p className="text-gray-700"><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">vercel.com</a></p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Base de Données</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-gray-700"><strong>Fournisseur :</strong> Supabase</p>
              <p className="text-gray-700"><strong>Site web :</strong> <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">supabase.com</a></p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Propriété Intellectuelle</h2>
            <p className="text-gray-700 mb-4">
              L'ensemble du contenu de ce site (textes, images, logos, icônes, vidéos, etc.) est la propriété 
              exclusive d'AURION, sauf mention contraire. Toute reproduction, distribution, modification ou utilisation 
              sans autorisation est interdite.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Protection des Données</h2>
            <p className="text-gray-700 mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vos données personnelles sont 
              traitées de manière sécurisée. Consultez notre{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">Politique de Confidentialité</Link> pour plus d'informations.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Délégué à la Protection des Données (DPO) :</strong><br />
              Email : <a href="mailto:dpo@aurion.ai" className="text-blue-600 hover:underline">dpo@aurion.ai</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Réclamations</h2>
            <p className="text-gray-700 mb-4">
              Conformément à l'article L.611-1 du Code de la consommation, vous pouvez utiliser la plateforme 
              européenne de règlement des litiges en ligne :{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Médiation</h2>
            <p className="text-gray-700 mb-4">
              En cas de litige, vous pouvez recourir à un médiateur de la consommation. Pour plus d'informations, 
              contactez-nous à : <a href="mailto:mediation@aurion.ai" className="text-blue-600 hover:underline">mediation@aurion.ai</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email :</strong> <a href="mailto:contact@aurion.ai" className="text-blue-600 hover:underline">contact@aurion.ai</a></p>
              <p className="text-gray-700"><strong>Support :</strong> <a href="mailto:support@aurion.ai" className="text-blue-600 hover:underline">support@aurion.ai</a></p>
              <p className="text-gray-700"><strong>Adresse :</strong> [Votre adresse complète]</p>
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

