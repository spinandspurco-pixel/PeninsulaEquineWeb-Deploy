import React from 'react';

export function EquestrianIcon({ size = 32, color = '#8d5524', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="24" rx="10" ry="6" fill={color} />
      <circle cx="16" cy="12" r="6" fill={color} />
      <rect x="12" y="18" width="8" height="4" rx="2" fill={color} />
      <rect x="14" y="8" width="4" height="8" rx="2" fill={color} />
    </svg>
  );
}
