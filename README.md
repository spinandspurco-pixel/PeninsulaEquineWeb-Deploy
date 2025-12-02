# 🐴 Peninsula Equine Web

**From Dirt to Dynasty** - Professional Equestrian Construction Company Website

> Premium equestrian facilities construction website with integrated staff portal.
> Built with React, TypeScript, and modern web technologies.

## ⚡ Quick Start

**First time setup?** Run the automated setup script:

```bash
./quick-setup.sh
```

Or manually:

```bash
# 1. Install Node.js (if not already installed)
# Visit https://nodejs.org/ or use nvm

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser to http://localhost:3000
```

### Development Commands

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## 📦 Deployment

### Deploy to Vercel

#### Option 1: Quick Deploy Script
```bash
chmod +x deploy.sh
./deploy.sh
```

#### Option 2: Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Option 3: GitHub Integration
1. Push code to GitHub
2. Connect repository in Vercel Dashboard
3. Auto-deploy on every commit

See [DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md) for detailed instructions.

## 🔗 Connecting to Honcho Domain

After deploying to Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain from Honcho
3. Configure DNS in Honcho:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (5-30 minutes)
5. SSL will be automatically configured

## 🏗️ Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and services
│   ├── context/        # React contexts
│   ├── types/          # TypeScript types
│   ├── assets/         # Images and media
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── vercel.json         # Vercel configuration
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## ✨ Features

- ✅ Modern React with TypeScript
- ✅ Vite for fast development
- ✅ TailwindCSS for styling
- ✅ Motion for animations
- ✅ Radix UI components
- ✅ Firebase integration
- ✅ Responsive design
- ✅ Dark/Light theme support
- ✅ Worker portal system
- ✅ Admin dashboard

## 🔧 Technologies

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Radix UI
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Backend**: Firebase
- **Deployment**: Vercel

## 📱 Pages

- **Home**: Hero section with company introduction
- **Constructions**: Showcase of construction services
- **Laser Cutting**: Custom laser cutting services
- **Shop**: Products and merchandise
- **Projects**: Portfolio of completed projects
- **Contact**: Contact form and information
- **Portal**: Worker login and dashboard
- **Admin**: Administrative dashboard

## 🔐 Environment Variables

If using Firebase, create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🎥 Video Assets

The project includes video assets for the hero section and construction showcase. Current videos are 14KB placeholder files.

**To use your production videos:**

1. Convert videos to MP4 (H.264 codec, 1080p, under 10MB each)
2. Place in `src/assets/media/converted/` with these names:
   - `IMG_1351.mp4`, `IMG_1354.mp4`, `IMG_2975.mp4` (Hero videos)
   - `IMG_0014.mp4`, `IMG_0015.mp4`, `IMG_1021.mp4`, `IMG_2461.mp4` (Construction)
3. Rebuild the project

See `VIDEO_UPLOAD_INSTRUCTIONS.md` for detailed instructions.

## 🔐 Firebase Setup (Required for Portal)

The staff portal requires Firebase configuration:

1. Create a Firebase project at console.firebase.google.com
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Update `src/lib/firebase-config.ts` with your credentials
5. Add your first admin user in Firebase Console

See `COMPREHENSIVE_FIX_REPORT.md` → Phase 4 for step-by-step instructions.

## 🐛 Troubleshooting

### "npm: command not found"
**Solution:** Install Node.js first
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc  # or ~/.zshrc
nvm install --lts
nvm use --lts
```

### Build fails
- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check Node version: `node -v` (should be 18+)

### Videos won't play
- Check video files exist in `src/assets/media/converted/`
- Verify format is MP4 (H.264 codec)
- Check browser console for errors
- Ensure files aren't too large (< 10MB recommended)

### Portal login fails
- Verify Firebase credentials in `src/lib/firebase-config.ts`
- Check Firebase Console for user existence
- Ensure Authentication is enabled
- Check browser console for Firebase errors

### Assets not loading
- Check file paths are correct
- Verify assets are in the correct directory
- Check browser console for errors
- Run `npm run build` to verify build succeeds

For more troubleshooting, see `COMPREHENSIVE_FIX_REPORT.md`.

## 📄 License

Copyright © 2024 Peninsula Equine. All rights reserved.

## 📚 Documentation

- **COMPREHENSIVE_FIX_REPORT.md** - Complete setup and troubleshooting guide
- **DEPLOYMENT_COMPLETE.md** - Deployment instructions and checklist
- **VERCEL_DEPLOY_GUIDE.md** - Vercel-specific deployment guide
- **VIDEO_UPLOAD_INSTRUCTIONS.md** - Video asset management
- **USER_MANAGEMENT_GUIDE.md** - Portal user setup and management
- **FINAL_SUMMARY.md** - Project summary and status

## 🚨 Current Status

✅ **Code:** Production-ready, fully functional
✅ **Build:** Compiles successfully
✅ **Assets:** Images optimized and loaded
⚠️ **Videos:** 14KB placeholders - need production footage
⚠️ **Firebase:** Credentials need configuration for portal
✅ **Design:** Professional, upmarket aesthetic
✅ **Responsive:** Mobile, tablet, desktop optimized
✅ **Performance:** Optimized with code splitting and lazy loading

## 🤝 Support

For support, email: info@peninsulaequine.com.au

---

Built with ❤️ by Peninsula Equine

**Ready to deploy!** Follow the Quick Start guide above to get started.
  