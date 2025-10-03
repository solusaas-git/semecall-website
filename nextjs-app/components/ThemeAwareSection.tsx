'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeAwareSectionProps {
  children: ReactNode;
  id?: string;
  withGlass?: boolean;
  className?: string;
}

export default function ThemeAwareSection({ 
  children, 
  id, 
  withGlass = true,
  className = '' 
}: ThemeAwareSectionProps) {
  const { theme } = useTheme();

  const baseClasses = "py-20 md:py-32 relative overflow-visible";
  const themeClasses = theme === 'light' 
    ? 'bg-transparent' 
    : 'bg-black';
  
  return (
    <section
      id={id}
      className={`${baseClasses} ${themeClasses} ${className}`}
    >
      {withGlass && theme === 'light' && (
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

