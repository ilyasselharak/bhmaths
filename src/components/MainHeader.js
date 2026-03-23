'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';

const NAV_ITEMS = [
  {
    name: 'Tronc Commun',
    href: '/secondary/class1',
    sections: [
      { name: 'Sciences', href: '/secondary/class1/sciences', course: '/course/TroncCommunSc', exercice: '/exercice/TroncCommunSc', devoir: '/devoir/TroncCommunSc' },
      { name: 'Lettres', href: '/secondary/class1/lettres', course: '/course/TroncCommunLettres', exercice: '/exercice/TroncCommunLettres', devoir: '/devoir/TroncCommunLettres' },
      { name: 'Technique', href: '/secondary/class1/technique', course: '/course/TroncCommunTech', exercice: '/exercice/TroncCommunTech', devoir: '/devoir/TroncCommunTech' },
    ],
  },
  {
    name: '1ère Bac',
    href: '/secondary/class2',
    sections: [
      { name: 'Sciences Maths', href: '/secondary/class2/sciences-math', course: '/course/firstBacMath', exercice: '/exercice/firstBacMath', devoir: '/devoir/firstBacMath' },
      { name: 'Sciences PC-SVT', href: '/secondary/class2/pc-svt', course: '/course/firstBacScience', exercice: '/exercice/firstBacScience', devoir: '/devoir/firstBacSc' },
      { name: 'Lettres', href: '/secondary/class2/lettres', course: '/course/firstBacLetters', exercice: '/exercice/firstBacLetters', devoir: '/devoir/firstBacLettres' },
      { name: 'Économie', href: '/secondary/class2/economie', course: '/course/firstBacEconomics', exercice: '/exercice/firstBacEconomics', devoir: '/devoir/firstBacEconomics' },
    ],
  },
  {
    name: '2ème Bac',
    href: '/secondary/class3',
    sections: [
      { name: 'Mathématiques A', href: '/secondary/class3/math-a', course: '/course/2BacMathA', exercice: '/exercice/2BacMathA', devoir: '/devoir/2BacMathA' },
      { name: 'Mathématiques B', href: '/secondary/class3/math-b', course: '/course/2BacMathB', exercice: '/exercice/2BacMathB', devoir: '/devoir/2BacMath' },
      { name: 'PC-SVT', href: '/secondary/class3/pc-svt', course: '/course/2BacPCSVT', exercice: '/exercice/2BacPCSVT', devoir: '/devoir/2BacPCSVT' },
      { name: 'Technologies', href: '/secondary/class3/technologies', course: '/course/2BacTCT', exercice: '/exercice/2BacTCT', devoir: '/devoir/2BacTech' },
      { name: 'Économie', href: '/secondary/class3/ECO', course: '/course/2BacEco', exercice: '/exercice/2BacEco', devoir: '/devoir/2BacEco' },
    ],
  },
];

export default function MainHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Scroll detection for glass effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      try {
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery.trim())}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
          setShowSuggestions((data.suggestions || []).length > 0);
          setSelectedIndex(-1);
        }
      } catch {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (suggestionsRef.current?.contains(e.target) || searchInputRef.current?.contains(e.target)) return;
      setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    setIsMobileMenuOpen(false);
    router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || !suggestions.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(p => Math.min(p + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(p => Math.max(p - 1, -1)); }
    else if (e.key === 'Enter') { e.preventDefault(); selectedIndex >= 0 ? handleSuggestionClick(suggestions[selectedIndex]) : handleSearch(e); }
    else if (e.key === 'Escape') { setShowSuggestions(false); setSelectedIndex(-1); }
  };

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Main sticky header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'glass shadow-md shadow-slate-900/5' : 'bg-white border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src="/bhmaths.png" alt="BHMaths" width={120} height={60} className="h-10 w-auto" priority />
            </Link>

            {/* Desktop nav (md+) */}
            <nav className="hidden md:flex items-center gap-1 ml-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="dropdown-trigger relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    {item.name}
                    <svg className="h-3.5 w-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown */}
                  <div className="dropdown-menu absolute top-full left-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    {item.sections.map((sec) => (
                      <Link
                        key={sec.href}
                        href={sec.href}
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors group"
                      >
                        <span className="font-medium">{sec.name}</span>
                        <svg className="h-3.5 w-3.5 text-slate-300 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link
                href="/livres"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/livres') ? 'text-orange-600 bg-orange-50' : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'}`}
              >
                Les Livres
              </Link>
            </nav>

            {/* Search bar */}
            <div className="hidden md:flex flex-1 max-w-md ml-auto relative">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => suggestions.length && setShowSuggestions(true)}
                    placeholder="Rechercher cours, exercices..."
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-slate-400"
                  />
                </div>
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <div ref={suggestionsRef} className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
                  {suggestions.map((s, i) => (
                    <button
                      key={`${s.id}-${i}`}
                      type="button"
                      onClick={() => handleSuggestionClick(s)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between gap-3 ${i === selectedIndex ? 'bg-orange-50' : 'hover:bg-slate-50'} ${i < suggestions.length - 1 ? 'border-b border-slate-50' : ''}`}
                    >
                      <div>
                        <p className="font-medium text-slate-800">{s.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{s.levelName}</p>
                      </div>
                      <svg className="h-4 w-4 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <Link href="/contact" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                Contact
              </Link>
              {user ? (
                <div className="flex items-center gap-2">
                  <Link href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <img src={user.avatar} alt={user.fullName || user.username} className="h-7 w-7 rounded-full ring-2 ring-orange-100" />
                    <span className="text-sm font-medium text-slate-700">{user.fullName || user.username}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                    Connexion
                  </Link>
                  <Link href="/register" className="btn-primary text-sm px-4 py-2">
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile: search icon + hamburger */}
            <div className="flex md:hidden items-center gap-1 ml-auto">
              <button onClick={() => router.push('/search')} className="p-2 text-slate-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" aria-label="Rechercher">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                data-mobile-menu-button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <Image src="/bhmaths.png" alt="BHMaths" width={100} height={50} className="h-8 w-auto" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-slate-100">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </form>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto py-3 px-3">
          {NAV_ITEMS.map((item) => (
            <div key={item.name} className="mb-1">
              <button
                onClick={() => setOpenMobileSection(openMobileSection === item.name ? null : item.name)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                <span>{item.name}</span>
                <svg className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${openMobileSection === item.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openMobileSection === item.name && (
                <div className="ml-3 mb-2 pl-3 border-l-2 border-orange-100 space-y-0.5">
                  {item.sections.map((sec) => (
                    <Link
                      key={sec.href}
                      href={sec.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2 text-sm text-slate-600 hover:text-orange-600 transition-colors group"
                    >
                      <span className="font-medium">{sec.name}</span>
                      <svg className="h-3.5 w-3.5 text-slate-300 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/livres" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
            📚 Les Livres
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* Auth section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <img src={user.avatar} alt={user.fullName || user.username} className="h-9 w-9 rounded-full ring-2 ring-orange-100" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{user.fullName || user.username}</p>
                  <p className="text-xs text-slate-400">Élève</p>
                </div>
              </div>
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-white rounded-xl border border-slate-200 hover:border-orange-300 transition-colors">
                Mon profil
              </Link>
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-white rounded-xl border border-slate-200 hover:border-orange-300 transition-colors">
                Connexion
              </Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center px-4 py-2.5 text-sm font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors">
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
