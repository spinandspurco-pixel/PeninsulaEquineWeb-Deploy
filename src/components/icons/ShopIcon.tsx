interface ShopIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ShopIcon({ size = 24, color = '#C9A24E', className = '' }: ShopIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shop building */}
      <rect x="3" y="10" width="18" height="12" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Awning */}
      <path d="M2 10C2 10 4 7 6 7C8 7 8 10 10 10C12 10 12 7 14 7C16 7 16 10 18 10C20 10 22 7 22 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Roof */}
      <path d="M3 7L12 3L21 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Door */}
      <rect x="10" y="15" width="4" height="7" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Windows */}
      <rect x="5" y="13" width="3" height="3" stroke={color} strokeWidth="1" fill="none" />
      <rect x="16" y="13" width="3" height="3" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}
