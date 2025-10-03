'use client';

import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Approach from '@/components/Approach';
import Expertise from '@/components/Expertise';
import Results from '@/components/Results';
import TrustedBy from '@/components/TrustedBy';
import Multilingual from '@/components/Multilingual';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';

export default function HomePage() {
  const { theme } = useTheme();
  
  return (
    <main className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <Navigation />
      <Hero />
      <SectionDivider />
      <Mission />
      <SectionDivider />
      <Approach />
      <SectionDivider />
      <Expertise />
      <SectionDivider />
      <Results />
      <SectionDivider />
      <TrustedBy />
      <SectionDivider />
      <Multilingual />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  );
}

