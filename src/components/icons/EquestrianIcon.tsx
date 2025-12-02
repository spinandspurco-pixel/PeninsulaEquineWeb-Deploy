import React from 'react';

interface EquestrianIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function EquestrianIcon({ size = 32, color = '#A88B63', className = '' }: EquestrianIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horse head silhouette - elegant profile */}
      <path 
        d="M48 12C46 10 42 8 38 8C34 8 30 10 28 14L24 22L18 24C16 24 14 26 14 28C14 30 16 32 18 32L20 32L16 40C14 44 14 48 16 52C18 56 22 58 26 58L30 58C32 58 34 56 34 54L34 48L38 44L44 46C46 46 48 44 48 42L48 38C50 36 52 32 52 28L52 20C52 16 50 14 48 12Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Horse ear */}
      <path 
        d="M40 8L44 4L46 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Horse eye */}
      <circle cx="36" cy="20" r="2" fill={color} />
      {/* Mane detail */}
      <path 
        d="M44 14C48 16 50 20 50 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
