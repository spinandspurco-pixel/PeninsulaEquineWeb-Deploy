import React from 'react';

interface ShopIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ShopIcon({ size = 32, color = '#A88B63', className = '' }: ShopIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Store awning */}
      <path 
        d="M8 24L12 8H52L56 24" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Awning scallops */}
      <path 
        d="M8 24C8 28 12 30 16 28C20 30 24 28 24 24" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M24 24C24 28 28 30 32 28C36 30 40 28 40 24" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M40 24C40 28 44 30 48 28C52 30 56 28 56 24" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      {/* Store body */}
      <rect x="10" y="28" width="44" height="28" stroke={color} strokeWidth="2" fill="none" />
      {/* Door */}
      <rect x="26" y="38" width="12" height="18" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="35" cy="48" r="1.5" fill={color} />
      {/* Window */}
      <rect x="14" y="34" width="8" height="8" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="42" y="34" width="8" height="8" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}
