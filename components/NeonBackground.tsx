'use client';

import { motion } from 'framer-motion';

interface NeonBackgroundProps {
  variant?: 'circles' | 'lines' | 'dots' | 'squares';
  lightMode?: boolean;
}

export default function NeonBackground({ variant = 'circles', lightMode = false }: NeonBackgroundProps) {
  if (variant === 'circles') {
    return (
      <>
        {/* Top Left Circle - Cyan */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: lightMode ? [0.5, 0.7, 0.5] : [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-32 h-32 rounded-full z-0"
          style={{
            background: lightMode 
              ? 'radial-gradient(circle, rgba(0, 200, 255, 0.6) 0%, rgba(0, 200, 255, 0.35) 50%, rgba(0, 200, 255, 0.15) 80%, transparent 100%)'
              : 'radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, rgba(0, 255, 255, 0.4) 50%, rgba(0, 255, 255, 0.1) 80%, transparent 100%)',
            boxShadow: lightMode 
              ? '0 0 60px rgba(0, 200, 255, 0.6), 0 0 90px rgba(0, 200, 255, 0.4), inset 0 0 40px rgba(0, 200, 255, 0.3)'
              : '0 0 80px rgba(0, 255, 255, 1), 0 0 120px rgba(0, 255, 255, 0.6), inset 0 0 60px rgba(0, 255, 255, 0.3)',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Bottom Right Circle - Magenta */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: lightMode ? [0.5, 0.7, 0.5] : [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full z-0"
          style={{
            background: lightMode 
              ? 'radial-gradient(circle, rgba(200, 0, 255, 0.6) 0%, rgba(200, 0, 255, 0.35) 50%, rgba(200, 0, 255, 0.15) 80%, transparent 100%)'
              : 'radial-gradient(circle, rgba(255, 0, 255, 0.8) 0%, rgba(255, 0, 255, 0.4) 50%, rgba(255, 0, 255, 0.1) 80%, transparent 100%)',
            boxShadow: lightMode 
              ? '0 0 70px rgba(200, 0, 255, 0.6), 0 0 100px rgba(200, 0, 255, 0.4), inset 0 0 50px rgba(200, 0, 255, 0.3)'
              : '0 0 90px rgba(255, 0, 255, 1), 0 0 130px rgba(255, 0, 255, 0.6), inset 0 0 70px rgba(255, 0, 255, 0.3)',
            filter: 'blur(1px)'
          }}
        />
      </>
    );
  }

  if (variant === 'lines') {
    return (
      <>
        {/* Top Right Diagonal Line - Electric Blue */}
        <motion.div
          animate={{
            opacity: lightMode ? [0.6, 0.8, 0.6] : [0.5, 0.7, 0.5],
            scaleX: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-96 right-0 w-64 h-[4px] origin-right rotate-45 z-0"
        >
          <div className="w-full h-full bg-gradient-to-l from-transparent via-[#00f0ff] to-transparent" 
               style={{ boxShadow: lightMode ? '0 0 35px rgba(0, 200, 255, 0.7), 0 0 55px rgba(0, 200, 255, 0.5)' : '0 0 30px rgba(0, 240, 255, 1), 0 0 50px rgba(0, 240, 255, 0.6)' }} />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-l from-transparent via-[#00f0ff] to-transparent blur-[6px]" 
               style={{ opacity: lightMode ? 0.8 : 1 }} />
        </motion.div>

        {/* Bottom Left Diagonal Line - Purple */}
        <motion.div
          animate={{
            opacity: lightMode ? [0.6, 0.8, 0.6] : [0.5, 0.7, 0.5],
            scaleX: [1, 1.15, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute bottom-32 left-0 w-56 h-[4px] origin-left -rotate-45 z-0"
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#9d00ff] to-transparent" 
               style={{ boxShadow: lightMode ? '0 0 35px rgba(150, 0, 255, 0.7), 0 0 55px rgba(150, 0, 255, 0.5)' : '0 0 30px rgba(157, 0, 255, 1), 0 0 50px rgba(157, 0, 255, 0.6)' }} />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#9d00ff] to-transparent blur-[6px]" 
               style={{ opacity: lightMode ? 0.8 : 1 }} />
        </motion.div>
      </>
    );
  }

  if (variant === 'dots') {
    const colors = ['#00ff88', '#ff00ff', '#00d4ff']; // Green, Magenta, Cyan
    
    return (
      <>
        {/* Top Right Dots */}
        <div className="absolute top-16 right-12 z-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`top-${i}`}
              animate={{
                opacity: lightMode ? [0.6, 0.8, 0.6] : [0.5, 0.7, 0.5],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4
              }}
              className="w-5 h-5 rounded-full mb-6"
              style={{
                background: `radial-gradient(circle, ${colors[i]} 0%, ${colors[i]}80 70%, transparent 100%)`,
                boxShadow: lightMode 
                  ? `0 0 30px ${colors[i]}CC, 0 0 50px ${colors[i]}99, inset 0 0 15px ${colors[i]}AA`
                  : `0 0 35px ${colors[i]}, 0 0 60px ${colors[i]}, inset 0 0 20px ${colors[i]}`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>

        {/* Bottom Left Dots */}
        <div className="absolute bottom-24 left-16 z-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`bottom-${i}`}
              animate={{
                opacity: lightMode ? [0.6, 0.8, 0.6] : [0.7, 1, 0.7],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5 + 1
              }}
              className="w-5 h-5 rounded-full mb-6"
              style={{
                background: `radial-gradient(circle, ${colors[2 - i]} 0%, ${colors[2 - i]}80 70%, transparent 100%)`,
                boxShadow: lightMode 
                  ? `0 0 30px ${colors[2 - i]}CC, 0 0 50px ${colors[2 - i]}99, inset 0 0 15px ${colors[2 - i]}AA`
                  : `0 0 35px ${colors[2 - i]}, 0 0 60px ${colors[2 - i]}, inset 0 0 20px ${colors[2 - i]}`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      </>
    );
  }

  if (variant === 'squares') {
    return (
      <>
        {/* Top Left Square - Orange/Yellow */}
        <motion.div
          animate={{
            rotate: [0, 45, 0],
            opacity: lightMode ? [0.5, 0.7, 0.5] : [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-16 left-12 w-24 h-24 z-0"
          style={{
            background: lightMode 
              ? 'linear-gradient(135deg, rgba(255, 150, 0, 0.6) 0%, rgba(255, 180, 0, 0.45) 100%)'
              : 'linear-gradient(135deg, rgba(255, 165, 0, 0.8) 0%, rgba(255, 200, 0, 0.5) 100%)',
            boxShadow: lightMode 
              ? '0 0 50px rgba(255, 150, 0, 0.6), 0 0 75px rgba(255, 150, 0, 0.4), inset 0 0 35px rgba(255, 150, 0, 0.3)'
              : '0 0 60px rgba(255, 165, 0, 1), 0 0 90px rgba(255, 165, 0, 0.6), inset 0 0 40px rgba(255, 165, 0, 0.4)',
            filter: 'blur(1px)'
          }}
        />

        {/* Bottom Right Square - Pink */}
        <motion.div
          animate={{
            rotate: [45, 0, 45],
            opacity: lightMode ? [0.5, 0.7, 0.5] : [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-24 right-16 w-28 h-28 z-0"
          style={{
            background: lightMode 
              ? 'linear-gradient(135deg, rgba(255, 20, 150, 0.6) 0%, rgba(255, 100, 180, 0.45) 100%)'
              : 'linear-gradient(135deg, rgba(255, 20, 147, 0.8) 0%, rgba(255, 105, 180, 0.5) 100%)',
            boxShadow: lightMode 
              ? '0 0 55px rgba(255, 20, 150, 0.6), 0 0 80px rgba(255, 20, 150, 0.4), inset 0 0 40px rgba(255, 20, 150, 0.3)'
              : '0 0 65px rgba(255, 20, 147, 1), 0 0 100px rgba(255, 20, 147, 0.6), inset 0 0 50px rgba(255, 20, 147, 0.4)',
            filter: 'blur(1px)'
          }}
        />
      </>
    );
  }

  return null;
}

