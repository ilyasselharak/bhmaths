import Link from 'next/link';

export const metadata = {
  title: 'À Propos de Nous | BHMaths',
  description: 'Découvrez BHMaths, la plateforme éducative de référence pour l\'apprentissage des mathématiques au Maroc',
};

export default function AboutUsPage() {
  return (
    <main className="py-12">
      <div className="bg-gradient-to-r from-orange-200 to-orange-400 text-black rounded-2xl py-16 mb-12 mx-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            À Propos de BHMaths
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Votre partenaire de confiance pour l'excellence en mathématiques
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Mission Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notre Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              BHMaths est une plateforme éducative dédiée à l'apprentissage des mathématiques au Maroc. 
              Notre mission est de rendre les mathématiques accessibles, compréhensibles et passionnantes 
              pour tous les élèves, du collège au baccalauréat. Nous croyons que chaque élève peut exceller 
              en mathématiques avec les bons outils, les bonnes méthodes et le bon accompagnement.
            </p>
          </section>

          {/* Vision Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notre Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous aspirons à devenir la référence incontournable pour l'apprentissage des mathématiques 
              au Maroc. Notre objectif est d'accompagner des milliers d'élèves vers la réussite scolaire 
              et de contribuer à l'amélioration du niveau en mathématiques dans tout le pays.
            </p>
          </section>

          {/* What We Offer Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ce Que Nous Offrons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="h-6 w-6 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Cours Complets
                </h3>
                <p className="text-gray-600">
                  Des cours vidéo interactifs couvrant tous les chapitres du programme officiel marocain, 
                  avec des explications claires et des exemples concrets.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Exercices Corrigés
                </h3>
                <p className="text-gray-600">
                  Plus de 5000 exercices progressifs avec solutions détaillées pour maîtriser chaque concept 
                  et progresser à votre rythme.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Devoirs & Examens
                </h3>
                <p className="text-gray-600">
                  Devoirs surveillés corrigés, examens nationaux et examens blancs pour une préparation 
                  complète aux épreuves officielles.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Support Personnalisé
                </h3>
                <p className="text-gray-600">
                  Support WhatsApp prioritaire pour répondre à vos questions et vous accompagner dans 
                  votre apprentissage.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pourquoi Choisir BHMaths ?</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>100% Programme Marocain :</strong> Tous nos contenus sont alignés sur les programmes officiels du Ministère de l'Éducation marocain.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Contenus de Qualité :</strong> Des ressources pédagogiques créées par des enseignants expérimentés et des experts en mathématiques.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Accessible 24/7 :</strong> Apprenez à votre rythme, quand vous voulez, où vous voulez, sur tous vos appareils.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Mises à Jour Régulières :</strong> Nos contenus sont régulièrement mis à jour pour refléter les dernières modifications des programmes.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-orange-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Communauté Active :</strong> Rejoignez une communauté d'élèves motivés qui partagent le même objectif : réussir en mathématiques.</span>
              </li>
            </ul>
          </section>

          {/* Our Commitment Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notre Engagement</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Chez BHMaths, nous nous engageons à :
            </p>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Fournir des contenus de la plus haute qualité
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Respecter les programmes officiels marocains
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Offrir un support réactif et personnalisé
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Améliorer continuellement notre plateforme
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Accompagner chaque élève vers la réussite
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contactez-Nous</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Vous avez des questions ou besoin d'aide ? Notre équipe est là pour vous accompagner.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <p className="text-gray-700">
                <strong>Email :</strong>{' '}
                <a href="mailto:contact@bhmaths.com" className="text-orange-500 hover:text-orange-600">
                  contact@bhmaths.com
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Téléphone :</strong>{' '}
                <a href="tel:+212629504107" className="text-orange-500 hover:text-orange-600">
                  +212 629-504107
                </a>
              </p>
              <p className="text-gray-700">
                <strong>WhatsApp :</strong>{' '}
                <a href="https://wa.me/212629504107" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">
                  Contacter sur WhatsApp
                </a>
              </p>
            </div>
          </section>

          {/* Back Link */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}


