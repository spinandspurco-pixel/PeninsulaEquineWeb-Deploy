# Vercel Deployment Guide

## Quick Deploy

This repository is now ready for automatic deployment to Vercel. Simply merge this PR or push to main.

## Automatic Deployment

Vercel will automatically:
1. Detect the push to the repository
2. Install dependencies with `npm install`
3. Build the project with `npm run build`
4. Deploy the `build` directory to production

## Manual Deployment (if needed)

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Import from GitHub

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect settings from `vercel.json`
4. Click "Deploy"

## Configuration

The project is pre-configured with `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Environment Variables

If you need to add environment variables:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add any required variables
4. Redeploy

Currently, the project doesn't require any environment variables for basic deployment.

## Build Optimization

The build is optimized with:
- **Code Splitting**: Separate chunks for React and UI libraries
- **Asset Optimization**: Images and CSS are minified
- **Gzip Compression**: All assets are compressed
- **Caching**: Vendor chunks ensure efficient browser caching

## Performance Expectations

- **Initial Load**: ~120KB gzipped JavaScript
- **Build Time**: ~3 seconds
- **Deployment Time**: ~1 minute (including build)
- **First Contentful Paint**: < 2 seconds
- **Time to Interactive**: < 3 seconds

## Post-Deployment Checklist

After deployment, verify:
- [ ] Homepage loads with video hero
- [ ] Navigation between pages works
- [ ] Portal/Login functionality works
- [ ] Images load correctly
- [ ] Videos play without issues
- [ ] Mobile responsiveness
- [ ] Console has no errors

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (should be 18+)
- Check build logs in Vercel dashboard

### 404 Errors
- The `vercel.json` includes rewrites for SPA routing
- Should redirect all routes to `index.html`

### Slow Loading
- Check network tab for large assets
- Verify code splitting is working (should see separate vendor chunks)
- Check that images are being loaded lazily

## Monitoring

Once deployed, monitor:
- Vercel Analytics (if enabled)
- Core Web Vitals
- Error logs in Vercel dashboard
- Real User Monitoring metrics

## Rollback

If issues occur after deployment:
1. Go to Vercel dashboard
2. Select your project
3. Go to "Deployments"
4. Find previous working deployment
5. Click "Promote to Production"

## Custom Domain

To add a custom domain:
1. Go to project settings in Vercel
2. Navigate to "Domains"
3. Add your domain
4. Update DNS records as instructed
5. Vercel will automatically provision SSL

---

**Ready to Deploy?** ✅

Simply merge this PR or run `vercel --prod` from the command line!
