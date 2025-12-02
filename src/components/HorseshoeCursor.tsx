import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

// Beautiful golden horseshoe SVG
const GoldenHorseshoe = ({ size = 32, isHovering = false }: { size?: number; isHovering?: boolean }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: isHovering 
        ? 'drop-shadow(0 0 12px rgba(201, 162, 78, 1)) drop-shadow(0 0 24px rgba(201, 162, 78, 0.6))' 
        : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 8px rgba(201, 162, 78, 0.3))'
    }}
  >
    {/* Gradient definitions */}
    <defs>
      <linearGradient id="horseshoeGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5D485" />
        <stop offset="30%" stopColor="#C9A24E" />
        <stop offset="70%" stopColor="#A88B63" />
        <stop offset="100%" stopColor="#C9A24E" />
      </linearGradient>
      <linearGradient id="horseshoeShine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#FFF8E7" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    {/* Main horseshoe U shape */}
    <path 
      d="M8 6C5 6 3 9 3 14C3 20 3 32 12 38C16 41 20 43 24 43C28 43 32 41 36 38C45 32 45 20 45 14C45 9 43 6 40 6C37 6 35 9 35 14C35 20 35 28 30 32C28 34 26 35 24 35C22 35 20 34 18 32C13 28 13 20 13 14C13 9 11 6 8 6Z" 
      fill="url(#horseshoeGold)"
      stroke="#8B7355"
      strokeWidth="1"
    />
    
    {/* Shine highlight */}
    <path 
      d="M8 6C5 6 3 9 3 14C3 16 3 18 4 20C5 18 6 14 8 12C10 10 11 9 13 9C13 8 12 6 8 6Z" 
      fill="url(#horseshoeShine)"
    />
    <path 
      d="M40 6C43 6 45 9 45 14C45 16 45 18 44 20C43 18 42 14 40 12C38 10 37 9 35 9C35 8 36 6 40 6Z" 
      fill="url(#horseshoeShine)"
    />
    
    {/* Nail holes */}
    <circle cx="7" cy="14" r="2" fill="#0F0F0F" opacity="0.8" />
    <circle cx="8" cy="24" r="2" fill="#0F0F0F" opacity="0.8" />
    <circle cx="13" cy="33" r="2" fill="#0F0F0F" opacity="0.8" />
    <circle cx="41" cy="14" r="2" fill="#0F0F0F" opacity="0.8" />
    <circle cx="40" cy="24" r="2" fill="#0F0F0F" opacity="0.8" />
    <circle cx="35" cy="33" r="2" fill="#0F0F0F" opacity="0.8" />
  </svg>
);

// Sparkle particle component
const Sparkle = ({ delay, angle, distance }: { delay: number; angle: number; distance: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 3,
      height: 3,
      background: 'radial-gradient(circle, #FFF8E7 0%, #C9A24E 50%, transparent 100%)',
      boxShadow: '0 0 6px 2px rgba(201, 162, 78, 0.8)',
    }}
    initial={{ opacity: 0, scale: 0, x: 16, y: 16 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      scale: [0, 1.5, 1, 0],
      x: 16 + Math.cos(angle) * distance,
      y: 16 + Math.sin(angle) * distance,
    }}
    transition={{
      duration: 0.8,
      delay,
      repeat: Infinity,
      repeatDelay: 0.4,
    }}
  />
);

export function HorseshoeCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; angle: number; distance: number; delay: number }>>([]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Generate sparkles on hover
  useEffect(() => {
    if (isHovering) {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        angle: (i * Math.PI * 2) / 8 + Math.random() * 0.3,
        distance: 20 + Math.random() * 15,
        delay: i * 0.1,
      }));
      setSparkles(newSparkles);
    } else {
      setSparkles([]);
    }
  }, [isHovering]);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX - 16);
    cursorY.set(e.clientY - 16);
    
    if (!isVisible) setIsVisible(true);

    const target = e.target as HTMLElement;
    const isInteractive = 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.closest('a') !== null || 
      target.closest('button') !== null ||
      target.getAttribute('role') === 'button' ||
      target.classList.contains('cursor-pointer') ||
      target.onclick !== null;
    
    setIsHovering(isInteractive);
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return; // Don't show custom cursor on touch devices
    }

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [updateMousePosition]);

  // Don't render on touch devices or server
  if (typeof window === 'undefined') return null;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{ x: cursorXSpring, y: cursorYSpring }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {/* Glow ring on hover */}
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 48,
                    height: 48,
                    left: -8,
                    top: -8,
                    background: 'radial-gradient(circle, rgba(201,162,78,0.4) 0%, rgba(201,162,78,0.1) 50%, transparent 70%)',
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.3, 1],
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </AnimatePresence>

            {/* Sparkles */}
            {sparkles.map((sparkle) => (
              <Sparkle key={sparkle.id} {...sparkle} />
            ))}

            {/* Click ripple */}
            <AnimatePresence>
              {isClicking && (
                <motion.div
                  className="absolute rounded-full border-2"
                  style={{ 
                    width: 32, 
                    height: 32,
                    borderColor: '#C9A24E',
                  }}
                  initial={{ opacity: 0.8, scale: 0.8 }}
                  animate={{ opacity: 0, scale: 2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Horseshoe cursor */}
            <motion.div
              animate={{
                scale: isClicking ? 0.85 : isHovering ? 1.1 : 1,
                rotate: isHovering ? [0, -5, 5, -3, 3, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.15 },
                rotate: { duration: 0.5, repeat: isHovering ? Infinity : 0, repeatDelay: 0.5 },
              }}
            >
              <GoldenHorseshoe size={32} isHovering={isHovering} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
