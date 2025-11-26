#!/bin/bash

# Peninsula Equine Web - Video Setup Helper
# This script helps you configure video hosting for your website

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   Peninsula Equine Web - Video Setup Wizard 🎬            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env exists
if [ -f .env ]; then
    echo -e "${YELLOW}⚠️  Warning: .env file already exists${NC}"
    echo -n "Do you want to overwrite it? (y/N): "
    read -r response
    if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "Exiting without changes."
        exit 0
    fi
fi

echo ""
echo "Choose your video hosting method:"
echo ""
echo "1) ${GREEN}Cloudinary${NC} (Recommended - Free, Fast, Easy)"
echo "2) ${BLUE}Vercel Blob Storage${NC} (Free, Integrated)"
echo "3) ${BLUE}GitHub Releases${NC} (Free, Simple)"
echo "4) ${YELLOW}Local Videos (Git LFS)${NC} (Slower, requires Git LFS)"
echo "5) ${YELLOW}Custom CDN URL${NC} (Advanced)"
echo ""
echo -n "Enter your choice (1-5): "
read -r choice

case $choice in
    1)
        echo ""
        echo -e "${GREEN}📦 Cloudinary Setup${NC}"
        echo ""
        echo "Steps:"
        echo "1. Sign up for free at https://cloudinary.com"
        echo "2. Upload your 7 videos to a folder (e.g., 'peninsula-equine/videos')"
        echo "3. Copy your Cloud Name (found in dashboard)"
        echo ""
        echo -n "Enter your Cloudinary Cloud Name: "
        read -r cloud_name
        
        if [ -z "$cloud_name" ]; then
            echo -e "${RED}❌ Cloud name cannot be empty${NC}"
            exit 1
        fi
        
        echo -n "Enter folder path (default: peninsula-equine/videos): "
        read -r folder_path
        folder_path=${folder_path:-peninsula-equine/videos}
        
        cat > .env << EOF
# Cloudinary CDN Configuration
VITE_VIDEO_CDN_ENABLED=true
VITE_VIDEO_CDN_URL=https://res.cloudinary.com/${cloud_name}/video/upload/${folder_path}
EOF
        
        echo ""
        echo -e "${GREEN}✅ Configuration saved to .env${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Make sure your 7 videos are uploaded to Cloudinary"
        echo "2. Run 'npm run dev' to test locally"
        echo "3. Deploy to Vercel when ready"
        ;;
        
    2)
        echo ""
        echo -e "${BLUE}📦 Vercel Blob Storage Setup${NC}"
        echo ""
        echo "Steps:"
        echo "1. Install Vercel CLI: npm install -g vercel"
        echo "2. Upload your videos using: vercel blob upload video.mp4"
        echo "3. Copy the blob URL base path"
        echo ""
        echo -n "Enter your Vercel Blob URL: "
        read -r blob_url
        
        if [ -z "$blob_url" ]; then
            echo -e "${RED}❌ Blob URL cannot be empty${NC}"
            exit 1
        fi
        
        cat > .env << EOF
# Vercel Blob Storage Configuration
VITE_VIDEO_CDN_ENABLED=true
VITE_VIDEO_CDN_URL=${blob_url}
EOF
        
        echo ""
        echo -e "${GREEN}✅ Configuration saved to .env${NC}"
        ;;
        
    3)
        echo ""
        echo -e "${BLUE}📦 GitHub Releases Setup${NC}"
        echo ""
        echo "Steps:"
        echo "1. Create a new release in your GitHub repository"
        echo "2. Attach all 7 video files to the release"
        echo "3. Copy the release tag"
        echo ""
        echo -n "Enter your GitHub username/org: "
        read -r github_user
        echo -n "Enter your repository name: "
        read -r github_repo
        echo -n "Enter release tag (e.g., videos-v1.0): "
        read -r release_tag
        
        if [ -z "$github_user" ] || [ -z "$github_repo" ] || [ -z "$release_tag" ]; then
            echo -e "${RED}❌ All fields are required${NC}"
            exit 1
        fi
        
        cat > .env << EOF
# GitHub Releases Configuration
VITE_VIDEO_CDN_ENABLED=true
VITE_VIDEO_CDN_URL=https://github.com/${github_user}/${github_repo}/releases/download/${release_tag}
EOF
        
        echo ""
        echo -e "${GREEN}✅ Configuration saved to .env${NC}"
        ;;
        
    4)
        echo ""
        echo -e "${YELLOW}📦 Local Videos (Git LFS) Setup${NC}"
        echo ""
        
        # Check if git-lfs is installed
        if ! command -v git-lfs &> /dev/null; then
            echo -e "${RED}❌ Git LFS is not installed${NC}"
            echo ""
            echo "Install it with:"
            echo "  macOS: brew install git-lfs"
            echo "  Linux: sudo apt-get install git-lfs"
            echo "  Windows: Download from https://git-lfs.github.com"
            exit 1
        fi
        
        cat > .env << EOF
# Local Videos Configuration (Git LFS)
VITE_VIDEO_CDN_ENABLED=false
EOF
        
        echo ""
        echo -e "${GREEN}✅ Configuration saved to .env${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Copy your 7 videos to: src/assets/media/converted/"
        echo "2. Run: git add src/assets/media/converted/*.mp4"
        echo "3. Run: git commit -m 'Add video assets'"
        echo "4. Run: git push"
        echo ""
        echo -e "${YELLOW}⚠️  Note: This may take a long time for large files${NC}"
        ;;
        
    5)
        echo ""
        echo -e "${YELLOW}📦 Custom CDN URL Setup${NC}"
        echo ""
        echo -n "Enter your CDN base URL: "
        read -r cdn_url
        
        if [ -z "$cdn_url" ]; then
            echo -e "${RED}❌ CDN URL cannot be empty${NC}"
            exit 1
        fi
        
        cat > .env << EOF
# Custom CDN Configuration
VITE_VIDEO_CDN_ENABLED=true
VITE_VIDEO_CDN_URL=${cdn_url}
EOF
        
        echo ""
        echo -e "${GREEN}✅ Configuration saved to .env${NC}"
        ;;
        
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "Your videos needed (7 total):"
echo "  Hero videos:"
echo "    • IMG_1351.mp4"
echo "    • IMG_1354.mp4"
echo "    • IMG_2975.mp4"
echo "  Construction videos:"
echo "    • IMG_0014.mp4"
echo "    • IMG_0015.mp4"
echo "    • IMG_1021.mp4"
echo "    • IMG_2461.mp4"
echo ""
echo "Test locally:"
echo "  $ npm run dev"
echo ""
echo "Deploy to production:"
echo "  $ git add .env"
echo "  $ git commit -m 'Configure video CDN'"
echo "  $ git push"
echo ""
echo "For more details, see: VIDEO_HOSTING_GUIDE.md"
echo ""
