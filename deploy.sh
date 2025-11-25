#!/bin/bash

# Peninsula Equine - Quick Deploy Script
# This script will help you deploy to Vercel quickly

echo "🐴 Peninsula Equine - Deployment Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is ready"
echo ""

# Check if user is logged in
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "Please log in to Vercel:"
    vercel login
else
    echo "✅ Already logged in to Vercel"
fi

echo ""
echo "🏗️  Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Deploy
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📝 Next steps:"
    echo "  1. Note the deployment URL from above"
    echo "  2. Go to Vercel Dashboard to add your custom domain"
    echo "  3. Configure DNS in Honcho to point to Vercel"
    echo "  4. Test all pages and functionality"
    echo ""
    echo "🌐 To add a custom domain:"
    echo "  - Vercel Dashboard → Project → Settings → Domains"
    echo "  - Add your domain from Honcho"
    echo "  - Update DNS records as instructed"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi
