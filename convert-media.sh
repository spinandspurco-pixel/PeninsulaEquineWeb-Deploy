#!/bin/bash

# Media Conversion Script for Peninsula Equine
# Converts videos and images to web-compatible formats

echo "🎬 Peninsula Equine - Media Converter"
echo "======================================"
echo ""

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "⚠️  ffmpeg is not installed. Installing..."
    sudo apt-get update && sudo apt-get install -y ffmpeg
fi

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick is not installed. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

ASSETS_DIR="/workspaces/PeninsulaEquineWeb/src/assets"
OUTPUT_DIR="/workspaces/PeninsulaEquineWeb/src/assets/converted"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "📁 Searching for media files in $ASSETS_DIR..."
echo ""

# Convert MOV/AVI videos to MP4
echo "🎥 Converting videos..."
find "$ASSETS_DIR" -type f \( -iname "*.mov" -o -iname "*.avi" -o -iname "*.MOV" -o -iname "*.AVI" \) | while read file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    output="$OUTPUT_DIR/${name}.mp4"
    
    echo "  Converting: $filename → ${name}.mp4"
    ffmpeg -i "$file" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart "$output" -y 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Success: ${name}.mp4"
    else
        echo "  ❌ Failed: $filename"
    fi
done

# Convert HEIC/HEIF images to JPG
echo ""
echo "📸 Converting images..."
find "$ASSETS_DIR" -type f \( -iname "*.heic" -o -iname "*.heif" -o -iname "*.HEIC" -o -iname "*.HEIF" \) | while read file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    output="$OUTPUT_DIR/${name}.jpg"
    
    echo "  Converting: $filename → ${name}.jpg"
    convert "$file" "$output" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Success: ${name}.jpg"
    else
        echo "  ❌ Failed: $filename"
    fi
done

# Optimize PNG files
echo ""
echo "🖼️  Optimizing PNG files..."
find "$ASSETS_DIR" -type f \( -iname "*.png" -o -iname "*.PNG" \) -not -path "*/converted/*" | while read file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    output="$OUTPUT_DIR/${name}.png"
    
    echo "  Optimizing: $filename"
    convert "$file" -strip -quality 85 "$output" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Optimized: ${name}.png"
    else
        echo "  ❌ Failed: $filename"
    fi
done

# Optimize JPG files
find "$ASSETS_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.JPG" -o -iname "*.JPEG" \) -not -path "*/converted/*" | while read file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    output="$OUTPUT_DIR/${name}.jpg"
    
    echo "  Optimizing: $filename"
    convert "$file" -strip -quality 85 "$output" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Optimized: ${name}.jpg"
    else
        echo "  ❌ Failed: $filename"
    fi
done

echo ""
echo "✨ Conversion complete!"
echo "📁 Converted files are in: $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "1. Review the converted files"
echo "2. Move them to appropriate folders (uploads/construction, uploads/horses, etc.)"
echo "3. Rename them with descriptive names"
echo ""
