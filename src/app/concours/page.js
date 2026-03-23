import Link from 'next/link';

export const metadata = {
  title: 'Concours Mathématiques | BHMaths',
  description: 'Concours et compétitions de mathématiques pour les élèves du collège et du lycée',
};

const competitions = [
  {
    title: 'Concours Nationaux',
    description: 'Compétitions officielles organisées par le ministère de l\'éducation',
    icon: '🇲🇦',
    color: 'orange',
    items: [
      { title: 'Olympiades Nationales', href: '/concours/olympiades' },
      { title: 'Concours Général', href: '/concours/general' },
      { title: 'Concours Régional', href: '/concours/regional' },
    ],
  },
  {
    title: 'Concours Internationaux',
    description: 'Compétitions internationales de mathématiques',
    icon: '🌍',
    color: 'blue',
    items: [
      { title: 'IMO - Olympiade Internationale', href: '/concours/imo' },
      { title: 'Concours Panafricain', href: '/concours/panafricain' },
      { title: 'Concours Maghrébin', href: '/concours/maghrebin' },
    ],
  },
  {
    title: 'Préparation',
    description: 'Ressources pour préparer les concours',
    icon: '📚',
    color: 'emerald',
    items: [
      { title: 'Annales', href: '/concours/annales' },
      { title: 'Exercices d\'entraînement', href: '/concours/entrainement' },
      { title: 'Stratégies de résolution', href: '/concours/strategies' },
    ],
  },
  {
    title: 'Résultats',
    description: 'Classements et résultats des concours',
    icon: '🏆',
    color: 'purple',
    items: [
      { title: 'Palmarès 2024', href: '/concours/palmares-2024' },
      { title: 'Archives', href: '/concours/archives' },
      { title: 'Médaillés', href: '/concours/medailles' },
    ],
  },
];

const colorMap = {
  orange: { icon: 'bg-orange-50', badge: 'bg-orange-500', shadow: 'shadow-orange-100' },
  blue: { icon: 'bg-blue-50', badge: 'bg-blue-500', shadow: 'shadow-blue-100' },
  emerald: { icon: 'bg-emerald-50', badge: 'bg-emerald-500', shadow: 'shadow-emerald-100' },
  purple: { icon: 'bg-purple-50', badge: 'bg-purple-500', shadow: 'shadow-purple-100' },
};

export default function ConcoursPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Compétitions</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tigh text-white">Concours Mathématiques</h1>
          <p className="text-slate-300 text-lg">
            Découvrez et préparez-vous aux différents concours de mathématiques
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitions.map((category) => {
            const colors = colorMap[category.color];
            return (
              <div key={category.title} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 pb-4">
                  <div className={`w-12 h-12 ${colors.icon} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                    {category.icon}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mb-1">{category.title}</h2>
                  <p className="text-slate-500 text-sm">{category.description}</p>
                </div>
                <div className="px-4 pb-5 space-y-2">
                  {category.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-100 rounded-xl transition-all duration-200 group"
                    >
                      <span className="text-sm font-medium text-slate-700 group-hover:text-orange-600">{item.title}</span>
                      <svg className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
