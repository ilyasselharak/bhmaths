export const revalidate = 3600;

import { initMongoose } from '@/lib/mongoose';

// Import all devoir models
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

// Map level identifiers to their corresponding models
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
  'thirdCollege': ThirdCollegeDevoir
};

// Map level identifiers to their display names
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
  'thirdCollege': '3ème année Collège'
};

export async function generateMetadata({ params }) {
  const level = params?.id?.[0];
  if (!level || !levelToName[level]) {
    return {
      title: 'Devoirs | BHMath',
      description: 'Devoirs de mathématiques'
    };
  }

  return {
    title: `Devoirs - ${levelToName[level]} | BHMath`,
    description: `Devoirs de mathématiques pour ${levelToName[level]}`
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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Niveau non trouvé</h1>
          <p className="text-gray-500">Le niveau demandé n'existe pas.</p>
        </div>
      </div>
    );
  }

  const devoirs = await getDevoirs(level, semester);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Devoirs - {levelToName[level]}</h1>
      
      <div className="flex gap-4 mb-8">
        <a
          href={`/devoir/${level}`}
          className={`px-4 py-2 rounded-lg ${
            !semester ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Tous
        </a>
        <a
          href={`/devoir/${level}?semester=1`}
          className={`px-4 py-2 rounded-lg ${
            semester === 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          1er Semestre
        </a>
        <a
          href={`/devoir/${level}?semester=2`}
          className={`px-4 py-2 rounded-lg ${
            semester === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          2ème Semestre
        </a>
      </div>
      
      {devoirs && devoirs.length > 0 ? (
        <div className="grid gap-6">
          {devoirs.map((devoir) => (
            <div key={devoir._id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{devoir.title}</h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: devoir.content }} />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                <span className="mr-4">Semestre {devoir.semester}</span>
                <span>Publié le {new Date(devoir.createdAt).toLocaleDateString()}</span>
                </div>
                {devoir.pdfUrl && (
                  <a
                    href={devoir.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
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
                    Télécharger le PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun devoir disponible pour le moment.</p>
        </div>
      )}
    </div>
  );
} 