import React from 'react';

interface FenceIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function FenceIcon({ size = 32, color = '#A88B63', className = '' }: FenceIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fence posts */}
      <rect x="8" y="16" width="6" height="40" rx="1" stroke={color} strokeWidth="2" fill="none" />
      <rect x="29" y="16" width="6" height="40" rx="1" stroke={color} strokeWidth="2" fill="none" />
      <rect x="50" y="16" width="6" height="40" rx="1" stroke={color} strokeWidth="2" fill="none" />
      {/* Post tops (pointed) */}
      <path d="M8 16L11 8L14 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 16L32 8L35 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 16L53 8L56 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Horizontal rails */}
      <path d="M4 28H60" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 42H60" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
