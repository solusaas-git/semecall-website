'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NeonBackground from './NeonBackground';
import { useTheme } from '@/contexts/ThemeContext';

export default function Mission() {
  const t = useTranslations('mission');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { theme } = useTheme();

  const values = [
    { key: 'value1', icon: '🎯' },
    { key: 'value2', icon: '📈' },
    { key: 'value3', icon: '⚡' }
  ];

  return (
    <section id="mission" className={`py-12 md:py-20 relative overflow-hidden ${
      theme === 'light' ? 'bg-transparent' : 'bg-black'
    }`}>
      {/* Background Pattern */}
      {theme === 'dark' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(30deg, #444 12%, transparent 12.5%, transparent 87%, #444 87.5%, #444), linear-gradient(150deg, #444 12%, transparent 12.5%, transparent 87%, #444 87.5%, #444)',
            backgroundSize: '80px 140px'
          }} />
        </div>
      )}
      <div className="hidden md:block">
        <NeonBackground variant="lines" lightMode={theme === 'light'} />
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16"
        >
          <p className={`text-base sm:text-lg md:text-xl leading-relaxed text-center ${
            theme === 'light' ? '!text-gray-700' : '!text-white/80'
          }`}>
            {t('content')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
              className={`backdrop-blur-sm rounded-2xl p-6 sm:p-8 border transition-all hover:scale-105 ${
                theme === 'light' 
                  ? 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-lg' 
                  : 'bg-secondary-light/30 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{value.icon}</div>
              <h3 className={`text-lg sm:text-xl font-semibold ${
                theme === 'light' ? '!text-gray-900' : '!text-white'
              }`}>
                {t(value.key)}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

