import { useState, useEffect } from 'react';
import logoImage from 'figma:asset/3d9c8a295cf5073a32cc71d11d62be98bf8933bc.png';

interface VideoHeroProps {
  onComplete?: () => void;
  autoLoop?: boolean;
  showLogo?: boolean;
  duration?: number;
}

export function VideoHero({ showLogo = true }: VideoHeroProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure render
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F0F0F',
        overflow: 'hidden',
        padding: '80px 16px 40px',
      }}
    >
      {/* Background gradient */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(201,162,78,0.12) 0%, rgba(15,15,15,1) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Logo */}
        {showLogo && (
          <div style={{ marginBottom: '32px' }}>
            <img
              src={logoImage}
              alt="Peninsula Equine"
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                margin: '0 auto',
                filter: 'drop-shadow(0 0 40px rgba(201,162,78,0.5))',
              }}
            />
          </div>
        )}

        {/* Tagline */}
        <h1 
          style={{
            fontSize: 'clamp(1.75rem, 6vw, 4rem)',
            color: '#C9A24E',
            marginBottom: '16px',
            lineHeight: 1.2,
            fontFamily: 'Cinzel, serif',
            fontWeight: 600,
            textShadow: '0 0 40px rgba(201, 162, 78, 0.5)',
          }}
        >
          FROM DIRT TO DYNASTY
        </h1>

        {/* Subtitle */}
        <p 
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'rgba(245,244,241,0.85)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontFamily: 'Raleway, sans-serif',
            padding: '0 16px',
          }}
        >
          Building world-class equestrian facilities across Victoria
        </p>

        {/* Decorative separator */}
        <div 
          style={{
            marginTop: '40px',
            width: '100px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)',
          }}
        />

        {/* Scroll indicator */}
        <div 
          style={{
            marginTop: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'rgba(201,162,78,0.5)',
          }}
        >
          <span 
            style={{ 
              fontSize: '12px', 
              letterSpacing: '0.2em', 
              marginBottom: '12px',
              fontFamily: 'Raleway, sans-serif',
            }}
          >
            SCROLL
          </span>
          <div 
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(201,162,78,0.5), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default VideoHero;
