'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const stats = [
  { value: '12+', label: 'Chapitres' },
  { value: '250+', label: 'Exercices' },
  { value: '60+', label: 'Devoirs' },
  { value: '3', label: 'Filières' },
];

const specializations = [
  {
    title: 'Tronc Commun Sciences',
    href: '/secondary/class1/sciences',
    description: 'Programme commun pour les filières scientifiques (Sciences Mathématiques, Sciences Physiques, SVT)',
    icon: '🔬',
    features: ['Algèbre avancée', 'Géométrie analytique', 'Fonctions', 'Statistiques'],
  },
  {
    title: 'Tronc Commun Lettres',
    href: '/secondary/class1/lettres',
    description: 'Programme adapté aux filières littéraires avec mathématiques appliquées',
    icon: '📚',
    features: ['Mathématiques appliquées', 'Statistiques descriptives', 'Probabilités', 'Analyse de données'],
  },
  {
    title: 'Sciences Techniques',
    href: '/secondary/class1/technique',
    description: 'Programme spécialisé pour les filières techniques et professionnelles',
    icon: '⚙️',
    features: ['Mathématiques techniques', 'Applications pratiques', 'Résolution de problèmes', 'Calculs techniques'],
  },
];

export default function FirstBacPage() {
  const [description, setDescription] = useState(null);

  useEffect(() => {
    fetch(`/api/page-descriptions?path=${encodeURIComponent('/secondary/class1')}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setDescription(data); })
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Lycée</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Tronc Commun</h1>
          <p className="text-slate-300 text-lg mb-2">Première année du Baccalauréat</p>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Choisissez votre filière pour accéder aux ressources mathématiques adaptées à votre parcours.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-orange-500 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Specializations */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-5">Choisissez votre filière</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {specializations.map((spec) => (
              <Link
                key={spec.title}
                href={spec.href}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {spec.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors">{spec.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{spec.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {spec.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                      <svg className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500">
                  Accéder au programme
                  <svg className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {description?.description && (
          <div className="prose prose-slate max-w-none">
            {description.description}
          </div>
        )}
      </div>
    </main>
  );
}
