import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RopeLogo } from './RopeLogo';

// Custom videos - HomePage Hero videos (slow-motion equestrian footage)
import heroVideo1 from '../assets/media/converted/IMG_1351.mp4';
import heroVideo2 from '../assets/media/converted/IMG_1354.mp4';
import heroVideo3 from '../assets/media/converted/IMG_2975.mp4';

interface VideoHeroProps {
  onComplete?: () => void;
  autoLoop?: boolean;
  showLogo?: boolean;
  duration?: number;
}

export function VideoHero({ 
  onComplete, 
  autoLoop = true, 
  showLogo = true,
  duration = 20000 
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Array of hero videos to rotate through (3 custom slow-motion videos)
  const heroVideos = [heroVideo1, heroVideo2, heroVideo3];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle video loaded
    const handleCanPlay = () => {
      setIsLoaded(true);
      video.play().catch(err => console.log('Video autoplay prevented:', err));
    };

    // Handle video ended
    const handleEnded = () => {
      if (autoLoop) {
        // Cycle to next video
        setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
      } else if (onComplete) {
        onComplete();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    // Show logo after brief delay
    const logoTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      clearTimeout(logoTimer);
    };
  }, [currentVideoIndex, autoLoop, onComplete, heroVideos.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0F0F0F]">
      {/* Video Background */}
      <motion.video
        key={currentVideoIndex}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: 'opacity, transform' }}
        muted
        playsInline
        preload="metadata"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      >
        <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
      </motion.video>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/70 via-[#0F0F0F]/40 to-[#0F0F0F]/80" />

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

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0F0F0F] z-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#C9A24E]/30 border-t-[#C9A24E] rounded-full"
          />
        </div>
      )}
    </div>
  );
}
