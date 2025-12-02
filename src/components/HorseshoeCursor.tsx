import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

// Inline SVG horseshoe cursor
const HorseshoeSVG = ({ size = 32, glow = false }: { size?: number; glow?: boolean }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: glow 
        ? 'drop-shadow(0 0 8px rgba(201, 162, 78, 0.8)) drop-shadow(0 0 16px rgba(201, 162, 78, 0.5))' 
        : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))'
    }}
  >
    {/* Main horseshoe shape */}
    <path 
      d="M12 8C8 8 4 12 4 20C4 28 4 44 16 52C20 55 26 58 32 58C38 58 44 55 48 52C60 44 60 28 60 20C60 12 56 8 52 8C48 8 46 12 46 18C46 24 46 36 40 42C37 45 34 46 32 46C30 46 27 45 24 42C18 36 18 24 18 18C18 12 16 8 12 8Z" 
      fill="#C9A24E"
      stroke="#8B7355"
      strokeWidth="2"
    />
    {/* Nail holes */}
    <circle cx="10" cy="20" r="2" fill="#0F0F0F" />
    <circle cx="12" cy="32" r="2" fill="#0F0F0F" />
    <circle cx="18" cy="44" r="2" fill="#0F0F0F" />
    <circle cx="54" cy="20" r="2" fill="#0F0F0F" />
    <circle cx="52" cy="32" r="2" fill="#0F0F0F" />
    <circle cx="46" cy="44" r="2" fill="#0F0F0F" />
    {/* Metallic shine */}
    <path 
      d="M14 12C12 14 12 18 14 22"
      stroke="#F5F4F1"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path 
      d="M50 12C52 14 52 18 50 22"
      stroke="#F5F4F1"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

export function HorseshoeCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    if (isTouchDevice) return;

    const updateMousePosition = (e: MouseEvent) => {
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
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isInteractive);
    };

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
  }, [isVisible, cursorX, cursorY, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        html, body, * {
          cursor: none !important;
        }
        @media (pointer: coarse), (hover: none) {
          html, body, * {
            cursor: auto !important;
          }
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {/* Outer glow ring on hover */}
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1.5, 2, 1.5],
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: 32,
                    height: 32,
                    background: 'radial-gradient(circle, rgba(201,162,78,0.5) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Golden sparkle particles on hover */}
            <AnimatePresence>
              {isHovering && [...Array(6)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 6;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 16, y: 16 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: 16 + Math.cos(angle) * 28,
                      y: 16 + Math.sin(angle) * 28,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    className="absolute rounded-full"
                    style={{
                      width: 4,
                      height: 4,
                      background: '#C9A24E',
                      boxShadow: '0 0 6px #C9A24E',
                    }}
                  />
                );
              })}
            </AnimatePresence>

            {/* Click ripple */}
            <AnimatePresence>
              {isClicking && (
                <motion.div
                  initial={{ opacity: 0.8, scale: 0.8 }}
                  animate={{ opacity: 0, scale: 2.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute rounded-full border-2 border-[#C9A24E]"
                  style={{ width: 32, height: 32 }}
                />
              )}
            </AnimatePresence>

            {/* Horseshoe cursor */}
            <motion.div
              animate={{
                scale: isClicking ? 0.85 : isHovering ? 1.15 : 1,
                rotate: isHovering ? [0, -8, 8, -8, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.15 },
                rotate: { duration: 0.6, repeat: isHovering ? Infinity : 0 },
              }}
            >
              <HorseshoeSVG size={32} glow={isHovering} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
