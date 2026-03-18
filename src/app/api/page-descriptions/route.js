import { NextResponse } from 'next/server';
import { initMongoose } from '@/lib/mongoose';
import PageDescription from '@/models/PageDescription';

// GET - Fetch page description by path
export async function GET(request) {
  try {
    await initMongoose();
    
    const { searchParams } = new URL(request.url);
    const pagePath = searchParams.get('path');

    console.log('Fetching page description for path:', pagePath);

    if (!pagePath) {
      return NextResponse.json(
        { error: 'Page path is required' },
        { status: 400 }
      );
    }

    const pageDescription = await PageDescription.findOne({ 
      pagePath,
      isActive: true 
    }).lean();

    console.log('Found page description:', pageDescription ? 'Yes' : 'No');

    if (!pageDescription) {
      return NextResponse.json(
        { 
          error: 'Page description not found',
          message: `No description found for path: ${pagePath}. Please run: npm run seed-page-descriptions or create one via POST /api/page-descriptions`
        },
        { status: 404 }
      );
    }

    return NextResponse.json(pageDescription, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch page description',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// POST - Create or update a page description
export async function POST(request) {
  try {
    await initMongoose();
    
    const body = await request.json();
    const { pagePath, title, description, shortDescription } = body;

    if (!pagePath || !title || !description) {
      return NextResponse.json(
        { error: 'Page path, title, and description are required' },
        { status: 400 }
      );
    }

    const pageDescription = await PageDescription.findOneAndUpdate(
      { pagePath },
      {
        pagePath,
        title,
        description,
        shortDescription: shortDescription || description.substring(0, 500),
        isActive: true
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(pageDescription, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create/update page description' },
      { status: 500 }
    );
  }
}

