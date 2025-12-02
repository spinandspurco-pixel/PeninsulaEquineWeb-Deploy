import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RopeLogo } from './RopeLogo';

interface VideoHeroProps {
  onComplete?: () => void;
  autoLoop?: boolean;
  showLogo?: boolean;
  duration?: number;
}

export function VideoHero({ 
  showLogo = true,
}: VideoHeroProps) {
  const [showContent, setShowContent] = useState(false);

  // Show content immediately
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0F0F0F]">
      {/* Animated Background - elegant dark gradient with particles */}
      <div className="absolute inset-0">
        {/* Dark gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(201,162,78,0.08) 0%, rgba(15,15,15,1) 60%)',
          }}
        />
        
        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(201, 162, 78, ${Math.random() * 0.4 + 0.1})`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Subtle animated lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${20 + i * 15}%`,
                background: 'linear-gradient(90deg, transparent, rgba(201,162,78,0.3), transparent)',
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 8 + i * 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/30 via-transparent to-[#0F0F0F]/70" />

      {/* Logo and Content Overlay */}
      <AnimatePresence>
        {showContent && showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
          >
            {/* Animated Logo */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <RopeLogo animate={true} />
            </motion.div>

            {/* Tagline */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display text-[#C9A24E] text-center mb-4"
              style={{
                textShadow: '0 0 40px rgba(201, 162, 78, 0.6)',
              }}
            >
              FROM DIRT TO DYNASTY
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 1 }}
              className="text-xl md:text-2xl text-[#F5F4F1]/90 font-heading text-center max-w-3xl"
            >
              Building world-class equestrian facilities across Victoria
            </motion.p>

            {/* Subtle scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 text-[#C9A24E]/60"
              >
                <span className="text-sm font-body tracking-wider">SCROLL</span>
                <div className="w-0.5 h-12 bg-gradient-to-b from-[#C9A24E]/60 to-transparent" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VideoHero;
