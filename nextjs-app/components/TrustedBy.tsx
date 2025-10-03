'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

export default function TrustedBy() {
  const t = useTranslations('trusted');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { theme } = useTheme();

  const clients = [
    { name: 'Proximus', logo: '/partners-logos/proximus.png', alt: 'Proximus' },
    { name: 'Generale Energie', logo: '/partners-logos/generale_energie.svg', alt: 'Generale Energie' },
    { name: 'NEO Groupe', logo: '/partners-logos/neo_groupe.png', alt: 'NEO Groupe' },
    { name: 'Wattsun', logo: '/partners-logos/wattsun.png', alt: 'Wattsun' },
    { name: 'Earth', logo: '/partners-logos/earth.png', alt: 'Earth' },
    { name: 'Chronopost', logo: '/partners-logos/chronopost.png', alt: 'Chronopost' },
    { name: 'SFR Business', logo: '/partners-logos/sfr_business.png', alt: 'SFR Business' },
    { name: 'Belfius Direct', logo: '/partners-logos/belfius_direct.svg', alt: 'Belfius Direct' }
  ];

  return (
    <section className={`py-12 md:py-20 relative overflow-hidden ${
      theme === 'light' ? 'bg-transparent' : 'bg-black'
    }`}>
      {theme === 'dark' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(0deg, #444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
            backgroundSize: '60px 60px'
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
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r ${
            theme === 'light' 
              ? 'from-gray-900 via-gray-800 to-gray-900' 
              : 'from-white via-gray-100 to-white'
          }`}>
            {t('title')}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className={`h-px w-12 sm:w-16 ${theme === 'light' ? 'bg-gradient-to-r from-transparent to-gray-400' : 'bg-gradient-to-r from-transparent to-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
            <div className={`h-px w-12 sm:w-16 ${theme === 'light' ? 'bg-gradient-to-l from-transparent to-gray-400' : 'bg-gradient-to-l from-transparent to-gray-600'}`}></div>
          </div>
          <p className={`text-base sm:text-lg md:text-xl ${
            theme === 'light' ? '!text-gray-600' : '!text-white'
          }`}>{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border transition-all hover:scale-105 flex items-center justify-center ${
                theme === 'light'
                  ? 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  : 'border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10'
              }`}
            >
              <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.alt}
                  fill
                  className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  unoptimized={client.logo.endsWith('.svg')}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 sm:mt-12 md:mt-16 text-center"
        >
          <p className={`italic text-sm sm:text-base md:text-lg ${
            theme === 'light' ? '!text-gray-500' : '!text-white/60'
          }`}>
            &ldquo;Des partenaires de confiance qui témoignent de notre engagement envers l&apos;excellence.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

