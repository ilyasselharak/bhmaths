import Link from 'next/link';

export const metadata = {
  title: 'Exercices 2ème Année Collège | BHMaths',
  description: 'Exercices et problèmes de mathématiques pour la 2ème année du collège',
};

const categories = [
  {
    title: 'Nombres et Opérations',
    topics: [
      { title: 'Nombres relatifs', href: '/college/class2/exercice/nombres-relatifs' },
      { title: 'Fractions et décimaux', href: '/college/class2/exercice/fractions-decimaux' },
      { title: 'Puissances', href: '/college/class2/exercice/puissances' },
      { title: 'Racines carrées', href: '/college/class2/exercice/racines-carrees' },
    ],
  },
  {
    title: 'Géométrie',
    topics: [
      { title: 'Triangles', href: '/college/class2/exercice/triangles' },
      { title: 'Parallélogrammes', href: '/college/class2/exercice/parallelogrammes' },
      { title: 'Cercle et disque', href: '/college/class2/exercice/cercle-disque' },
      { title: 'Symétries', href: '/college/class2/exercice/symetries' },
    ],
  },
  {
    title: 'Calcul littéral',
    topics: [
      { title: 'Expressions littérales', href: '/college/class2/exercice/expressions-litterales' },
      { title: 'Équations', href: '/college/class2/exercice/equations' },
      { title: 'Inéquations', href: '/college/class2/exercice/inequations' },
    ],
  },
  {
    title: 'Proportions',
    topics: [
      { title: 'Proportionnalité', href: '/college/class2/exercice/proportionnalite' },
      { title: 'Pourcentages', href: '/college/class2/exercice/pourcentages' },
      { title: 'Vitesse moyenne', href: '/college/class2/exercice/vitesse-moyenne' },
    ],
  },
];

export default function SecondYearExercisesPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Collège · 2ème Année</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Exercices</h1>
          <p className="text-slate-300 text-lg">Sélectionnez une catégorie pour accéder aux exercices</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.title} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 pt-5 pb-3">
                <h2 className="font-bold text-slate-900">{category.title}</h2>
              </div>
              <div className="px-4 pb-4 space-y-2">
                {category.topics.map((topic) => (
                  <Link
                    key={topic.title}
                    href={topic.href}
                    className="flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-100 rounded-xl transition-all duration-200 group"
                  >
                    <span className="text-sm font-medium text-slate-700 group-hover:text-orange-600">{topic.title}</span>
                    <svg className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
