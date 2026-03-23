import Link from 'next/link';

export const metadata = {
  title: 'Collège | BHMaths',
  description: 'Ressources mathématiques pour le collège au Maroc',
};

const levels = [
  {
    href: '/college/class1',
    year: '1ère année',
    subtitle: 'Collège',
    desc: 'Bases solides en nombres, géométrie et statistiques',
    icon: '1',
    color: 'orange',
  },
  {
    href: '/college/class2',
    year: '2ème année',
    subtitle: 'Collège',
    desc: 'Algèbre, proportionnalité et géométrie avancée',
    icon: '2',
    color: 'orange',
  },
  {
    href: '/college/class3',
    year: '3ème année',
    subtitle: 'Collège',
    desc: 'Préparation au lycée : fonctions, théorème de Pythagore',
    icon: '3',
    color: 'orange',
  },
];

export default function CollegePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Niveau</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Mathématiques au Collège</h1>
          <p className="text-slate-300 text-lg">Choisissez votre année et accédez à tous les cours, exercices et devoirs</p>
        </div>
      </section>

      {/* Level cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((level) => (
              <Link
                key={level.href}
                href={level.href}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg shadow-orange-200 group-hover:scale-105 transition-transform">
                  {level.icon}
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-0.5">{level.year}</h2>
                <p className="text-sm text-orange-500 font-semibold mb-3">{level.subtitle}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{level.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500">
                  Accéder aux cours
                  <svg className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
