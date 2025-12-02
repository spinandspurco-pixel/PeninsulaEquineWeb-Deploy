import { useEffect, useState, useCallback } from 'react';

export function HorseshoeCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check for touch device on mount
  useEffect(() => {
    setMounted(true);
    // More reliable touch detection
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);

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

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mounted, isTouchDevice, handleMouseMove]);

  // Don't render until mounted or on touch devices
  if (!mounted || isTouchDevice) return null;

  return (
    <>
      {/* Hide default cursor on non-touch devices */}
      <style>{`
        @media (pointer: fine) {
          body { cursor: none !important; }
          a, button, [role="button"] { cursor: none !important; }
        }
      `}</style>

      {/* Custom cursor */}
      <div
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          left: position.x - 12,
          top: position.y - 12,
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isHovering ? 1.3 : 1})`,
          transition: 'transform 0.1s ease',
        }}
      >
        {/* Horseshoe SVG */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{
            filter: isHovering 
              ? 'drop-shadow(0 0 8px rgba(201,162,78,0.8))' 
              : 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
          }}
        >
          <path 
            d="M5 3C3.5 3 2 4.5 2 7C2 10 2 16 7 19C9 20.5 11 21 12 21C13 21 15 20.5 17 19C22 16 22 10 22 7C22 4.5 20.5 3 19 3C17.5 3 16.5 4.5 16.5 7C16.5 10 16.5 14 14 16C13 17 12.5 17 12 17C11.5 17 11 17 10 16C7.5 14 7.5 10 7.5 7C7.5 4.5 6.5 3 5 3Z" 
            fill="#C9A24E"
            stroke="#8B7355"
            strokeWidth="0.5"
          />
          <circle cx="4.5" cy="7" r="1" fill="#1a1a1a" />
          <circle cx="5" cy="11" r="1" fill="#1a1a1a" />
          <circle cx="19.5" cy="7" r="1" fill="#1a1a1a" />
          <circle cx="19" cy="11" r="1" fill="#1a1a1a" />
        </svg>

        {/* Glow ring when hovering */}
        {isHovering && (
          <div 
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,162,78,0.3) 0%, transparent 70%)',
            }}
          />
        )}
      </div>
    </>
  );
}
