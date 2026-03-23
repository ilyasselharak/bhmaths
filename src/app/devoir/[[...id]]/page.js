export const revalidate = 3600;

import { initMongoose } from '@/lib/mongoose';

import CommonCoreLettersDevoir from '@/models/CommonCoreLettersDevoir';
import CommonCoreScienceDevoir from '@/models/CommonCoreScienceDevoir';
import CommonCoreTechnicalDevoir from '@/models/CommonCoreTechnicalDevoir';
import FirstBacMathDevoir from '@/models/FirstBacMathDevoir';
import FirstBacLettersDevoir from '@/models/FirstBacLettersDevoir';
import FirstBacEconomicsDevoir from '@/models/FirstBacEconomicsDevoir';
import FirstBacScienceDevoir from '@/models/FirstBacScienceDevoir';
import SecondBacMathADevoir from '@/models/SecondBacMathADevoir';
import SecondBacMathBDevoir from '@/models/SecondBacMathBDevoir';
import SecondBacLettersDevoir from '@/models/SecondBacLettersDevoir';
import SecondBacEconomicsDevoir from '@/models/SecondBacEconomicsDevoir';
import SecondBacPhysicsChemistryLifeSciencesDevoir from '@/models/SecondBacPhysicsChemistryLifeSciencesDevoir';
import SecondBacTechnicalCommonDevoir from '@/models/SecondBacTechnicalCommonDevoir';
import FirstCollegeDevoir from '@/models/FirstCollegeDevoir';
import SecondCollegeDevoir from '@/models/SecondCollegeDevoir';
import ThirdCollegeDevoir from '@/models/ThirdCollegeDevoir';

const levelToModel = {
  'TroncCommunLettres': CommonCoreLettersDevoir,
  'TroncCommunSc': CommonCoreScienceDevoir,
  'TroncCommunTech': CommonCoreTechnicalDevoir,
  'firstBacMath': FirstBacMathDevoir,
  'firstBacLettres': FirstBacLettersDevoir,
  'firstBacEco': FirstBacEconomicsDevoir,
  'firstBacSc': FirstBacScienceDevoir,
  '2BacMathA': SecondBacMathADevoir,
  '2BacMathB': SecondBacMathBDevoir,
  '2BacLettres': SecondBacLettersDevoir,
  '2BacEco': SecondBacEconomicsDevoir,
  '2BacPCSVT': SecondBacPhysicsChemistryLifeSciencesDevoir,
  '2BacTech': SecondBacTechnicalCommonDevoir,
  'firstCollege': FirstCollegeDevoir,
  'secondCollege': SecondCollegeDevoir,
  'thirdCollege': ThirdCollegeDevoir,
};

const levelToName = {
  'TroncCommunLettres': 'Tronc Commun - Lettres',
  'TroncCommunSc': 'Tronc Commun - Sciences',
  'TroncCommunTech': 'Tronc Commun - Technique',
  'firstBacMath': 'Première année Bac - Mathématiques',
  'firstBacLettres': 'Première année Bac - Lettres',
  'firstBacEco': 'Première année Bac - Économie',
  'firstBacSc': 'Première année Bac - Sciences',
  '2BacMathA': '2ème année Bac - Mathématiques A',
  '2BacMathB': '2ème année Bac - Mathématiques B',
  '2BacLettres': '2ème année Bac - Lettres',
  '2BacEco': '2ème année Bac - Économie',
  '2BacPcSvt': '2ème année Bac - Sciences Physiques et SVT',
  '2BacTech': '2ème année Bac - Technique',
  'firstCollege': '1ère année Collège',
  'secondCollege': '2ème année Collège',
  'thirdCollege': '3ème année Collège',
};

export async function generateMetadata({ params }) {
  const level = params?.id?.[0];
  if (!level || !levelToName[level]) {
    return { title: 'Devoirs | BHMaths', description: 'Devoirs de mathématiques' };
  }
  return {
    title: `Devoirs - ${levelToName[level]} | BHMaths`,
    description: `Devoirs de mathématiques pour ${levelToName[level]}`,
  };
}

async function getDevoirs(level, semester) {
  await initMongoose();
  const Model = levelToModel[level];
  if (!Model) return null;
  const query = semester ? { semester } : {};
  const devoirs = await Model.find(query).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(devoirs));
}

export default async function DevoirPage({ params, searchParams }) {
  const level = params?.id?.[0];
  const semester = searchParams?.semester ? parseInt(searchParams.semester) : null;

  if (!level || !levelToModel[level]) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center py-16">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="h-7 w-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-600 font-medium">Niveau non trouvé</p>
          <p className="text-slate-400 text-sm mt-1">Le niveau demandé n&apos;existe pas.</p>
        </div>
      </main>
    );
  }

  const devoirs = await getDevoirs(level, semester);
  const levelTitle = levelToName[level];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Devoirs</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">{levelTitle}</h1>
          <p className="text-slate-300 text-lg">Devoirs surveillés et examens corrigés</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semester Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { label: 'Tous', value: null },
            { label: '1er Semestre', value: 1 },
            { label: '2ème Semestre', value: 2 },
          ].map(({ label, value }) => (
            <a
              key={label}
              href={value ? `/devoir/${level}?semester=${value}` : `/devoir/${level}`}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                semester === value
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {devoirs && devoirs.length > 0 ? (
          <div className="space-y-5">
            {devoirs.map((devoir) => (
              <div key={devoir._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">{devoir.title}</h2>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                          Semestre {devoir.semester}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(devoir.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    {devoir.pdfUrl && (
                      <a
                        href={devoir.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors flex-shrink-0"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Télécharger PDF
                      </a>
                    )}
                  </div>
                </div>
                {devoir.content && (
                  <div className="px-6 py-5">
                    <div className="prose prose-slate max-w-none text-sm" dangerouslySetInnerHTML={{ __html: devoir.content }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="h-7 w-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500">Aucun devoir disponible pour le moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}
