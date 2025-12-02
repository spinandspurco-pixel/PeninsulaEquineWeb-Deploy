# 🚀 START HERE - Peninsula Equine Website

**Quick Guide to Getting Your Website Running**

---

## 👋 Welcome!

Your Peninsula Equine website is professionally built and ready to launch. You just need to complete a few setup steps. This should take **2-4 hours** depending on video availability.

---

## 🎯 What You Have

✅ **Professional website code** - Production-ready React application
✅ **Beautiful design** - Upmarket aesthetic with gold/bronze theme
✅ **Staff portal** - Complete authentication and management system
✅ **Responsive** - Works on mobile, tablet, and desktop
✅ **Optimized** - Fast loading with code splitting

---

## ⚠️ What's Needed

1. **Install Node.js** (15 minutes) - So you can build and run the site
2. **Add production videos** (30 minutes) - Replace placeholder files
3. **Configure Firebase** (20 minutes) - Enable portal authentication

---

## 📋 Step-by-Step Setup

### Step 1: Install Node.js (15 minutes)

**What:** Node.js is required to build and run the website

**How:**

1. Open Terminal

2. Install nvm (Node Version Manager):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

3. Close and reopen Terminal

4. Install Node.js:
   ```bash
   nvm install --lts
   nvm use --lts
   ```

5. Verify installation:
   ```bash
   node --version  # Should show v20.x.x
   npm --version   # Should show v10.x.x
   ```

6. Navigate to project and install dependencies:
   ```bash
   cd /Users/cirocasa/Documents/GitHub/PeninsulaEquineWeb-Deploy
   npm install
   ```

7. Test the build:
   ```bash
   npm run build
   ```
   Should complete in 3-5 seconds with no errors

8. Start development server:
   ```bash
   npm run dev
   ```
   Browser should open to http://localhost:3000

**What you'll see:** Website loads with placeholder videos and animations working

---

### Step 2: Add Your Videos (30 minutes)

**What:** Replace 14KB placeholder videos with your production footage

**Videos needed:**
- 3 hero videos (slow-motion equestrian footage)
- 4 construction videos (project showcases)

**Specifications:**
- Format: MP4 (H.264 codec)
- Resolution: 1080p or higher
- Size: Under 10MB each
- Duration: 5-15 seconds

**How:**

**Option A: Local Files (Simple)**
1. Prepare your 7 videos with these exact names:
   - `IMG_1351.mp4` (Hero 1)
   - `IMG_1354.mp4` (Hero 2)
   - `IMG_2975.mp4` (Hero 3)
   - `IMG_0014.mp4` (Construction 1)
   - `IMG_0015.mp4` (Construction 2)
   - `IMG_1021.mp4` (Construction 3)
   - `IMG_2461.mp4` (Construction 4)

2. Copy to project:
   ```bash
   cp ~/Downloads/IMG_1351.mp4 src/assets/media/converted/
   cp ~/Downloads/IMG_1354.mp4 src/assets/media/converted/
   # ... repeat for all 7 videos
   ```

3. Restart dev server to see changes

**Option B: Cloud Storage (Recommended for large files)**
- Upload to Cloudflare R2, AWS S3, or Vercel Blob
- Update video imports in code with CDN URLs
- See `VIDEO_UPLOAD_INSTRUCTIONS.md` for details

---

### Step 3: Configure Firebase (20 minutes)

**What:** Enable authentication for the staff portal

**How:**

1. Go to https://console.firebase.google.com

2. Click "Add project"
   - Name: Peninsula Equine
   - Disable Google Analytics (optional)
   - Create project

3. Enable Authentication:
   - Click "Authentication" in left menu
   - Click "Get Started"
   - Select "Email/Password"
   - Enable it
   - Save

4. Create Firestore Database:
   - Click "Firestore Database" in left menu
   - Click "Create database"
   - Start in production mode
   - Choose region (australia-southeast1 recommended)
   - Enable

5. Get your credentials:
   - Click gear icon → Project Settings
   - Scroll to "Your apps"
   - Click web icon (</>)
   - Register app: "Peninsula Equine Web"
   - Copy the `firebaseConfig` object

6. Update your code:
   ```bash
   # Open the config file
   nano src/lib/firebase-config.ts
   ```
   
   Replace with your credentials:
   ```typescript
   export const firebaseConfig = {
     apiKey: "AIzaSy...",  // Your actual key
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
   Save (Ctrl+O, Enter, Ctrl+X)

7. Add security rules:
   - In Firebase Console → Firestore Database → Rules
   - Copy rules from `COMPREHENSIVE_FIX_REPORT.md` → Phase 4
   - Publish

8. Create first user:
   - Authentication → Users → Add User
   - Add your email and password
   - Then in Firestore Database:
     - Start collection: `users`
     - Document ID: [paste the user's UID from Authentication]
     - Add fields:
       ```
       email: "your@email.com"
       role: "admin"
       displayName: "Your Name"
       ```
   - Save

9. Test login:
   ```bash
   npm run dev
   ```
   Navigate to Portal, log in with your credentials

**What you'll see:** Can log into staff portal and access dashboard

---

### Step 4: Deploy to Vercel (10 minutes)

**What:** Put your website online with a live URL

**How:**

**Option A: Automatic (Easiest)**

1. Push to GitHub (if not already):
   ```bash
   git add .
   git commit -m "Setup complete - ready for deployment"
   git push origin main
   ```

2. Go to https://vercel.com/signup
   - Sign in with GitHub

3. Click "Add New Project"
   - Import your repository
   - Click "Deploy"

4. Wait ~2 minutes
   - You'll get a live URL: `yoursite.vercel.app`

**Option B: CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**What you'll see:** Live website accessible worldwide

---

### Step 5: Connect Custom Domain (Optional, 15 minutes)

**What:** Use your Honcho domain instead of vercel.app URL

**How:**

1. In Vercel Dashboard:
   - Go to your project
   - Settings → Domains
   - Add domain: `yourdomain.com`

2. In Honcho (or your domain registrar):
   - Add A record: `@` → `76.76.21.21`
   - Add CNAME: `www` → `cname.vercel-dns.com`

3. Wait 5-30 minutes for DNS propagation

4. SSL certificate automatically provisioned

**What you'll see:** Your website at your custom domain with HTTPS

---

## 🎉 You're Done!

Your website is now live with:
- ✅ Professional design
- ✅ Production videos
- ✅ Working staff portal
- ✅ Custom domain
- ✅ SSL certificate
- ✅ Fast global loading

---

## 📚 Helpful Documents

If you need more details:
- **STATUS_REPORT.md** - Current status overview
- **COMPREHENSIVE_FIX_REPORT.md** - Detailed troubleshooting
- **DEPLOYMENT_COMPLETE.md** - Deployment options
- **VIDEO_UPLOAD_INSTRUCTIONS.md** - Video management
- **USER_MANAGEMENT_GUIDE.md** - Portal user setup

---

## 🆘 Quick Troubleshooting

### "npm: command not found"
→ Node.js not installed. Go back to Step 1.

### Videos won't play
→ Check video format is MP4, under 10MB, correct filenames

### Build fails
→ Run: `rm -rf node_modules && npm install`

### Portal login fails
→ Check Firebase credentials in `src/lib/firebase-config.ts`

### Need help?
→ Check `COMPREHENSIVE_FIX_REPORT.md` → Troubleshooting section

---

## ⏱️ Time Estimate

- **Step 1 (Node.js):** 15 minutes
- **Step 2 (Videos):** 30 minutes (+ time to prepare videos)
- **Step 3 (Firebase):** 20 minutes
- **Step 4 (Deploy):** 10 minutes
- **Step 5 (Domain):** 15 minutes (optional)

**Total:** 2-4 hours from start to live

---

## 🎯 Current Status

Run this to check your progress:
```bash
./quick-setup.sh
```

This script will tell you what's complete and what still needs work.

---

## ✅ Success Checklist

Check off as you complete:

- [ ] Node.js installed (`node --version` works)
- [ ] Dependencies installed (`npm install` completed)
- [ ] Build succeeds (`npm run build` works)
- [ ] Dev server runs (`npm run dev` opens browser)
- [ ] Website loads with navigation working
- [ ] Production videos uploaded (7 files)
- [ ] Videos play on homepage
- [ ] Videos play on constructions page
- [ ] Firebase credentials configured
- [ ] Portal login works
- [ ] Dashboard accessible after login
- [ ] Website deployed to Vercel
- [ ] Live URL accessible
- [ ] Custom domain connected (optional)
- [ ] SSL certificate active

---

## 🚀 Ready to Start?

1. Open Terminal
2. Follow Step 1 above
3. Watch your professional website come to life!

The code is excellent - you just need to set it up. Let's go! 🐴

---

**Questions?** Check the detailed guides in the documentation folder.

**Everything working?** Congratulations! Your upmarket equine business now has a matching website. 🎉
