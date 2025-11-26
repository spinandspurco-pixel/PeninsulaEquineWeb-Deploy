# 🔧 Troubleshooting: Untracked Files & Video Upload Issues

## Problem: "Untracked files present and nothing added to commit"

This message appears when you have files in your working directory that Git sees but hasn't been told to track yet. This is common when dealing with large video files.

---

## Understanding the Situation

### What Happened?
1. You tried to upload/drag-drop video files
2. Files started loading but it's taking too long
3. Git sees the files but they're not committed yet
4. You're stuck waiting for conversion or upload

### Why Is It Slow?
- **Large files**: Video files are 5-50MB each, 7 videos = potentially 350MB+
- **Git LFS overhead**: Extra processing for large file tracking
- **Conversion time**: MP4 conversion with ffmpeg is CPU-intensive
- **Upload speed**: Pushing large files to GitHub takes time

---

## ✅ Solution: Don't Upload Videos to Git!

**The fastest solution is to NOT upload videos to Git at all.** Use a CDN instead!

### Why CDN is Better:
- ⚡ **Upload once in 5 minutes** vs hours with Git
- 💚 **Free** (Cloudinary, GitHub Releases, Vercel Blob)
- 🚀 **Faster for users** - CDN delivers worldwide
- ✅ **No Git headaches** - Videos aren't in your repository

---

## 🚀 Quick Fix: Clean Up & Use CDN

### Step 1: Clean Up Untracked Files (30 seconds)

```bash
# See what files are untracked
git status

# If you have partially uploaded videos you want to remove:
git clean -fd

# Or if you want to keep the video files locally but not track them:
# Just continue without adding them to Git
```

### Step 2: Set Up CDN (5 minutes)

**Option A: Use Our Interactive Setup Script**
```bash
./setup-videos.sh
```

**Option B: Manual Cloudinary Setup**
1. Sign up at https://cloudinary.com (free)
2. Upload your 7 videos to Cloudinary
3. Create `.env` file:
   ```bash
   VITE_VIDEO_CDN_ENABLED=true
   VITE_VIDEO_CDN_URL=https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/peninsula-equine
   ```
4. Commit and deploy:
   ```bash
   git add .env
   git commit -m "Configure video CDN"
   git push
   ```

### Step 3: Done! 🎉
Your videos now load from CDN instead of Git. Much faster!

---

## 🔍 Detailed Troubleshooting

### Issue 1: Files Stuck "Loading"

**Symptom**: Files show as loading but nothing happens

**Solution**:
```bash
# Check what's actually happening
git status

# If files are being tracked by Git LFS
git lfs ls-files

# Cancel the operation
# Press Ctrl+C if a git command is running

# Clean up
git reset HEAD .
git clean -fd
```

### Issue 2: "Nothing Added to Commit"

**Symptom**: Git sees files but they're not staged

**Solution A - Use CDN (Recommended)**:
Don't add them to Git! Follow the CDN setup above.

**Solution B - If You Really Want to Use Git LFS**:
```bash
# Make sure Git LFS is installed
git lfs version

# Track MP4 files (already configured in .gitattributes)
git lfs track "*.mp4"

# Add the videos
git add src/assets/media/converted/*.mp4

# Commit (this will take a while!)
git commit -m "Add video assets via Git LFS"

# Push (this will take even longer!)
git push
```

⚠️ **Warning**: This can take hours for large files!

### Issue 3: Git LFS Bandwidth Limit

**Symptom**: Error about LFS bandwidth or storage quota

**Solution**: GitHub LFS has limits:
- 1GB storage free
- 1GB bandwidth/month free
- $5/month for more

**Better Solution**: Use CDN instead! No limits on free tiers.

### Issue 4: Videos Not Converting

**Symptom**: Videos stuck in conversion, taking too long

**Why**: Local ffmpeg conversion is CPU-intensive

**Solution Options**:

1. **Use CDN (Best)**: Cloudinary auto-converts videos
   ```bash
   # Just upload raw videos to Cloudinary
   # It handles conversion automatically
   ```

2. **Optimize Before Upload**:
   ```bash
   # Install ffmpeg
   brew install ffmpeg
   
   # Quick conversion (5-10 minutes for all videos)
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset fast -c:a aac output.mp4
   ```

3. **Use Online Converter**: Upload to cloudconvert.com

---

## 📋 Checklist: What to Do Now

- [ ] **Stop waiting** for Git upload if it's taking too long
- [ ] **Clean up** untracked files: `git clean -fd`
- [ ] **Choose CDN method**: Cloudinary (recommended)
- [ ] **Sign up** for free CDN account (2 minutes)
- [ ] **Upload videos** to CDN (3 minutes)
- [ ] **Configure app** with `.env` file (30 seconds)
- [ ] **Commit & deploy** the configuration (1 minute)
- [ ] **Test** your site with fast-loading videos! 🎉

---

## 🎯 Bottom Line

**You have 3 choices:**

### ✅ Choice 1: CDN (RECOMMENDED)
- **Time**: 5 minutes total
- **Difficulty**: Easy (drag & drop)
- **Speed**: Lightning fast for users
- **Cost**: Free
- **Guide**: [QUICK_VIDEO_SETUP.md](./QUICK_VIDEO_SETUP.md)

### ⚠️ Choice 2: Git LFS
- **Time**: 2-6 hours (upload time)
- **Difficulty**: Medium (technical setup)
- **Speed**: Slower for users
- **Cost**: Free for small usage, $5/mo for more
- **Guide**: [VIDEO_UPLOAD_INSTRUCTIONS.md](./VIDEO_UPLOAD_INSTRUCTIONS.md)

### ❌ Choice 3: Keep Waiting
- **Result**: Frustration 😤
- **Don't do this!**

---

## 🆘 Still Stuck?

### Common Commands to Rescue You

```bash
# See current status
git status

# Remove all untracked files (CAREFUL!)
git clean -fd

# Unstage files
git reset HEAD .

# Discard all local changes (CAREFUL!)
git reset --hard HEAD

# Check what's taking up space
du -sh src/assets/media/converted/

# Check if Git LFS is working
git lfs version
git lfs ls-files

# Force stop a hung git operation
# Press Ctrl+C, then:
git reset --hard HEAD
```

### Get More Help

- 📖 [QUICK_VIDEO_SETUP.md](./QUICK_VIDEO_SETUP.md) - Fastest CDN setup
- 📖 [VIDEO_HOSTING_GUIDE.md](./VIDEO_HOSTING_GUIDE.md) - All options explained
- 🔧 [setup-videos.sh](./setup-videos.sh) - Interactive setup wizard

---

**Pro Tip**: Major websites like Netflix, YouTube, and professional business sites ALL use CDNs for video. Git LFS is meant for version control, not video hosting. Do it the professional way! 🚀
