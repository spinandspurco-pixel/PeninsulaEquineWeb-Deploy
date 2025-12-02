import { useState, useEffect, useCallback } from 'react';
import logoImage from 'figma:asset/3d9c8a295cf5073a32cc71d11d62be98bf8933bc.png';

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [showTagline, setShowTagline] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Show tagline after 2 seconds
    const taglineTimer = setTimeout(() => setShowTagline(true), 2000);
    
    // Start fade out after 4 seconds
    const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
    
    // Complete after 5 seconds
    const completeTimer = setTimeout(handleComplete, 5000);

    return () => {
      clearTimeout(taglineTimer);
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
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease',
      }}
    >
      {/* Background glow */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(201,162,78,0.15) 0%, rgba(15,15,15,1) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>
        {/* Logo */}
        <img
          src={logoImage}
          alt="Peninsula Equine"
          style={{
            width: '70vw',
            maxWidth: '450px',
            height: 'auto',
            margin: '0 auto',
            filter: 'drop-shadow(0 0 30px rgba(201,162,78,0.5))',
          }}
        />

        {/* Tagline */}
        <div 
          style={{
            marginTop: '32px',
            opacity: showTagline ? 1 : 0,
            transform: showTagline ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <div 
            style={{
              width: '160px',
              height: '1px',
              margin: '0 auto 16px',
              background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)',
            }}
          />
          
          <h1
            style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
              letterSpacing: '0.2em',
              color: '#C9A24E',
              fontFamily: 'Cinzel, serif',
              textShadow: '0 0 20px rgba(201,162,78,0.5)',
              margin: 0,
            }}
          >
            FROM DIRT TO DYNASTY
          </h1>
          
          <div 
            style={{
              width: '160px',
              height: '1px',
              margin: '16px auto 0',
              background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)',
            }}
          />
        </div>

        {/* Skip hint */}
        <p 
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(245,244,241,0.4)',
            fontSize: '14px',
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          Click anywhere to skip
        </p>
      </div>
    </div>
  );
}
