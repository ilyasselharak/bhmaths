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
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ suggestions: [] });
    }

    const searchRegex = new RegExp(query, 'i'); // Case-insensitive search
    const suggestions = new Map(); // Use Map to avoid duplicates

    // Search across all course models
    for (const { model, level, levelName } of courseModels) {
      try {
        // Search in course name - limit to a small number per model
        const courseResults = await model.find({
          name: { $regex: searchRegex }
        }).limit(3).select('name _id');

        courseResults.forEach(course => {
          const key = course.name.toLowerCase();
          if (!suggestions.has(key)) {
            suggestions.set(key, {
              text: course.name,
              level: level,
              levelName: levelName,
              id: course._id.toString()
            });
          }
        });

        // Stop if we have enough suggestions
        if (suggestions.size >= limit * 2) {
          break;
        }
      } catch (error) {
        console.error(`Error searching in ${level}:`, error);
        // Continue with other models even if one fails
      }
    }

    // Convert Map to Array and sort by relevance
    const suggestionsArray = Array.from(suggestions.values())
      .sort((a, b) => {
        // Prioritize exact matches
        const aExact = a.text.toLowerCase() === query.toLowerCase();
        const bExact = b.text.toLowerCase() === query.toLowerCase();
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        
        // Then by starts with
        const aStarts = a.text.toLowerCase().startsWith(query.toLowerCase());
        const bStarts = b.text.toLowerCase().startsWith(query.toLowerCase());
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        return 0;
      })
      .slice(0, limit);

    return NextResponse.json(
      { suggestions: suggestionsArray },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('Suggestions Error:', error);
    return NextResponse.json({ suggestions: [] });
  }
}

