import Link from 'next/link';

export const metadata = {
  title: 'Politique de Confidentialité | BHMaths',
  description: 'Politique de confidentialité et protection des données personnelles de BHMaths',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="py-12">
      <div className="bg-gradient-to-r from-orange-200 to-orange-400 text-black rounded-2xl py-16 mb-12 mx-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Politique de Confidentialité
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Protection de vos données personnelles
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              BHMaths ("nous", "notre", "nos") s'engage à protéger votre vie privée. 
              Cette politique de confidentialité explique comment nous collectons, utilisons, 
              stockons et protégeons vos informations personnelles lorsque vous utilisez notre 
              plateforme éducative.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              En utilisant notre site web, vous acceptez les pratiques décrites dans cette politique. 
              Si vous n'acceptez pas cette politique, veuillez ne pas utiliser nos services.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Informations que nous collectons</h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">2.1 Informations que vous nous fournissez</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Informations de compte :</strong> Nom, prénom, adresse e-mail, mot de passe lors de l'inscription</li>
              <li><strong>Informations de profil :</strong> Niveau scolaire, filière, préférences d'apprentissage</li>
              <li><strong>Informations de paiement :</strong> Informations nécessaires pour le traitement des abonnements (gérées par nos prestataires de paiement sécurisés)</li>
              <li><strong>Communications :</strong> Messages, questions et demandes de support que vous nous envoyez</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">2.2 Informations collectées automatiquement</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Données de navigation :</strong> Adresse IP, type de navigateur, pages visitées, durée de visite</li>
              <li><strong>Cookies et technologies similaires :</strong> Pour améliorer votre expérience et analyser l'utilisation du site</li>
              <li><strong>Données d'appareil :</strong> Type d'appareil, système d'exploitation, identifiants uniques</li>
            </ul>
          </section>

          {/* Use of Data */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Utilisation des informations</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous utilisons vos informations personnelles pour :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Fournir, maintenir et améliorer nos services éducatifs</li>
              <li>Gérer votre compte et vos abonnements</li>
              <li>Personnaliser votre expérience d'apprentissage</li>
              <li>Traiter vos paiements et gérer vos abonnements</li>
              <li>Vous envoyer des notifications importantes concernant votre compte</li>
              <li>Répondre à vos questions et demandes de support</li>
              <li>Analyser l'utilisation de notre plateforme pour améliorer nos services</li>
              <li>Détecter et prévenir la fraude et les abus</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Partage des informations</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous ne vendons jamais vos informations personnelles. Nous pouvons partager vos informations uniquement dans les cas suivants :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Prestataires de services :</strong> Avec des tiers qui nous aident à exploiter notre plateforme (hébergement, paiement, analyse)</li>
              <li><strong>Obligations légales :</strong> Lorsque requis par la loi ou pour protéger nos droits</li>
              <li><strong>Avec votre consentement :</strong> Dans d'autres cas avec votre autorisation explicite</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Tous nos prestataires de services sont tenus de protéger vos informations et ne peuvent les utiliser que dans le cadre de nos instructions.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Sécurité des données</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles contre l'accès non autorisé, la perte, la destruction ou l'altération. Cela inclut :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
              <li>Chiffrement des données sensibles</li>
              <li>Authentification sécurisée</li>
              <li>Surveillance régulière de nos systèmes</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Formation de notre personnel sur la protection des données</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est 100% sécurisée. 
              Bien que nous nous efforcions d'utiliser des moyens commercialement acceptables pour protéger vos informations, 
              nous ne pouvons garantir leur sécurité absolue.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Cookies et technologies similaires</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous utilisons des cookies et des technologies similaires pour :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Mémoriser vos préférences et paramètres</li>
              <li>Maintenir votre session active</li>
              <li>Analyser l'utilisation de notre site</li>
              <li>Améliorer la fonctionnalité du site</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Vous pouvez contrôler les cookies via les paramètres de votre navigateur. 
              Notez que la désactivation de certains cookies peut affecter le fonctionnement de notre site.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Vos droits</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Conformément à la réglementation sur la protection des données (RGPD et loi marocaine), vous avez le droit de :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Accès :</strong> Demander une copie de vos données personnelles</li>
              <li><strong>Rectification :</strong> Corriger vos données inexactes ou incomplètes</li>
              <li><strong>Suppression :</strong> Demander la suppression de vos données dans certains cas</li>
              <li><strong>Opposition :</strong> Vous opposer au traitement de vos données</li>
              <li><strong>Portabilité :</strong> Recevoir vos données dans un format structuré</li>
              <li><strong>Limitation :</strong> Demander la limitation du traitement de vos données</li>
              <li><strong>Retrait du consentement :</strong> Retirer votre consentement à tout moment</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à <a href="mailto:contact@bhmaths.com" className="text-orange-500 hover:text-orange-600">contact@bhmaths.com</a>
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Conservation des données</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous conservons vos informations personnelles aussi longtemps que nécessaire pour fournir nos services 
              et respecter nos obligations légales. Lorsque vous supprimez votre compte, nous supprimons ou anonymisons 
              vos données personnelles, sauf si la conservation est requise par la loi ou pour des raisons légitimes 
              (par exemple, résolution de litiges, prévention de la fraude).
            </p>
          </section>

          {/* Children Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Protection des mineurs</h2>
            <p className="text-gray-600 leading-relaxed">
              Notre plateforme est destinée aux élèves du collège et du lycée. Si vous avez moins de 18 ans, 
              nous vous encourageons à utiliser notre service avec l'autorisation et la supervision d'un parent 
              ou d'un tuteur. Nous ne collectons pas sciemment d'informations personnelles d'enfants de moins de 13 ans 
              sans le consentement parental.
            </p>
          </section>

          {/* Third Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Liens vers des sites tiers</h2>
            <p className="text-gray-600 leading-relaxed">
              Notre site peut contenir des liens vers des sites web tiers. Nous ne sommes pas responsables des 
              pratiques de confidentialité ou du contenu de ces sites. Nous vous encourageons à lire les politiques 
              de confidentialité de tout site que vous visitez.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Modifications de cette politique</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons 
              de tout changement significatif en publiant la nouvelle politique sur cette page et en mettant à jour 
              la date de "Dernière mise à jour". Nous vous encourageons à consulter régulièrement cette page pour 
              rester informé de la façon dont nous protégeons vos informations.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Contact</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques de traitement des données, 
              vous pouvez nous contacter :
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
                  +212 708831975
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Adresse :</strong> Maroc
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



