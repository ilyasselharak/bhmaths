'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, updateUser, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    fullName: '',
    schoolLevel: 'collège',
    gender: 'prefer not to say',
    age: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        schoolLevel: user.schoolLevel || 'collège',
        gender: user.gender || 'prefer not to say',
        age: user.age || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update profile');
      updateUser(data.user);
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
      setIsEditing(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      schoolLevel: user?.schoolLevel || 'collège',
      gender: user?.gender || 'prefer not to say',
      age: user?.age || '',
      phoneNumber: user?.phoneNumber || ''
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const initials = (user.fullName || user.username || 'U').charAt(0).toUpperCase();

  const fieldClass = (editable) =>
    `w-full px-4 py-3 border rounded-xl text-slate-800 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
      editable
        ? 'border-slate-200 bg-white placeholder-slate-400'
        : 'border-slate-100 bg-slate-50 text-slate-600 cursor-default'
    }`;

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Hero card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 mb-6 text-white">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-orange-500/30 flex-shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">{user.fullName || user.username}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-0.5 bg-white/10 border border-white/20 text-white text-xs font-medium rounded-full">
                {user.role || 'Élève'}
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-5 flex items-center gap-3 p-4 rounded-xl text-sm border ${
            message.type === 'success'
              ? 'bg-green-50 border-green-100 text-green-700'
              : 'bg-red-50 border-red-100 text-red-600'
          }`}>
            {message.type === 'success' ? (
              <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            {message.text}
          </div>
        )}

        {/* Profile form card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-6">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Informations du profil</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-all duration-200"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 ${
                    isSaving ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sauvegarde…
                    </>
                  ) : 'Sauvegarder'}
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom complet</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Votre nom complet"
                  className={fieldClass(isEditing)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Niveau scolaire</label>
                <select
                  name="schoolLevel"
                  value={formData.schoolLevel}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={fieldClass(isEditing)}
                >
                  <option value="collège">Collège</option>
                  <option value="tronc commun">Tronc Commun</option>
                  <option value="1ère bac">1ère Bac</option>
                  <option value="2ème bac">2ème Bac</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Genre</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={fieldClass(isEditing)}
                >
                  <option value="prefer not to say">Préfère ne pas dire</option>
                  <option value="male">Masculin</option>
                  <option value="female">Féminin</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Âge</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  min="5"
                  max="100"
                  placeholder="Votre âge"
                  className={fieldClass(isEditing)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Numéro de téléphone</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="+212 6XX-XXXXXX"
                  className={fieldClass(isEditing)}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Account info card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Informations du compte</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Nom d'utilisateur</p>
              <p className="text-slate-800 font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Email</p>
              <p className="text-slate-800 font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Membre depuis</p>
              <p className="text-slate-800 font-medium">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
              </p>
            </div>
            {user.lastLogin && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Dernière connexion</p>
                <p className="text-slate-800 font-medium">
                  {new Date(user.lastLogin).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
