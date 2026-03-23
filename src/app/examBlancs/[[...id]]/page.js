export const revalidate = 3600;

import { initMongoose } from '@/lib/mongoose';
import Link from 'next/link';
import SecondBacMathAExamBlancs from '@/models/SecondBacMathAExamBlancs';
import SecondBacMathBExamBlancs from '@/models/SecondBacMathBExamBlancs';
import SecondBacLettersExamBlancs from '@/models/SecondBacLettersExamBlancs';
import SecondBacEconomicsExamBlancs from '@/models/SecondBacEconomicsExamBlancs';
import SecondBacPCSVTExamBlancs from '@/models/SecondBacPCSVTExamBlancs';
import SecondBacTechExamBlancs from '@/models/SecondBacTechExamBlancs';

const levelToModel = {
  '2BacMathA': SecondBacMathAExamBlancs,
  '2BacMathB': SecondBacMathBExamBlancs,
  '2BacLettres': SecondBacLettersExamBlancs,
  '2BacEco': SecondBacEconomicsExamBlancs,
  '2BacPCSVT': SecondBacPCSVTExamBlancs,
  '2BacTech': SecondBacTechExamBlancs,
};

const levelToName = {
  '2BacMathA': '2ème Bac - Mathématiques A',
  '2BacMathB': '2ème Bac - Mathématiques B',
  '2BacLettres': '2ème Bac - Lettres',
  '2BacEco': '2ème Bac - Économie',
  '2BacPCSVT': '2ème Bac - Sciences Physiques et SVT',
  '2BacTech': '2ème Bac - Technique',
};

export async function generateMetadata({ params }) {
  const level = params?.id?.[0];
  if (!level || !levelToName[level]) {
    return { title: 'Examens Blancs | BHMaths', description: 'Examens blancs de mathématiques' };
  }
  return {
    title: `Examens Blancs - ${levelToName[level]} | BHMaths`,
    description: `Examens blancs de mathématiques pour ${levelToName[level]}`,
  };
}

async function getExamBlancs(level) {
  await initMongoose();
  const Model = levelToModel[level];
  if (!Model) return null;
  const examBlancs = await Model.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(examBlancs));
}

export default async function ExamBlancsPage({ params }) {
  const level = params?.id?.[0];
  const examId = params?.id?.[1];

  if (!level || !levelToModel[level]) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center py-16">
          <p className="text-slate-600 font-medium">Niveau non trouvé</p>
          <p className="text-slate-400 text-sm mt-1">Le niveau demandé n&apos;existe pas.</p>
        </div>
      </main>
    );
  }

  const examBlancs = await getExamBlancs(level);
  const filteredExam = examId ? examBlancs.filter((item) => item.id === examId) : [];
  const levelTitle = levelToName[level];

  // Detail view
  if (filteredExam.length > 0) {
    const exam = filteredExam[0];
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href={`/examBlancs/${level}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 font-medium mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux examens blancs
          </Link>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100">
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-1">{levelTitle}</p>
              <h1 className="text-2xl font-extrabold text-slate-900">{exam.title}</h1>
              <p className="text-xs text-slate-400 mt-1">
                Publié le {new Date(exam.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            {exam.content && (
              <div className="px-8 py-6 border-b border-slate-100">
                <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: exam.content }} />
              </div>
            )}
            <div className="px-8 py-6 flex flex-wrap gap-3">
              {exam.pdfUrl && (
                <a
                  href={exam.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Télécharger l&apos;examen blanc (PDF)
                </a>
              )}
              {exam.solutionUrl && (
                <a
                  href={exam.solutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Télécharger la correction (PDF)
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // List view
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Examens Blancs</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">{levelTitle}</h1>
          <p className="text-slate-300 text-lg">Entraînez-vous avec nos examens blancs</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {examBlancs && examBlancs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {examBlancs.map((exam) => (
              <Link
                key={exam._id}
                href={`/examBlancs/${level}/${exam.id}`}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 group"
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">{exam.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(exam.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-xs text-slate-400">
                    {exam.solutionUrl ? 'Avec correction' : 'Examen uniquement'}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-orange-500 group-hover:translate-x-0.5 transition-transform">
                    Voir
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="h-7 w-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500">Aucun examen blanc disponible pour le moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}
