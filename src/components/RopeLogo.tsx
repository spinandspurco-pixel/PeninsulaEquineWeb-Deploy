import { motion } from 'framer-motion';
import logoImage from 'figma:asset/3d9c8a295cf5073a32cc71d11d62be98bf8933bc.png';

interface RopeLogoProps {
  animate?: boolean;
  className?: string;
}

export function RopeLogo({ animate = false, className = '' }: RopeLogoProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow behind logo */}
      <motion.div
        className="absolute inset-0 -inset-8"
        animate={{
          opacity: animate ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
          scale: animate ? [0.9, 1.1, 0.9] : [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: animate ? 4 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(201,162,78,0.5) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Logo image */}
      <motion.img
        src={logoImage}
        alt="Peninsula Equine"
        className="relative z-10 w-full max-w-[400px] h-auto"
        initial={animate ? { opacity: 0, scale: 0.9, y: 20 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: animate ? 1.5 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          filter: 'drop-shadow(0 0 20px rgba(201,162,78,0.4))',
        }}
      />

      {/* Shimmer effect */}
      {animate && (
        <motion.div
          className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="absolute inset-0 w-[200%]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              transform: 'skewX(-20deg)',
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              delay: 1.5,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
