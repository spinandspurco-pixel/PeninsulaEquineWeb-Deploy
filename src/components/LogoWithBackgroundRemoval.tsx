import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/3d9c8a295cf5073a32cc71d11d62be98bf8933bc.png';

interface LogoWithBackgroundRemovalProps {
  animate?: boolean;
  className?: string;
  filterStyle?: string;
  onHoverFilter?: string;
  onProcessed?: (dataUrl: string) => void;
}

export function LogoWithBackgroundRemoval({ 
  animate = false, 
  className = '',
  filterStyle = '',
  onHoverFilter,
  onProcessed
}: LogoWithBackgroundRemovalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImage, setProcessedImage] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = logoImage;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Remove white/light backgrounds (make them transparent)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is very light (close to white), make it transparent
        const brightness = (r + g + b) / 3;
        if (brightness > 240) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        } else if (brightness > 200) {
          // Partially transparent for light grays
          data[i + 3] = Math.floor(data[i + 3] * (240 - brightness) / 40);
        }
      }

      // Put the processed image data back
      ctx.putImageData(imageData, 0, 0);

      // Convert to data URL
      const processedDataUrl = canvas.toDataURL('image/png');
      setProcessedImage(processedDataUrl);
      setImageLoaded(true);
      
      // Notify parent component
      if (onProcessed) {
        onProcessed(processedDataUrl);
      }
    };

    img.onerror = () => {
      console.error('Failed to load logo image');
      setImageLoaded(true); // Still set to true to show original if processing fails
    };
  }, []);

  return (
    <>
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Display processed image or original */}
      <motion.img
        src={processedImage || logoImage}
        alt="Peninsula Equine - From Dirt to Dynasty"
        className={`w-full h-auto ${className}`}
        style={{
          opacity: imageLoaded ? 1 : 0,
          filter: filterStyle,
        }}
        whileHover={onHoverFilter ? { filter: onHoverFilter } : undefined}
        animate={
          animate
            ? {
                filter: [
                  filterStyle,
                  filterStyle?.replace(/brightness\([^)]+\)/, 'brightness(1.25)')
                    .replace(/contrast\([^)]+\)/, 'contrast(1.25)')
                    .replace(/saturate\([^)]+\)/, 'saturate(1.4)') || filterStyle,
                  filterStyle,
                ],
              }
            : {}
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
}