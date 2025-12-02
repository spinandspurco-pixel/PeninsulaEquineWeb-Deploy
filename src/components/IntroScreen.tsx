import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImage from 'figma:asset/3d9c8a295cf5073a32cc71d11d62be98bf8933bc.png';

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'fadeout'>('logo');

  useEffect(() => {
    // Phase 1: Show logo (0-3s)
    const taglineTimer = setTimeout(() => setPhase('tagline'), 3000);
    
    // Phase 2: Show tagline (3-6s)
    const fadeoutTimer = setTimeout(() => setPhase('fadeout'), 6000);
    
    // Phase 3: Complete (6-7s)
    const completeTimer = setTimeout(() => onComplete(), 7000);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(fadeoutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0F0F] cursor-pointer overflow-hidden"
      onClick={handleSkip}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201,162,78,0.15) 0%, rgba(15,15,15,1) 70%)',
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C9A24E]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow behind logo */}
          <motion.div
            className="absolute inset-0 -inset-16 rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: 'radial-gradient(circle, rgba(201,162,78,0.4) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          
          {/* Logo image */}
          <img
            src={logoImage}
            alt="Peninsula Equine"
            className="w-[80vw] max-w-[500px] h-auto relative z-10"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(201,162,78,0.5))',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: phase === 'tagline' || phase === 'fadeout' ? 1 : 0,
            y: phase === 'tagline' || phase === 'fadeout' ? 0 : 20,
          }}
          transition={{ duration: 0.8 }}
          className="mt-8 text-center"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: phase !== 'logo' ? '100%' : 0 }}
            transition={{ duration: 0.6 }}
            className="h-px mx-auto mb-4"
            style={{
              maxWidth: '200px',
              background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)',
            }}
          />
          
          {/* Tagline text */}
          <h1
            className="text-2xl md:text-3xl font-display tracking-[0.2em] text-[#C9A24E]"
            style={{
              textShadow: '0 0 20px rgba(201,162,78,0.5)',
            }}
          >
            FROM DIRT TO DYNASTY
          </h1>
          
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: phase !== 'logo' ? '100%' : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px mx-auto mt-4"
            style={{
              maxWidth: '200px',
              background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)',
            }}
          />
        </motion.div>

        {/* Skip hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 text-[#F5F4F1]/50 text-sm"
        >
          Click anywhere to skip
        </motion.p>
      </div>
    </motion.div>
  );
}
