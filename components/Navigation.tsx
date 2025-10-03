'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import ReactCountryFlag from 'react-country-flag';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const languages = [
    { code: 'fr', name: 'Français', countryCode: 'FR' },
    { code: 'en', name: 'English', countryCode: 'GB' },
    { code: 'nl', name: 'Nederlands', countryCode: 'NL' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLangDropdownOpen && !target.closest('.language-dropdown-container')) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangDropdownOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const changeLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath}`);
    setIsLangDropdownOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'w-[95%] md:w-[90%] lg:w-[85%]' : 'w-[90%] md:w-[75%] lg:w-[65%]'
      }`}
    >
      <div
        className={`backdrop-blur-md rounded-2xl border transition-all duration-300 ${
          theme === 'light'
            ? isScrolled
              ? 'bg-black/95 border-gray-800 shadow-xl'
              : 'bg-black/90 border-gray-900 shadow-lg'
            : isScrolled
            ? 'bg-white/95 border-gray-200 shadow-xl'
            : 'bg-white/90 border-gray-100 shadow-lg'
        }`}
      >
        <div className="px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-lg md:text-xl lg:text-2xl font-bold transition-colors ${
                  theme === 'light' ? '!text-white hover:!text-gray-200' : '!text-gray-800 hover:!text-gray-900'
                }`}
              >
                SEMECALL
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {['home', 'mission', 'approach', 'expertise', 'results', 'contact'].map((item) => (
                      <button
                        key={item}
                        onClick={() => scrollToSection(item)}
                        className={`transition-colors text-sm font-medium ${
                          theme === 'light' ? '!text-white hover:!text-gray-200' : '!text-gray-700 hover:!text-gray-900'
                        }`}
                      >
                        {t(item)}
                      </button>
              ))}
            </div>

            {/* Desktop: Theme Toggle, Language, CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Dark Mode Toggle Switch */}
              <button
                onClick={toggleTheme}
                className={`relative h-10 w-20 rounded-full transition-colors ${
                  theme === 'light' 
                    ? 'bg-white/20' 
                    : 'bg-gray-400'
                }`}
                aria-label="Toggle theme"
              >
                <div 
                  className={`absolute top-1 h-8 w-8 rounded-full transition-all duration-300 flex items-center justify-center text-xs ${
                    theme === 'light'
                      ? 'left-1 bg-white'
                      : 'left-11 bg-gray-800'
                  }`}
                >
                  {theme === 'light' ? '☀️' : '🌙'}
                </div>
              </button>

              {/* Language Selector */}
              <div className={`flex items-center space-x-1 rounded-lg px-2 py-1 ${
                theme === 'light' ? 'bg-white/10' : 'bg-gray-100'
              }`}>
                {['fr', 'en', 'nl'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLocale(lang)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      locale === lang
                        ? 'bg-white !text-gray-900'
                        : theme === 'light' 
                        ? '!text-white/70 hover:!text-white' 
                        : '!text-gray-600 hover:!text-gray-900'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 shadow-lg ${
                  theme === 'light' 
                    ? 'bg-white !text-gray-900 hover:bg-gray-100' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 !text-white hover:from-cyan-600 hover:to-blue-700'
                }`}
              >
                {t('cta1')}
              </button>
            </div>

            {/* Mobile: Theme Toggle, Language, Hamburger */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Theme Toggle - Compact */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'light' 
                    ? '!text-white hover:bg-white/10' 
                    : '!text-gray-800 hover:bg-gray-100'
                }`}
                aria-label="Toggle theme"
              >
                <span className="text-lg">{theme === 'light' ? '🌙' : '☀️'}</span>
              </button>

              {/* Mobile Language Selector - Globe with Dropdown */}
              <div className="relative language-dropdown-container">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'light' 
                      ? '!text-white hover:bg-white/10' 
                      : '!text-gray-800 hover:bg-gray-100'
                  }`}
                  aria-label="Select language"
                >
                  <span className="text-lg">🌐</span>
                </button>

                {/* Language Dropdown */}
                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`fixed w-48 rounded-lg shadow-xl border overflow-hidden backdrop-blur-md ${
                        theme === 'light'
                          ? 'bg-black/95 border-gray-800'
                          : 'bg-white/95 border-gray-200'
                      }`}
                      style={{ 
                        zIndex: 40,
                        top: isScrolled ? '80px' : '84px',
                        right: isScrolled ? '2.5%' : '5%'
                      }}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLocale(lang.code)}
                          className={`w-full px-6 py-3 flex items-center gap-4 transition-colors ${
                            locale === lang.code
                              ? theme === 'light'
                                ? 'bg-white/20 !text-white'
                                : 'bg-gray-100 !text-gray-900'
                              : theme === 'light'
                              ? '!text-white/80 hover:bg-white/10'
                              : '!text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div 
                            className="overflow-hidden rounded flex-shrink-0"
                            style={{
                              width: '1.5rem',
                              height: '1.125rem',
                              lineHeight: 0,
                            }}
                          >
                            <ReactCountryFlag
                              countryCode={lang.countryCode}
                              svg
                              style={{
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                objectFit: 'cover',
                              }}
                              title={lang.countryCode}
                            />
                          </div>
                          <span className="font-medium flex-grow text-left">{lang.name}</span>
                          {locale === lang.code && (
                            <span className="flex-shrink-0 text-lg">✓</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'light' 
                    ? '!text-white hover:bg-white/10' 
                    : '!text-gray-800 hover:bg-gray-100'
                }`}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`lg:hidden border-t ${
                theme === 'light' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <div className="px-4 py-4 space-y-3">
                {/* Navigation Links */}
                {['home', 'mission', 'approach', 'expertise', 'results', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors font-medium ${
                      theme === 'light' 
                        ? '!text-white hover:bg-white/10' 
                        : '!text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {t(item)}
                  </button>
                ))}

                {/* Divider */}
                <div className={`h-px ${theme === 'light' ? 'bg-white/10' : 'bg-gray-200'}`} />

                {/* Theme Toggle */}
                <div className="flex items-center justify-between px-4 py-2">
                  <span className={`text-sm font-medium ${
                    theme === 'light' ? '!text-white/80' : '!text-gray-700'
                  }`}>
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className={`relative h-8 w-16 rounded-full transition-colors ${
                      theme === 'light' 
                        ? 'bg-white/20' 
                        : 'bg-gray-300'
                    }`}
                    aria-label="Toggle theme"
                  >
                    <div 
                      className={`absolute top-1 h-6 w-6 rounded-full transition-all duration-300 flex items-center justify-center text-xs ${
                        theme === 'light'
                          ? 'left-1 bg-white'
                          : 'left-9 bg-gray-700'
                      }`}
                    >
                      {theme === 'light' ? '🌙' : '☀️'}
                    </div>
                  </button>
                </div>

                {/* Language Selector */}
                <div className="px-4 py-2">
                  <span className={`text-sm font-medium block mb-2 ${
                    theme === 'light' ? '!text-white/80' : '!text-gray-700'
                  }`}>
                    Language
                  </span>
                  <div className="flex space-x-2">
                    {['fr', 'en', 'nl'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => changeLocale(lang)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          locale === lang
                            ? 'bg-white !text-gray-900'
                            : theme === 'light' 
                            ? 'bg-white/10 !text-white/70 hover:!text-white' 
                            : 'bg-gray-100 !text-gray-600 hover:!text-gray-900'
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all shadow-lg ${
                    theme === 'light' 
                      ? 'bg-white !text-gray-900 hover:bg-gray-100' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 !text-white hover:from-cyan-600 hover:to-blue-700'
                  }`}
                >
                  {t('cta1')}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

