interface ContactIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ContactIcon({ size = 24, color = '#C9A24E', className = '' }: ContactIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Envelope */}
      <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Envelope flap */}
      <path d="M2 7L12 13L22 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bottom folds */}
      <path d="M2 17L8 12" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M22 17L16 12" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
