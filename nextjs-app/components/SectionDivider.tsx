'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function SectionDivider() {
  const { theme } = useTheme();
  
  return (
    <div className="relative h-24 overflow-hidden">
      {/* Glowing line - expands from center */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ 
          scaleX: { duration: 1.8, ease: "easeInOut" },
          opacity: { duration: 0.5 }
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl origin-center"
      >
        {/* Main line */}
        <motion.div 
          animate={{ 
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-[2px] relative"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(to right, transparent, #00d4ff 20%, #9d00ff 50%, #ff00ff 80%, transparent)'
              : 'linear-gradient(to right, transparent, white, transparent)'
          }}
        >
          {/* Layered glow effects */}
          {theme === 'dark' ? (
            <>
              <div className="absolute inset-0 blur-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute inset-0 blur-[6px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              <div className="absolute inset-0 blur-[12px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </>
          ) : (
            <>
              <div 
                className="absolute inset-0 blur-[2px]" 
                style={{ background: 'linear-gradient(to right, transparent, #00d4ff 20%, #9d00ff 50%, #ff00ff 80%, transparent)' }}
              />
              <div 
                className="absolute inset-0 blur-[6px]" 
                style={{ background: 'linear-gradient(to right, transparent, rgba(0, 212, 255, 0.7) 20%, rgba(157, 0, 255, 0.7) 50%, rgba(255, 0, 255, 0.7) 80%, transparent)' }}
              />
              <div 
                className="absolute inset-0 blur-[12px]" 
                style={{ background: 'linear-gradient(to right, transparent, rgba(0, 212, 255, 0.4) 20%, rgba(157, 0, 255, 0.4) 50%, rgba(255, 0, 255, 0.4) 80%, transparent)' }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

