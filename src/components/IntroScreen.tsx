import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RopeLogo } from './RopeLogo';

// IMPORTANT: Replace this with your actual video import once uploaded
// Example: import introVideo from 'figma:asset/[your-hash-here].mp4';
const introVideo: string | null = null; // Set to your video path when ready

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<'video' | 'transition' | 'logo' | 'shimmer' | 'fadeout'>(
    introVideo ? 'video' : 'transition'
  );
  const [canSkip, setCanSkip] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [videoEnded, setVideoEnded] = useState(!introVideo);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // If no video, start with transition phase immediately
    if (!introVideo) {
      const transitionTimer = setTimeout(() => {
        setPhase('logo');
      }, 2000);

      const logoTimer = setTimeout(() => {
        setShowTagline(true);
        setPhase('shimmer');
      }, 7000);

      const shimmerTimer = setTimeout(() => {
        setPhase('fadeout');
      }, 11000);

      const fadeoutTimer = setTimeout(() => {
        onComplete();
      }, 13000);

      const skipTimer = setTimeout(() => setCanSkip(true), 2000);

      return () => {
        clearTimeout(transitionTimer);
        clearTimeout(logoTimer);
        clearTimeout(shimmerTimer);
        clearTimeout(fadeoutTimer);
        clearTimeout(skipTimer);
      };
    }

    // With video: Video plays first, then transitions to logo
    if (introVideo && videoEnded) {
      // Phase 1: Transition from video (smooth fade)
      const transitionTimer = setTimeout(() => {
        setPhase('logo');
      }, 1500);

      // Phase 2: Logo Reveal 
      const logoTimer = setTimeout(() => {
        setShowTagline(true);
        setPhase('shimmer');
      }, 6500);

      // Phase 3: Shimmer & Ambient
      const shimmerTimer = setTimeout(() => {
        setPhase('fadeout');
      }, 10500);

      // Phase 4: Fadeout & Transition
      const fadeoutTimer = setTimeout(() => {
        onComplete();
      }, 12500);

      return () => {
        clearTimeout(transitionTimer);
        clearTimeout(logoTimer);
        clearTimeout(shimmerTimer);
        clearTimeout(fadeoutTimer);
      };
    }

    // Allow skipping after video starts or after 2s if no video
    const skipTimer = setTimeout(() => setCanSkip(true), 2000);
    return () => clearTimeout(skipTimer);
  }, [onComplete, videoEnded]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setPhase('transition');
  };

  const handleSkip = () => {
    if (canSkip) {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleSkip}
    >
      {/* Phase 0: Video Background (if video is provided) */}
      {introVideo && phase === 'video' && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={introVideo} type="video/mp4" />
          </video>
          
          {/* Subtle gradient overlay for branding consistency */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-neutral-900/20" />
        </motion.div>
      )}

      {/* Phase 1: Transition Background (After video or if no video) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === 'video' ? 0 : phase === 'transition' ? 1 : 0.4,
        }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundImage: 'linear-gradient(to top, #0a0a0a 0%, #1a1106 30%, #2a1f0e 60%, #f59e0b15 100%)',
        }}
      />

      {/* Arena Sand Texture */}
      {phase !== 'video' && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: phase === 'transition' || phase === 'logo' ? 0.3 : 0.15,
            scale: 1,
          }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1700504080152-61ecdb0634ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmVuYSUyMHNhbmQlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc2MjQwNjU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6) contrast(1.2)',
            mixBlendMode: 'soft-light',
          }}
        />
      )}

      {/* Gold Dust Particles - During Transition Phase */}
      {phase === 'transition' && (
        <>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`,
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.9) 0%, rgba(217, 119, 6, 0.5) 100%)',
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
              }}
              initial={{ 
                opacity: 0, 
                y: 100,
                x: 0,
              }}
              animate={{
                y: [-100, -200 - Math.random() * 100],
                x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                opacity: [0, 0.9, 0.9, 0],
                scale: [0, 1.5, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                delay: Math.random() * 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </>
      )}

      {/* Radial Glow - Transition Light Effect */}
      {phase !== 'video' && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: phase === 'transition' ? 0.6 : 0.3,
            scale: phase === 'transition' ? 1.5 : 1.2,
          }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 30%, transparent 60%)',
          }}
        />
      )}

      {/* Phase 2 & 3: Logo Reveal Container */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <AnimatePresence>
          {phase !== 'video' && phase !== 'transition' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ 
                opacity: phase === 'fadeout' ? 0 : 1,
                scale: phase === 'fadeout' ? 1.15 : 1,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ 
                duration: phase === 'fadeout' ? 2 : 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Rope Logo with Animation */}
              <RopeLogo 
                animate={true}
                className="w-[90vw] max-w-[700px]"
              />

              {/* Phase 3: Ambient Shimmer Overlay (8-12s) */}
              {phase === 'shimmer' && (
                <motion.div
                  className="absolute inset-0 -inset-12"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    ease: 'easeInOut',
                  }}
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 80%)',
                    filter: 'blur(60px)',
                  }}
                />
              )}

              {/* Shimmer Pass-Through Effect (8-12s) */}
              {phase === 'shimmer' && (
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{
                    duration: 3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.6) 60%, transparent 100%)',
                    transform: 'skewX(-20deg)',
                    filter: 'blur(2px)',
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tagline "From Dirt to Dynasty" (appears at 5s) */}
        <AnimatePresence>
          {showTagline && phase !== 'fadeout' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 text-center relative z-20"
            >
              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
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
                transition={{ duration: 0.6, delay: 0.4 }}
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
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-px mt-6 mx-auto"
                style={{
                  maxWidth: '300px',
                  backgroundImage: 'linear-gradient(90deg, transparent 0%, #fbbf24 50%, transparent 100%)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hoofbeat Sound Wave Visual (8-12s) */}
      {phase === 'shimmer' && (
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-amber-400/60 rounded-full"
              style={{
                height: 20 + Math.random() * 30,
              }}
              animate={{
                height: [
                  20 + Math.random() * 30,
                  40 + Math.random() * 20,
                  20 + Math.random() * 30,
                ],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Skip Indicator */}
      <AnimatePresence>
        {canSkip && phase !== 'fadeout' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-amber-400/70 text-sm font-heading tracking-wider text-center"
            >
              CLICK TO CONTINUE
            </motion.div>
            
            {/* Animated Chevron */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex justify-center mt-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner Decorative Elements */}
      {phase !== 'video' && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'transition' ? 0 : 0.15 }}
            transition={{ duration: 2, delay: 2 }}
            className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-amber-400"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'transition' ? 0 : 0.15 }}
            transition={{ duration: 2, delay: 2.2 }}
            className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-amber-400"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'transition' ? 0 : 0.15 }}
            transition={{ duration: 2, delay: 2.4 }}
            className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-amber-400"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'transition' ? 0 : 0.15 }}
            transition={{ duration: 2, delay: 2.6 }}
            className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-amber-400"
          />
        </>
      )}
    </motion.div>
  );
}