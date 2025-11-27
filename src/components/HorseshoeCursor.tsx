import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import cursorImage from 'figma:asset/b240d68ef405df3625942c8c59e92356e413a2a6.png';

export function HorseshoeCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Smooth cursor movement with springs
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button' ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, cursorX, cursorY]);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        html, body, * {
          cursor: none !important;
        }
        @media (pointer: coarse) {
          html, body, * {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Custom horseshoe cursor */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-normal"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          {/* Outer Gold Glow on Hover */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1.7, 2.2, 1.7],
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(201,162,78,0.45) 0%, rgba(251,191,36,0.25) 50%, transparent 70%)',
                  filter: 'blur(16px)',
                  transform: 'translate(-25%, -25%)',
                  zIndex: 0,
                }}
              />
            )}
          </AnimatePresence>

          {/* Sparkle particles on hover - Golden Trail */}
          <AnimatePresence>
            {isHovering && [...Array(8)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 8;
              return (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 16,
                    y: 16,
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: 16 + Math.cos(angle) * 24,
                    y: 16 + Math.sin(angle) * 24,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: 3,
                    height: 3,
                    backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 1) 0%, rgba(245, 158, 11, 0.6) 100%)',
                    boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)',
                  }}
                />
              );
            })}
          </AnimatePresence>

          {/* Click ripple effect */}
          <AnimatePresence>
            {isClicking && (
              <motion.div
                initial={{ opacity: 0.8, scale: 0.8 }}
                animate={{ opacity: 0, scale: 2.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-amber-400"
                style={{
                  transform: 'translate(-25%, -25%)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Horseshoe cursor with refined animations */}
          <motion.div
            className="relative"
            animate={{
              scale: isClicking ? 0.88 : isHovering ? 1.18 : 1,
              rotate: isHovering ? [0, -5, 5, -5, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.18, ease: "easeOut" },
              rotate: {
                duration: 0.7,
                repeat: isHovering ? Infinity : 0,
                ease: "easeInOut",
              },
            }}
          >
            {/* Inner glow on hover */}
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, transparent 60%)',
                    filter: 'blur(8px)',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Horseshoe Image */}
            <motion.img
              src={cursorImage}
              alt=""
              className="w-8 h-8 relative"
              animate={{
                filter: isHovering 
                  ? [
                      'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                      'drop-shadow(0 0 10px rgba(251, 191, 36, 1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                      'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                    ]
                  : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
              }}
              transition={{
                duration: 1.5,
                repeat: isHovering ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            {/* Trailing effect when moving fast */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: `url(${cursorImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(4px)',
              }}
              animate={{
                opacity: [0.2, 0.1, 0.2],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}