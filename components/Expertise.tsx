'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NeonBackground from './NeonBackground';
import { useTheme } from '@/contexts/ThemeContext';

export default function Expertise() {
  const t = useTranslations('expertise');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { theme } = useTheme();

  const services = [
    { key: 'prospecting', icon: '🎯', gradient: 'from-blue-600 to-blue-800' },
    { key: 'appointments', icon: '📅', gradient: 'from-purple-600 to-purple-800' },
    { key: 'followup', icon: '📞', gradient: 'from-green-600 to-green-800' },
    { key: 'retention', icon: '🔄', gradient: 'from-yellow-600 to-yellow-800' },
    { key: 'surveys', icon: '📊', gradient: 'from-red-600 to-red-800' },
    { key: 'support', icon: '💼', gradient: 'from-indigo-600 to-indigo-800' }
  ];

  return (
    <section id="expertise" className={`py-12 md:py-20 relative overflow-hidden ${
      theme === 'light' ? 'bg-transparent' : 'bg-black'
    }`}>
      {theme === 'dark' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #444 0, #444 1px, transparent 0, transparent 50%)',
            backgroundSize: '10px 10px'
          }} />
        </div>
      )}
      <div className="hidden md:block">
        <NeonBackground variant="squares" lightMode={theme === 'light'} />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`group relative backdrop-blur-sm rounded-2xl p-6 sm:p-8 border transition-all hover:scale-105 ${
                theme === 'light'
                  ? 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  : 'bg-secondary-light/40 border-white/10 hover:border-white/50'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
              
              <div className="relative z-10">
                {/* Mobile: Icon and Title inline */}
                <div className="flex items-center gap-3 mb-3 md:hidden">
                  <div className="text-3xl">{service.icon}</div>
                  <h3 className={`text-base font-bold ${
                    theme === 'light' ? '!text-gray-900' : '!text-white'
                  }`}>
                    {t(`services.${service.key}.title`)}
                  </h3>
                </div>
                
                {/* Desktop: Icon and Title stacked */}
                <div className="hidden md:block">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    theme === 'light' ? '!text-gray-900' : '!text-white'
                  }`}>
                    {t(`services.${service.key}.title`)}
                  </h3>
                </div>
                
                <p className={`text-sm sm:text-base leading-relaxed ${
                  theme === 'light' ? '!text-gray-600' : '!text-white/70'
                }`}>
                  {t(`services.${service.key}.description`)}
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
          <button className={`px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-sm sm:text-base rounded-full transition-all hover:scale-105 ${
            theme === 'light'
              ? 'bg-gray-900 !text-white hover:bg-gray-800'
              : 'bg-white !text-primary hover:bg-white/90'
          }`}>
            {t('cta')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

