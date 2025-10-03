'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import NeonBackground from './NeonBackground';
import { useTheme } from '@/contexts/ThemeContext';
type ContactForm = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

export default function Contact() {
  const t = useTranslations('contact');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-12 md:py-20 relative overflow-hidden ${
      theme === 'light' ? 'bg-transparent' : 'bg-black'
    }`}>
      {theme === 'dark' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, #444 25%, transparent 25%), linear-gradient(-45deg, #444 25%, transparent 25%)',
            backgroundSize: '60px 60px'
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
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className={`h-px w-12 sm:w-16 ${theme === 'light' ? 'bg-gradient-to-r from-transparent to-gray-400' : 'bg-gradient-to-r from-transparent to-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
            <div className={`h-px w-12 sm:w-16 ${theme === 'light' ? 'bg-gradient-to-l from-transparent to-gray-400' : 'bg-gradient-to-l from-transparent to-gray-600'}`}></div>
          </div>
          <p className={`text-sm sm:text-base md:text-lg max-w-3xl mx-auto ${
            theme === 'light' ? '!text-gray-600' : '!text-white/70'
          }`}>
            {t('cta')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-4 sm:space-y-6 md:space-y-8"
          >
            <div className={`backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border ${
              theme === 'light' 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-secondary-light/30 border-white/10'
            }`}>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 ${
                theme === 'light' ? '!text-gray-900' : '!text-white'
              }`}>{t('info.phone')}</h3>
              <div className="space-y-2 sm:space-y-3">
                <a href="tel:+33643345845" className={`flex items-center transition-colors text-sm sm:text-base md:text-lg ${
                  theme === 'light' 
                    ? '!text-gray-700 hover:!text-gray-900' 
                    : '!text-white/80 hover:!text-white'
                }`}>
                  <span className="mr-2 sm:mr-3">📞</span>
                  +33 6 43 34 58 45
                </a>
                <a href="tel:+212664964398" className={`flex items-center transition-colors text-sm sm:text-base md:text-lg ${
                  theme === 'light' 
                    ? '!text-gray-700 hover:!text-gray-900' 
                    : '!text-white/80 hover:!text-white'
                }`}>
                  <span className="mr-2 sm:mr-3">📞</span>
                  +212 6 64 96 43 98
                </a>
              </div>
            </div>

            <div className={`backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border ${
              theme === 'light' 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-secondary-light/30 border-white/10'
            }`}>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 ${
                theme === 'light' ? '!text-gray-900' : '!text-white'
              }`}>{t('info.email')}</h3>
              <a href="mailto:contact@semecall.com" className={`flex items-center transition-colors text-sm sm:text-base md:text-lg ${
                theme === 'light' 
                  ? '!text-gray-700 hover:!text-gray-900' 
                  : '!text-white/80 hover:!text-white'
              }`}>
                <span className="mr-2 sm:mr-3">✉️</span>
                contact@semecall.com
              </a>
            </div>

            <div className={`backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border ${
              theme === 'light' 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-secondary-light/30 border-white/10'
            }`}>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 ${
                theme === 'light' ? '!text-gray-900' : '!text-white'
              }`}>{t('info.address')}</h3>
              <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                theme === 'light' ? '!text-gray-700' : '!text-white/80'
              }`}>
                <span className="mr-2 sm:mr-3">📍</span>
                N3 rue Lalla Amina, quartier l&apos;Hyppodrome<br />
                Résidence Triangle d&apos;Or<br />
                4ème étage, numéro 46<br />
                Fes, Maroc
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`backdrop-blur-sm rounded-2xl p-5 sm:p-6 border ${
              theme === 'light' 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-secondary-light/30 border-white/10'
            }`}
          >
            {!isMounted ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-10 bg-gray-300/20 rounded"></div>
                <div className="h-10 bg-gray-300/20 rounded"></div>
                <div className="h-10 bg-gray-300/20 rounded"></div>
              </div>
            ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block mb-1 font-medium text-sm ${
                    theme === 'light' ? '!text-gray-900' : '!text-white'
                  }`}>
                    {t('form.firstName')} *
                  </label>
                  <input
                    {...register('firstName', { required: true, minLength: 2 })}
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors text-sm ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 !text-gray-900 placeholder-gray-400 focus:border-gray-500'
                        : 'bg-primary/50 border-white/20 !text-white placeholder-white/40 focus:border-white'
                    }`}
                    placeholder={t('form.firstName')}
                  />
                  {errors.firstName && <span className="text-red-400 text-xs">Required</span>}
                </div>

                <div>
                  <label className={`block mb-1 font-medium text-sm ${
                    theme === 'light' ? '!text-gray-900' : '!text-white'
                  }`}>
                    {t('form.lastName')} *
                  </label>
                  <input
                    {...register('lastName', { required: true, minLength: 2 })}
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors text-sm ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 !text-gray-900 placeholder-gray-400 focus:border-gray-500'
                        : 'bg-primary/50 border-white/20 !text-white placeholder-white/40 focus:border-white'
                    }`}
                    placeholder={t('form.lastName')}
                  />
                  {errors.lastName && <span className="text-red-400 text-xs">Required</span>}
                </div>
              </div>

              <div>
                <label className={`block mb-1 font-medium text-sm ${
                  theme === 'light' ? '!text-gray-900' : '!text-white'
                }`}>
                  {t('form.company')} *
                </label>
                <input
                  {...register('company', { required: true, minLength: 2 })}
                  type="text"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors text-sm ${
                    theme === 'light'
                      ? 'bg-white border-gray-300 !text-gray-900 placeholder-gray-400 focus:border-gray-500'
                      : 'bg-primary/50 border-white/20 !text-white placeholder-white/40 focus:border-white'
                  }`}
                  placeholder={t('form.company')}
                />
                {errors.company && <span className="text-red-400 text-xs">Required</span>}
              </div>

              <div>
                <label className={`block mb-1 font-medium text-sm ${
                  theme === 'light' ? '!text-gray-900' : '!text-white'
                }`}>
                  {t('form.email')} *
                </label>
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors text-sm ${
                    theme === 'light'
                      ? 'bg-white border-gray-300 !text-gray-900 placeholder-gray-400 focus:border-gray-500'
                      : 'bg-primary/50 border-white/20 !text-white placeholder-white/40 focus:border-white'
                  }`}
                  placeholder={t('form.email')}
                />
                {errors.email && <span className="text-red-400 text-xs">Invalid email</span>}
              </div>

              <div>
                <label className={`block mb-1 font-medium text-sm ${
                  theme === 'light' ? '!text-gray-900' : '!text-white'
                }`}>
                  {t('form.phone')} *
                </label>
                <input
                  {...register('phone', { required: true, minLength: 8 })}
                  type="tel"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors text-sm ${
                    theme === 'light'
                      ? 'bg-white border-gray-300 !text-gray-900 placeholder-gray-400 focus:border-gray-500'
                      : 'bg-primary/50 border-white/20 !text-white placeholder-white/40 focus:border-white'
                  }`}
                  placeholder={t('form.phone')}
                />
                {errors.phone && <span className="text-red-400 text-xs">Required</span>}
              </div>

              <div>
                <label className={`block mb-1 font-medium text-sm ${
                  theme === 'light' ? '!text-gray-900' : '!text-white'
                }`}>
                  {t('form.message')} *
                </label>
                <textarea
                  {...register('message', { required: true, minLength: 10 })}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors resize-none text-sm ${
                    theme === 'light'
                      ? 'bg-white border-gray-300 !text-gray-900 placeholder-gray-400 focus:border-gray-500'
                      : 'bg-primary/50 border-white/20 !text-white placeholder-white/40 focus:border-white'
                  }`}
                  placeholder={t('form.message')}
                />
                {errors.message && <span className="text-red-400 text-xs">Required (min 10 chars)</span>}
              </div>

              <div className="flex items-start">
                <input
                  {...register('consent', { required: true })}
                  type="checkbox"
                  className={`mt-1 mr-3 w-5 h-5 border rounded ${
                    theme === 'light'
                      ? 'bg-white border-gray-300'
                      : 'bg-primary/50 border-white/20'
                  }`}
                />
                <label className={`text-sm ${
                  theme === 'light' ? '!text-gray-700' : '!text-white/80'
                }`}>
                  {t('form.consent')} *
                </label>
              </div>
              {errors.consent && <span className="text-red-400 text-sm">Required</span>}

              {submitStatus === 'success' && (
                <div className={`p-4 rounded-lg border ${
                  theme === 'light'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-green-500/20 border-green-500/50 text-green-300'
                }`}>
                  {t('form.success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={`p-4 rounded-lg border ${
                  theme === 'light'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-red-500/20 border-red-500/50 text-red-300'
                }`}>
                  {t('form.error')}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 font-bold rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  theme === 'light'
                    ? 'bg-gray-900 !text-white hover:bg-gray-800'
                    : 'bg-white !text-primary hover:bg-white/90'
                }`}
              >
                {isSubmitting ? '...' : t('form.submit')}
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

