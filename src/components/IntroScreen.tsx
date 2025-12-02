import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

// Professional horse and rider silhouette SVG
function HorseRiderSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      style={{
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        fill: '#C9A24E',
        filter: 'drop-shadow(0 0 20px rgba(201,162,78,0.4))',
      }}
    >
      {/* Horse silhouette */}
      <path d="M50 250 C60 240, 80 230, 100 235 C120 240, 140 245, 160 240 C180 235, 200 230, 220 235 C240 240, 260 245, 280 240 C300 235, 320 240, 340 250 L340 260 C320 255, 300 250, 280 255 C260 260, 240 265, 220 260 C200 255, 180 250, 160 255 C140 260, 120 265, 100 260 C80 255, 60 260, 50 270 Z" />
      {/* Horse head and neck */}
      <path d="M340 250 C350 240, 360 220, 365 200 C370 180, 368 160, 360 150 C355 145, 350 142, 345 145 L340 155 C338 165, 336 175, 335 185 C334 195, 333 205, 332 215 L335 225 C337 235, 339 245, 340 250" />
      {/* Horse legs */}
      <path d="M80 260 L82 280 L78 280 L76 260 M120 255 L122 275 L118 275 L116 255 M200 255 L202 275 L198 275 L196 255 M280 255 L282 275 L278 275 L276 255" />
      {/* Rider silhouette */}
      <path d="M200 235 C205 225, 210 215, 215 210 C220 205, 225 200, 230 205 C235 210, 240 220, 245 230 C250 235, 248 240, 245 245 C240 250, 235 248, 230 245 C225 240, 220 238, 215 240 C210 242, 205 240, 200 235" />
      {/* Rider head */}
      <circle cx="225" cy="195" r="8" />
      {/* Reins */}
      <path d="M230 205 Q320 180, 350 155" stroke="#C9A24E" strokeWidth="1" fill="none" />
    </svg>
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
                maxWidth: '400px', 
                margin: '0 auto 32px auto',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HorseRiderSilhouette />
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
