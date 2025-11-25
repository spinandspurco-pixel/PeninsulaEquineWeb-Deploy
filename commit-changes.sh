#!/bin/bash

echo "📦 Committing all website updates with real media..."
echo ""

cd /workspaces/PeninsulaEquineWeb

# Stage all changes
git add -A

# Commit with detailed message
git commit -m "🎬 Major Update: Real Media Integration & Professional Optimizations

✨ New Features:
- VideoHero component with auto-looping construction/horse videos
- ConstructionVideoShowcase with hover-to-play video gallery
- Real project photos replacing all placeholders

🎥 Video Integration:
- HomePage: 3 rotating hero videos (IMG_1351, IMG_1354, IMG_2975)
- ConstructionsPage: 4 construction process videos with hover effects
- Converted all MOV files to web-optimized MP4 format

📸 Image Updates:
- ProjectsPage: 9 real project photos from shoots
- Replaced Figma placeholders with actual construction/horse images
- All images optimized for web performance

🎨 Components Added:
- VideoHero.tsx - Looping video background with logo animation
- ConstructionVideoShowcase.tsx - Interactive video gallery
- Media conversion scripts for future uploads

🔧 Technical Improvements:
- Organized media in src/assets/media/ structure
- Added video conversion automation scripts
- Optimized all images for fast loading
- Footer added to all public pages
- Navigation improvements and centering fixes

🚀 Performance Optimizations:
- GPU-accelerated animations
- Lazy loading for images
- Optimized video encoding (H.264, AAC)
- Mobile-first responsive design
- Loading states and smooth transitions

📁 File Organization:
- src/assets/media/images/ (37 images)
- src/assets/media/converted/ (15 MP4 videos)
- Automated conversion scripts for MOV/HEIC files

All pages now feature real Peninsula Equine content showcasing actual construction projects, horse facilities, and championship horses."

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Commit successful!"
    echo ""
    echo "📊 Summary of changes:"
    git diff --stat HEAD~1
    echo ""
    echo "🚀 Ready to push to GitHub!"
    echo ""
    echo "Run: git push origin main"
else
    echo ""
    echo "❌ Commit failed. Check for errors above."
fi
