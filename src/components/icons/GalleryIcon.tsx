import React from 'react';

interface GalleryIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function GalleryIcon({ size = 32, color = '#A88B63', className = '' }: GalleryIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main photo frame */}
      <rect x="8" y="12" width="36" height="28" rx="2" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Photo inside - mountain landscape */}
      <path d="M12 36L20 26L28 34L34 28L40 36" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sun */}
      <circle cx="36" cy="20" r="3" fill={color} />
      {/* Stacked photos behind */}
      <rect x="16" y="8" width="36" height="28" rx="2" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      <rect x="20" y="44" width="36" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
      {/* Caption lines */}
      <path d="M24 50H48" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 54H44" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
