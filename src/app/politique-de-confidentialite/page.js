import Link from 'next/link';

export const metadata = {
  title: 'Politique de Confidentialité | BHMaths',
  description: 'Politique de confidentialité et protection des données personnelles de BHMaths',
};

const sections = [
  {
    num: '1',
    title: 'Introduction',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed">
          BHMaths ("nous", "notre", "nos") s'engage à protéger votre vie privée.
          Cette politique explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque vous utilisez notre plateforme éducative.
        </p>
        <p className="text-slate-600 leading-relaxed mt-3">
          En utilisant notre site web, vous acceptez les pratiques décrites dans cette politique.
        </p>
      </>
    ),
  },
  {
    num: '2',
    title: 'Informations que nous collectons',
    content: (
      <>
        <h3 className="font-semibold text-slate-800 mb-2 mt-4">2.1 Informations fournies par vous</h3>
        <ul className="space-y-2 text-slate-600 text-sm">
          {['Nom, prénom, adresse e-mail, mot de passe', 'Niveau scolaire, filière, préférences d\'apprentissage', 'Informations de paiement (gérées par des prestataires sécurisés)', 'Messages et demandes de support'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <h3 className="font-semibold text-slate-800 mb-2 mt-5">2.2 Informations collectées automatiquement</h3>
        <ul className="space-y-2 text-slate-600 text-sm">
          {['Adresse IP, type de navigateur, pages visitées', 'Cookies et technologies similaires', 'Type d\'appareil, système d\'exploitation'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: '3',
    title: 'Utilisation des informations',
    content: (
      <ul className="space-y-2 text-slate-600 text-sm">
        {[
          'Fournir, maintenir et améliorer nos services éducatifs',
          'Gérer votre compte et vos abonnements',
          'Personnaliser votre expérience d\'apprentissage',
          'Traiter vos paiements',
          'Répondre à vos questions et demandes de support',
          'Analyser l\'utilisation de la plateforme',
          'Détecter et prévenir la fraude',
          'Respecter nos obligations légales',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: '4',
    title: 'Partage des informations',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed text-sm mb-3">Nous ne vendons jamais vos informations personnelles. Nous les partageons uniquement dans les cas suivants :</p>
        <ul className="space-y-2 text-slate-600 text-sm">
          {[
            'Prestataires de services (hébergement, paiement, analyse)',
            'Obligations légales lorsque requis par la loi',
            'Avec votre consentement explicite',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: '5',
    title: 'Sécurité des données',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed text-sm mb-3">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées, notamment :</p>
        <ul className="space-y-2 text-slate-600 text-sm">
          {['Chiffrement des données sensibles', 'Authentification sécurisée', 'Surveillance régulière des systèmes', 'Accès restreint aux données personnelles'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: '6',
    title: 'Cookies',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed text-sm mb-3">Nous utilisons des cookies pour mémoriser vos préférences, maintenir votre session et analyser l'utilisation. Vous pouvez les contrôler via les paramètres de votre navigateur.</p>
      </>
    ),
  },
  {
    num: '7',
    title: 'Vos droits',
    content: (
      <ul className="space-y-2 text-slate-600 text-sm">
        {[
          'Accès : demander une copie de vos données',
          'Rectification : corriger vos données inexactes',
          'Suppression : demander la suppression de vos données',
          'Opposition : vous opposer au traitement',
          'Portabilité : recevoir vos données dans un format structuré',
          'Retrait du consentement à tout moment',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: '8',
    title: 'Conservation des données',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        Nous conservons vos informations aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales.
        Lorsque vous supprimez votre compte, nous supprimons ou anonymisons vos données, sauf si la conservation est requise par la loi.
      </p>
    ),
  },
  {
    num: '9',
    title: 'Protection des mineurs',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        Notre plateforme est destinée aux élèves du collège et du lycée. Nous encourageons les mineurs à utiliser nos services avec l'autorisation d'un parent ou tuteur.
        Nous ne collectons pas sciemment d'informations d'enfants de moins de 13 ans sans consentement parental.
      </p>
    ),
  },
  {
    num: '10',
    title: 'Liens vers des sites tiers',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        Notre site peut contenir des liens vers des sites tiers. Nous ne sommes pas responsables de leurs pratiques de confidentialité.
      </p>
    ),
  },
  {
    num: '11',
    title: 'Modifications de cette politique',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        Nous pouvons mettre à jour cette politique de temps à autre. Nous vous informerons de tout changement significatif en publiant la nouvelle politique sur cette page.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Légal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">Politique de Confidentialité</h1>
          <p className="text-slate-300 text-lg">Protection de vos données personnelles</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 md:p-10 space-y-8">
            {sections.map((section) => (
              <section key={section.num}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {section.num}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
                </div>
                {section.content}
              </section>
            ))}

            {/* Contact */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">12</div>
                <h2 className="text-lg font-bold text-slate-900">Contact</h2>
              </div>
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-2 text-sm">
                <p className="text-slate-700">
                  <span className="font-medium">Email :</span>{' '}
                  <a href="mailto:contact@bhmaths.com" className="text-orange-500 hover:text-orange-600">contact@bhmaths.com</a>
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Téléphone :</span>{' '}
                  <a href="tel:+212708831975" className="text-orange-500 hover:text-orange-600">+212 708 831 975</a>
                </p>
                <p className="text-slate-700"><span className="font-medium">Adresse :</span> Maroc</p>
              </div>
            </section>

            <div className="pt-6 border-t border-slate-100">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 font-medium transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
