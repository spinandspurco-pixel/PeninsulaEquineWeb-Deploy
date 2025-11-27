import React from 'react';

export function HorseshoeIcon({ size = 32, color = '#C9A24E', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4C4 10 4 22 16 28C28 22 28 10 24 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="10" r="1.5" fill={color} />
      <circle cx="24" cy="10" r="1.5" fill={color} />
      <circle cx="10" cy="20" r="1" fill={color} />
      <circle cx="22" cy="20" r="1" fill={color} />
    </svg>
  );
}
