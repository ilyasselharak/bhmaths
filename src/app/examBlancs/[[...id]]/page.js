import { initMongoose } from '@/lib/mongoose';
import Link from 'next/link';
import Image from 'next/image';
import SecondBacMathAExamBlancs from '@/models/SecondBacMathAExamBlancs';
import SecondBacMathBExamBlancs from '@/models/SecondBacMathBExamBlancs';
import SecondBacLettersExamBlancs from '@/models/SecondBacLettersExamBlancs';
import SecondBacEconomicsExamBlancs from '@/models/SecondBacEconomicsExamBlancs';
import SecondBacPCSVTExamBlancs from '@/models/SecondBacPCSVTExamBlancs';
import SecondBacTechExamBlancs from '@/models/SecondBacTechExamBlancs';

// Map level identifiers to their corresponding models
const levelToModel = {
  '2BacMathA': SecondBacMathAExamBlancs,
  '2BacMathB': SecondBacMathBExamBlancs,
  '2BacLettres': SecondBacLettersExamBlancs,
  '2BacEco': SecondBacEconomicsExamBlancs,
  '2BacPCSVT': SecondBacPCSVTExamBlancs,
  '2BacTech': SecondBacTechExamBlancs
};

// Map level identifiers to their display names
const levelToName = {
  '2BacMathA': '2ème année Bac - Mathématiques A',
  '2BacMathB': '2ème année Bac - Mathématiques B',
  '2BacLettres': '2ème année Bac - Lettres',
  '2BacEco': '2ème année Bac - Économie',
  '2BacPCSVT': '2ème année Bac - Sciences Physiques et SVT',
  '2BacTech': '2ème année Bac - Technique'
};

export async function generateMetadata({ params }) {
  const level = params?.id?.[0];
  if (!level || !levelToName[level]) {
    return {
      title: 'Examens Blancs | BHMath',
      description: 'Examens blancs de mathématiques'
    };
  }

  return {
    title: `Examens Blancs - ${levelToName[level]} | BHMath`,
    description: `Examens blancs de mathématiques pour ${levelToName[level]}`
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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Niveau non trouvé</h1>
          <p className="text-gray-500">Le niveau demandé n'existe pas.</p>
        </div>
      </div>
    );
  }

  const examBlancs = await getExamBlancs(level);
  const filteredExam = examId
    ? examBlancs.filter((item) => item.id === examId)
    : [];

  // If viewing a specific exam blanc
  if (filteredExam.length > 0) {
    const exam = filteredExam[0];
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/examBlancs/${level}`}
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-4"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour aux examens blancs
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{exam.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Publié le {new Date(exam.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
          
          <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: exam.content }} />
          
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
            {exam.pdfUrl && (
              <a
                href={exam.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Télécharger l'examen blanc (PDF)
              </a>
            )}
            {exam.solutionUrl && (
              <a
                href={exam.solutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Télécharger la correction (PDF)
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#003566] to-[#000814] text-white rounded-2xl py-12 mb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Examens Blancs - {levelToName[level]}
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Entraînez-vous avec nos examens blancs pour vous préparer efficacement
          </p>
        </div>
      </div>

      {examBlancs && examBlancs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examBlancs.map((exam) => (
            <Link
              key={exam._id}
              href={`/examBlancs/${level}/${exam.id}`}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {exam.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Publié le {new Date(exam.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {exam.solutionUrl ? 'Avec correction' : 'Examen uniquement'}
                </span>
                <span className="text-orange-500 font-medium flex items-center">
                  Voir l'examen
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-xl p-8">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 text-lg">Aucun examen blanc disponible pour le moment.</p>
          </div>
        </div>
      )}
    </div>
  );
}


