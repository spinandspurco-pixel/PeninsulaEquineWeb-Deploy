import React from 'react';

interface LaserCutIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LaserCutIcon({ size = 32, color = '#A88B63', className = '' }: LaserCutIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Laser beam coming down */}
      <path 
        d="M32 4L32 28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 2"
      />
      {/* Laser head/nozzle */}
      <path 
        d="M26 4L32 12L38 4"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Impact point glow */}
      <circle cx="32" cy="32" r="4" fill={color} opacity="0.6" />
      <circle cx="32" cy="32" r="2" fill={color} />
      {/* Cutting sparks */}
      <path d="M28 28L24 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 28L40 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 36L24 40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 36L40 40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Metal plate being cut */}
      <rect 
        x="12" 
        y="44" 
        width="40" 
        height="12" 
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Cut line in plate */}
      <path 
        d="M32 44L32 56"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
    </svg>
  );
}
