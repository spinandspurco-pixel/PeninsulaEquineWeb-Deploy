interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// Arena Icon - Professional riding arena with fence and surface detail
export function ArenaIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arenaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Outer arena border */}
      <ellipse cx="24" cy="30" rx="21" ry="13" stroke="url(#arenaGrad)" strokeWidth="2.5" fill="none" />
      {/* Inner arena track */}
      <ellipse cx="24" cy="30" rx="15" ry="9" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Arena surface texture */}
      <path d="M10 30 Q17 27 24 30 Q31 33 38 30" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      {/* Fence posts with caps */}
      <g stroke={color} strokeWidth="2" strokeLinecap="round">
        <line x1="5" y1="24" x2="5" y2="30" />
        <line x1="12" y1="19" x2="12" y2="24" />
        <line x1="24" y1="17" x2="24" y2="21" />
        <line x1="36" y1="19" x2="36" y2="24" />
        <line x1="43" y1="24" x2="43" y2="30" />
      </g>
      {/* Post caps */}
      <g fill={color}>
        <circle cx="5" cy="23" r="1.5" />
        <circle cx="12" cy="18" r="1.5" />
        <circle cx="24" cy="16" r="1.5" />
        <circle cx="36" cy="18" r="1.5" />
        <circle cx="43" cy="23" r="1.5" />
      </g>
      {/* Center marker */}
      <circle cx="24" cy="30" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

// Stable Icon - Detailed barn with Dutch doors and ventilation
export function StableIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Main roof */}
      <path d="M4 22 L24 5 L44 22" stroke="url(#roofGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Roof detail line */}
      <path d="M8 20 L24 8 L40 20" stroke={color} strokeWidth="1" opacity="0.4" fill="none" />
      {/* Barn body */}
      <rect x="7" y="22" width="34" height="22" stroke={color} strokeWidth="2" fill="none" rx="1" />
      {/* Center Dutch door */}
      <rect x="18" y="28" width="12" height="16" stroke={color} strokeWidth="2" fill="none" rx="1" />
      <line x1="18" y1="36" x2="30" y2="36" stroke={color} strokeWidth="1.5" />
      {/* Door hardware */}
      <circle cx="27" cy="32" r="1" fill={color} />
      <circle cx="27" cy="40" r="1" fill={color} />
      {/* Side windows */}
      <rect x="10" y="26" width="5" height="6" stroke={color} strokeWidth="1.5" fill="none" rx="0.5" />
      <line x1="12.5" y1="26" x2="12.5" y2="32" stroke={color} strokeWidth="1" />
      <rect x="33" y="26" width="5" height="6" stroke={color} strokeWidth="1.5" fill="none" rx="0.5" />
      <line x1="35.5" y1="26" x2="35.5" y2="32" stroke={color} strokeWidth="1" />
      {/* Hay loft vent */}
      <path d="M20 14 L24 10 L28 14" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="24" y1="10" x2="24" y2="18" stroke={color} strokeWidth="1.5" />
      {/* Weather vane */}
      <line x1="24" y1="5" x2="24" y2="2" stroke={color} strokeWidth="1.5" />
      <polygon points="24,2 22,4 26,4" fill={color} />
    </svg>
  );
}

// Round Yard Icon - Circular training pen with detail
export function RoundYardIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="24" cy="24" r="19" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Inner training circle */}
      <circle cx="24" cy="24" r="13" stroke={color} strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.4" />
      {/* Fence post markers around perimeter */}
      <g fill={color}>
        <circle cx="24" cy="5" r="2" />
        <circle cx="43" cy="24" r="2" />
        <circle cx="24" cy="43" r="2" />
        <circle cx="5" cy="24" r="2" />
        <circle cx="37.5" cy="10.5" r="2" />
        <circle cx="37.5" cy="37.5" r="2" />
        <circle cx="10.5" cy="37.5" r="2" />
        <circle cx="10.5" cy="10.5" r="2" />
      </g>
      {/* Gate opening indicator */}
      <path d="M20 5 L20 8 M28 5 L28 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Center training post */}
      <circle cx="24" cy="24" r="3" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="1" fill={color} />
    </svg>
  );
}

// Fencing Icon - Premium post and rail fence
export function FencingIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="postGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Posts with decorative caps */}
      <rect x="5" y="12" width="5" height="28" rx="1" stroke="url(#postGrad)" strokeWidth="2" fill="none" />
      <rect x="21.5" y="12" width="5" height="28" rx="1" stroke="url(#postGrad)" strokeWidth="2" fill="none" />
      <rect x="38" y="12" width="5" height="28" rx="1" stroke="url(#postGrad)" strokeWidth="2" fill="none" />
      {/* Post caps - pyramid style */}
      <path d="M5 12 L7.5 7 L10 12" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M21.5 12 L24 7 L26.5 12" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M38 12 L40.5 7 L43 12" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
      {/* Top rail */}
      <rect x="10" y="18" width="11.5" height="3" rx="0.5" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="26.5" y="18" width="11.5" height="3" rx="0.5" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Bottom rail */}
      <rect x="10" y="29" width="11.5" height="3" rx="0.5" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="26.5" y="29" width="11.5" height="3" rx="0.5" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Ground line */}
      <line x1="2" y1="42" x2="46" y2="42" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Day Yard / Shelter Icon - Run-in shelter design
export function ShelterIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Angled roof */}
      <path d="M3 16 L45 10 L45 15 L3 21 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
      {/* Roof shading */}
      <line x1="15" y1="13" x2="15" y2="19" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="30" y1="11.5" x2="30" y2="17" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Support posts */}
      <line x1="7" y1="19" x2="7" y2="42" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="41" y1="13" x2="41" y2="42" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Back wall */}
      <line x1="41" y1="15" x2="41" y2="42" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M41 15 L41 42" stroke={color} strokeWidth="8" strokeLinecap="butt" opacity="0.15" />
      {/* Ground/Base */}
      <line x1="3" y1="42" x2="45" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Horse silhouette inside */}
      <g opacity="0.4" fill={color}>
        <ellipse cx="22" cy="33" rx="8" ry="4" />
        <circle cx="16" cy="30" r="3" />
        <path d="M14 30 Q12 28 14 26" stroke={color} strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}

// Laser Cut Sign Icon - Detailed laser cutting design
export function LaserSignIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Sign board with frame */}
      <rect x="5" y="10" width="34" height="22" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <rect x="8" y="13" width="28" height="16" rx="1" stroke={color} strokeWidth="1" opacity="0.4" fill="none" />
      {/* Laser beam */}
      <line x1="42" y1="4" x2="28" y2="18" stroke="url(#laserGrad)" strokeWidth="2" strokeLinecap="round" />
      {/* Laser impact glow */}
      <circle cx="28" cy="18" r="3" fill={color} opacity="0.6" />
      <circle cx="28" cy="18" r="1.5" fill={color} />
      {/* Sparkle effects */}
      <g fill={color} opacity="0.8">
        <circle cx="25" cy="15" r="1" />
        <circle cx="31" cy="21" r="0.8" />
        <circle cx="32" cy="16" r="0.6" />
        <circle cx="26" cy="22" r="0.7" />
      </g>
      {/* Laser head */}
      <rect x="40" y="2" width="6" height="4" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Mounting posts */}
      <rect x="10" y="32" width="3" height="12" rx="0.5" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="31" y="32" width="3" height="12" rx="0.5" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Horse silhouette on sign */}
      <path d="M15 20 Q18 17 21 19 Q23 18 24 20 L22 23 Q19 24 16 22 Z" fill={color} opacity="0.6" />
    </svg>
  );
}

// Experience Icon - Premium shield with star
export function ExperienceIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Outer shield */}
      <path d="M24 3 L42 10 L42 24 Q42 38 24 45 Q6 38 6 24 L6 10 Z" stroke="url(#shieldGrad)" strokeWidth="2.5" fill="none" />
      {/* Inner shield detail */}
      <path d="M24 8 L36 13 L36 24 Q36 34 24 40 Q12 34 12 24 L12 13 Z" stroke={color} strokeWidth="1" opacity="0.3" fill="none" />
      {/* Central star */}
      <path d="M24 15 L26.5 20 L32 21 L28 25 L29 31 L24 28 L19 31 L20 25 L16 21 L21.5 20 Z" fill={color} stroke={color} strokeWidth="1" />
      {/* Decorative lines */}
      <line x1="14" y1="16" x2="18" y2="18" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="34" y1="16" x2="30" y2="18" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// Projects Icon - Blueprint with measurements
export function ProjectsIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Main document */}
      <rect x="6" y="4" width="30" height="38" rx="2" stroke={color} strokeWidth="2" fill="none" />
      {/* Rolled corner effect */}
      <path d="M36 4 L36 12 L42 12 L42 42 L10 42" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M36 4 L42 10" stroke={color} strokeWidth="2" fill="none" />
      {/* Blueprint grid lines */}
      <g stroke={color} strokeWidth="1" opacity="0.3">
        <line x1="10" y1="12" x2="32" y2="12" />
        <line x1="10" y1="20" x2="32" y2="20" />
        <line x1="10" y1="28" x2="32" y2="28" />
        <line x1="18" y1="12" x2="18" y2="36" />
      </g>
      {/* Arena plan sketch */}
      <ellipse cx="21" cy="24" rx="8" ry="5" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Dimension lines */}
      <g stroke={color} strokeWidth="1" opacity="0.6">
        <line x1="13" y1="32" x2="29" y2="32" />
        <line x1="13" y1="31" x2="13" y2="33" />
        <line x1="29" y1="31" x2="29" y2="33" />
      </g>
      {/* Pencil icon */}
      <path d="M38 20 L42 16 L44 18 L40 22 Z" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="38" y1="20" x2="40" y2="22" stroke={color} strokeWidth="1" />
    </svg>
  );
}

// Satisfaction Icon - Badge with checkmark
export function SatisfactionIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer badge circle */}
      <circle cx="24" cy="24" r="19" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Inner decorative ring */}
      <circle cx="24" cy="24" r="15" stroke={color} strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.4" />
      {/* Checkmark */}
      <path d="M14 24 L21 31 L35 17" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Decorative stars */}
      <g fill={color} opacity="0.7">
        <path d="M8 10 L9 12 L11 12 L9.5 13.5 L10 16 L8 14.5 L6 16 L6.5 13.5 L5 12 L7 12 Z" />
        <path d="M40 10 L41 12 L43 12 L41.5 13.5 L42 16 L40 14.5 L38 16 L38.5 13.5 L37 12 L39 12 Z" />
        <path d="M40 38 L41 40 L43 40 L41.5 41.5 L42 44 L40 42.5 L38 44 L38.5 41.5 L37 40 L39 40 Z" />
      </g>
    </svg>
  );
}

// Coverage/Map Icon - Victoria coverage map
export function CoverageIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Victoria state shape (simplified) */}
      <path d="M6 16 Q10 12 18 12 L36 12 Q44 12 46 18 L46 32 Q46 40 38 42 L24 44 Q14 46 8 40 Q4 34 4 26 L4 20 Q4 16 6 16 Z" stroke={color} strokeWidth="2" fill="none" />
      {/* Location pin */}
      <path d="M24 18 Q30 18 30 24 Q30 30 24 36 Q18 30 18 24 Q18 18 24 18 Z" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="3" fill={color} />
      {/* Coverage radius rings */}
      <circle cx="24" cy="26" r="8" stroke={color} strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.4" />
      <circle cx="24" cy="26" r="13" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" fill="none" opacity="0.25" />
      {/* Melbourne marker */}
      <circle cx="28" cy="32" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}

// Precision Icon - Crosshair/target
export function PrecisionIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="10" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="4" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="1.5" fill={color} />
      {/* Crosshairs */}
      <line x1="24" y1="4" x2="24" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="36" x2="24" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="24" x2="12" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="24" x2="44" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Excellence Icon - Trophy
export function ExcellenceIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Trophy cup */}
      <path d="M14 8 L34 8 L32 24 Q32 30 24 32 Q16 30 16 24 Z" stroke={color} strokeWidth="2" fill="none" />
      {/* Handles */}
      <path d="M14 12 Q6 12 6 18 Q6 24 14 24" stroke={color} strokeWidth="2" fill="none" />
      <path d="M34 12 Q42 12 42 18 Q42 24 34 24" stroke={color} strokeWidth="2" fill="none" />
      {/* Base */}
      <line x1="24" y1="32" x2="24" y2="38" stroke={color} strokeWidth="2" />
      <rect x="16" y="38" width="16" height="4" rx="1" stroke={color} strokeWidth="2" fill="none" />
      {/* Star */}
      <path d="M24 14 L25.5 17 L29 17.5 L26.5 20 L27 23.5 L24 22 L21 23.5 L21.5 20 L19 17.5 L22.5 17 Z" fill={color} />
    </svg>
  );
}

// Legacy Icon - Building heritage
export function LegacyIcon({ size = 24, color = '#C9A24E', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Main pillar */}
      <rect x="20" y="16" width="8" height="24" stroke={color} strokeWidth="2" fill="none" />
      {/* Capital */}
      <path d="M16 16 L32 16 L30 12 L18 12 Z" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Pediment */}
      <path d="M14 12 L24 4 L34 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Base */}
      <rect x="16" y="40" width="16" height="4" stroke={color} strokeWidth="2" fill="none" />
      {/* Horseshoe detail */}
      <path d="M21 26 Q24 24 27 26 Q28 28 27 30 Q24 32 21 30 Q20 28 21 26" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}
