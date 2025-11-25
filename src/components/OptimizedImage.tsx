import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
  onLoad?: () => void;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '',
  aspectRatio = '16/9',
  priority = false,
  onLoad
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (priority) {
      // Preload priority images
      const img = new Image();
      img.src = src;
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Loading skeleton */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 image-skeleton" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] border border-[#C9A24E]/20">
          <div className="text-center text-[#C9A24E]/50">
            <svg 
              className="w-12 h-12 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-xs">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {!error && (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 w-full h-full object-cover ${isLoaded ? 'loaded' : ''}`}
          style={{
            imageRendering: '-webkit-optimize-contrast',
          }}
        />
      )}
    </div>
  );
}
