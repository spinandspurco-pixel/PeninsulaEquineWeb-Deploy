import { useState, useEffect } from 'react';
import logoImage from 'figma:asset/3d9c8a295cf5073a32cc71d11d62be98bf8933bc.png';

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'logo' | 'tagline' | 'fadeout'>('loading');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the logo image
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setPhase('logo');
    };
    img.onerror = () => {
      // Continue even if image fails
      setPhase('logo');
    };
    img.src = logoImage;

    // Fallback if image takes too long
    const fallback = setTimeout(() => {
      if (phase === 'loading') setPhase('logo');
    }, 2000);

    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (phase === 'loading') return;

    // Phase timings
    const taglineTimer = setTimeout(() => setPhase('tagline'), 2000);
    const fadeoutTimer = setTimeout(() => setPhase('fadeout'), 4500);
    const completeTimer = setTimeout(() => onComplete(), 5500);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(fadeoutTimer);
      clearTimeout(completeTimer);
    };
  }, [phase, onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0F0F0F] cursor-pointer overflow-hidden transition-opacity duration-1000 ${phase === 'fadeout' ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleSkip}
    >
      {/* Background glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201,162,78,0.12) 0%, rgba(15,15,15,1) 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-8 text-center">
        {/* Logo */}
        <div className={`transition-all duration-1000 ${phase !== 'loading' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <img
            src={logoImage}
            alt="Peninsula Equine"
            className={`w-[70vw] max-w-[400px] sm:max-w-[450px] md:max-w-[500px] h-auto mx-auto transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              filter: 'drop-shadow(0 0 30px rgba(201,162,78,0.4))',
            }}
          />
        </div>

        {/* Tagline */}
        <div className={`mt-8 sm:mt-10 transition-all duration-700 ${phase === 'tagline' || phase === 'fadeout' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Decorative line */}
          <div 
            className="w-32 sm:w-40 h-px mx-auto mb-4"
            style={{
              background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)',
            }}
          />
          
          {/* Tagline text */}
          <h1
            className="text-xl sm:text-2xl md:text-3xl tracking-[0.15em] sm:tracking-[0.2em] text-[#C9A24E]"
            style={{
              fontFamily: 'Cinzel, serif',
              textShadow: '0 0 20px rgba(201,162,78,0.4)',
            }}
          >
            FROM DIRT TO DYNASTY
          </h1>
          
          {/* Decorative line */}
          <div 
            className="w-32 sm:w-40 h-px mx-auto mt-4"
            style={{
              background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)',
            }}
          />
        </div>

        {/* Skip hint */}
        <p className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-[#F5F4F1]/40 text-xs sm:text-sm">
          Click anywhere to skip
        </p>
      </div>
    </div>
  );
}
