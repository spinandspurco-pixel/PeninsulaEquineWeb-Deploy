import { useEffect, useState, useRef } from 'react';

export function HorseshoeCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Global cursor hide style */}
      <style>{`
        @media (pointer: fine) {
          body, body * { cursor: none !important; }
        }
      `}</style>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isClicking ? 0.85 : isHovering ? 1.15 : 1})`,
          transition: 'transform 0.15s ease-out, opacity 0.2s ease',
        }}
      >
        {/* Glow effect when hovering */}
        {isHovering && (
          <div 
            className="absolute -inset-3 rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(201,162,78,0.4) 0%, transparent 70%)',
            }}
          />
        )}

        {/* Horseshoe SVG */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 48 48" 
          fill="none"
          style={{
            filter: isHovering 
              ? 'drop-shadow(0 0 12px rgba(201,162,78,1)) drop-shadow(0 0 20px rgba(201,162,78,0.6))' 
              : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            transition: 'filter 0.2s ease',
          }}
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D485" />
              <stop offset="50%" stopColor="#C9A24E" />
              <stop offset="100%" stopColor="#A88B63" />
            </linearGradient>
          </defs>
          
          {/* Main horseshoe shape */}
          <path 
            d="M8 6C5 6 3 9 3 14C3 20 3 32 12 38C16 41 20 43 24 43C28 43 32 41 36 38C45 32 45 20 45 14C45 9 43 6 40 6C37 6 35 9 35 14C35 20 35 28 30 32C28 34 26 35 24 35C22 35 20 34 18 32C13 28 13 20 13 14C13 9 11 6 8 6Z" 
            fill="url(#goldGrad)"
            stroke="#8B7355"
            strokeWidth="1"
          />
          
          {/* Nail holes */}
          <circle cx="7" cy="14" r="2" fill="#1a1a1a" />
          <circle cx="8" cy="24" r="2" fill="#1a1a1a" />
          <circle cx="41" cy="14" r="2" fill="#1a1a1a" />
          <circle cx="40" cy="24" r="2" fill="#1a1a1a" />
        </svg>

        {/* Sparkle particles when hovering */}
        {isHovering && (
          <div className="absolute inset-0">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                style={{
                  left: 16 + Math.cos((i / 6) * Math.PI * 2) * 24,
                  top: 16 + Math.sin((i / 6) * Math.PI * 2) * 24,
                  boxShadow: '0 0 6px 2px rgba(253,224,71,0.8)',
                  animation: `sparkle 0.8s ease-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sparkle animation keyframes */}
      <style>{`
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(0); }
        }
      `}</style>
    </>
  );
}
