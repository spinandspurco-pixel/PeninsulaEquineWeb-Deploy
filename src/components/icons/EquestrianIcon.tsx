interface EquestrianIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function EquestrianIcon({ size = 24, color = '#C9A24E', className = '' }: EquestrianIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horse head silhouette */}
      <path 
        d="M4 12C4 8 6 4 10 3L12 5L11 8L14 9L16 7L18 8L20 6C20 6 21 8 21 10C21 12 20 14 18 16L16 21H14L15 17L13 16L11 19H9L10 15L7 14C5 13 4 12.5 4 12Z" 
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Eye */}
      <circle cx="15" cy="10" r="1" fill={color} />
      {/* Ear */}
      <path d="M17 5L19 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
