interface LaserCutIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LaserCutIcon({ size = 24, color = '#C9A24E', className = '' }: LaserCutIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Laser beam */}
      <path 
        d="M12 2V8" 
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Rays */}
      <path d="M12 8L8 12" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M12 8L16 12" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M12 8L10 13" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <path d="M12 8L14 13" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Cut surface */}
      <rect x="4" y="14" width="16" height="8" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Cut pattern */}
      <path d="M7 17H9M11 17H13M15 17H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Impact point */}
      <circle cx="12" cy="14" r="1.5" fill={color} />
    </svg>
  );
}
