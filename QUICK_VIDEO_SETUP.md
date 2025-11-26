# 🚀 Quick Video Setup - Get Your Videos Live in 5 Minutes!

## The Problem You're Facing

You have 7 video files that need to be on your website, but:
- ❌ Git upload is **too slow** (hours for large files)
- ❌ MP4 conversion is **taking forever**
- ❌ Files are stuck as **untracked and not committed**
- ❌ Git LFS is **complex and slow**

## ✨ The Solution: Use a CDN Instead!

Instead of uploading videos to Git, host them on a **free CDN**. This is:
- ⚡ **100x faster**: Upload in minutes, not hours
- 💚 **Free**: No cost for your video sizes
- 🎯 **Simple**: Just drag and drop
- 🚀 **Professional**: How major websites do it

---

## 🎯 FASTEST METHOD: Cloudinary (5 Minutes)

### Step 1: Sign Up (2 minutes)
1. Go to **https://cloudinary.com**
2. Click "Sign Up Free"
3. Enter your email and create password
4. **Note your Cloud Name** (e.g., `dxyz123abc`) - you'll see it in the dashboard

### Step 2: Upload Videos (2 minutes)
1. In Cloudinary dashboard, click **"Media Library"**
2. Create a new folder: **"peninsula-equine"**
3. **Drag and drop all 7 videos** into this folder:
   - IMG_1351.mp4
   - IMG_1354.mp4
   - IMG_2975.mp4
   - IMG_0014.mp4
   - IMG_0015.mp4
   - IMG_1021.mp4
   - IMG_2461.mp4
4. Wait for upload (usually 1-3 minutes for all videos)

### Step 3: Configure Your App (1 minute)
1. Create a file named `.env` in your project root
2. Add these two lines (replace YOUR_CLOUD_NAME with yours):

```bash
VITE_VIDEO_CDN_ENABLED=true
VITE_VIDEO_CDN_URL=https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/peninsula-equine
```

Example:
```bash
VITE_VIDEO_CDN_ENABLED=true
VITE_VIDEO_CDN_URL=https://res.cloudinary.com/dxyz123abc/video/upload/peninsula-equine
```

### Step 4: Done! Deploy 🎉
```bash
git add .env
git commit -m "Configure video CDN"
git push
```

Your videos will now load from Cloudinary's global CDN - **super fast** worldwide!

---

## 🔧 Alternative: Interactive Setup Script

We've included a setup wizard that guides you through the process:

```bash
./setup-videos.sh
```

This script will:
1. Ask you which CDN you want to use
2. Collect the necessary information
3. Create your `.env` file automatically
4. Tell you exactly what to do next

---

## 📋 What Videos You Need

Your website needs these 7 videos:

### Hero Videos (HomePage - 3 videos)
These rotate in the main hero section:
- **IMG_1351.mp4** - Slow-motion horse/equestrian footage
- **IMG_1354.mp4** - Slow-motion horse/equestrian footage
- **IMG_2975.mp4** - Slow-motion horse/equestrian footage

### Construction Videos (ConstructionsPage - 4 videos)
These showcase your construction process:
- **IMG_0014.mp4** - Construction footage
- **IMG_0015.mp4** - Construction footage
- **IMG_1021.mp4** - Construction footage
- **IMG_2461.mp4** - Construction footage

---

## 🤔 Other CDN Options

If you don't want to use Cloudinary, here are alternatives:

### Option 2: GitHub Releases (Free, Simple)
1. Go to your repo on GitHub
2. Click "Releases" → "Create a new release"
3. Tag: `videos-v1.0`
4. Attach all 7 video files
5. Publish release
6. Configure `.env`:
   ```bash
   VITE_VIDEO_CDN_ENABLED=true
   VITE_VIDEO_CDN_URL=https://github.com/YOUR_USER/YOUR_REPO/releases/download/videos-v1.0
   ```

### Option 3: Vercel Blob Storage (Free, Integrated)
```bash
# Install Vercel CLI
npm install -g vercel
vercel login

# Upload each video
vercel blob upload IMG_1351.mp4
vercel blob upload IMG_1354.mp4
# ... repeat for all 7 videos

# Configure .env with the blob URLs
```

---

## 🎬 Video Optimization Tips

If your videos are large (>10MB each), optimize them first:

```bash
# Install ffmpeg
brew install ffmpeg  # macOS
# or: sudo apt install ffmpeg  # Linux

# Optimize a video (keeps quality, reduces size)
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -crf 23 \
  -preset medium \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  optimized.mp4
```

This typically reduces file size by 30-50% without noticeable quality loss.

---

## ❓ FAQ

**Q: Do I still need to use Git LFS?**  
A: No! With CDN hosting, videos aren't in your Git repository at all.

**Q: Can I update videos without redeploying?**  
A: Yes! Just upload new video with the same filename to your CDN.

**Q: What if Cloudinary free tier isn't enough?**  
A: The free tier gives you 25GB storage and 25GB bandwidth/month. Your 7 videos (even at 10MB each) = 70MB. You have plenty of room!

**Q: Will videos load fast for users worldwide?**  
A: Yes! CDNs have servers around the world, so videos load fast everywhere.

**Q: What about privacy/security?**  
A: Cloudinary supports private URLs and authenticated access if needed.

---

## 🚨 Still Having Issues?

If you're stuck with untracked files in Git:

```bash
# Clean up untracked files
git clean -fd

# Or reset your working directory
git reset --hard HEAD

# Then follow the CDN setup above
```

---

## 📖 Need More Details?

- **Comprehensive guide**: See `VIDEO_HOSTING_GUIDE.md`
- **Original instructions**: See `VIDEO_UPLOAD_INSTRUCTIONS.md`
- **Environment variables**: See `.env.example`

---

**Bottom Line**: Don't waste time with Git LFS. Use Cloudinary's free CDN and have your videos live in 5 minutes! ⚡🎉
