import { NextResponse } from 'next/server';
import { initMongoose } from '@/lib/mongoose';
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

async function getCourses(level) {
  await initMongoose();

  switch (level) {
    case "firstCollege":
      return await FirstCollegeCourse.find().sort({ createdAt: 1 });
    case "secondCollege":
      return await SecondCollegeCourse.find().sort({ createdAt: 1 });
    case "thirdCollege":
      return await ThirdCollegeCourse.find().sort({ createdAt: 1 });
    case "TroncCommunSc":
      return await CommonCoreScienceCourse.find().sort({ createdAt: 1 });
    case "TroncCommunTech":
      return await CommonCoreTechnicalCourse.find().sort({ createdAt: 1 });
    case "TroncCommun":
      return await CommonCoreScienceCourse.find().sort({ createdAt: 1 });
    case "TroncCommunLettre":
      return await CommonCoreLettersCourse.find().sort({ createdAt: 1 });
    case "firstBacMath":
      return await FirstBacMathCourse.find().sort({ createdAt: 1 });
    case "firstBacScience":
      return await FirstBacScienceCourse.find().sort({ createdAt: 1 });
    case "firstBacEconomics":
      return await FirstBacEconomicsCourse.find().sort({ createdAt: 1 });
    case "firstBacLetters":
      return await FirstBacLettersCourse.find().sort({ createdAt: 1 });
    case "2BacMathA":
      return await SecondBacMathACourse.find().sort({ createdAt: 1 });
    case "2BacMathB":
      return await SecondBacMathBCourse.find().sort({ createdAt: 1 });
    case "2BacLetters":
      return await SecondBacLettersCourse.find().sort({ createdAt: 1 });
    case "2BacPCSVT":
      return await SecondBacPhysicsChemistryLifeSciencesCourse.find().sort({ createdAt: 1 });
    case "2BacTCT":
      return await SecondBacTechnicalCommonCourse.find().sort({ createdAt: 1 });
    case "2BacEco":
      return await SecondBacEconomicsCourse.find().sort({ createdAt: 1 });
    default:
      return [];
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');

    if (!level) {
      return NextResponse.json(
        { error: 'Level parameter is required' },
        { status: 400 }
      );
    }

    const courses = await getCourses(level);
    return NextResponse.json(courses, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
} 