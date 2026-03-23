'use client';

import { useEffect, useState } from 'react';

export default function PageDescriptionModal({ pagePath, isOpen, onClose }) {
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && pagePath) fetchDescription();
  }, [isOpen, pagePath]);

  const fetchDescription = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/page-descriptions?path=${encodeURIComponent(pagePath)}`);
      if (response.ok) {
        const data = await response.json();
        setDescription(data);
      } else if (response.status === 404) {
        setError('Description non disponible');
      } else {
        setError('Erreur lors du chargement');
      }
    } catch {
      setError('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-200/80 max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">
              {description?.title || 'Description'}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              aria-label="Fermer"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
            {loading && (
              <div className="flex items-center justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent" />
              </div>
            )}
            {error && (
              <div className="text-center py-10">
                <p className="text-slate-500 text-sm mb-3">{error}</p>
                <button onClick={fetchDescription} className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                  Réessayer
                </button>
              </div>
            )}
            {description && !loading && !error && (
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">
                {description.description}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end px-6 py-4 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors active:scale-95"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
