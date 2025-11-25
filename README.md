
  # Peninsula Equine Web

**From Dirt to Dynasty** - Professional Equestrian Construction Company Website

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
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

## 🐛 Troubleshooting

### Build fails
- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check Node version: `node -v` (should be 18+)

### Assets not loading
- Check file paths are correct
- Verify assets are in the correct directory
- Check browser console for errors

### Figma preview issues
The code is production-ready. Figma preview limitations don't affect actual deployment.

## 📄 License

Copyright © 2024 Peninsula Equine. All rights reserved.

## 🤝 Support

For support, email: info@peninsulaequine.com.au

---

Built with ❤️ by Peninsula Equine
  