# Converted Videos Directory

⚠️ **CURRENT STATUS: PLACEHOLDER VIDEOS ONLY**

This directory currently contains **5-second black placeholder videos** to allow the build to succeed. These need to be replaced with actual slow-motion equestrian and construction footage from Mac Photos.

This directory should contain your custom slow-motion videos that have been converted to web-optimized MP4 format.

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

## 🚀 How to Replace Placeholders with Real Videos

### Quick Method: Direct Upload via GitHub
1. Go to this directory on GitHub
2. Delete existing placeholder files (or just overwrite them)
3. Click "Add file" → "Upload files"
4. Drag and drop your 7 MP4 files from Mac Photos
5. Commit: "Replace placeholder videos with actual footage"

### Using the Processing Script
```bash
# From repository root
cd /home/runner/work/PeninsulaEquineWeb-Deploy/PeninsulaEquineWeb-Deploy

# Copy your videos to uploads folder
cp ~/Desktop/YourVideos/*.mp4 uploads/

# Process and optimize
./process-mac-photos.sh process

# Commit
git add src/assets/media/converted/*.mp4
git commit -m "Replace placeholders with actual videos"
git push
```

### Direct Copy Method
```bash
# If videos are already web-optimized, copy directly
cp /path/to/your/videos/IMG_*.mp4 .

# Verify names match exactly
ls -lh IMG_*.mp4

# Commit from repo root
cd ../../../../
git add src/assets/media/converted/*.mp4
git commit -m "Add real videos from Mac Photos"
git push
```

## Upload Instructions (Original)

1. **Locate your converted videos** - These should be the MP4 files you processed with ffmpeg/bash or exported from Mac Photos
2. **Upload them to this directory** - Use one of the methods above
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
