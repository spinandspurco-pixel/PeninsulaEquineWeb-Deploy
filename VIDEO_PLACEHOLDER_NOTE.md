# Video Placeholder Information

## Current Status
The website is currently using placeholder videos from Mixkit CDN for demonstration purposes. This allows the site to build and deploy successfully while you prepare your custom videos.

## Placeholder Videos Used

### Hero Section (VideoHero.tsx)
- Horse running in slow motion
- Horse eating grass in slow motion
- Horses grazing in field

### Construction Showcase (ConstructionVideoShowcase.tsx)
- Construction workers on building site
- Construction site with workers
- Builders working on construction
- Construction workers on building

## How to Replace with Your Custom Videos

Once your custom videos are ready:

1. **Upload Videos**: Place your converted .mp4 files in `src/assets/media/converted/` with these exact names:
   - HomePage Hero: `IMG_1351.mp4`, `IMG_1354.mp4`, `IMG_2975.mp4`
   - Constructions: `IMG_0014.mp4`, `IMG_0015.mp4`, `IMG_1021.mp4`, `IMG_2461.mp4`

2. **Update Components**: Edit these files to import local videos instead of CDN URLs:
   - `src/components/VideoHero.tsx` (lines 6-8)
   - `src/components/ConstructionVideoShowcase.tsx` (lines 5-8)

3. **Change from**:
   ```typescript
   const heroVideo1 = 'https://assets.mixkit.co/...';
   ```
   
   **To**:
   ```typescript
   import heroVideo1 from '../assets/media/converted/IMG_1351.mp4';
   ```

4. **Update .gitignore**: Remove the line `src/assets/media/videos/` if you want to commit videos to git (not recommended for large files)

5. **Build and Deploy**: Run `npm run build` to verify everything works

## Recommended: Use Cloud Storage for Videos

For better performance and smaller repository size:

1. Upload videos to Cloudflare R2, AWS S3, or Vercel Blob
2. Use the CDN URLs in the components (like current placeholders)
3. This keeps your git repository light and improves loading speeds

## Video Specifications

For optimal performance:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (1080p) max
- **File Size**: Under 10MB per video
- **Frame Rate**: 24-30 fps
- **Bitrate**: 2-5 Mbps

## Current Deployment Status

✅ Build completes successfully with placeholder videos
✅ Site deploys to Vercel without issues
✅ All navigation and functionality works
✅ Ready for production with your custom videos when available
