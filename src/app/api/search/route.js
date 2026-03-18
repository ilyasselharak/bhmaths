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

// Mapping of models to their level names
const courseModels = [
  { model: FirstCollegeCourse, level: 'firstCollege', levelName: '1ère année collège' },
  { model: SecondCollegeCourse, level: 'secondCollege', levelName: '2ème année collège' },
  { model: ThirdCollegeCourse, level: 'thirdCollege', levelName: '3ème année collège' },
  { model: CommonCoreScienceCourse, level: 'TroncCommunSc', levelName: 'Tronc Commun Sciences' },
  { model: CommonCoreTechnicalCourse, level: 'TroncCommunTech', levelName: 'Tronc Commun Technique' },
  { model: CommonCoreLettersCourse, level: 'TroncCommunLettres', levelName: 'Tronc Commun Lettres' },
  { model: FirstBacMathCourse, level: 'firstBacMath', levelName: '1ère Bac Mathématiques' },
  { model: FirstBacScienceCourse, level: 'firstBacScience', levelName: '1ère Bac Sciences' },
  { model: FirstBacEconomicsCourse, level: 'firstBacEconomics', levelName: '1ère Bac Économie' },
  { model: FirstBacLettersCourse, level: 'firstBacLetters', levelName: '1ère Bac Lettres' },
  { model: SecondBacMathACourse, level: '2BacMathA', levelName: '2ème Bac Mathématiques A' },
  { model: SecondBacMathBCourse, level: '2BacMathB', levelName: '2ème Bac Mathématiques B' },
  { model: SecondBacLettersCourse, level: '2BacLetters', levelName: '2ème Bac Lettres' },
  { model: SecondBacPhysicsChemistryLifeSciencesCourse, level: '2BacPCSVT', levelName: '2ème Bac PC-SVT' },
  { model: SecondBacTechnicalCommonCourse, level: '2BacTCT', levelName: '2ème Bac Technique' },
  { model: SecondBacEconomicsCourse, level: '2BacEco', levelName: '2ème Bac Économie' }
];

export async function GET(request) {
  try {
    await initMongoose();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all'; // 'course', 'exercice', or 'all'

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const searchRegex = new RegExp(query, 'i'); // Case-insensitive search
    const results = [];

    // Search across all course models
    for (const { model, level, levelName } of courseModels) {
      try {
        // Search in course name
        const courseResults = await model.find({
          name: { $regex: searchRegex }
        }).limit(20);

        courseResults.forEach(course => {
          if (type === 'all' || type === 'course') {
            results.push({
              id: course._id.toString(),
              name: course.name,
              type: 'course',
              level: level,
              levelName: levelName,
              courseLink: course.courseLink,
              exerciseLink: course.exerciseLink,
              createdAt: course.createdAt
            });
          }
          
          if (type === 'all' || type === 'exercice') {
            results.push({
              id: course._id.toString(),
              name: course.name,
              type: 'exercice',
              level: level,
              levelName: levelName,
              courseLink: course.courseLink,
              exerciseLink: course.exerciseLink,
              createdAt: course.createdAt
            });
          }
        });
      } catch (error) {
        console.error(`Error searching in ${level}:`, error);
        // Continue with other models even if one fails
      }
    }

    // Remove duplicates when type is 'all' (same course can appear as both course and exercice)
    let uniqueResults = results;
    if (type === 'all') {
      // Create a map to track unique courses by id and level
      const seen = new Map();
      uniqueResults = results.filter(result => {
        const key = `${result.id}-${result.level}`;
        if (seen.has(key)) {
          // If we've seen this course, check if we should keep both types
          const existing = seen.get(key);
          if (existing.type === result.type) {
            return false; // Duplicate type
          }
          // Keep both course and exercice entries
          return true;
        }
        seen.set(key, result);
        return true;
      });
    }

    // Sort by relevance (could be improved with scoring)
    uniqueResults.sort((a, b) => {
      // Prioritize exact matches
      const aExact = a.name.toLowerCase() === query.toLowerCase();
      const bExact = b.name.toLowerCase() === query.toLowerCase();
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Then by starts with
      const aStarts = a.name.toLowerCase().startsWith(query.toLowerCase());
      const bStarts = b.name.toLowerCase().startsWith(query.toLowerCase());
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      // Finally by date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return NextResponse.json(
      { query, results: uniqueResults, count: uniqueResults.length },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('Search Error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}

