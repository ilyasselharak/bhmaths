import Link from 'next/link';

export const metadata = {
  title: "Conditions d'utilisation | BHMaths",
  description: "Conditions d'utilisation de la plateforme éducative BHMaths",
};

const sections = [
  {
    num: '1',
    title: 'Introduction',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        Bienvenue sur BHMaths. En accédant et en utilisant notre site, vous acceptez d'être lié par ces conditions d'utilisation.
        Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
      </p>
    ),
  },
  {
    num: '2',
    title: 'Acceptation des conditions',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        En utilisant la plateforme BHMaths, vous confirmez avoir lu et compris ces conditions et acceptez d'y être lié.
        Nous nous réservons le droit de les modifier à tout moment ; vous serez notifié de tout changement significatif.
      </p>
    ),
  },
  {
    num: '3',
    title: "Utilisation du service",
    content: (
      <>
        <h3 className="font-semibold text-slate-800 mb-2 mt-3 text-sm">Utilisations permises</h3>
        <ul className="space-y-2 text-slate-600 text-sm">
          {['Accéder aux contenus éducatifs disponibles', 'Télécharger les ressources pour usage personnel', 'Partager des liens vers nos pages'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <h3 className="font-semibold text-slate-800 mb-2 mt-4 text-sm">Utilisations interdites</h3>
        <ul className="space-y-2 text-slate-600 text-sm">
          {['Copier ou redistribuer le contenu à des fins commerciales', "Tenter d'accéder sans autorisation à nos systèmes", 'Utiliser le site de manière à perturber le service', 'Publier du contenu illégal ou offensant', 'Usurper l\'identité d\'une autre personne'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: '4',
    title: 'Création de compte',
    content: (
      <ul className="space-y-2 text-slate-600 text-sm">
        {['Fournir des informations exactes et complètes', 'Maintenir la sécurité de votre compte', 'Signaler immédiatement tout accès non autorisé', 'Être responsable de toutes les activités sous votre compte'].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: '5',
    title: 'Abonnements et paiements',
    content: (
      <ul className="space-y-2 text-slate-600 text-sm">
        {['Vous acceptez de payer les frais indiqués', 'Les abonnements se renouvellent automatiquement sauf annulation', 'Vous pouvez annuler votre abonnement à tout moment', 'Aucun remboursement pour la période en cours', 'Nous nous réservons le droit de modifier les tarifs avec préavis'].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: '6',
    title: 'Propriété intellectuelle',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        Tout le contenu de la plateforme BHMaths, y compris les textes, images, vidéos et designs, est protégé par le droit d'auteur.
        Vous ne pouvez pas copier, reproduire ou distribuer tout contenu sans notre autorisation écrite.
      </p>
    ),
  },
  {
    num: '7',
    title: 'Contenu utilisateur',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        Si vous publiez du contenu sur notre plateforme, vous nous accordez une licence non exclusive pour l'utiliser.
        Vous garantissez avoir le droit de publier ce contenu et qu'il ne viole pas les droits de tiers.
      </p>
    ),
  },
  {
    num: '8',
    title: 'Limitation de responsabilité',
    content: (
      <ul className="space-y-2 text-slate-600 text-sm">
        {['Dommages directs ou indirects résultant de l\'utilisation', 'Interruptions de service ou erreurs techniques', 'Perte de données ou d\'informations', 'Résultats scolaires des utilisateurs'].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: '9',
    title: 'Résiliation',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        Nous nous réservons le droit de suspendre ou de résilier votre accès à la plateforme à tout moment, sans préavis,
        si vous violez ces conditions ou pour toute autre raison que nous jugeons appropriée.
      </p>
    ),
  },
  {
    num: '10',
    title: 'Modifications des conditions',
    content: (
      <p className="text-slate-600 leading-relaxed text-sm">
        Nous pouvons modifier ces conditions à tout moment. Les changements seront publiés sur cette page avec une date de mise à jour.
        Nous vous conseillons de consulter régulièrement cette page.
      </p>
    ),
  },
];

export default function TermsOfUsePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Légal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">Conditions d'utilisation</h1>
          <p className="text-slate-300 text-lg">Conditions et règles d'utilisation de la plateforme BHMaths</p>
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
                <div className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">11</div>
                <h2 className="text-lg font-bold text-slate-900">Contact</h2>
              </div>
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-2 text-sm">
                <p className="text-slate-700">
                  <span className="font-medium">Email :</span>{' '}
                  <a href="mailto:contact@bhmaths.com" className="text-orange-500 hover:text-orange-600">contact@bhmaths.com</a>
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Téléphone :</span>{' '}
                  <a href="tel:+212629504107" className="text-orange-500 hover:text-orange-600">+212 629-504107</a>
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
