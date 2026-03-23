export const revalidate = 3600;

import { initMongoose } from "@/lib/mongoose";
import Link from "next/link";
import Image from "next/image";
import NationalSMACourse from "@/models/NationalSMACourse";
import NationalSMBCourse from "@/models/NationalSMBCourse";
import NationalPhysiqueCourse from "@/models/NationalPhysiqueCourse";

const levelTitles = {
  sma: "2ème Bac - Sciences Mathématiques A",
  smb: "2ème Bac - Sciences Mathématiques B",
  physique: "2ème Bac - Physique",
};

async function getNationalCourses(level) {
  await initMongoose();
  switch (level) {
    case "sma": return await NationalSMACourse.find().sort({ createdAt: 1 });
    case "smb": return await NationalSMBCourse.find().sort({ createdAt: 1 });
    case "physique": return await NationalPhysiqueCourse.find().sort({ createdAt: 1 });
    default: return [];
  }
}

export async function generateMetadata({ params }) {
  const level = params.id?.[0];
  return {
    title: `Examens Nationaux - ${levelTitles[level] || "2ème Bac"} | BHMaths`,
    description: `Examens nationaux pour ${levelTitles[level] || "2ème année Bac"}`,
  };
}

export default async function NationalPage({ params }) {
  const level = params.id?.[0] || "";
  const courseName = params.id?.[1];
  const viewMode = params.id?.[2];
  const courses = await getNationalCourses(level);
  const filteredCourse = courseName ? courses.filter((item) => item.id === courseName) : [];
  const levelTitle = levelTitles[level] || "Examens Nationaux";

  // Content view
  if (viewMode === "content" && filteredCourse.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href={`/national/${level}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 font-medium mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux examens
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

  // Video detail view
  if (filteredCourse.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href={`/national/${level}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 font-medium mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux examens
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

  // List view
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Examens Nationaux</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">{levelTitle}</h1>
          <p className="text-slate-300 text-lg">Sujets d&apos;examens nationaux pour se préparer</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="h-7 w-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500">Aucun examen national disponible pour le moment.</p>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-slate-800 text-sm leading-snug pt-1">{course.name}</h2>
                </div>
                <Link
                  href={`/national/${level}/${course.id}/content`}
                  className="flex items-center justify-between w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 group"
                >
                  <span>Voir l&apos;examen</span>
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
