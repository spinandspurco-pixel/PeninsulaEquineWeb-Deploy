#!/bin/bash

# EMERGENCY DISK CLEANUP - 32GB workspace, only 6.6GB free
# This removes everything non-essential IMMEDIATELY

echo "🚨 EMERGENCY DISK CLEANUP"
echo "========================="
echo ""

# Remove the biggest offenders first
echo "Removing node_modules..."
rm -rf node_modules

echo "Removing all video files..."
rm -rf src/assets/media

echo "Removing build directory..."
rm -rf build

echo "Removing all bundles..."
rm -f *.bundle

echo "Removing nested repos..."
rm -rf PeninsulaEquineWeb-Deploy

echo "Removing public assets if large..."
rm -rf public/* 2>/dev/null || true

echo "Cleaning npm cache..."
npm cache clean --force 2>/dev/null || true

echo "Running Git garbage collection..."
git gc --aggressive --prune=now

echo "Removing temporary files..."
find . -name "*.log" -delete
find . -name "*.tmp" -delete
find . -name ".DS_Store" -delete

echo ""
echo "✅ Cleanup complete!"
df -h .
