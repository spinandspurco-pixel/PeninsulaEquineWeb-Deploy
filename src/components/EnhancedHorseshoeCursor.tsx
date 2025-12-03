import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HorseshoeCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [trail, setTrail] = useState<{x: number; y: number; id: number; timestamp: number}[]>([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Check for touch device on mount
  useEffect(() => {
    setMounted(true);
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newPos = { x: e.clientX, y: e.clientY };
    
    // Calculate velocity for dynamic effects
    const vel = {
      x: newPos.x - lastPosition.x,
      y: newPos.y - lastPosition.y
    };
    setVelocity(vel);
    setLastPosition(newPos);
    
    setPosition(newPos);
    setIsVisible(true);

    // Enhanced trail with timestamp for better fading
    const timestamp = Date.now();
    setTrail(prev => {
      const newTrail = [...prev, { ...newPos, id: timestamp, timestamp }]
        .filter(point => timestamp - point.timestamp < 800) // Keep trail for 800ms
        .slice(-12); // Keep last 12 points
      return newTrail;
    });

    const target = e.target as HTMLElement;
    const isInteractive = 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.closest('a') !== null || 
      target.closest('button') !== null ||
      target.getAttribute('role') === 'button' ||
      target.classList.contains('cursor-pointer') ||
      window.getComputedStyle(target).cursor === 'pointer';
    
    setIsHovering(isInteractive);
  }, [lastPosition]);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isTouchDevice || !mounted) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      // Restore default cursor
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter, isTouchDevice, mounted]);

  if (isTouchDevice || !mounted) return null;

  const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
  const isMovingFast = speed > 5;

  return (
    <>
      {/* Enhanced Trail Effect */}
      <AnimatePresence>
        {trail.map((point) => {
          const age = Date.now() - point.timestamp;
          const opacity = Math.max(0, 1 - (age / 800));
          const scale = 0.2 + (opacity * 0.8);
          
          return (
            <motion.div
              key={point.id}
              className="fixed pointer-events-none z-40"
              style={{
                left: point.x - 6,
                top: point.y - 6,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale,
                opacity: opacity * 0.6,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, 
                    rgba(245, 158, 11, ${opacity * 0.8}) 0%, 
                    rgba(217, 119, 6, ${opacity * 0.4}) 50%, 
                    transparent 100%)`
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Main Cursor */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed pointer-events-none z-50"
            style={{
              left: position.x - 24,
              top: position.y - 24,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isClicking ? 0.7 : isHovering ? 1.3 : 1,
              opacity: 1,
              rotate: isHovering ? [0, 15, -15, 0] : 0,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: isMovingFast ? 300 : 400,
              damping: isMovingFast ? 20 : 25,
              rotate: { duration: 0.8, ease: "easeInOut" }
            }}
          >
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                filter: isHovering 
                  ? `drop-shadow(0 0 12px rgba(245, 158, 11, 0.9)) drop-shadow(0 0 20px rgba(245, 158, 11, 0.5))`
                  : `drop-shadow(0 0 6px rgba(245, 158, 11, 0.6)) drop-shadow(0 0 12px rgba(245, 158, 11, 0.3))`
              }}
            >
              {/* Outer Glow Ring */}
              <motion.circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="url(#outerGlow)"
                strokeWidth="1"
                opacity="0.6"
                animate={{
                  scale: isHovering ? 1.1 : 1,
                  strokeWidth: isHovering ? 2 : 1,
                }}
              />

              {/* Horseshoe Main Body */}
              <motion.path
                d="M24 8C17 8 12 13 12 20C12 25 14 30 16 34L18 38C18.5 39.5 19.8 40.2 21 39.5L24 38L27 39.5C28.2 40.2 29.5 39.5 30 38L32 34C34 30 36 25 36 20C36 13 31 8 24 8Z"
                stroke="url(#horseshoeGradient)"
                strokeWidth="2.5"
                fill="url(#horseshoeFill)"
                animate={{
                  strokeWidth: isHovering ? 3.5 : 2.5,
                  scale: isClicking ? 0.95 : 1,
                }}
                transition={{ duration: 0.15 }}
              />

              {/* Enhanced Horseshoe Nails */}
              {[
                { x: 15, y: 18 },
                { x: 33, y: 18 },
                { x: 17, y: 26 },
                { x: 31, y: 26 },
                { x: 19, y: 32 },
                { x: 29, y: 32 }
              ].map((nail, index) => (
                <motion.g key={index}>
                  <motion.circle
                    cx={nail.x}
                    cy={nail.y}
                    r="2.5"
                    fill="url(#nailGradient)"
                    animate={{
                      scale: isHovering ? 1.3 : 1,
                      opacity: isHovering ? 1 : 0.9,
                    }}
                    transition={{ delay: index * 0.05 }}
                  />
                  <motion.circle
                    cx={nail.x}
                    cy={nail.y}
                    r="1"
                    fill="#8B5A00"
                    animate={{
                      scale: isHovering ? 1.2 : 1,
                    }}
                    transition={{ delay: index * 0.05 }}
                  />
                </motion.g>
              ))}

              {/* Center Energy Core */}
              <motion.circle
                cx="24"
                cy="24"
                r="4"
                fill="url(#energyCore)"
                animate={{
                  opacity: isHovering ? 1 : 0.7,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Dynamic Sparkles */}
              {isHovering && (
                <motion.g>
                  {[...Array(6)].map((_, i) => (
                    <motion.circle
                      key={i}
                      cx={24 + Math.cos(i * Math.PI / 3) * 15}
                      cy={24 + Math.sin(i * Math.PI / 3) * 15}
                      r="1"
                      fill="#F59E0B"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.g>
              )}

              <defs>
                <radialGradient id="outerGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="rgba(245, 158, 11, 0)" />
                  <stop offset="80%" stopColor="rgba(245, 158, 11, 0.3)" />
                  <stop offset="100%" stopColor="rgba(245, 158, 11, 0.6)" />
                </radialGradient>

                <linearGradient id="horseshoeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>

                <linearGradient id="horseshoeFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(245, 158, 11, 0.2)" />
                  <stop offset="50%" stopColor="rgba(217, 119, 6, 0.3)" />
                  <stop offset="100%" stopColor="rgba(146, 64, 14, 0.1)" />
                </linearGradient>

                <radialGradient id="nailGradient" cx="0.3" cy="0.3" r="0.8">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#92400E" />
                </radialGradient>

                <radialGradient id="energyCore" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="rgba(254, 215, 170, 0.9)" />
                  <stop offset="50%" stopColor="rgba(245, 158, 11, 0.7)" />
                  <stop offset="100%" stopColor="rgba(217, 119, 6, 0.3)" />
                </radialGradient>
              </defs>
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Ripple Effect */}
      {isHovering && isVisible && (
        <motion.div
          className="fixed pointer-events-none z-45"
          style={{
            left: position.x - 40,
            top: position.y - 40,
          }}
        >
          <motion.div
            className="w-20 h-20 rounded-full border border-amber-400/30"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 0.1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}

      {/* Click Impact Effect */}
      <AnimatePresence>
        {isClicking && isVisible && (
          <motion.div
            className="fixed pointer-events-none z-45"
            style={{
              left: position.x - 20,
              top: position.y - 20,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 1, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-amber-500/80" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}