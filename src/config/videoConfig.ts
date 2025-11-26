/**
 * Video Configuration
 * 
 * This file handles video URLs, supporting both:
 * 1. CDN/external hosting (recommended for production)
 * 2. Local videos via Git LFS (fallback for development)
 * 
 * Configuration via environment variables in .env:
 * - VITE_VIDEO_CDN_ENABLED=true (to use CDN)
 * - VITE_VIDEO_CDN_URL=https://your-cdn.com/path (base CDN URL)
 */

export interface VideoConfig {
  heroVideos: string[];
  constructionVideos: string[];
}

/**
 * Get the full URL for a video file
 * Priority: CDN > Environment Variable > Local Import Path
 */
export const getVideoUrl = (filename: string): string => {
  // Check if CDN is enabled
  const cdnEnabled = import.meta.env.VITE_VIDEO_CDN_ENABLED === 'true';
  const cdnBaseUrl = import.meta.env.VITE_VIDEO_CDN_URL;
  
  if (cdnEnabled && cdnBaseUrl) {
    // Remove trailing slash from base URL if present
    const baseUrl = cdnBaseUrl.replace(/\/$/, '');
    return `${baseUrl}/${filename}`;
  }
  
  // Check for individual video URL override
  const videoEnvKey = `VITE_VIDEO_${filename.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`;
  const videoUrl = import.meta.env[videoEnvKey];
  
  if (videoUrl) {
    return videoUrl;
  }
  
  // Fallback to local path (will be resolved by Vite)
  // In production build, Vite will handle these imports
  return `/src/assets/media/converted/${filename}`;
};

/**
 * Video configuration for the application
 */
export const videoConfig: VideoConfig = {
  // HomePage Hero videos (3 videos that rotate)
  heroVideos: [
    getVideoUrl('IMG_1351.mp4'),
    getVideoUrl('IMG_1354.mp4'),
    getVideoUrl('IMG_2975.mp4'),
  ],
  
  // ConstructionsPage showcase videos (4 videos)
  constructionVideos: [
    getVideoUrl('IMG_0014.mp4'),
    getVideoUrl('IMG_0015.mp4'),
    getVideoUrl('IMG_1021.mp4'),
    getVideoUrl('IMG_2461.mp4'),
  ],
};

/**
 * Get all video URLs (useful for preloading or checking availability)
 */
export const getAllVideoUrls = (): string[] => {
  return [
    ...videoConfig.heroVideos,
    ...videoConfig.constructionVideos,
  ];
};

/**
 * Check if CDN is enabled
 */
export const isCdnEnabled = (): boolean => {
  return import.meta.env.VITE_VIDEO_CDN_ENABLED === 'true';
};

/**
 * Get CDN base URL if configured
 */
export const getCdnBaseUrl = (): string | undefined => {
  return import.meta.env.VITE_VIDEO_CDN_URL;
};
