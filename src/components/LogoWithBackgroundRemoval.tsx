import React, { useEffect, useRef, useState } from 'react';
import logoImage from 'figma:asset/3d9c8a295cf5073a32cc71d11d62be98bf8933bc.png';

interface LogoWithBackgroundRemovalProps {
  animate?: boolean;
  className?: string;
  filterStyle?: string;
}

export function LogoWithBackgroundRemoval({ 
  className = '',
  filterStyle = '',
}: LogoWithBackgroundRemovalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImage, setProcessedImage] = useState<string>('');

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = logoImage;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Remove white/light backgrounds
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;
        
        if (brightness > 245) {
          data[i + 3] = 0;
        } else if (brightness > 220) {
          data[i + 3] = Math.floor(255 * (245 - brightness) / 25);
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL('image/png'));
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {processedImage && (
        <img
          src={processedImage}
          alt="Peninsula Equine"
          className={`w-full h-auto ${className}`}
          style={{
            filter: filterStyle,
            transition: 'filter 0.5s ease, transform 0.5s ease, opacity 0.5s ease',
          }}
        />
      )}
    </>
  );
}