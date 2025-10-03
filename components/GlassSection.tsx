'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface GlassSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function GlassSection({ children, id, className = '' }: GlassSectionProps) {
  const { theme } = useTheme();

  return (
    <section
      id={id}
      className={`py-20 md:py-32 relative overflow-visible ${
        theme === 'light' ? 'bg-transparent' : 'bg-black'
      } ${className}`}
    >
      {children}
    </section>
  );
}

