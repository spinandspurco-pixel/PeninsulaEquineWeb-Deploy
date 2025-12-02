interface FenceIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function FenceIcon({ size = 24, color = '#C9A24E', className = '' }: FenceIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fence posts */}
      <path d="M4 6V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 6V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M20 6V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Post tops */}
      <path d="M4 6L5 4L6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M12 6L13 4L14 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M20 6L21 4L22 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Rails */}
      <path d="M2 10H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 15H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
