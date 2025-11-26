# 📸 Media Upload Guide for Mac Photos

This guide explains how to upload and process images and videos from Mac Photos for the Peninsula Equine Website.

## 🎯 Overview

The website requires **7 specific video files** to display properly:

### Hero Videos (HomePage - rotating background)
1. `IMG_1351.mp4` - Slow-motion equestrian footage
2. `IMG_1354.mp4` - Slow-motion equestrian footage  
3. `IMG_2975.mp4` - Slow-motion equestrian footage

### Construction Videos (Constructions Page - hover to play)
4. `IMG_0014.mp4` - Foundation & Groundwork
5. `IMG_0015.mp4` - Construction Process
6. `IMG_1021.mp4` - Detail Work
7. `IMG_2461.mp4` - Project Completion

## 📋 Prerequisites

### On Your Mac (where Mac Photos is)

1. **Export videos from Mac Photos**:
   - Open Mac Photos app
   - Select the videos listed above
   - File → Export → Export Unmodified Original
   - Save to a folder (e.g., Desktop/PeninsulaEquineVideos)

2. **Install ffmpeg** (for video conversion):
   ```bash
   brew install ffmpeg
   ```

3. **Optional: Pre-convert videos** (to reduce file size):
   ```bash
   # Navigate to your exported videos folder
   cd ~/Desktop/PeninsulaEquineVideos
   
   # Convert each video (repeat for each file)
   ffmpeg -i IMG_1351.MOV \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease" \
       -c:v libx264 -preset medium -crf 23 \
       -movflags +faststart -pix_fmt yuv420p \
       IMG_1351.mp4
   ```

## 🚀 Upload Methods

### Method 1: GitHub Web Interface (Easiest)

1. **Navigate to the repository on GitHub**:
   - Go to `src/assets/media/converted/`

2. **Upload files**:
   - Click "Add file" → "Upload files"
   - Drag and drop all 7 MP4 files
   - Add commit message: "Add slow-motion videos"
   - Click "Commit changes"

3. **Wait for upload to complete**:
   - GitHub will show upload progress
   - Large files may take several minutes

### Method 2: Git Command Line

1. **Clone the repository** (if not already):
   ```bash
   git clone https://github.com/spinandspurco-pixel/PeninsulaEquineWeb-Deploy.git
   cd PeninsulaEquineWeb-Deploy
   ```

2. **Copy your videos**:
   ```bash
   # Copy from wherever you exported them
   cp ~/Desktop/PeninsulaEquineVideos/*.mp4 src/assets/media/converted/
   ```

3. **Commit and push**:
   ```bash
   git add src/assets/media/converted/*.mp4
   git commit -m "Add slow-motion videos for website"
   git push
   ```

### Method 3: Using the Processing Script (Advanced)

This repository includes a script to help process and optimize media files:

1. **Place your videos in the uploads folder**:
   ```bash
   mkdir -p uploads
   cp ~/Desktop/PeninsulaEquineVideos/*.mp4 uploads/
   ```

2. **Run the processing script**:
   ```bash
   ./process-mac-photos.sh process
   ```

3. **Check status**:
   ```bash
   ./process-mac-photos.sh status
   ```

4. **Commit the processed files**:
   ```bash
   git add src/assets/media/converted/*.mp4
   git commit -m "Add optimized slow-motion videos"
   git push
   ```

## ⚙️ Using the Processing Script

The `process-mac-photos.sh` script provides several features:

### Check Status
See which media files are present and which are missing:
```bash
./process-mac-photos.sh status
```

### Process Uploads
Automatically convert and optimize videos:
```bash
./process-mac-photos.sh process
```

### Get Help
```bash
./process-mac-photos.sh help
```

## 📊 File Requirements

### Videos
- **Format**: MP4 (H.264)
- **Resolution**: 1920x1080 or similar
- **Target Size**: Under 10MB per video
- **Optimization**: Fast-start enabled for web streaming
- **Audio**: Not required (videos will be muted)

### Images
- **Format**: PNG or JPG
- **Size**: Optimized for web (under 3MB recommended)
- **Already in repo**: 4 PNG files are already committed

## 🔍 Troubleshooting

### "File too large" error

If GitHub rejects files over 100MB:

1. **Use Git LFS**:
   ```bash
   git lfs install
   git lfs track "*.mp4"
   git add .gitattributes
   ```

2. **Or compress videos more**:
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow output.mp4
   ```

### Videos won't play on iPhone

Make sure videos are properly encoded:
```bash
ffmpeg -i input.mov \
    -c:v libx264 -profile:v baseline -level 3.0 \
    -pix_fmt yuv420p -movflags +faststart \
    output.mp4
```

### Can't find Mac Photos exports

1. Open Mac Photos
2. Select a video
3. File → Show Referenced File in Finder
4. This shows where Photos stores the original

## ✅ Verification

After uploading, verify your videos are working:

1. **Check GitHub**:
   - Navigate to `src/assets/media/converted/`
   - You should see all 7 MP4 files

2. **Check the code**:
   - `VideoHero.tsx` imports 3 hero videos
   - `ConstructionVideoShowcase.tsx` imports 4 construction videos

3. **Build and test locally**:
   ```bash
   npm install
   npm run build
   npm run preview
   ```

4. **Deploy and test**:
   - Merge your PR
   - Deploy to Vercel
   - Visit the live site and check:
     - HomePage hero video rotates through 3 videos
     - Constructions page shows 4 videos that play on hover

## 📝 Notes

- **File naming is critical**: The code expects exact filenames (IMG_1351.mp4, etc.)
- **Video optimization matters**: Smaller files = faster loading
- **Test on mobile**: Ensure videos work on iOS Safari and Android Chrome
- **Consider bandwidth**: 7 videos × 10MB = 70MB total data to download

## 🆘 Getting Help

If you encounter issues:

1. **Check the status**:
   ```bash
   ./process-mac-photos.sh status
   ```

2. **Review the logs**:
   - The processing script shows detailed conversion progress
   - Look for ffmpeg errors

3. **Open an issue**:
   - Include the error message
   - Specify which video is problematic
   - Include file size and format details

## 🔄 Future Uploads

When you need to add more media in the future:

1. Export from Mac Photos
2. Convert to web-optimized MP4
3. Place in `uploads/` folder
4. Run `./process-mac-photos.sh process`
5. Commit and push the processed files

---

**Current Status**: 
- ✅ Images: 4 PNG files committed
- ⚠️ Videos: 7 MP4 files needed
- ✅ Code: Ready and configured
- 📦 Script: Available for processing
