import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { RopeLogo } from './RopeLogo';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [showContent, setShowContent] = useState(false);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Sand/Dirt Background - Matching Intro Animation */}
      <div className="absolute inset-0">
        {/* Golden Hour Gradient Base */}
        <motion.div
          className="absolute inset-0"
          style={{ 
            y: backgroundY,
            backgroundImage: 'linear-gradient(to top, #0a0a0a 0%, #1a1106 30%, #2a1f0e 60%, #f59e0b15 100%)',
          }}
        />

        {/* Arena Sand Texture */}
        <motion.div
          className="absolute inset-0"
          style={{ 
            y: backgroundY,
            backgroundImage: 'url(https://images.unsplash.com/photo-1700504080152-61ecdb0634ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmVuYSUyMHNhbmQlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc2MjQwNjU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6) contrast(1.2)',
            mixBlendMode: 'soft-light',
            opacity: 0.3,
          }}
        />

        {/* Warm Gradient Overlays */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.85) 100%)',
          }}
        />

        {/* Radial Glow Effect */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 30%, transparent 60%)',
          }}
        />

        {/* Floating Golden Particles - Elegant & Sparse */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1.5,
              height: Math.random() * 3 + 1.5,
              backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.9) 0%, rgba(217, 119, 6, 0.5) 100%)',
              boxShadow: '0 0 12px rgba(251, 191, 36, 0.7)',
            }}
            animate={{
              y: [0, -150 - Math.random() * 100],
              x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 60],
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      {/* Hero Content with Parallax */}
      <motion.div 
        className="relative z-30 text-center px-4 max-w-5xl mx-auto"
        style={{ 
          opacity: contentOpacity,
          scale: contentScale,
        }}
      >
        {/* Embroidered Gold Rope Logo */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-16 md:mt-24 mb-16 md:mb-20 relative inline-block"
          >
            <RopeLogo 
              animate={false}
              className="w-[260px] md:w-[340px] lg:w-[380px]"
            />
          </motion.div>
        )}

        {/* Tagline "From Dirt to Dynasty" */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-32 md:mb-40 relative"
          >
            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-px mb-6 mx-auto"
              style={{
                maxWidth: '300px',
                backgroundImage: 'linear-gradient(90deg, transparent 0%, #fbbf24 50%, transparent 100%)',
              }}
            />

            {/* Tagline Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              style={{
                backgroundImage: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
              }}
              className="font-display tracking-[0.3em]"
            >
              FROM DIRT TO DYNASTY
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="h-px mt-6 mx-auto"
              style={{
                maxWidth: '300px',
                backgroundImage: 'linear-gradient(90deg, transparent 0%, #fbbf24 50%, transparent 100%)',
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Scroll Cue - Glowing & Elegant */}
      {showContent && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          onClick={() => onNavigate('constructions')}
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 group"
        >
          {/* Glowing Text with Underline */}
          <div className="flex flex-col items-center gap-2">
            <motion.span 
              className="text-amber-400/90 text-xs md:text-sm tracking-[0.25em] font-heading uppercase"
              style={{
                fontFamily: 'var(--font-heading)',
                textShadow: '0 0 15px rgba(251, 191, 36, 0.6)',
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
                textShadow: [
                  '0 0 15px rgba(251, 191, 36, 0.6)',
                  '0 0 25px rgba(251, 191, 36, 0.8)',
                  '0 0 15px rgba(251, 191, 36, 0.6)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Scroll to Explore
            </motion.span>
            
            {/* Decorative Line Below Text */}
            <motion.div
              className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                boxShadow: '0 0 8px rgba(251, 191, 36, 0.5)',
              }}
            />
          </div>
          
          {/* Animated Arrow with Glow */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.2 }}
            >
              {/* Pulsing Glow */}
              <motion.div 
                className="absolute inset-0 -inset-4 blur-2xl rounded-full"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, transparent 70%)',
                }}
              />
              
              {/* Horseshoe Icon */}
              <svg
                className="relative"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))',
                }}
              >
                <path
                  d="M12 3C7.58172 3 4 6.58172 4 11V19C4 19.5523 4.44772 20 5 20C5.55228 20 6 19.5523 6 19V11C6 7.68629 8.68629 5 12 5C15.3137 5 18 7.68629 18 11V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V11C20 6.58172 16.4183 3 12 3Z"
                  fill="#fbbf24"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                />
                <circle cx="6" cy="18" r="1.5" fill="#fbbf24" />
                <circle cx="18" cy="18" r="1.5" fill="#fbbf24" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.button>
      )}

      {/* Edge Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />
    </section>
  );
}