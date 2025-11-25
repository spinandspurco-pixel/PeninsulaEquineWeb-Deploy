# Peninsula Equine - From Dirt to Dynasty 🐴

Professional equestrian construction company website with comprehensive worker portal system.

![Peninsula Equine](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0.0-blue)

## 🌟 Features

### Public Website
- ✨ Cinematic hero section with video backgrounds
- 🎨 Premium warm amber/gold tone branding
- 🐴 Custom horseshoe cursor
- 📱 Fully responsive design
- 🌗 Light/Dark theme toggle
- 🎯 Multi-page navigation

### Worker Portal
- 🔐 Google Workspace authentication (@peninsulaequine.com.au)
- ⏰ Digital timesheet submission
- 📋 SWMS (Safe Work Method Statement) forms
- 🔧 Toolbox Talk submissions
- 🚨 Incident reporting system
- 📚 Reference documentation access
- ✅ Role-based access control

### Admin Dashboard
- 👥 User management (approve/reject workers)
- ✅ Timesheet review and approval
- 📊 Analytics and statistics
- 📝 All submissions overview
- 📧 Email notifications to admins
- 🔑 Worker promotion capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/peninsula-equine.git
cd peninsula-equine

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

## 📦 Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🗂️ Project Structure

```
peninsula-equine/
├── components/              # Reusable UI components
│   ├── HeroSection.tsx
│   ├── HorseshoeCursor.tsx
│   ├── Navigation.tsx
│   └── ui/                 # Shadcn UI components (40+)
├── pages/                  # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── TimesheetPage.tsx
│   ├── AdminDashboardPage.tsx
│   └── ...
├── lib/                    # Utilities and services
│   ├── firebase-config.ts  # Firebase configuration
│   └── firebase-service.ts # All Firebase operations
├── context/               # React context providers
│   └── ThemeContext.tsx
├── styles/               # Global styles
│   └── globals.css
├── public/              # Static assets
├── src/                # Entry point
│   ├── main.tsx
│   └── App.tsx
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.ts     # Build configuration
└── tsconfig.json      # TypeScript config
```

## 🔧 Configuration

### Firebase Setup (Production)

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Google OAuth)
3. Enable Firestore Database
4. Update `/lib/firebase-config.ts` with your credentials:

```typescript
export const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "peninsulaequine.firebaseapp.com",
  projectId: "peninsulaequine",
  storageBucket: "peninsulaequine.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Google Workspace OAuth

1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Restrict to @peninsulaequine.com.au domain
4. Add authorized domains

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy --only hosting
```

## 🧪 Demo Credentials

### Worker Account
- Email: `worker@peninsulaequine.com.au`
- Password: any password (demo mode)

### Admin Account  
- Email: `admin@peninsulaequine.com.au`
- Password: any password (demo mode)

## 🎨 Brand Colors

```css
--charcoal: #0F0F0F;      /* Primary dark */
--gold: #C9A24E;          /* Primary accent */
--bronze: #A88B63;        /* Secondary accent */
--steel-blue: #78A1BB;    /* Tertiary accent */
--soft-white: #F5F4F1;    /* Light background */
```

## 📱 Technology Stack

- **Frontend**: React 18.3, TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animation**: Motion (Framer Motion)
- **UI Components**: Radix UI, Shadcn
- **Forms**: React Hook Form
- **Notifications**: Sonner
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Backend**: Firebase (Auth + Firestore)

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔒 Security Features

- ✅ Role-based access control (Worker/Admin/Pending)
- ✅ Protected routes with authentication guards
- ✅ Firestore security rules
- ✅ Google Workspace domain restriction
- ✅ Admin approval workflow for new workers
- ✅ Secure session management

## 📧 Email Notifications

All submissions (timesheets, SWMS, toolbox talks, incidents) send automatic email notifications to:
- tam@peninsulaequine.com.au
- ciro@peninsulaequine.com.au

## 📖 Documentation

- [Deployment Checklist](/DEPLOYMENT_CHECKLIST.md) - Comprehensive deployment guide
- [GitHub Setup](/GITHUB_SETUP.md) - GitHub repository configuration
- [Guidelines](/guidelines/Guidelines.md) - Development guidelines

## 🤝 Contributing

This is a private repository for Peninsula Equine. Contact the administrators for access.

## 📄 License

Copyright © 2024 Peninsula Equine. All rights reserved.

## 🆘 Support

For technical support or questions:
- Email: admin@peninsulaequine.com.au
- Website: https://equinepeninsula.com.au

---

**Built with ❤️ for Peninsula Equine - "From Dirt to Dynasty"**
