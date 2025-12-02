import React from 'react';

interface HorseshoeIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function HorseshoeIcon({ size = 32, color = '#C9A24E', className = '' }: HorseshoeIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main horseshoe shape - classic U shape */}
      <path 
        d="M12 8C8 8 4 12 4 20C4 28 4 44 16 52C20 55 26 58 32 58C38 58 44 55 48 52C60 44 60 28 60 20C60 12 56 8 52 8C48 8 46 12 46 18C46 24 46 36 40 42C37 45 34 46 32 46C30 46 27 45 24 42C18 36 18 24 18 18C18 12 16 8 12 8Z" 
        stroke={color} 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      {/* Nail holes - 3 on each side */}
      <circle cx="10" cy="20" r="2.5" fill={color} />
      <circle cx="12" cy="32" r="2.5" fill={color} />
      <circle cx="18" cy="44" r="2.5" fill={color} />
      <circle cx="54" cy="20" r="2.5" fill={color} />
      <circle cx="52" cy="32" r="2.5" fill={color} />
      <circle cx="46" cy="44" r="2.5" fill={color} />
    </svg>
  );
}
