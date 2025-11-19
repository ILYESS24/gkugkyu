import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'À Propos | AURION',
  description: 'Découvrez AURION, la plateforme SaaS tout-en-un pour créer des sites web, applications et générer du contenu avec l\'IA',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">À Propos d'AURION</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Notre Mission</h2>
            <p className="text-gray-700 mb-4">
              AURION a été créé pour révolutionner la façon dont les entreprises et les créateurs développent 
              leurs projets numériques. Nous croyons que tout le monde devrait pouvoir créer des sites web, 
              applications et contenus de qualité professionnelle, sans avoir besoin de multiples outils complexes.
            </p>
            <p className="text-gray-700 mb-4">
              Notre mission est de fournir une plateforme SaaS tout-en-un qui combine la puissance de l'IA 
              avec des outils professionnels, le tout dans une interface intuitive et moderne.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ce que nous offrons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Création Web & Apps</h3>
                <p className="text-gray-700">
                  Créez des sites web et applications modernes avec notre générateur IA autonome, 
                  ou utilisez notre éditeur de code natif pour un contrôle total.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Génération de Contenu</h3>
                <p className="text-gray-700">
                  Générez du texte, des images et des vidéos de qualité professionnelle grâce à 
                  nos modèles IA avancés intégrés.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Agents IA</h3>
                <p className="text-gray-700">
                  Créez et déployez des agents IA personnalisés pour automatiser vos workflows 
                  et améliorer votre productivité.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Workflows Visuels</h3>
                <p className="text-gray-700">
                  Construisez des workflows complexes avec notre éditeur visuel intuitif, 
                  sans écrire une ligne de code.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Notre Approche</h2>
            <p className="text-gray-700 mb-4">
              Chez AURION, nous privilégions :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Simplicité</strong> : Une interface intuitive pour tous les niveaux</li>
              <li><strong>Puissance</strong> : Des outils professionnels accessibles</li>
              <li><strong>Sécurité</strong> : Chiffrement de bout en bout et protection des données</li>
              <li><strong>Innovation</strong> : Intégration des dernières technologies IA</li>
              <li><strong>Support</strong> : Une équipe dédiée pour vous accompagner</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technologies</h2>
            <p className="text-gray-700 mb-4">
              AURION est construit avec les technologies les plus modernes :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Next.js et React pour une expérience utilisateur fluide</li>
              <li>Supabase pour une base de données sécurisée et scalable</li>
              <li>DeepSeek et autres modèles IA pour la génération de contenu</li>
              <li>Chiffrement AES-256-GCM pour la protection des données</li>
              <li>Stripe pour des paiements sécurisés</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rejoignez-nous</h2>
            <p className="text-gray-700 mb-4">
              Que vous soyez un entrepreneur, un développeur, un créateur de contenu ou une entreprise, 
              AURION est conçu pour vous aider à réaliser vos projets plus rapidement et plus efficacement.
            </p>
            <div className="mt-6">
              <Link
                href="/register"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Commencer gratuitement
              </Link>
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

