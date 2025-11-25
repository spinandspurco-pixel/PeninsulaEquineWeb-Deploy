# GitHub Deployment Guide - Peninsula Equine

Complete step-by-step guide to push your Peninsula Equine application to GitHub and deploy it successfully.

## ✅ Pre-Push Checklist

Before pushing to GitHub, verify these files exist in your project root:

```
✓ /App.tsx
✓ /package.json
✓ /index.html
✓ /vite.config.ts
✓ /tsconfig.json
✓ /.gitignore
✓ /README.md
✓ /components/ (folder with all components)
✓ /pages/ (folder with all pages)
✓ /lib/ (folder with Firebase service files)
✓ /styles/globals.css
✓ /context/ThemeContext.tsx
```

## 📋 Step 1: Initialize Git Repository

```bash
# Navigate to your project directory
cd peninsula-equine

# Initialize git if not already done
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Peninsula Equine - From Dirt to Dynasty"
```

## 🔗 Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `peninsula-equine`
3. Description: `Professional equestrian construction company website with worker portal - From Dirt to Dynasty`
4. Choose **Private** (recommended for business)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create Repository**

## 📤 Step 3: Push to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/peninsula-equine.git

# Verify remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🚀 Step 4: Deploy to Vercel (Recommended)

### Option A: Deploy via Vercel Website

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your `peninsula-equine` repository
4. Framework Preset: **Vite**
5. Root Directory: `./` (leave default)
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Install Command: `npm install`
9. Click **Deploy**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Environment Variables (Vercel Dashboard)

Add these in your Vercel project settings:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=peninsulaequine.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=peninsulaequine
```

## 🌐 Step 5: Deploy to Netlify (Alternative)

### Option A: Deploy via Netlify Website

1. Go to https://app.netlify.com/start
2. Click **Import from Git**
3. Choose **GitHub**
4. Select `peninsula-equine` repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **Deploy site**

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod --dir=dist
```

## 🔥 Step 6: Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Select:
# ✓ Use existing project
# ✓ Choose your Firebase project
# ✓ Public directory: dist
# ✓ Configure as single-page app: Yes
# ✓ Set up automatic builds with GitHub: No (for now)
# ✓ File dist/index.html already exists. Overwrite: No

# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## 🔒 Step 7: Configure Custom Domain

### For Vercel:
1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Add domain: `equinepeninsula.com.au`
4. Add `www.equinepeninsula.com.au`
5. Follow DNS configuration instructions

### For Netlify:
1. Go to your site in Netlify dashboard
2. Click **Domain settings**
3. Click **Add custom domain**
4. Enter `equinepeninsula.com.au`
5. Follow DNS configuration instructions

### DNS Settings (at your domain registrar):

```
Type: A
Name: @
Value: (provided by Vercel/Netlify)
TTL: Auto

Type: CNAME
Name: www
Value: (provided by Vercel/Netlify)
TTL: Auto
```

## 🔧 Step 8: Enable Continuous Deployment

### Auto-deploy on Push to GitHub:

Both Vercel and Netlify will automatically:
- ✅ Detect new commits to `main` branch
- ✅ Run `npm install`
- ✅ Run `npm run build`
- ✅ Deploy the `dist` folder
- ✅ Invalidate cache
- ✅ Send deployment notifications

**You just need to push code to GitHub:**
```bash
git add .
git commit -m "Update: your changes here"
git push origin main
```

## 🧪 Step 9: Test Your Deployment

After deployment, test these features:

### Public Pages
- [ ] Home page loads correctly
- [ ] Navigation works between pages
- [ ] Horseshoe cursor appears
- [ ] Theme toggle (light/dark) works
- [ ] Images and logos load
- [ ] Responsive design on mobile

### Worker Portal
- [ ] Login page loads
- [ ] Worker registration works
- [ ] Demo login credentials work
- [ ] Dashboard displays correctly
- [ ] Timesheet form functions
- [ ] SWMS form works
- [ ] Toolbox Talk submission
- [ ] Incident report submission

### Admin Portal
- [ ] Admin login works
- [ ] Admin dashboard displays
- [ ] User management page loads
- [ ] Timesheet review works
- [ ] Analytics display correctly

## 📊 Step 10: Monitor Your Deployment

### Vercel Analytics
- Go to your project dashboard
- Click **Analytics** to view:
  - Page views
  - Unique visitors
  - Performance metrics

### Netlify Analytics
- Go to your site dashboard
- Enable Netlify Analytics (paid feature)
- View traffic and performance

### Google Analytics (Recommended)

Add to `/index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🐛 Troubleshooting

### Issue: Build fails on deployment

**Solution:**
```bash
# Test build locally first
npm run build

# If it works locally, check:
# 1. Node version (should be 18+)
# 2. Package-lock.json is committed
# 3. All dependencies in package.json
```

### Issue: 404 errors on page refresh

**Solution:** 
- Vercel/Netlify automatically handle SPA routing
- For Firebase Hosting, verify `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Issue: Images not loading

**Solution:**
- Check image paths are relative
- Verify `figma:asset` imports in components
- Check `/public` folder is committed to Git

### Issue: Environment variables not working

**Solution:**
- Add `VITE_` prefix to all env vars
- Add them in Vercel/Netlify dashboard
- Redeploy after adding variables

## 🔄 Update Workflow

When making changes:

```bash
# 1. Make your changes locally
# 2. Test locally
npm run dev

# 3. Build and test
npm run build
npm run preview

# 4. Commit and push
git add .
git commit -m "Feature: description of changes"
git push origin main

# 5. Deployment happens automatically!
# Check deployment status in Vercel/Netlify dashboard
```

## 📧 Post-Deployment Tasks

1. **Test all functionality** on the live site
2. **Share the URL** with Tam and Ciro
3. **Create admin accounts** in Firebase
4. **Set up email notifications**
5. **Configure Google Workspace OAuth**
6. **Update Firebase security rules**
7. **Enable Firebase Authentication**
8. **Test worker registration flow**
9. **Submit test timesheet**
10. **Verify email notifications**

## 🎉 Success!

Your Peninsula Equine website is now live! 

**Live URLs:**
- Production: `https://your-project.vercel.app` or `https://equinepeninsula.com.au`
- GitHub: `https://github.com/YOUR_USERNAME/peninsula-equine`

## 📞 Support

If you encounter any issues:

1. Check the build logs in your deployment platform
2. Review the browser console for errors
3. Verify all environment variables are set
4. Test the build locally first
5. Check the GitHub repository for missing files

---

**Ready to deploy! 🚀**

Your Peninsula Equine application is production-ready and configured for seamless GitHub deployment with automatic CI/CD.
