import { NextResponse } from 'next/server';
import { initMongoose } from '@/lib/mongoose';
import Contact from '@/models/Contact';

export async function POST(request) {
  try {
    // Initialize MongoDB connection
    await initMongoose();

    // Parse request body
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedSubject = subject.trim();
    const sanitizedMessage = message.trim();

    // Validate message length
    if (sanitizedMessage.length < 10) {
      return NextResponse.json(
        { error: 'Le message doit contenir au moins 10 caractères' },
        { status: 400 }
      );
    }

    // Create new contact submission
    const contact = new Contact({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      status: 'new'
    });

    // Save to database
    await contact.save();

    // Return success response
    return NextResponse.json(
      {
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
        success: true
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: validationErrors[0] },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
}



