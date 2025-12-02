import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

// Real horse and rider silhouette image
function HorseRiderImage({ className = '' }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '350px',
        backgroundImage: 'url("/horse-rider-silhouette.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: 'brightness(0) saturate(100%) sepia(100%) hue-rotate(45deg) brightness(1.2) contrast(1.2)',
      }}
    />
  );
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<'silhouette' | 'fadeout'>('silhouette');

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Show silhouette for 3 seconds, then fade out
    const fadeTimer = setTimeout(() => setPhase('fadeout'), 3000);
    const completeTimer = setTimeout(handleComplete, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [handleComplete]);

  return (
    <div
      onClick={handleComplete}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F0F0F',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      {/* Animated background particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              borderRadius: '50%',
              background: 'rgba(201,162,78,0.5)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Dynamic radial glow */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
        animate={{
          background: [
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,78,0.15) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,162,78,0.25) 0%, transparent 70%)',
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,78,0.15) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content container */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '700px', padding: '0 24px' }}>
        <AnimatePresence mode="wait">
          {/* Silhouette with fadeout */}
          <motion.div
            key="silhouette"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: phase === 'fadeout' ? 0 : 1, 
              scale: phase === 'fadeout' ? 1.05 : 1 
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center' }}
          >
            {/* Silhouette image with glow */}
            <motion.div
              style={{ 
                width: '100%', 
                maxWidth: '500px', 
                margin: '0 auto',
                position: 'relative',
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 30px rgba(201,162,78,0.3))',
                  'drop-shadow(0 0 50px rgba(201,162,78,0.5))',
                  'drop-shadow(0 0 30px rgba(201,162,78,0.3))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <HorseRiderImage />
            </motion.div>
            
            {/* Connection text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === 'fadeout' ? 0 : 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                marginTop: '24px',
                color: 'rgba(201,162,78,0.9)',
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                textShadow: '0 0 20px rgba(201,162,78,0.4)',
              }}
            >
              Building Equine Dreams
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Skip hint */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          style={{
            position: 'fixed',
            bottom: '35px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#F5F4F1',
            fontSize: '12px',
            fontFamily: 'Raleway, sans-serif',
            letterSpacing: '0.15em',
          }}
        >
          Click anywhere to skip
        </motion.p>
      </div>
    </div>
  );
}
