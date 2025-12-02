interface HorseshoeIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function HorseshoeIcon({ size = 24, color = '#C9A24E', className = '' }: HorseshoeIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5 3C3.5 3 2 4.5 2 7C2 10 2 16 7 19C9 20.5 11 21 12 21C13 21 15 20.5 17 19C22 16 22 10 22 7C22 4.5 20.5 3 19 3C17.5 3 16.5 4.5 16.5 7C16.5 10 16.5 14 14 16C13 17 12.5 17 12 17C11.5 17 11 17 10 16C7.5 14 7.5 10 7.5 7C7.5 4.5 6.5 3 5 3Z" 
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="4.5" cy="7" r="1" fill={color} />
      <circle cx="5" cy="11" r="1" fill={color} />
      <circle cx="19.5" cy="7" r="1" fill={color} />
      <circle cx="19" cy="11" r="1" fill={color} />
    </svg>
  );
}
