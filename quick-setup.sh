#!/bin/bash

# Peninsula Equine Website - Quick Setup Script
# This script automates the initial setup process

set -e  # Exit on error

echo "🐴 Peninsula Equine Website - Quick Setup"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo ""
    echo "Please install Node.js first:"
    echo "1. Install nvm (Node Version Manager):"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo ""
    echo "2. Restart your terminal, then run:"
    echo "   nvm install --lts"
    echo "   nvm use --lts"
    echo ""
    echo "3. Run this script again"
    exit 1
else
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ Node.js ${NODE_VERSION} installed${NC}"
    echo -e "${GREEN}✅ npm ${NPM_VERSION} installed${NC}"
fi

echo ""
echo "📥 Installing dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  node_modules already exists${NC}"
    read -p "   Reinstall dependencies? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf node_modules package-lock.json
        npm install
        echo -e "${GREEN}✅ Dependencies reinstalled${NC}"
    else
        echo -e "${GREEN}✅ Using existing dependencies${NC}"
    fi
fi

echo ""
echo "🔨 Testing build..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    echo ""
    echo "Running build with full output:"
    npm run build
    exit 1
fi

echo ""
echo "🎥 Checking video files..."
VIDEO_DIR="src/assets/media/converted"
VIDEOS=("IMG_1351.mp4" "IMG_1354.mp4" "IMG_2975.mp4" "IMG_0014.mp4" "IMG_0015.mp4" "IMG_1021.mp4" "IMG_2461.mp4")
PLACEHOLDER_COUNT=0

for video in "${VIDEOS[@]}"; do
    if [ -f "${VIDEO_DIR}/${video}" ]; then
        SIZE=$(du -h "${VIDEO_DIR}/${video}" | cut -f1)
        if [ "$SIZE" = "14K" ]; then
            echo -e "${YELLOW}⚠️  ${video}: ${SIZE} (placeholder)${NC}"
            ((PLACEHOLDER_COUNT++))
        else
            echo -e "${GREEN}✅ ${video}: ${SIZE}${NC}"
        fi
    else
        echo -e "${RED}❌ ${video}: missing${NC}"
        ((PLACEHOLDER_COUNT++))
    fi
done

if [ $PLACEHOLDER_COUNT -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Warning: ${PLACEHOLDER_COUNT} video(s) are placeholders or missing${NC}"
    echo "   Upload your production videos to: ${VIDEO_DIR}/"
    echo "   See VIDEO_UPLOAD_INSTRUCTIONS.md for details"
fi

echo ""
echo "🔑 Checking Firebase configuration..."
if grep -q "YOUR_API_KEY_HERE" src/lib/firebase-config.ts; then
    echo -e "${YELLOW}⚠️  Firebase credentials not configured${NC}"
    echo "   Portal authentication will not work until you:"
    echo "   1. Create a Firebase project"
    echo "   2. Update src/lib/firebase-config.ts with your credentials"
    echo "   See COMPREHENSIVE_FIX_REPORT.md → Phase 4 for instructions"
else
    echo -e "${GREEN}✅ Firebase configuration appears complete${NC}"
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Start development server:"
echo "   ${GREEN}npm run dev${NC}"
echo ""
echo "2. Open in browser:"
echo "   ${GREEN}http://localhost:3000${NC}"
echo ""
echo "3. Build for production:"
echo "   ${GREEN}npm run build${NC}"
echo ""
echo "4. Preview production build:"
echo "   ${GREEN}npm run preview${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 Documentation:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "• COMPREHENSIVE_FIX_REPORT.md - Complete setup guide"
echo "• VIDEO_UPLOAD_INSTRUCTIONS.md - Video management"
echo "• USER_MANAGEMENT_GUIDE.md - Portal user setup"
echo "• VERCEL_DEPLOY_GUIDE.md - Deployment instructions"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Ready to launch! 🎉"
echo ""
