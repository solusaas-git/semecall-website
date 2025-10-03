'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactCountryFlag from 'react-country-flag';
import { useTheme } from '@/contexts/ThemeContext';

export default function Multilingual() {
  const t = useTranslations('multilingual');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { theme } = useTheme();

  const languages = [
    { key: 'french', countryCode: 'FR', color: 'from-blue-600 to-red-600' },
    { key: 'english', countryCode: 'GB', color: 'from-blue-700 to-red-700' },
    { key: 'arabic', countryCode: 'SA', color: 'from-green-600 to-green-800' },
    { key: 'dutch', countryCode: 'NL', color: 'from-red-600 to-blue-600' },
    { key: 'spanish', countryCode: 'ES', color: 'from-red-600 to-yellow-600' },
    { key: 'german', countryCode: 'DE', color: 'from-yellow-600 to-red-600' }
  ];

  return (
    <section className={`py-12 md:py-20 relative overflow-hidden ${
      theme === 'light' ? 'bg-transparent' : 'bg-black'
    }`}>
      {theme === 'dark' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(ellipse at center, #555 0%, transparent 75%)',
            backgroundSize: '80px 80px'
          }} />
        </div>
      )}

      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-block mb-3 sm:mb-4">
            <span className={`text-xs sm:text-sm font-semibold tracking-wider uppercase ${
              theme === 'light' ? '!text-blue-600' : '!text-blue-400'
            }`}>
              {t('subtitle')}
            </span>
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r ${
            theme === 'light' 
              ? 'from-gray-900 via-gray-800 to-gray-900' 
              : 'from-white via-gray-100 to-white'
          }`}>
            {t('title')}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className={`h-px w-12 sm:w-16 ${theme === 'light' ? 'bg-gradient-to-r from-transparent to-gray-400' : 'bg-gradient-to-r from-transparent to-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
            <div className={`h-px w-12 sm:w-16 ${theme === 'light' ? 'bg-gradient-to-l from-transparent to-gray-400' : 'bg-gradient-to-l from-transparent to-gray-600'}`}></div>
          </div>
          <p className={`text-sm sm:text-base md:text-lg max-w-3xl mx-auto ${
            theme === 'light' ? '!text-gray-600' : '!text-white/70'
          }`}>
            {t('content')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {languages.map((language, index) => (
            <motion.div
              key={language.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative backdrop-blur-sm rounded-2xl p-4 sm:p-6 border transition-all hover:scale-105 ${
                theme === 'light'
                  ? 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  : 'bg-secondary-light/30 border-white/10 hover:border-white/50'
              }`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${language.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10 text-center">
                <div className="mb-2 sm:mb-3 flex items-center justify-center">
                  <div 
                    style={{
                      width: '4rem',
                      height: '3rem',
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                    }}
                    className="sm:w-20 sm:h-16"
                  >
                    <ReactCountryFlag
                      countryCode={language.countryCode}
                      svg
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        objectFit: 'cover',
                        transform: 'scale(1.01)',
                      }}
                      title={language.countryCode}
                    />
                  </div>
                </div>
                <h3 className={`text-sm sm:text-base md:text-lg font-semibold ${
                  theme === 'light' ? '!text-gray-900' : '!text-white'
                }`}>
                  {t(`languages.${language.key}`)}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

