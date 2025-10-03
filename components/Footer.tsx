'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

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
    <footer className="py-8 sm:py-12 md:py-16 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1 text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold !text-white mb-3 sm:mb-4">SEMECALL</div>
            <p className="!text-white/60 text-xs sm:text-sm leading-relaxed">
              L&apos;expert de la performance commerciale à distance.
            </p>
          </div>

          {/* Links and Legal in 2 columns */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {/* Links */}
            <div className="text-center sm:text-left">
              <h3 className="!text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('quickLinks')}</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <button onClick={() => scrollToSection('home')} className="!text-white/60 hover:!text-white transition-colors text-xs sm:text-sm">
                    {t('links.home')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('expertise')} className="!text-white/60 hover:!text-white transition-colors text-xs sm:text-sm">
                    {t('links.services')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="!text-white/60 hover:!text-white transition-colors text-xs sm:text-sm">
                    {t('links.contact')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="text-center sm:text-left">
              <h3 className="!text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Légal</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <a href="#" className="!text-white/60 hover:!text-white transition-colors text-xs sm:text-sm">
                    {t('legal.privacy')}
                  </a>
                </li>
                <li>
                  <a href="#" className="!text-white/60 hover:!text-white transition-colors text-xs sm:text-sm">
                    {t('legal.terms')}
                  </a>
                </li>
                <li>
                  <a href="#" className="!text-white/60 hover:!text-white transition-colors text-xs sm:text-sm">
                    {t('legal.notice')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left">
            <h3 className="!text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t('followUs')}</h3>
            <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center hover:bg-white/90 transition-all hover:scale-110"
              >
                <span className="text-lg sm:text-xl font-bold !text-black">in</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center hover:bg-white/90 transition-all hover:scale-110"
              >
                <span className="text-lg sm:text-xl font-bold !text-black">f</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            <p className="!text-white/40 text-xs sm:text-sm text-center md:text-left">
              {t('copyright', { year: currentYear })}
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <a href="mailto:contact@semecall.com" className="!text-white/60 hover:!text-white transition-colors text-xs sm:text-sm">
                contact@semecall.com
              </a>
              <span className="!text-white/40 hidden sm:inline">|</span>
              <a href="tel:+33643345845" className="!text-white/60 hover:!text-white transition-colors text-xs sm:text-sm">
                +33 6 43 34 58 45
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

