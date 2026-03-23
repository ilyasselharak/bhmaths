'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Une erreur est survenue');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (err) {
      setErrorMessage(err.message || "Une erreur est survenue. Veuillez réessayer.");
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoCards = [
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      title: 'WhatsApp',
      subtitle: 'Support rapide',
      value: '+212 629 504 107',
      href: 'https://wa.me/212629504107',
      cta: 'Écrire sur WhatsApp',
      bg: 'bg-green-50',
      iconBg: 'bg-green-500',
      border: 'border-green-100',
      textColor: 'text-green-600',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      subtitle: 'Questions générales',
      value: 'contact@bhmaths.com',
      href: 'mailto:contact@bhmaths.com',
      cta: 'Envoyer un email',
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-500',
      border: 'border-orange-100',
      textColor: 'text-orange-600',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Horaires',
      subtitle: 'Disponibilité',
      value: 'Lun–Ven 9h–18h · Sam 9h–13h',
      href: null,
      cta: null,
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-500',
      border: 'border-blue-100',
      textColor: 'text-blue-600',
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Support</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contactez-nous</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">Notre équipe est là pour vous aider. Choisissez le moyen qui vous convient le mieux.</p>
        </div>
      </section>

      {/* Info cards */}
      <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {infoCards.map((card) => (
            <div key={card.title} className={`${card.bg} border ${card.border} rounded-2xl p-6`}>
              <div className={`inline-flex items-center justify-center w-12 h-12 ${card.iconBg} text-white rounded-xl mb-4`}>
                {card.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{card.title}</h3>
              <p className="text-slate-500 text-sm mb-2">{card.subtitle}</p>
              <p className={`font-semibold text-sm ${card.textColor} mb-3`}>{card.value}</p>
              {card.href && card.cta && (
                <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${card.textColor} hover:underline`}>
                  {card.cta}
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">Envoyez-nous un message</h2>
            <p className="text-slate-500 mt-2">Nous vous répondrons dans les plus brefs délais</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/60 p-8 md:p-10">
            {submitStatus === 'success' && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-sm">
                <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Nom complet</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required disabled={isSubmitting} placeholder="Votre nom" className="input-field" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} placeholder="votre@email.com" className="input-field" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1.5">Sujet</label>
                <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required disabled={isSubmitting} placeholder="Sujet de votre message" className="input-field" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required disabled={isSubmitting} placeholder="Décrivez votre demande..." className="input-field resize-none" />
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-base transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-orange-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-200 active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
