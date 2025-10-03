'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NeonBackground from './NeonBackground';
import { useTheme } from '@/contexts/ThemeContext';

export default function Results() {
  const t = useTranslations('results');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { theme } = useTheme();

  const benefits = [
    { key: 'conversion', icon: '📈', color: 'from-green-500 to-emerald-600' },
    { key: 'time', icon: '⏱️', color: 'from-blue-500 to-cyan-600' },
    { key: 'coverage', icon: '🌍', color: 'from-purple-500 to-violet-600' },
    { key: 'brand', icon: '⭐', color: 'from-yellow-500 to-orange-600' }
  ];

  return (
    <section id="results" className={`py-12 md:py-20 relative overflow-hidden ${
      theme === 'light' ? 'bg-transparent' : 'bg-black'
    }`}>
      {theme === 'dark' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #555 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
      )}
      <div className="hidden md:block">
        <NeonBackground variant="circles" lightMode={theme === 'light'} />
      </div>

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
          <div className="flex items-center justify-center gap-3">
            <div className={`h-px w-12 sm:w-16 ${theme === 'light' ? 'bg-gradient-to-r from-transparent to-gray-400' : 'bg-gradient-to-r from-transparent to-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
            <div className={`h-px w-12 sm:w-16 ${theme === 'light' ? 'bg-gradient-to-l from-transparent to-gray-400' : 'bg-gradient-to-l from-transparent to-gray-600'}`}></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.key}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className={`group relative backdrop-blur-sm rounded-2xl p-6 sm:p-8 border transition-all hover:scale-105 ${
                theme === 'light'
                  ? 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  : 'bg-secondary-light/30 border-white/10 hover:border-white/50'
              }`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative z-10">
                {/* Icon + Title on first line */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0">{benefit.icon}</div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    theme === 'light' ? '!text-gray-900' : '!text-white'
                  }`}>
                    {t(`benefits.${benefit.key}.title`)}
                  </h3>
                </div>
                
                {/* Description on second line */}
                <p className={`leading-relaxed text-sm sm:text-base md:text-lg ${
                  theme === 'light' ? '!text-gray-600' : '!text-white/70'
                }`}>
                  {t(`benefits.${benefit.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <button className={`px-6 sm:px-8 py-2.5 sm:py-3 border-2 font-semibold text-sm sm:text-base rounded-full transition-all hover:scale-105 ${
            theme === 'light'
              ? 'bg-transparent border-gray-900 !text-gray-900 hover:bg-gray-900 hover:!text-white'
              : 'bg-transparent border-white !text-white hover:bg-white hover:!text-primary'
          }`}>
            {t('cta')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

