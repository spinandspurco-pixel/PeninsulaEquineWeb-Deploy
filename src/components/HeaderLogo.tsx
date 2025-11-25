import React from 'react';
import { motion } from 'framer-motion';
import { LogoWithBackgroundRemoval } from './LogoWithBackgroundRemoval';

interface HeaderLogoProps {
  className?: string;
}

export function HeaderLogo({ className = '' }: HeaderLogoProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Subtle Ambient Glow */}
      <motion.div
        className="absolute inset-0 -inset-3"
        animate={{
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          filter: 'blur(20px)',
          backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, transparent 70%)',
        }}
      />

      {/* Logo Image - Compact for Header with Background Removal */}
      <div className="relative z-10">
        <LogoWithBackgroundRemoval
          animate={false}
          className="relative"
          filterStyle="brightness(1.1) contrast(1.15) saturate(1.3) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 15px rgba(251, 191, 36, 0.3))"
          onHoverFilter="brightness(1.15) contrast(1.2) saturate(1.35) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 25px rgba(251, 191, 36, 0.5))"
        />
      </div>

      {/* Subtle Shimmer Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden z-20"
        style={{
          mixBlendMode: 'overlay',
        }}
      >
        <motion.div
          className="absolute inset-0 h-[150%] w-[150%]"
          style={{
            background: 'linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.5) 50%, transparent 65%)',
            transform: 'skewX(-15deg)',
          }}
          animate={{
            x: ['-150%', '150%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}