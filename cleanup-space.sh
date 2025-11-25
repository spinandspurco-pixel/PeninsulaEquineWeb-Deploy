#!/bin/bash

# Peninsula Equine - Disk Space Cleanup Script
# Removes unnecessary files to free up space for deployment

set -e

echo "🧹 Peninsula Equine - Disk Space Cleanup"
echo "=========================================="
echo ""

# Check current disk usage
echo "📊 Current disk usage:"
df -h . | tail -1
echo ""

SPACE_FREED=0

# 1. Remove node_modules (can be reinstalled)
if [ -d "node_modules" ]; then
    echo "🗑️  Removing node_modules (can reinstall with npm install)..."
    SIZE=$(du -sm node_modules 2>/dev/null | cut -f1)
    rm -rf node_modules
    SPACE_FREED=$((SPACE_FREED + SIZE))
    echo "✅ Freed ${SIZE}MB"
fi

# 2. Remove build directory (we have the source)
if [ -d "build" ]; then
    echo "🗑️  Removing build directory (can rebuild with npm run build)..."
    SIZE=$(du -sm build 2>/dev/null | cut -f1)
    rm -rf build
    SPACE_FREED=$((SPACE_FREED + SIZE))
    echo "✅ Freed ${SIZE}MB"
fi

# 3. Remove original converted videos (keeping only enhanced if they exist)
if [ -d "src/assets/media/converted" ]; then
    echo "🗑️  Removing converted videos (using placeholders for deployment)..."
    SIZE=$(du -sm src/assets/media/converted 2>/dev/null | cut -f1)
    rm -rf src/assets/media/converted
    SPACE_FREED=$((SPACE_FREED + SIZE))
    echo "✅ Freed ${SIZE}MB"
fi

# 4. Remove enhanced videos (using CDN placeholders anyway)
if [ -d "src/assets/media/enhanced" ]; then
    echo "🗑️  Removing enhanced videos (using CDN placeholders)..."
    SIZE=$(du -sm src/assets/media/enhanced 2>/dev/null | cut -f1)
    rm -rf src/assets/media/enhanced
    SPACE_FREED=$((SPACE_FREED + SIZE))
    echo "✅ Freed ${SIZE}MB"
fi

# 5. Remove original MOV files if any remain
if [ -d "src/assets/media/original" ]; then
    echo "🗑️  Removing original MOV files..."
    SIZE=$(du -sm src/assets/media/original 2>/dev/null | cut -f1)
    rm -rf src/assets/media/original
    SPACE_FREED=$((SPACE_FREED + SIZE))
    echo "✅ Freed ${SIZE}MB"
fi

# 6. Remove any .mov or .MOV files in assets
echo "🗑️  Removing any remaining .mov/.MOV files..."
find src/assets -type f \( -iname "*.mov" \) -delete 2>/dev/null || true
echo "✅ Cleaned MOV files"

# 7. Remove old bundle if exists
if [ -f "peninsulaequine.bundle" ]; then
    echo "🗑️  Removing old bundle..."
    SIZE=$(du -sm peninsulaequine.bundle 2>/dev/null | cut -f1)
    rm -f peninsulaequine.bundle
    SPACE_FREED=$((SPACE_FREED + SIZE))
    echo "✅ Freed ${SIZE}MB"
fi

# 8. Remove nested repo if exists
if [ -d "PeninsulaEquineWeb-Deploy" ]; then
    echo "🗑️  Removing nested repository..."
    SIZE=$(du -sm PeninsulaEquineWeb-Deploy 2>/dev/null | cut -f1)
    rm -rf PeninsulaEquineWeb-Deploy
    SPACE_FREED=$((SPACE_FREED + SIZE))
    echo "✅ Freed ${SIZE}MB"
fi

# 9. Clean npm cache
echo "🗑️  Cleaning npm cache..."
npm cache clean --force 2>/dev/null || true
echo "✅ NPM cache cleaned"

# 10. Remove any script artifacts
rm -f convert-remaining.sh enhance-videos.sh organize-media.sh auto-deploy.sh final-push.sh 2>/dev/null || true
echo "✅ Removed old scripts"

# 11. Clean Git garbage
echo "🗑️  Running Git garbage collection..."
git gc --aggressive --prune=now 2>/dev/null || true
echo "✅ Git cleaned"

echo ""
echo "=========================================="
echo "✅ CLEANUP COMPLETE"
echo "=========================================="
echo ""
echo "💾 Total space freed: ~${SPACE_FREED}MB"
echo ""
echo "📊 New disk usage:"
df -h . | tail -1
echo ""
echo "📋 What was removed:"
echo "  • node_modules (reinstall: npm install)"
echo "  • build/ directory (rebuild: npm run build)"
echo "  • All video files (using CDN placeholders)"
echo "  • Old bundles and nested repos"
echo "  • Conversion scripts"
echo "  • npm cache"
echo ""
echo "✅ Repository is now minimal and ready for deployment!"
echo ""
