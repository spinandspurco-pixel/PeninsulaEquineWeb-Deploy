# 🎬 Video Hosting Guide - Fast Alternative to Git LFS

## ⚡ Problem
Uploading large video files to Git (even with LFS) is:
- **Slow**: Large files take forever to upload
- **Expensive**: Git LFS has bandwidth limits
- **Complex**: Requires proper LFS setup
- **Inefficient**: Videos are bundled with your code repository

## ✨ Recommended Solution: Use a CDN

Instead of storing videos in your repository, host them on a CDN (Content Delivery Network). This is:
- **100x Faster**: Upload once, instant access worldwide
- **Free or Cheap**: Most CDNs have generous free tiers
- **Professional**: Used by major websites
- **Flexible**: Easy to update videos without code changes

---

## 🚀 Option 1: Cloudinary (Recommended - FREE)

### Why Cloudinary?
- ✅ **Free tier**: 25GB storage, 25GB bandwidth/month
- ✅ **Automatic optimization**: Converts and optimizes videos
- ✅ **Global CDN**: Fast loading worldwide
- ✅ **Easy to use**: Drag-and-drop upload interface
- ✅ **Video transformations**: Resize, crop, quality adjust on-the-fly

### Setup Steps (5 minutes)

#### 1. Create Free Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Note your **Cloud Name** (e.g., `dxyz123abc`)

#### 2. Upload Your Videos
1. Go to Media Library in Cloudinary dashboard
2. Create folder: `peninsula-equine/videos`
3. Drag and drop your 7 MP4 files:
   - IMG_1351.mp4
   - IMG_1354.mp4
   - IMG_2975.mp4
   - IMG_0014.mp4
   - IMG_0015.mp4
   - IMG_1021.mp4
   - IMG_2461.mp4

#### 3. Get Video URLs
After upload, Cloudinary gives you URLs like:
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/peninsula-equine/videos/IMG_1351.mp4
```

#### 4. Configure Your App
Create a `.env` file in your project root:

```bash
# Cloudinary Configuration
VITE_VIDEO_CDN_ENABLED=true
VITE_VIDEO_CDN_URL=https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/peninsula-equine/videos

# Video filenames
VITE_HERO_VIDEO_1=IMG_1351.mp4
VITE_HERO_VIDEO_2=IMG_1354.mp4
VITE_HERO_VIDEO_3=IMG_2975.mp4
VITE_CONSTRUCTION_VIDEO_1=IMG_0014.mp4
VITE_CONSTRUCTION_VIDEO_2=IMG_0015.mp4
VITE_CONSTRUCTION_VIDEO_3=IMG_1021.mp4
VITE_CONSTRUCTION_VIDEO_4=IMG_2461.mp4
```

#### 5. Done! 🎉
- Videos load from Cloudinary CDN (super fast)
- No Git LFS needed
- Easy to update videos in the future

---

## 🌐 Option 2: Vercel Blob Storage

### Why Vercel Blob?
- ✅ **Integrated**: Built into Vercel (your hosting platform)
- ✅ **Free tier**: 500GB bandwidth/month
- ✅ **Simple**: Upload via CLI or dashboard
- ✅ **Fast**: Edge network delivery

### Setup Steps

#### 1. Install Vercel CLI
```bash
npm install -g vercel
vercel login
```

#### 2. Upload Videos
```bash
# In your project directory
vercel blob upload IMG_1351.mp4 --token=YOUR_TOKEN
vercel blob upload IMG_1354.mp4 --token=YOUR_TOKEN
# ... repeat for all 7 videos
```

#### 3. Configure App
Add URLs to `.env`:
```bash
VITE_VIDEO_CDN_ENABLED=true
VITE_HERO_VIDEO_1=https://your-project.vercel.app/_blob/abc123/IMG_1351.mp4
# ... etc
```

---

## 📦 Option 3: GitHub Releases (Simple but Manual)

### Why GitHub Releases?
- ✅ **Free**: Unlimited bandwidth for public repos
- ✅ **Simple**: No external service needed
- ✅ **Reliable**: Hosted by GitHub

### Setup Steps

#### 1. Create a Release
1. Go to your repo on GitHub
2. Click "Releases" → "Draft a new release"
3. Tag: `videos-v1.0`
4. Title: `Video Assets`
5. Attach your 7 video files
6. Publish release

#### 2. Get Download URLs
Right-click each video file in the release, copy link:
```
https://github.com/USER/REPO/releases/download/videos-v1.0/IMG_1351.mp4
```

#### 3. Configure App
Add URLs to `.env`

---

## 🛠️ Implementation Guide

I've updated the code to support CDN URLs! Here's what changed:

### New File: `src/config/videoConfig.ts`
```typescript
// Automatically uses CDN if configured, falls back to local videos
export const getVideoUrl = (filename: string): string => {
  const cdnEnabled = import.meta.env.VITE_VIDEO_CDN_ENABLED === 'true';
  const cdnBaseUrl = import.meta.env.VITE_VIDEO_CDN_URL;
  
  if (cdnEnabled && cdnBaseUrl) {
    return `${cdnBaseUrl}/${filename}`;
  }
  
  // Fallback to local import
  return `/src/assets/media/converted/${filename}`;
};
```

### Components Auto-Updated
- ✅ `VideoHero.tsx` - Now uses CDN if configured
- ✅ `ConstructionVideoShowcase.tsx` - Now uses CDN if configured

---

## 📋 Quick Comparison

| Method | Upload Time | Complexity | Cost | Speed |
|--------|-------------|------------|------|-------|
| **Git LFS** | 🐌 Hours | 😰 Complex | 💰 $5+/mo | 🐌 Slow |
| **Cloudinary** | ⚡ 5 mins | 😊 Easy | 💚 Free | ⚡ Fast |
| **Vercel Blob** | ⚡ 10 mins | 😊 Easy | 💚 Free | ⚡ Fast |
| **GitHub Release** | ⚡ 5 mins | 😊 Easy | 💚 Free | ⚡ Fast |

---

## 🎯 My Recommendation

### Best Choice: **Cloudinary**

**Why?**
1. **Fastest setup**: Just drag-and-drop videos
2. **Free forever**: 25GB is plenty for your 7 videos
3. **Professional**: Automatic optimization and delivery
4. **Future-proof**: Easy to add more videos or change them

**Steps to get live TODAY:**
1. Sign up at [cloudinary.com](https://cloudinary.com) (2 minutes)
2. Upload your 7 videos (3 minutes)
3. Copy Cloud Name into `.env` file (30 seconds)
4. Push changes and deploy (1 minute)
5. **Done!** Videos loading from CDN ⚡

---

## 🆘 Still Want to Use Git LFS?

If you really want to commit videos to Git (not recommended), here's the optimized workflow:

### Prerequisites
```bash
# Install Git LFS
git lfs install

# Track video files (already configured in .gitattributes)
git lfs track "*.mp4"
```

### Upload Videos
```bash
# Copy your videos to the correct directory
cp /path/to/your/videos/*.mp4 src/assets/media/converted/

# Add to git (LFS handles the large files)
git add src/assets/media/converted/*.mp4

# Commit
git commit -m "Add video assets via Git LFS"

# Push (this may take a while)
git push
```

### Important Notes
- ⚠️ **Slow**: Each push will upload full videos
- ⚠️ **Bandwidth limits**: GitHub LFS has limits
- ⚠️ **Build size**: Videos included in deployment bundle

---

## 🎬 What Videos Are Needed?

Your app requires 7 videos total:

### HomePage Hero (3 videos)
These rotate on the main page:
- `IMG_1351.mp4` - Slow-motion equestrian footage
- `IMG_1354.mp4` - Slow-motion equestrian footage
- `IMG_2975.mp4` - Slow-motion equestrian footage

### ConstructionsPage (4 videos)
These showcase your construction work:
- `IMG_0014.mp4` - Construction process video
- `IMG_0015.mp4` - Construction process video
- `IMG_1021.mp4` - Construction process video
- `IMG_2461.mp4` - Construction process video

---

## 🚀 Next Steps

1. **Choose your method** (I recommend Cloudinary)
2. **Upload your 7 videos** to the CDN/service
3. **Configure `.env` file** with video URLs
4. **Test locally** with `npm run dev`
5. **Deploy to Vercel** - videos load instantly! ⚡

---

## 💡 Pro Tips

### Video Optimization
Before uploading, optimize your videos:

```bash
# Install ffmpeg (if not already installed)
brew install ffmpeg  # macOS
# or: sudo apt install ffmpeg  # Linux

# Optimize a video (reduces size without losing quality)
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  output.mp4
```

### Batch Optimization Script
```bash
#!/bin/bash
# Save as optimize-videos.sh

for file in *.mp4; do
  echo "Optimizing $file..."
  ffmpeg -i "$file" \
    -c:v libx264 -preset slow -crf 23 \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "optimized_$file"
done

echo "✅ All videos optimized!"
```

---

## ❓ FAQ

**Q: Can I mix local and CDN videos?**
A: Yes! The code checks CDN first, then falls back to local.

**Q: What if my videos are too large for Cloudinary free tier?**
A: Optimize them first (see above), or use multiple CDN accounts.

**Q: Can I change videos without redeploying?**
A: Yes with CDN! Just upload new video with same filename to CDN.

**Q: What about video security/privacy?**
A: Use Cloudinary's authenticated URLs or Vercel's signed URLs.

---

**Status**: Ready to implement any option! Choose one and let's get your videos live. ⚡
