import { useState, useEffect } from 'react';
import logoImage from 'figma:asset/3d9c8a295cf5073a32cc71d11d62be98bf8933bc.png';

interface VideoHeroProps {
  onComplete?: () => void;
  autoLoop?: boolean;
  showLogo?: boolean;
  duration?: number;
}

export function VideoHero({ showLogo = true }: VideoHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Preload the logo image
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setShowContent(true);
    };
    img.onerror = () => {
      // Show content anyway if image fails
      setShowContent(true);
    };
    img.src = logoImage;

    // Fallback - show content after 1 second regardless
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#0F0F0F] overflow-hidden px-4 py-20 sm:py-24 md:py-32">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(201,162,78,0.12) 0%, rgba(15,15,15,1) 70%)',
        }}
      />

      {/* Content */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Logo */}
        {showLogo && (
          <div className="mb-8 md:mb-12">
            <img
              src={logoImage}
              alt="Peninsula Equine"
              className={`w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] h-auto mx-auto transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                filter: 'drop-shadow(0 0 40px rgba(201,162,78,0.5))',
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}

        {/* Tagline */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display text-[#C9A24E] mb-4 md:mb-6 leading-tight"
          style={{
            textShadow: '0 0 40px rgba(201, 162, 78, 0.5)',
            fontFamily: 'Cinzel, serif',
          }}
        >
          FROM DIRT TO DYNASTY
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg sm:text-xl md:text-2xl text-[#F5F4F1]/85 max-w-2xl mx-auto leading-relaxed px-4"
          style={{
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          Building world-class equestrian facilities across Victoria
        </p>

        {/* Decorative separator */}
        <div 
          className="mt-8 md:mt-12 w-24 md:w-32 h-px mx-auto"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)',
          }}
        />

        {/* Scroll indicator */}
        <div className="mt-12 md:mt-16 flex flex-col items-center text-[#C9A24E]/50">
          <span className="text-xs sm:text-sm tracking-widest mb-3" style={{ fontFamily: 'Raleway, sans-serif' }}>
            SCROLL
          </span>
          <div className="w-px h-8 md:h-12 bg-gradient-to-b from-[#C9A24E]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default VideoHero;
