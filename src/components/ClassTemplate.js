'use client';

import Link from 'next/link';

const SECTION_ICONS = {
  'Cours': (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  'Exercices': (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  'Devoirs': (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

const SECTION_COLORS = ['bg-orange-50 text-orange-600', 'bg-blue-50 text-blue-600', 'bg-emerald-50 text-emerald-600'];

export default function ClassTemplate({ title, description, sections, curriculum, objectives, stats, onInfoClick, descriptions }) {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Programme</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">{title}</h1>
          <p className="text-slate-300 text-lg mb-2">{description}</p>
          {objectives && (
            <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2 leading-relaxed">{objectives}</p>
          )}
          {onInfoClick && (
            <button
              onClick={onInfoClick}
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-xl transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              En savoir plus
            </button>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-orange-500 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Resources */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-5">Ressources disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sections.map((section, i) => (
              <Link
                key={i}
                href={section.href}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6"
              >
                <div className={`w-10 h-10 ${SECTION_COLORS[i % SECTION_COLORS.length]} rounded-xl flex items-center justify-center mb-4`}>
                  {SECTION_ICONS[section.title] || (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors">{section.title}</h3>
                {section.description && (
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{section.description}</p>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500">
                  {section.action || 'Accéder'}
                  <svg className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Curriculum */}
        {curriculum && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-5">Programme de l'année</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {curriculum.map((topic, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-start gap-3">
                  <div className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-0.5">{topic.title}</h3>
                    {topic.description && (
                      <p className="text-xs text-slate-500 leading-relaxed">{topic.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Descriptions slot */}
        {descriptions && <div>{descriptions}</div>}
      </div>
    </main>
  );
}
