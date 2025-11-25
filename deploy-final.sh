#!/bin/bash

# Peninsula Equine Web - Automated Deployment Script
# This script commits all changes, creates a bundle, and attempts GitHub push

set -e  # Exit on any error

echo "🚀 Peninsula Equine - Automated Deployment"
echo "=========================================="
echo ""

# Step 1: Clean up any nested repos
echo "📁 Cleaning up nested repositories..."
if [ -d "PeninsulaEquineWeb-Deploy" ]; then
    rm -rf PeninsulaEquineWeb-Deploy
    echo "✅ Removed nested repository"
fi

# Step 2: Add all files
echo ""
echo "📝 Adding all files to Git..."
git add -A

# Step 3: Check if there's anything to commit
if git diff --cached --quiet; then
    echo "⚠️  No changes to commit"
else
    echo "📦 Committing changes..."
    git commit -m "feat: Final deployment with all optimizations

- Added deployment summary documentation
- Performance optimizations (lazy loading, GPU acceleration)
- Loading skeleton animations with shimmer effect
- Instant loading spinner in index.html
- All portal forms tested and verified
- Reference docs page with 8 documents
- Mobile touch optimizations
- Replaced local media with CDN placeholders for deployment
- Build verified and tested

Ready for production deployment."
    echo "✅ Changes committed"
fi

# Step 4: Create fresh bundle
echo ""
echo "📦 Creating Git bundle for manual deployment..."
git bundle create peninsulaequine-final.bundle HEAD
echo "✅ Bundle created: peninsulaequine-final.bundle"

# Step 5: Attempt to push to GitHub
echo ""
echo "🌐 Attempting to push to GitHub..."
echo "Current branch: $(git branch --show-current)"

# Check if remote exists
if git remote get-url origin &> /dev/null; then
    echo "Remote origin exists: $(git remote get-url origin)"
    
    # Try to push
    if git push origin deploy-without-videos 2>&1; then
        echo "✅ Successfully pushed to GitHub!"
        
        # Step 6: Try Vercel deployment
        echo ""
        echo "🚀 Attempting Vercel deployment..."
        
        if command -v vercel &> /dev/null; then
            echo "Vercel CLI found, deploying..."
            vercel --prod --yes
        else
            echo "⚠️  Vercel CLI not installed"
            echo "📋 Manual deployment steps:"
            echo "1. Go to https://vercel.com/dashboard"
            echo "2. Import your GitHub repository"
            echo "3. Select 'deploy-without-videos' branch"
            echo "4. Deploy!"
        fi
    else
        echo "⚠️  GitHub push failed"
        echo "📦 Bundle method available as fallback"
    fi
else
    echo "⚠️  No remote 'origin' configured"
    echo ""
    echo "📋 To set up GitHub remote:"
    echo "1. Create new repo: https://github.com/new"
    echo "2. Run: git remote add origin <your-repo-url>"
    echo "3. Run: git push -u origin deploy-without-videos"
fi

# Final summary
echo ""
echo "=========================================="
echo "✅ DEPLOYMENT PACKAGE READY"
echo "=========================================="
echo ""
echo "📦 Bundle: peninsulaequine-final.bundle"
echo "🌿 Branch: deploy-without-videos"
echo ""
echo "📋 Manual Deployment (if needed):"
echo "1. Download peninsulaequine-final.bundle"
echo "2. On local Mac: git clone peninsulaequine-final.bundle PeninsulaEquineWeb-Deploy"
echo "3. Create GitHub repo and push"
echo "4. Deploy on Vercel dashboard"
echo ""
echo "📖 See DEPLOYMENT_SUMMARY.md for complete instructions"
echo ""
