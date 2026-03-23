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
    case "firstCollege": return await FirstCollegeCourse.find().sort({ createdAt: -1 });
    case "secondCollege": return await SecondCollegeCourse.find().sort({ createdAt: -1 });
    case "thirdCollege": return await ThirdCollegeCourse.find().sort({ createdAt: -1 });
    case "TroncCommunSc": return await CommonCoreScienceCourse.find().sort({ createdAt: -1 });
    case "TroncCommunTech": return await CommonCoreTechnicalCourse.find().sort({ createdAt: -1 });
    case "TroncCommun": return await CommonCoreScienceCourse.find().sort({ createdAt: -1 });
    case "TroncCommunLettre": return await CommonCoreLettersCourse.find().sort({ createdAt: -1 });
    case "firstBacMath": return await FirstBacMathCourse.find().sort({ createdAt: -1 });
    case "firstBacScience": return await FirstBacScienceCourse.find().sort({ createdAt: -1 });
    case "firstBacEconomics": return await FirstBacEconomicsCourse.find().sort({ createdAt: -1 });
    case "firstBacLetters": return await FirstBacLettersCourse.find().sort({ createdAt: -1 });
    case "2BacMathA": return await SecondBacMathACourse.find().sort({ createdAt: -1 });
    case "2BacMathB": return await SecondBacMathBCourse.find().sort({ createdAt: -1 });
    case "2BacLetters": return await SecondBacLettersCourse.find().sort({ createdAt: -1 });
    case "2BacPCSVT": return await SecondBacPhysicsChemistryLifeSciencesCourse.find().sort({ createdAt: -1 });
    case "2BacTCT": return await SecondBacTechnicalCommonCourse.find().sort({ createdAt: -1 });
    case "2BacEco": return await SecondBacEconomicsCourse.find().sort({ createdAt: -1 });
    default: return [];
  }
}

export async function generateMetadata({ params }) {
  const level = params.id?.[0];
  return {
    title: `Exercices - ${levelTitles[level] || "Mathématiques"} | BHMaths`,
    description: `Exercices et problèmes de mathématiques pour ${levelTitles[level] || "tous les niveaux"}`,
  };
}

export default async function ExercisePage({ params }) {
  const level = params.id?.[0] || "";
  const exerciseName = params.id?.[1];
  const viewMode = params.id?.[2];
  const exercises = await getExercises(level);
  const filteredExercise = exerciseName ? exercises.filter((item) => item.id === exerciseName) : [];
  const levelTitle = levelTitles[level] || "Exercices";

  // Content view — HTML content display
  if (viewMode === "content" && filteredExercise.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href={`/exercice/${level}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 font-medium mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux exercices
          </Link>
          <article className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-6 pb-5 border-b border-slate-100">
              {filteredExercise[0].name}
            </h1>
            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: filteredExercise[0].exerciseLink }}
            />
          </article>
        </div>
      </main>
    );
  }

  // Video detail view — show iframes
  if (filteredExercise.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href={`/exercice/${level}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 font-medium mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux exercices
          </Link>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100">
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-1">{levelTitle}</p>
              <h1 className="text-2xl font-extrabold text-slate-900">{filteredExercise[0].name}</h1>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              {filteredExercise[0].exerciseLink.split(",,").map((item, index) => (
                <div key={index} className="aspect-video w-full rounded-2xl overflow-hidden shadow-sm bg-slate-100">
                  <iframe
                    src={item.trim()}
                    className="w-full h-full"
                    allow="autoplay"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // List view — all exercises for a level
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Exercices</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">{levelTitle}</h1>
          <p className="text-slate-300 text-lg">Sélectionnez un exercice pour accéder à son contenu</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {exercises.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="h-7 w-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <p className="text-slate-500">Aucun exercice disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {exercises.map((exercise) => (
              <div
                key={exercise._id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5"
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-slate-800 text-sm leading-snug pt-1">{exercise.name}</h2>
                </div>
                <Link
                  href={`/exercice/${level}/${exercise.id}/content`}
                  className="flex items-center justify-between w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 group"
                >
                  <span>Voir les exercices</span>
                  <svg className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Ads */}
        <div className="mt-12 flex justify-center gap-4">
          <div className="hidden lg:block">
            <Image src="/ads600.jpg" width={160} height={600} alt="Publicité" className="rounded-2xl" />
          </div>
          <div className="hidden lg:block">
            <Image src="/ads600.jpg" width={160} height={600} alt="Publicité" className="rounded-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
