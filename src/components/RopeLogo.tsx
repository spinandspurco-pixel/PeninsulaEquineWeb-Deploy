import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogoWithBackgroundRemoval } from './LogoWithBackgroundRemoval';

interface RopeLogoProps {
  animate?: boolean;
  className?: string;
}

export function RopeLogo({ animate = false, className = '' }: RopeLogoProps) {
  const [logoMask, setLogoMask] = useState<string>('');

  return (
    <div className={`relative ${className}`}>
      {/* Radial Golden Glow - Enhanced for Intro */}
      <motion.div
        className="absolute inset-0 -inset-12"
        animate={
          animate
            ? {
                opacity: [0, 0.7, 0.9, 0.7],
                scale: [0.85, 1.15, 1.2, 1.15],
              }
            : {
                opacity: [0.4, 0.6, 0.4],
                scale: [0.98, 1.02, 0.98],
              }
        }
        transition={{
          duration: animate ? 6 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          filter: 'blur(60px)',
          backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, rgba(245, 158, 11, 0.5) 40%, transparent 70%)',
        }}
      />

      {/* Main Logo Image Container */}
      <motion.div
        className="relative z-10"
        initial={animate ? { opacity: 0, scale: 0.85, y: 30 } : { opacity: 1, scale: 1 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: 0,
        }}
        transition={{
          delay: animate ? 0.3 : 0,
          duration: animate ? 2.5 : 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Logo with White Background Removed */}
        <LogoWithBackgroundRemoval
          animate={animate}
          className="relative z-10"
          filterStyle="brightness(1.2) contrast(1.2) saturate(1.3) drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 30px rgba(251, 191, 36, 0.4))"
          onProcessed={setLogoMask}
        />

        {/* Animated Rope Movement/Wave Effect */}
        {animate && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0.5, 0.3, 0],
            }}
            transition={{
              delay: 1.5,
              duration: 3,
              ease: 'easeInOut',
            }}
            style={{
              backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
              filter: 'blur(20px)',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>

      {/* Metallic Shimmer Sweep - Masked to Logo Shape */}
      {logoMask && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden z-30"
          style={{
            WebkitMaskImage: `url(${logoMask})`,
            maskImage: `url(${logoMask})`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        >
          <motion.div
            className="absolute inset-0 h-[200%] w-[200%]"
            style={{
              background: 'linear-gradient(120deg, transparent 0%, transparent 45%, rgba(255, 255, 255, 0.9) 50%, transparent 55%, transparent 100%)',
              transform: 'skewX(-20deg)',
            }}
            initial={{ x: '-200%', y: '-50%' }}
            animate={
              animate
                ? {
                    x: ['-200%', '200%'],
                    y: ['-50%', '-50%'],
                  }
                : {
                    x: ['-200%', '200%'],
                    y: ['-50%', '-50%'],
                  }
            }
            transition={
              animate
                ? {
                    delay: 2,
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                  }
                : {
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                  }
            }
          />
        </div>
      )}

      {/* Rope Twist Animation - Subtle Rotate */}
      {animate && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          animate={{
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            delay: 1,
            duration: 6,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
}