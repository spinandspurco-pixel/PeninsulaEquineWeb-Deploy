# GitHub Deployment Setup

## 📋 Pre-Deployment Checklist

Before pushing to GitHub and deploying, ensure ALL files are in the correct location:

### Required Structure

```
peninsula-equine/
├── public/                         # Static assets
│   └── favicon.svg
├── src/                           # ⚠️ ALL CODE MUST BE HERE
│   ├── App.tsx
│   ├── main.tsx
│   ├── assets/                    # Images, SVGs
│   ├── components/                # All components
│   ├── pages/                     # All pages
│   ├── context/                   # React contexts
│   ├── lib/                       # Services & utils
│   └── styles/                    # CSS files
│       └── globals.css
├── index.html                     # HTML entry
├── package.json                   # Dependencies
├── vite.config.ts                 # Build config
├── tsconfig.json                  # TypeScript config
├── .gitignore                     # Git ignore rules
└── README.md                      # Documentation
```

## 🚨 CRITICAL: File Migration

You need to MOVE all files currently in the root into the `src/` directory:

### Step 1: Move Component Files
```bash
# Move all component directories
mv components/ src/
mv pages/ src/
mv context/ src/
mv lib/ src/
mv styles/ src/
```

### Step 2: Update Import Paths in Components

All components that import assets using `figma:asset` need to be updated to use relative paths or placeholder assets.

**Find and replace:**
```
figma:asset/[hash].png → /src/assets/placeholder-logo.svg
```

Or add your actual logo images to `/src/assets/` directory.

### Step 3: Verify Package.json Exists
The `package.json` file MUST be in the root directory with all dependencies listed.

## 🔧 GitHub Repository Setup

### 1. Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Peninsula Equine website"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Name it: `peninsula-equine`
3. **DO NOT** initialize with README (you already have one)
4. Create repository

### 3. Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/peninsula-equine.git
git branch -M main
git push -u origin main
```

## 🚀 Deployment Options

### Option 1: Vercel (Easiest - Recommended)

1. **Connect GitHub:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy:**
   - Click "Deploy"
   - Done! Your site will be live in 2-3 minutes

4. **Custom Domain:**
   - Go to Project Settings → Domains
   - Add: `equinepeninsula.com.au`
   - Update DNS records as shown

### Option 2: Netlify

1. **Connect GitHub:**
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repo

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy:**
   - Click "Deploy site"
   - Site will be live in minutes

4. **Custom Domain:**
   - Go to Site settings → Domain management
   - Add custom domain: `equinepeninsula.com.au`

### Option 3: Firebase Hosting

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
firebase login
```

2. **Initialize:**
```bash
firebase init hosting
# Select: Use an existing project or create new
# Public directory: dist
# Single-page app: Yes
# GitHub deployments: Optional
```

3. **Build and Deploy:**
```bash
npm run build
firebase deploy --only hosting
```

4. **Custom Domain:**
```bash
firebase hosting:channel:deploy production
# Then add custom domain in Firebase Console
```

## 🔑 Environment Variables

For production deployment, set these environment variables in your hosting platform:

### Vercel / Netlify Dashboard:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=peninsulaequine.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=peninsulaequine
VITE_FIREBASE_STORAGE_BUCKET=peninsulaequine.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Update firebase-config.ts:
```typescript
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module" errors
**Fix:** Ensure all files are in `src/` directory and imports use correct relative paths.

### Issue: Assets not loading
**Fix:** 
- Place images in `/src/assets/` or `/public/`
- Use `import logo from './assets/logo.svg'` for src/assets
- Use `/favicon.svg` for public assets

### Issue: Build fails on deployment
**Fix:**
1. Run `npm run build` locally first
2. Fix any TypeScript errors shown
3. Commit fixes and push again

### Issue: Blank page after deployment
**Fix:**
- Check browser console for errors
- Verify `index.html` is in root directory
- Ensure `main.tsx` is importing `App.tsx` correctly

### Issue: Routes not working (404 errors)
**Fix:**
- Vercel: Add `vercel.json` with rewrites (already included)
- Netlify: Add `netlify.toml` with redirects (already included)
- Firebase: Ensure `firebase.json` has rewrites configured

## ✅ Deployment Verification

After deployment, test these URLs:

- ✓ `https://equinepeninsula.com.au` - Home page loads
- ✓ `https://equinepeninsula.com.au/portal` - Portal page loads (client-side routing)
- ✓ Images and assets display correctly
- ✓ Console has no errors
- ✓ Mobile responsive design works
- ✓ Theme toggle (dark/light) works
- ✓ Login page accessible

## 📊 Post-Deployment

### Monitor Performance:
- Check Lighthouse scores
- Monitor Core Web Vitals
- Test on multiple devices

### Set Up Analytics:
```bash
# Add Google Analytics or Vercel Analytics
npm install @vercel/analytics
```

### Set Up Monitoring:
- Enable error tracking (Sentry)
- Set up uptime monitoring
- Configure Firebase Performance Monitoring

## 🆘 Need Help?

### Build Logs:
- Vercel: Check deployment logs in dashboard
- Netlify: View deploy log in site dashboard
- Firebase: Run `firebase deploy --debug`

### Local Testing:
```bash
# Test production build locally
npm run build
npm run preview
# Open http://localhost:4173
```

---

## 📝 Quick Deployment Commands

```bash
# 1. Ensure everything is in src/
ls src/components src/pages src/lib

# 2. Test build locally
npm run build

# 3. Commit and push
git add .
git commit -m "Ready for deployment"
git push origin main

# 4. Deploy (pick one)
vercel --prod                 # Vercel
netlify deploy --prod         # Netlify  
firebase deploy --only hosting # Firebase
```

**Your site will be live at equinepeninsula.com.au after DNS propagation (24-48 hours)!** 🎉
