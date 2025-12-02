import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HorseshoeCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [trail, setTrail] = useState<{x: number; y: number; id: number}[]>([]);

  // Check for touch device on mount
  useEffect(() => {
    setMounted(true);
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newPos = { x: e.clientX, y: e.clientY };
    setPosition(newPos);
    setIsVisible(true);

    // Add trail particle
    setTrail(prev => {
      const newTrail = [...prev, { ...newPos, id: Date.now() }].slice(-6);
      return newTrail;
    });

    const target = e.target as HTMLElement;
    const isInteractive = 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.closest('a') !== null || 
      target.closest('button') !== null ||
      target.getAttribute('role') === 'button' ||
      window.getComputedStyle(target).cursor === 'pointer';
    
    setIsHovering(isInteractive);
  }, []);

  useEffect(() => {
    if (!mounted || isTouchDevice) return;

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mounted, isTouchDevice, handleMouseMove]);

  // Clean up trail
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.filter(p => Date.now() - p.id < 200));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || isTouchDevice) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        @media (pointer: fine) {
          body { cursor: none !important; }
          a, button, [role="button"], input, textarea, select { cursor: none !important; }
        }
      `}</style>

      {/* Trail particles */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.5, scale: 0.5 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              left: point.x - 3,
              top: point.y - 3,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: `rgba(201,162,78,${0.3 - index * 0.04})`,
              pointerEvents: 'none',
              zIndex: 99998,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor */}
      <motion.div
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          left: position.x - 16,
          top: position.y - 16,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : isHovering ? 1.2 : 1,
          rotate: isHovering ? 15 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Premium Horseshoe SVG */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 48 48" 
          fill="none"
          style={{
            filter: isHovering 
              ? 'drop-shadow(0 0 12px rgba(201,162,78,0.9)) drop-shadow(0 0 4px rgba(201,162,78,0.6))' 
              : 'drop-shadow(0 2px 4px rgba(0,0,0,0.4)) drop-shadow(0 0 2px rgba(201,162,78,0.3))',
          }}
        >
          <defs>
            {/* Premium gold gradient */}
            <linearGradient id="horseshoeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8D5A3" />
              <stop offset="25%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#C9A24E" />
              <stop offset="75%" stopColor="#B8963F" />
              <stop offset="100%" stopColor="#9A7B30" />
            </linearGradient>
            {/* Inner shadow gradient */}
            <linearGradient id="innerShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B7355" />
              <stop offset="100%" stopColor="#5D4E37" />
            </linearGradient>
            {/* Highlight gradient */}
            <linearGradient id="highlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFF8E7" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Main horseshoe shape - realistic proportions */}
          <path 
            d="M10 8C6 8 4 12 4 17C4 24 5 34 14 40C18 43 22 44 24 44C26 44 30 43 34 40C43 34 44 24 44 17C44 12 42 8 38 8C34 8 32 12 32 17C32 24 31 30 28 33C26 35 25 35 24 35C23 35 22 35 20 33C17 30 16 24 16 17C16 12 14 8 10 8Z" 
            fill="url(#horseshoeGold)"
            stroke="#7A6940"
            strokeWidth="1"
          />
          
          {/* Inner edge detail */}
          <path 
            d="M14 12C12 12 11 14 11 17C11 22 12 30 17 35C20 38 22 39 24 39C26 39 28 38 31 35C36 30 37 22 37 17C37 14 36 12 34 12C32 12 30 14 30 17C30 25 29 32 26 35C25 36 24.5 36 24 36C23.5 36 23 36 22 35C19 32 18 25 18 17C18 14 16 12 14 12Z" 
            fill="none"
            stroke="url(#innerShadow)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          {/* Top highlight */}
          <path 
            d="M12 10C10 10 8 12 8 15C8 16 8 17 8.5 18"
            stroke="url(#highlight)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path 
            d="M36 10C38 10 40 12 40 15C40 16 40 17 39.5 18"
            stroke="url(#highlight)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Nail holes - realistic placement and detail */}
          <g>
            {/* Left side nails */}
            <ellipse cx="9" cy="16" rx="2.5" ry="2.5" fill="#1C1C1C" />
            <ellipse cx="9" cy="16" rx="1.5" ry="1.5" fill="#2D2D2D" />
            
            <ellipse cx="10" cy="24" rx="2.5" ry="2.5" fill="#1C1C1C" />
            <ellipse cx="10" cy="24" rx="1.5" ry="1.5" fill="#2D2D2D" />
            
            <ellipse cx="12" cy="32" rx="2.5" ry="2.5" fill="#1C1C1C" />
            <ellipse cx="12" cy="32" rx="1.5" ry="1.5" fill="#2D2D2D" />
            
            {/* Right side nails */}
            <ellipse cx="39" cy="16" rx="2.5" ry="2.5" fill="#1C1C1C" />
            <ellipse cx="39" cy="16" rx="1.5" ry="1.5" fill="#2D2D2D" />
            
            <ellipse cx="38" cy="24" rx="2.5" ry="2.5" fill="#1C1C1C" />
            <ellipse cx="38" cy="24" rx="1.5" ry="1.5" fill="#2D2D2D" />
            
            <ellipse cx="36" cy="32" rx="2.5" ry="2.5" fill="#1C1C1C" />
            <ellipse cx="36" cy="32" rx="1.5" ry="1.5" fill="#2D2D2D" />
          </g>
          
          {/* Subtle wear texture lines */}
          <g opacity="0.15" stroke="#5D4E37" strokeWidth="0.5">
            <path d="M7 14 Q10 15 7 18" />
            <path d="M41 14 Q38 15 41 18" />
            <path d="M8 26 Q11 27 9 29" />
            <path d="M40 26 Q37 27 39 29" />
          </g>
        </svg>

        {/* Glow ring on hover */}
        <AnimatePresence>
          {isHovering && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,162,78,0.25) 0%, transparent 65%)',
                border: '1px solid rgba(201,162,78,0.3)',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
