import Link from 'next/link';

export const metadata = {
  title: 'Lycée | BHMaths',
  description: 'Ressources mathématiques pour le lycée au Maroc',
};

const secondaryLevels = [
  {
    title: 'Tronc Commun',
    path: '/secondary/class1',
    icon: 'TC',
    desc: 'Fondamentaux du lycée pour toutes les filières',
    options: [
      { label: 'Sciences', href: '/secondary/class1/sciences' },
      { label: 'Lettres', href: '/secondary/class1/lettres' },
      { label: 'Technique', href: '/secondary/class1/technique' },
    ],
    accentColor: 'bg-orange-500',
    shadowColor: 'shadow-orange-200',
  },
  {
    title: '1ère Bac',
    path: '/secondary/class2',
    icon: '1B',
    desc: 'Approfondissement selon votre spécialité',
    options: [
      { label: 'Sciences Math', href: '/secondary/class2/sciences-math' },
      { label: 'PC-SVT', href: '/secondary/class2/pc-svt' },
      { label: 'Économie', href: '/secondary/class2/economie' },
      { label: 'Lettres', href: '/secondary/class2/lettres' },
    ],
    accentColor: 'bg-blue-500',
    shadowColor: 'shadow-blue-200',
  },
  {
    title: '2ème Bac',
    path: '/secondary/class3',
    icon: '2B',
    desc: 'Préparation au baccalauréat toutes filières',
    options: [
      { label: 'Math A', href: '/secondary/class3/math-a' },
      { label: 'Math B', href: '/secondary/class3/math-b' },
      { label: 'PC-SVT', href: '/secondary/class3/pc-svt' },
      { label: 'Sciences Éco', href: '/secondary/class3/sciences-eco' },
      { label: 'Lettres', href: '/secondary/class3/lettres' },
    ],
    accentColor: 'bg-emerald-500',
    shadowColor: 'shadow-emerald-200',
  },
];

export default function SecondaryPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Niveau</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Mathématiques au Lycée</h1>
          <p className="text-slate-300 text-lg">Choisissez votre niveau et votre filière</p>
        </div>
      </section>

      {/* Levels grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryLevels.map((level) => (
              <div key={level.title} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="p-6 pb-4">
                  <div className={`w-12 h-12 ${level.accentColor} rounded-2xl flex items-center justify-center text-white font-extrabold text-sm mb-4 shadow-lg ${level.shadowColor}`}>
                    {level.icon}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mb-1">{level.title}</h2>
                  <p className="text-slate-500 text-sm">{level.desc}</p>
                </div>

                {/* Filières */}
                <div className="px-4 pb-5 space-y-2">
                  {level.options.map((option) => (
                    <Link
                      key={option.label}
                      href={option.href}
                      className="flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-100 rounded-xl transition-all duration-200 group"
                    >
                      <span className="text-sm font-medium text-slate-700 group-hover:text-orange-600">{option.label}</span>
                      <svg className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
