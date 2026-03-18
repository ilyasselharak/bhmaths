import { NextResponse } from 'next/server';
import { initMongoose } from '@/lib/mongoose';
import Book from '@/models/Book';

// GET - Fetch all books
export async function GET(request) {
  try {
    await initMongoose();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Book.countDocuments({ isActive: true });
    
    // Fetch books with pagination, sorted by newest first
    const books = await Book.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        books,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

// POST - Create a new book
export async function POST(request) {
  try {
    await initMongoose();
    
    const body = await request.json();
    const { title, content, image, description, author, pdfUrl } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const book = new Book({
      title,
      content,
      image: image || null,
      description: description || null,
      author: author || null,
      pdfUrl: pdfUrl || null
    });

    await book.save();

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
}

