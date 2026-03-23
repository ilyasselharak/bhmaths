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

export const revalidate = 3600;

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

async function getCourses(level) {
  await initMongoose();
  switch (level) {
    case "firstCollege": return await FirstCollegeCourse.find().sort({ createdAt: 1 });
    case "secondCollege": return await SecondCollegeCourse.find().sort({ createdAt: 1 });
    case "thirdCollege": return await ThirdCollegeCourse.find().sort({ createdAt: 1 });
    case "TroncCommunSc": return await CommonCoreScienceCourse.find().sort({ createdAt: 1 });
    case "TroncCommunTech": return await CommonCoreTechnicalCourse.find().sort({ createdAt: 1 });
    case "TroncCommun": return await CommonCoreScienceCourse.find().sort({ createdAt: 1 });
    case "TroncCommunLettres": return await CommonCoreLettersCourse.find().sort({ createdAt: 1 });
    case "firstBacMath": return await FirstBacMathCourse.find().sort({ createdAt: 1 });
    case "firstBacScience": return await FirstBacScienceCourse.find().sort({ createdAt: 1 });
    case "firstBacEconomics": return await FirstBacEconomicsCourse.find().sort({ createdAt: 1 });
    case "firstBacLetters": return await FirstBacLettersCourse.find().sort({ createdAt: 1 });
    case "2BacMathA": return await SecondBacMathACourse.find().sort({ createdAt: 1 });
    case "2BacMathB": return await SecondBacMathBCourse.find().sort({ createdAt: 1 });
    case "2BacLetters": return await SecondBacLettersCourse.find().sort({ createdAt: 1 });
    case "2BacPCSVT": return await SecondBacPhysicsChemistryLifeSciencesCourse.find().sort({ createdAt: 1 });
    case "2BacTCT": return await SecondBacTechnicalCommonCourse.find().sort({ createdAt: 1 });
    case "2BacEco": return await SecondBacEconomicsCourse.find().sort({ createdAt: 1 });
    default: return [];
  }
}

export async function generateMetadata({ params }) {
  const level = params.id?.[0];
  return {
    title: `${levelTitles[level] || "Cours"} | BHMaths`,
    description: `Cours de mathématiques pour ${levelTitles[level] || "tous les niveaux"}`,
  };
}

export default async function CoursePage({ params }) {
  const level = params.id?.[0] || "";
  const courseName = params.id?.[1];
  const viewMode = params.id?.[2];
  const courses = await getCourses(level);
  const filteredCourse = courseName ? courses.filter((item) => item.id === courseName) : [];
  const levelTitle = levelTitles[level] || "Cours";

  // Content view — HTML content display
  if (viewMode === "content" && filteredCourse.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href={`/course/${level}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 font-medium mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux cours
          </Link>
          <article className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-6 pb-5 border-b border-slate-100">
              {filteredCourse[0].name}
            </h1>
            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: filteredCourse[0].courseLink }}
            />
          </article>
        </div>
      </main>
    );
  }

  // Video detail view — show iframes
  if (filteredCourse.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href={`/course/${level}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 font-medium mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux cours
          </Link>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100">
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-1">{levelTitle}</p>
              <h1 className="text-2xl font-extrabold text-slate-900">{filteredCourse[0].name}</h1>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              {filteredCourse[0].courseLink.split(",,").map((item, index) => (
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

  // List view — all courses for a level
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Cours</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">{levelTitle}</h1>
          <p className="text-slate-300 text-lg">Sélectionnez un cours pour accéder à son contenu</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="h-7 w-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-slate-500">Aucun cours disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5"
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-slate-800 text-sm leading-snug pt-1">{course.name}</h2>
                </div>
                <Link
                  href={`/course/${level}/${course.id}/content`}
                  className="flex items-center justify-between w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 group"
                >
                  <span>Voir le cours</span>
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
