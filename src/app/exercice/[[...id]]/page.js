export const revalidate = 3600;

import { initMongoose } from "@/lib/mongoose";
import Link from "next/link";
import Image from "next/image";
import FirstCollegeCourse from "@/models/FirstCollegeCourse";
import SecondCollegeCourse from "@/models/SecondCollegeCourse";
import ThirdCollegeCourse from "@/models/ThirdCollegeCourse";
import CommonCoreScienceCourse from "@/models/CommonCoreScienceCourse";
import CommonCoreTechnicalCourse from "@/models/CommonCoreTechnicalCourse";
import CommonCoreLettersCourse from "@/models/CommonCoreLettersCourse";
import FirstBacMathCourse from "@/models/FirstBacMathCourse";
import FirstBacScienceCourse from "@/models/FirstBacScienceCourse";
import FirstBacEconomicsCourse from "@/models/FirstBacEconomicsCourse";
import FirstBacLettersCourse from "@/models/FirstBacLettersCourse";
import SecondBacMathACourse from "@/models/SecondBacMathACourse";
import SecondBacMathBCourse from "@/models/SecondBacMathBCourse";
import SecondBacLettersCourse from "@/models/SecondBacLettersCourse";
import SecondBacPhysicsChemistryLifeSciencesCourse from "@/models/SecondBacPhysicsChemistryLifeSciencesCourse";
import SecondBacTechnicalCommonCourse from "@/models/SecondBacTechnicalCommonCourse";
import SecondBacEconomicsCourse from "@/models/SecondBacEconomicsCourse";

const levelTitles = {
  firstCollege: "1ère année collège",
  secondCollege: "2ème année collège",
  thirdCollege: "3ème année collège",
  TroncCommunSc: "Tronc commun - Sciences",
  TroncCommunTech: "Tronc commun - Technique",
  TroncCommun: "Tronc commun",
  TroncCommunLettre: "Tronc commun - Lettres",
  firstBacMath: "1ère Bac - Mathématiques",
  firstBacScience: "1ère Bac - Sciences",
  firstBacEconomics: "1ère Bac - Sciences Économiques",
  firstBacLetters: "1ère Bac - Lettres",
  "2BacMathA": "2ème Bac - Mathématiques A",
  "2BacMathB": "2ème Bac - Mathématiques B",
  "2BacLetters": "2ème Bac - Lettres",
  "2BacPCSVT": "2ème Bac - Sciences Physiques",
  "2BacTCT": "2ème Bac - Technique",
  "2BacEco": "2ème Bac - Sciences Économiques",
};

async function getExercises(level) {
  await initMongoose();

  switch (level) {
    case "firstCollege":
      return await FirstCollegeCourse.find().sort({ createdAt: -1 });
    case "secondCollege":
      return await SecondCollegeCourse.find().sort({ createdAt: -1 });
    case "thirdCollege":
      return await ThirdCollegeCourse.find().sort({ createdAt: -1 });
    case "TroncCommunSc":
      return await CommonCoreScienceCourse.find().sort({ createdAt: -1 });
    case "TroncCommunTech":
      return await CommonCoreTechnicalCourse.find().sort({ createdAt: -1 });
    case "TroncCommun":
      return await CommonCoreScienceCourse.find().sort({ createdAt: -1 });
    case "TroncCommunLettre":
      return await CommonCoreLettersCourse.find().sort({ createdAt: -1 });
    case "firstBacMath":
      return await FirstBacMathCourse.find().sort({ createdAt: -1 });
    case "firstBacScience":
      return await FirstBacScienceCourse.find().sort({ createdAt: -1 });
    case "firstBacEconomics":
      return await FirstBacEconomicsCourse.find().sort({ createdAt: -1 });
    case "firstBacLetters":
      return await FirstBacLettersCourse.find().sort({ createdAt: -1 });
    case "2BacMathA":
      return await SecondBacMathACourse.find().sort({ createdAt: -1 });
    case "2BacMathB":
      return await SecondBacMathBCourse.find().sort({ createdAt: -1 });
    case "2BacLetters":
      return await SecondBacLettersCourse.find().sort({ createdAt: -1 });
    case "2BacPCSVT":
      return await SecondBacPhysicsChemistryLifeSciencesCourse.find().sort({ createdAt: -1 });
    case "2BacTCT":
      return await SecondBacTechnicalCommonCourse.find().sort({ createdAt: -1 });
    case "2BacEco":
      return await SecondBacEconomicsCourse.find().sort({ createdAt: -1 });
    default:
      return [];
  }
}

export async function generateMetadata({ params }) {
  const level = params.id?.[0];
  return {
    title: `Exercices - ${levelTitles[level] || "Mathématiques"} | BHMaths`,
    description: `Exercices et problèmes de mathématiques pour ${
      levelTitles[level] || "tous les niveaux"
    }`,
  };
}

export default async function ExercisePage({ params }) {
  const level = params.id?.[0] || "";
  const exerciseName = params.id?.[1];
  const viewMode = params.id?.[2]; // 'content' or undefined

  const exercises = await getExercises(level);
  const filteredExercise = exerciseName
    ? exercises.filter((item) => item.id === exerciseName)
    : [];

  // If we're in content view mode and have an exercise, show the content
  if (viewMode === 'content' && filteredExercise.length > 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filteredExercise[0].name}
          </h2>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: filteredExercise[0].exerciseLink }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="py-12">
        <div className="bg-gradient-to-r from-[#003566] to-[#000814] text-white rounded-2xl py-16 mb-12 mx-4">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Exercices {levelTitles[level] || ""}
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Tous les exercices de mathématiques
            </p>
          </div>
        </div>

        {filteredExercise.length > 0 ? (
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {filteredExercise[0].name}
              </h2>
              <div className="space-y-8">
                {filteredExercise[0].exerciseLink.split(",,").map((item, index) => (
                  <div key={index} className="aspect-video w-full">
                    <iframe
                      src={item.trim()}
                      className="w-full h-full rounded-lg shadow-md"
                      allow="autoplay"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-[#e3eaf4] rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Liste des exercices disponibles
              </h2>
              <p className="text-gray-600">
                Sélectionnez un exercice pour accéder à son contenu
              </p>
            </div>

            {exercises.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Aucun exercice disponible pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map((exercise) => (
                  <div
                    key={exercise._id}
                    className="bg-white rounded-xl p-6 shadow-lg border border-[#e3eaf4]"
                  >
                    <div className="space-y-4">
                      <h2 className="text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                        {exercise.name}
                      </h2>
                      <div className="flex flex-col space-y-3">
                        <Link
                          href={`/exercice/${level}/${exercise.id}/content`}
                          className="flex items-center bg-orange-500 hover:bg-orange-200 backdrop-blur-sm justify-between bg-gray-50 hover:bg-[#e3eaf4] rounded-lg p-4 transition-all duration-300"
                        >
                          <span className="text-white font-medium">
                            Exercices
                          </span>
                          <div className="text-[#003566]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 flex justify-center gap-x-4">
              <div className="hidden lg:block">
                <Image
                  src="/ads600.jpg"
                  width={160}
                  height={600}
                  alt="Publicité"
                  className="rounded-lg"
                />
              </div>
              <div className="hidden lg:block">
                <Image
                  src="/ads600.jpg"
                  width={160}
                  height={600}
                  alt="Publicité"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
} 