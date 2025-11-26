# Converted Videos Directory

This directory contains your custom slow-motion videos that have been converted to web-optimized MP4 format.

## Required Video Files

The following video files need to be placed in this directory for the website to work:

### HomePage Hero Videos (3 files)
These rotate in the main hero section:
- `IMG_1351.mp4` - Horse/equestrian footage (slow-motion)
- `IMG_1354.mp4` - Horse/equestrian footage (slow-motion)
- `IMG_2975.mp4` - Horse/equestrian footage (slow-motion)

### ConstructionsPage Videos (4 files)
These showcase the construction process:
- `IMG_0014.mp4` - Construction footage
- `IMG_0015.mp4` - Construction footage
- `IMG_1021.mp4` - Construction footage
- `IMG_2461.mp4` - Construction footage

## Upload Instructions

1. **Locate your converted videos** - These should be the MP4 files you processed with ffmpeg/bash
2. **Upload them to this directory** - Use git to add them to the repository
3. **Verify the names match exactly** - The code references these specific filenames
4. **Commit and push** - Once uploaded, the videos will display on your site

## File Size Recommendations

- Keep each video under 10MB if possible
- Use H.264 codec with AAC audio
- Resolution: 1920x1080 (1080p) maximum
- Frame rate: 24-30 fps

## Testing

After uploading, run `npm run build` to verify:
- Videos are properly imported
- Build completes successfully
- File sizes are reasonable

---

**Note**: These videos were previously processed with slow-motion effects using bash/ffmpeg scripts.
