'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function BookDetailPage() {
  const params = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.id) fetchBook();
  }, [params.id]);

  const fetchBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/books/${params.id}`);
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'Livre non trouvé' : 'Failed to fetch book');
      }
      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement du livre.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="h-7 w-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">{error || 'Livre non trouvé'}</h2>
          <Link href="/livres" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">
            Retour aux livres
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back nav */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/livres" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500 font-medium transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux livres
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <article className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {book.image && (
            <div className="relative w-full h-64 bg-slate-100">
              <Image src={book.image} alt={book.title} fill className="object-cover" />
            </div>
          )}

          <div className="p-8 md:p-10">
            <header className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">{book.title}</h1>
              {book.author && (
                <p className="text-slate-600 mb-1">Par <span className="font-semibold text-slate-800">{book.author}</span></p>
              )}
              {book.description && (
                <p className="text-slate-500 italic text-sm mt-2">{book.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-5">
                <p className="text-xs text-slate-400">
                  Publié le {new Date(book.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                {book.pdfUrl && (
                  <a
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm shadow-orange-200 active:scale-95"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Télécharger le PDF
                  </a>
                )}
              </div>
            </header>

            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: book.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
