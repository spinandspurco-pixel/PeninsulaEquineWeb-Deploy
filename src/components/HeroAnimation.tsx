import React, { useEffect, useRef } from 'react';
import { RopeLogo } from './RopeLogo';

export function HeroAnimation() {
  const hoofRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hoofprint and logo fade-in
    setTimeout(() => {
      if (hoofRef.current) hoofRef.current.style.opacity = '1';
    }, 1800);
    setTimeout(() => {
      if (logoRef.current) logoRef.current.style.opacity = '1';
    }, 3500);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#0F0F0F] overflow-hidden">
      {/* Horse running animation (SVG placeholder) */}
      <svg width="400" height="200" viewBox="0 0 400 200" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'horseRun 2.5s linear forwards' }}>
        <ellipse cx="80" cy="160" rx="60" ry="20" fill="#c2b280" />
        <circle cx="120" cy="120" r="40" fill="#8d5524" />
        <rect x="140" y="100" width="80" height="20" fill="#8d5524" rx="10" />
        {/* Simple horse shape, replace with better SVG if available */}
      </svg>
      {/* Hoofprint in sand */}
      <div ref={hoofRef} style={{ opacity: 0, transition: 'opacity 1s' }} className="absolute left-1/2 top-[70%] -translate-x-1/2 w-16 h-16">
        <svg width="64" height="64" viewBox="0 0 64 64">
          <ellipse cx="32" cy="48" rx="18" ry="8" fill="#a89c7c" />
          <ellipse cx="32" cy="48" rx="12" ry="5" fill="#6e5c3a" />
        </svg>
      </div>
      {/* Logo fade-in */}
      <div ref={logoRef} style={{ opacity: 0, transition: 'opacity 2s' }} className="absolute left-1/2 top-[40%] -translate-x-1/2">
        <RopeLogo animate={true} />
      </div>
      <style>{`
        @keyframes horseRun {
          0% { transform: translateX(-200px); opacity: 0; }
          60% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
