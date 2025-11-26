# 🚀 Quick Reference - Video Setup

## Problem
Videos taking too long to upload via Git LFS? Files stuck as untracked?

## Solution
Use CDN hosting instead! **5 minutes setup, 100x faster.**

---

## 🎯 Fastest Method: Cloudinary

### 3 Steps to Success

#### 1. Sign Up (2 min)
→ https://cloudinary.com
- Create free account
- Note your **Cloud Name** (e.g., `dxyz123abc`)

#### 2. Upload Videos (2 min)
In Cloudinary dashboard:
- Go to **Media Library**
- Create folder: `peninsula-equine`
- Drag & drop these 7 videos:
  - IMG_1351.mp4
  - IMG_1354.mp4
  - IMG_2975.mp4
  - IMG_0014.mp4
  - IMG_0015.mp4
  - IMG_1021.mp4
  - IMG_2461.mp4

#### 3. Configure (1 min)
Create `.env` file in project root:
```bash
VITE_VIDEO_CDN_ENABLED=true
VITE_VIDEO_CDN_URL=https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/peninsula-equine
```

Replace `YOUR_CLOUD_NAME` with your actual cloud name.

### Deploy
```bash
git add .env
git commit -m "Configure video CDN"
git push
```

### Done! 🎉

---

## 🔧 Alternative: Interactive Setup

```bash
./setup-videos.sh
```

Follow the wizard - it will guide you through everything!

---

## 📚 Need More Help?

- **Quick Guide**: [QUICK_VIDEO_SETUP.md](./QUICK_VIDEO_SETUP.md)
- **Full Guide**: [VIDEO_HOSTING_GUIDE.md](./VIDEO_HOSTING_GUIDE.md)
- **Stuck?**: [TROUBLESHOOTING_UNTRACKED_FILES.md](./TROUBLESHOOTING_UNTRACKED_FILES.md)
- **Overview**: [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md)

---

## 🎬 Videos Required

| Video | Usage | Description |
|-------|-------|-------------|
| IMG_1351.mp4 | Hero | Slow-motion horse footage |
| IMG_1354.mp4 | Hero | Slow-motion horse footage |
| IMG_2975.mp4 | Hero | Slow-motion horse footage |
| IMG_0014.mp4 | Construction | Foundation work |
| IMG_0015.mp4 | Construction | Building process |
| IMG_1021.mp4 | Construction | Detail work |
| IMG_2461.mp4 | Construction | Project completion |

---

## ⚡ Why CDN?

| Metric | Git LFS | CDN |
|--------|---------|-----|
| Setup | 2-6 hours | 5 minutes |
| Cost | $5/month | FREE |
| Speed | Slow | Fast ⚡ |
| Ease | Complex | Simple ✅ |

---

## 🆘 Common Issues

### "Untracked files" message?
```bash
# Clean up:
git clean -fd

# Then follow CDN setup above
```

### "Taking too long to upload"?
**Stop waiting!** Use CDN instead (5 minutes total).

### "Videos not converting"?
**Don't convert!** Cloudinary does it automatically.

---

## 💡 Pro Tip

Professional websites use CDNs for videos:
- ✅ Netflix → CDN
- ✅ YouTube → CDN  
- ✅ Your site → CDN (now!)

Git is for code, CDN is for media. 🎯

---

**Get your videos live in 5 minutes!** → Start with [QUICK_VIDEO_SETUP.md](./QUICK_VIDEO_SETUP.md)
