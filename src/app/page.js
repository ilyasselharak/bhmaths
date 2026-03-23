'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// ── Countdown component ───────────────────────────────────────────────────────
function ExamCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-06-04T00:00:00').getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Jours',    value: timeLeft.days },
    { label: 'Heures',   value: timeLeft.hours },
    { label: 'Minutes',  value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-orange-200">
      {/* decorative circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />

      <div className="relative text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Compte à rebours
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-1">Examen National 2026</h2>
        <p className="text-orange-100 mb-8">04 Juin 2026 — Préparez-vous dès maintenant</p>

        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto">
          {units.map((u) => (
            <div key={u.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 md:p-5 border border-white/20">
              <div className="text-3xl md:text-5xl font-bold tabular-nums">
                {String(u.value).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-orange-100 mt-1 font-medium">{u.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, description, items, color }) {
  const colors = {
    orange: { bg: 'bg-orange-50', icon: 'bg-orange-500', badge: 'text-orange-600', ring: 'ring-orange-100' },
    blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-500',   badge: 'text-blue-600',   ring: 'ring-blue-100' },
    green:  { bg: 'bg-emerald-50', icon: 'bg-emerald-500', badge: 'text-emerald-600', ring: 'ring-emerald-100' },
  };
  const c = colors[color] || colors.orange;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${c.icon} mb-5 ring-4 ${c.ring}`}>
        <span className="text-white text-xl">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
            <svg className={`h-4 w-4 flex-shrink-0 ${c.badge}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ value, label, icon }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm px-6 py-5 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-3xl font-extrabold text-orange-500">{value}</div>
      <div className="text-sm text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({ initial, name, level, text }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
          {initial}
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">{name}</p>
          <p className="text-xs text-slate-400">{level}</p>
        </div>
        <div className="ml-auto flex text-orange-400 text-sm">{'★'.repeat(5)}</div>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed italic">"{text}"</p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/2 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
          

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Maîtrisez les{' '}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Mathématiques
              </span>{' '}
              avec BHMaths
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Cours vidéo interactifs, exercices corrigés, devoirs surveillés et examens nationaux.
              Tout ce dont vous avez besoin pour exceller du collège au baccalauréat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/course" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 text-base">
                Commencer gratuitement
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/national/sma" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-all duration-200 text-base">
                Examens nationaux
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '1000+', label: 'Cours disponibles', icon: '📚' },
              { value: '5000+', label: 'Exercices corrigés', icon: '✏️' },
              { value: '16',    label: 'Filières couvertes', icon: '🎓' },
              { value: '24/7',  label: 'Accès illimité', icon: '⚡' },
            ].map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Countdown ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ExamCountdown />
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Nos ressources</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Tout ce qu'il vous faut pour réussir
            </h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
              Des ressources pédagogiques complètes et actualisées pour chaque étape de votre parcours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🎬"
              color="orange"
              title="Cours Vidéo Complets"
              description="Des cours interactifs couvrant chaque chapitre du programme officiel marocain avec explications détaillées."
              items={['Tous les chapitres du programme', 'Explications progressives', 'Accessibles sur tous appareils']}
            />
            <FeatureCard
              icon="✏️"
              color="blue"
              title="Exercices Corrigés"
              description="Plus de 5000 exercices progressifs avec solutions détaillées, du niveau de base aux problèmes complexes."
              items={['Classés par niveau de difficulté', 'Corrections étape par étape', "Exercices d'examens inclus"]}
            />
            <FeatureCard
              icon="📝"
              color="green"
              title="Devoirs & Examens"
              description="Collection complète de devoirs surveillés corrigés et d'examens nationaux pour une préparation optimale."
              items={['Devoirs par semestre', 'Examens nationaux SMA, SMB', 'Corrections méthodiques']}
            />
          </div>
        </div>
      </section>

      {/* ── Education levels ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Niveaux</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Parcours éducatif complet</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
              Des ressources adaptées à chaque niveau, du collège jusqu'au baccalauréat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                label: 'Tronc Commun',
                href: '/secondary/class1',
                color: 'from-blue-500 to-blue-600',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
                text: 'text-blue-700',
                desc: 'Sciences, Lettres, Technique',
                icon: '🏫',
              },
              {
                label: '1ère Bac',
                href: '/secondary/class2',
                color: 'from-purple-500 to-purple-600',
                bg: 'bg-purple-50',
                border: 'border-purple-100',
                text: 'text-purple-700',
                desc: 'Sciences Maths, PC-SVT, Lettres, Économie',
                icon: '📐',
              },
              {
                label: '2ème Bac',
                href: '/secondary/class3',
                color: 'from-orange-500 to-orange-600',
                bg: 'bg-orange-50',
                border: 'border-orange-100',
                text: 'text-orange-700',
                desc: 'Maths A&B, PC-SVT, Technologies, Économie',
                icon: '🎓',
              },
            ].map((level) => (
              <Link
                key={level.href}
                href={level.href}
                className={`group relative overflow-hidden ${level.bg} rounded-2xl border ${level.border} p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${level.color}`} />
                <div className="text-3xl mb-4">{level.icon}</div>
                <h3 className={`text-xl font-bold ${level.text} mb-2`}>{level.label}</h3>
                <p className="text-slate-500 text-sm mb-5">{level.desc}</p>
                <div className={`flex items-center gap-1 text-sm font-semibold ${level.text}`}>
                  Explorer
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── National exams ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Examens</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Examens nationaux</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
              Collection complète d'examens des années précédentes avec corrections détaillées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { href: '/national/sma', emoji: '📐', title: 'Sciences Mathématiques A', desc: 'Examens complets avec corrections détaillées' },
              { href: '/national/smb', emoji: '📊', title: 'Sciences Mathématiques B', desc: 'Sujets avec solutions complètes' },
              { href: '/national/physique', emoji: '⚛️', title: 'Physique', desc: 'Examens avec corrections méthodiques' },
            ].map((exam) => (
              <Link key={exam.href} href={exam.href} className="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-7 text-center hover:from-orange-50 hover:to-orange-100 hover:border-orange-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{exam.emoji}</div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors mb-2">{exam.title}</h3>
                <p className="text-slate-500 text-sm">{exam.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof (stats) ──────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1000+', label: 'Cours disponibles' },
              { value: '5000+', label: 'Exercices corrigés' },
              { value: '100%', label: 'Programme marocain' },
              { value: '24/7', label: 'Accès illimité' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-extrabold text-orange-400">{stat.value}</div>
                <div className="text-slate-400 mt-1 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Témoignages</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Ce que disent nos élèves</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard initial="A" name="Ahmed M." level="2ème Bac Sciences" text="Les cours sont très bien expliqués et les exercices m'ont beaucoup aidé à préparer mon bac. J'ai réussi avec mention très bien grâce à BHMaths !" />
            <TestimonialCard initial="S" name="Sara K." level="3ème Collège" text="J'adore la façon dont les leçons sont présentées. C'est clair, structuré et facile à comprendre. Mes notes ont vraiment augmenté cette année." />
            <TestimonialCard initial="Y" name="Youssef B." level="1ère Bac Math" text="Le support WhatsApp est excellent ! J'ai toujours une réponse rapide à mes questions. La plateforme est vraiment complète et professionnelle." />
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl shadow-green-200">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />
            <div className="relative">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Besoin d'aide ? Nous sommes là</h2>
              <p className="text-green-100 mb-8 text-base md:text-lg max-w-xl mx-auto">
                Notre équipe d'experts est disponible pour répondre à toutes vos questions et vous accompagner dans votre apprentissage.
              </p>
              <a
                href="https://wa.me/212629504107"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-all duration-200 hover:shadow-lg active:scale-95"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contacter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
