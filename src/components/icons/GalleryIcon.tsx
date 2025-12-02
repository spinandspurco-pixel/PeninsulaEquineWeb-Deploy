interface GalleryIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function GalleryIcon({ size = 24, color = '#C9A24E', className = '' }: GalleryIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main frame */}
      <rect x="3" y="4" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Inner frame border */}
      <rect x="5" y="6" width="14" height="10" stroke={color} strokeWidth="0.5" fill="none" opacity="0.5" />
      {/* Mountain landscape */}
      <path d="M5 14L9 9L13 14L16 11L19 14V16H5V14Z" fill={color} opacity="0.3" />
      <path d="M5 14L9 9L13 14" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 14L16 11L19 14" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sun */}
      <circle cx="16" cy="8" r="1.5" fill={color} />
      {/* Stand */}
      <path d="M8 18L10 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 18L14 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
