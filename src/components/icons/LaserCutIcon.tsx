import React from 'react';

export function LaserCutIcon({ size = 32, color = '#A88B63', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="12" width="20" height="8" rx="2" stroke={color} strokeWidth="2" />
      <path d="M16 20V28" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="28" r="2" fill={color} />
      <path d="M10 16H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
