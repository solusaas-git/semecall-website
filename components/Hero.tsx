'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import NeonBackground from './NeonBackground';
import { useTheme } from '@/contexts/ThemeContext';

export default function Hero() {
  const t = useTranslations('hero');
  const { theme } = useTheme();

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
    }
  };

  return (
    <section id="home" className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${
      theme === 'light' ? 'bg-transparent' : 'bg-black'
    }`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-10' : 'opacity-5'}`}>
          <div className="absolute inset-0" style={{
            backgroundImage: theme === 'dark' 
              ? 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)'
              : 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="hidden md:block">
          <NeonBackground variant="circles" lightMode={theme === 'light'} />
        </div>
      </div>

      {/* Desktop/Tablet: Curved Diagonal Image Mask - Left Side */}
      <div 
        className="hidden sm:block absolute left-0 top-0 bottom-0 w-[75%] md:w-[70%] lg:w-[65%] z-10 overflow-hidden"
        style={{
          clipPath: 'ellipse(85% 100% at 0% 50%)',
        }}
      >
        <Image 
          src="/images/hero.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: 'right center',
          }}
        />
        {/* Gradient overlay for better text contrast */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.5))'
              : 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.3))'
          }}
        />
      </div>

      {/* Mobile Layout: Vertical stacking with consistent spacing */}
      <div className="sm:hidden relative z-20 w-full h-[90vh] flex flex-col px-6 pt-28 pb-16">
        {/* Mobile: Rectangular Image at Top */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mb-8 mt-8"
        >
          <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/hero.jpg"
              alt="Hero"
              fill
              priority
              className="object-cover"
              style={{
                objectPosition: 'center center',
              }}
            />
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4))'
                  : 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.2))'
              }}
            />
          </div>
        </motion.div>

        {/* Mobile: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full text-center mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`text-2xl sm:text-3xl font-bold leading-tight mb-5 ${
              theme === 'light' ? '!text-gray-900' : '!text-white'
            }`}
          >
            {t('headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`text-sm sm:text-base leading-relaxed ${
              theme === 'light' ? '!text-gray-700' : '!text-white/90'
            }`}
          >
            {t('subheadline')}
          </motion.p>
        </motion.div>

        {/* Mobile: CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full flex justify-center mb-8"
        >
          <button
            onClick={() => scrollToSection('expertise')}
            className={`group px-6 py-3 font-bold text-base rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-2xl ${
              theme === 'light' 
                ? 'bg-gray-900 !text-white hover:bg-gray-800' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 !text-white hover:from-cyan-600 hover:to-blue-700'
            }`}
          >
            {t('cta')}
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>

        {/* Mobile: Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="sm:hidden flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 ${
              theme === 'light' ? 'border-gray-400' : 'border-white/30'
            }`}
          >
            <div className={`w-1 h-3 rounded-full ${
              theme === 'light' ? 'bg-gray-700' : 'bg-white'
            }`} />
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop/Tablet: Content - Aligned to the right */}
      <div className="hidden sm:block relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-[90%] md:w-[60%] lg:w-[45%] xl:w-[35%] text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
                theme === 'light' ? '!text-gray-900' : '!text-white'
              }`}
              style={{
                textShadow: theme === 'dark' 
                  ? '2px 2px 8px rgba(0,0,0,0.5)' 
                  : '2px 2px 8px rgba(255,255,255,0.5)'
              }}
            >
              {t('headline')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-lg md:text-xl mb-10 leading-relaxed ${
                theme === 'light' ? '!text-gray-700' : '!text-white/90'
              }`}
              style={{
                textShadow: theme === 'dark' 
                  ? '1px 1px 4px rgba(0,0,0,0.5)' 
                  : '1px 1px 4px rgba(255,255,255,0.5)'
              }}
            >
              {t('subheadline')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button
                onClick={() => scrollToSection('expertise')}
                className={`group px-8 py-4 font-bold text-lg rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-2xl ${
                  theme === 'light' 
                    ? 'bg-gray-900 !text-white hover:bg-gray-800' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 !text-white hover:from-cyan-600 hover:to-blue-700'
                }`}
              >
                {t('cta')}
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Desktop/Tablet: Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 ${
            theme === 'light' ? 'border-gray-400' : 'border-white/30'
          }`}
        >
          <div className={`w-1 h-3 rounded-full ${
            theme === 'light' ? 'bg-gray-700' : 'bg-white'
          }`} />
        </motion.div>
      </motion.div>
    </section>
  );
}

