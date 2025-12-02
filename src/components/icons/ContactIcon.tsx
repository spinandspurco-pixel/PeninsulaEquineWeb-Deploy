import React from 'react';

interface ContactIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ContactIcon({ size = 32, color = '#C9A24E', className = '' }: ContactIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Envelope body */}
      <rect x="6" y="16" width="52" height="36" rx="3" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Envelope flap (V shape) */}
      <path 
        d="M6 19L32 38L58 19" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Bottom fold lines */}
      <path d="M6 52L24 38" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M58 52L40 38" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Decorative horseshoe seal */}
      <circle cx="32" cy="44" r="5" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M29 42C28 44 28 46 30 47C31 47.5 33 47.5 34 47C36 46 36 44 35 42" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
