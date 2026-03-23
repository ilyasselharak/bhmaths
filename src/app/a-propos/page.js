import Link from 'next/link';

export const metadata = {
  title: 'À Propos de Nous | BHMaths',
  description: "Découvrez BHMaths, la plateforme éducative de référence pour l'apprentissage des mathématiques au Maroc",
};

export default function AboutUsPage() {
  const features = [
    { icon: '🎬', title: 'Cours Vidéo', desc: "Des cours vidéo interactifs couvrant chaque chapitre du programme officiel avec explications claires et progressives." },
    { icon: '✏️', title: 'Exercices Corrigés', desc: "Plus de 5000 exercices progressifs avec solutions détaillées, classés par niveau de difficulté." },
    { icon: '📝', title: 'Devoirs Surveillés', desc: "Collection complète de devoirs corrigés pour chaque niveau et chaque semestre." },
    { icon: '🏆', title: 'Examens Nationaux', desc: "Accès aux examens des années précédentes pour toutes les filières, avec corrections méthodiques." },
  ];

  const values = [
    { icon: '🎯', text: "Contenus 100% alignés sur les programmes officiels du Ministère de l'Éducation" },
    { icon: '💡', text: "Méthodes pédagogiques innovantes et accessibles à tous les niveaux" },
    { icon: '🌍', text: "Ressources disponibles 24h/24, 7j/7, depuis n'importe quel appareil" },
    { icon: '🤝', text: "Support personnalisé via WhatsApp pour répondre à toutes vos questions" },
    { icon: '📈', text: "Mises à jour régulières pour rester en phase avec les programmes officiels" },
    { icon: '🆓', text: "Accès gratuit aux ressources de base pour tous les élèves" },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Notre histoire</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight">À Propos de BHMaths</h1>
          <p className="text-slate-300 text-xl leading-relaxed">
            Votre partenaire de confiance pour l'excellence en mathématiques au Maroc
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-3xl p-8">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-5">🎯</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Notre Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                BHMaths est une plateforme éducative dédiée à l'apprentissage des mathématiques au Maroc.
                Notre mission est de rendre les mathématiques accessibles, compréhensibles et passionnantes
                pour tous les élèves, du collège au baccalauréat. Nous croyons que chaque élève peut exceller
                avec les bons outils, les bonnes méthodes et le bon accompagnement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-100 rounded-3xl p-8">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-5">🚀</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Notre Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                Nous aspirons à devenir la référence incontournable pour l'apprentissage des mathématiques
                au Maroc. Notre objectif est d'accompagner des milliers d'élèves vers la réussite scolaire
                et de contribuer à l'amélioration du niveau en mathématiques dans tout le pays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Ressources</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Ce que nous offrons</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex gap-5 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1.5">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Nos engagements</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Pourquoi choisir BHMaths ?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.text} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xl flex-shrink-0">{v.icon}</span>
                <p className="text-slate-600 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Prêt à commencer ?</h2>
          <p className="text-orange-100 mb-8 text-lg">
            Rejoignez des milliers d'élèves qui améliorent leurs résultats en mathématiques grâce à BHMaths.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/course" className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all duration-200 shadow-lg active:scale-95">
              Commencer gratuitement
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
