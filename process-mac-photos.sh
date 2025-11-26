#!/bin/bash
# Script to process images and videos from Mac Photos for web deployment
# This script optimizes media files for web use and organizes them correctly

set -e  # Exit on error

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
UPLOAD_DIR="./uploads"
CONVERTED_DIR="./src/assets/media/converted"
ASSETS_DIR="./src/assets"

# Required video files mapping
declare -A VIDEO_MAPPING=(
    ["hero1"]="IMG_1351.mp4"
    ["hero2"]="IMG_1354.mp4"
    ["hero3"]="IMG_2975.mp4"
    ["construction1"]="IMG_0014.mp4"
    ["construction2"]="IMG_0015.mp4"
    ["construction3"]="IMG_1021.mp4"
    ["construction4"]="IMG_2461.mp4"
)

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}   Mac Photos Media Processing Script${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Create necessary directories
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p "$UPLOAD_DIR"
mkdir -p "$CONVERTED_DIR"
mkdir -p "$ASSETS_DIR"

# Function to check if ffmpeg is available
check_ffmpeg() {
    if command -v ffmpeg &> /dev/null; then
        echo -e "${GREEN}✓ ffmpeg is installed${NC}"
        return 0
    else
        echo -e "${RED}✗ ffmpeg is not installed${NC}"
        echo -e "${YELLOW}Installing ffmpeg...${NC}"
        
        # Try to install ffmpeg
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y ffmpeg
        elif command -v brew &> /dev/null; then
            brew install ffmpeg
        else
            echo -e "${RED}Could not install ffmpeg automatically.${NC}"
            echo -e "${YELLOW}Please install ffmpeg manually:${NC}"
            echo "  - Ubuntu/Debian: sudo apt-get install ffmpeg"
            echo "  - macOS: brew install ffmpeg"
            return 1
        fi
    fi
}

# Function to get video duration
get_duration() {
    local file="$1"
    ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$file" 2>/dev/null | cut -d. -f1
}

# Function to convert video to web-optimized MP4
convert_video() {
    local input="$1"
    local output="$2"
    local max_size_mb=10
    
    echo -e "${YELLOW}Converting: $(basename "$input")${NC}"
    
    # Get video info
    local duration=$(get_duration "$input")
    
    # Calculate target bitrate to stay under max_size_mb
    # Formula: (max_size_mb * 8192) / duration = target_kbps
    local target_bitrate=$((max_size_mb * 8192 / duration))
    
    # Ensure minimum quality
    if [ $target_bitrate -lt 500 ]; then
        target_bitrate=500
    fi
    
    # Convert with web optimization
    ffmpeg -i "$input" \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
        -c:v libx264 \
        -preset medium \
        -crf 23 \
        -b:v ${target_bitrate}k \
        -maxrate ${target_bitrate}k \
        -bufsize $((target_bitrate * 2))k \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -pix_fmt yuv420p \
        -y "$output" 2>&1 | grep -v "^frame=" || true
    
    # Check output size
    local size=$(du -m "$output" | cut -f1)
    if [ $size -gt $max_size_mb ]; then
        echo -e "${YELLOW}Warning: File size is ${size}MB (target was ${max_size_mb}MB)${NC}"
    else
        echo -e "${GREEN}✓ Converted successfully (${size}MB)${NC}"
    fi
}

# Function to optimize image
optimize_image() {
    local input="$1"
    local output="$2"
    
    echo -e "${YELLOW}Optimizing image: $(basename "$input")${NC}"
    
    # For now, just copy the image
    # In production, you might want to use ImageMagick or similar
    cp "$input" "$output"
    
    local size=$(du -k "$output" | cut -f1)
    echo -e "${GREEN}✓ Image ready (${size}KB)${NC}"
}

# Main processing function
process_uploads() {
    echo -e "\n${BLUE}Step 1: Scanning upload directory${NC}"
    
    # Check if upload directory has files
    if [ ! "$(ls -A $UPLOAD_DIR 2>/dev/null)" ]; then
        echo -e "${RED}No files found in $UPLOAD_DIR${NC}"
        echo -e "${YELLOW}Please place your Mac Photos exports in the '$UPLOAD_DIR' directory${NC}"
        echo ""
        echo "Expected files:"
        for key in "${!VIDEO_MAPPING[@]}"; do
            echo "  - ${VIDEO_MAPPING[$key]}"
        done
        return 1
    fi
    
    # List found files
    echo -e "${GREEN}Found files:${NC}"
    ls -lh "$UPLOAD_DIR"
    
    echo -e "\n${BLUE}Step 2: Processing videos${NC}"
    
    # Check for ffmpeg
    if ! check_ffmpeg; then
        echo -e "${RED}Cannot process videos without ffmpeg${NC}"
        return 1
    fi
    
    # Process videos
    local video_count=0
    shopt -s nullglob
    for video_file in "$UPLOAD_DIR"/*.mp4 "$UPLOAD_DIR"/*.mov "$UPLOAD_DIR"/*.MP4 "$UPLOAD_DIR"/*.MOV; do
        [ -f "$video_file" ] || continue
        if [ -f "$video_file" ]; then
            local basename=$(basename "$video_file")
            local filename="${basename%.*}"
            
            # Check if this matches one of our required videos
            local found=false
            for key in "${!VIDEO_MAPPING[@]}"; do
                local required="${VIDEO_MAPPING[$key]%.mp4}"
                if [[ "$filename" == "$required" ]] || [[ "$filename" == *"$required"* ]]; then
                    convert_video "$video_file" "$CONVERTED_DIR/${VIDEO_MAPPING[$key]}"
                    found=true
                    ((video_count++))
                    break
                fi
            done
            
            if [ "$found" = false ]; then
                echo -e "${YELLOW}Skipping: $basename (doesn't match required videos)${NC}"
            fi
        fi
    done
    
    echo -e "\n${BLUE}Step 3: Processing images${NC}"
    
    # Process images
    local image_count=0
    for image_file in "$UPLOAD_DIR"/*.jpg "$UPLOAD_DIR"/*.jpeg "$UPLOAD_DIR"/*.png "$UPLOAD_DIR"/*.JPG "$UPLOAD_DIR"/*.JPEG "$UPLOAD_DIR"/*.PNG; do
        [ -f "$image_file" ] || continue
        if [ -f "$image_file" ]; then
            local basename=$(basename "$image_file")
            optimize_image "$image_file" "$ASSETS_DIR/$basename"
            ((image_count++))
        fi
    done
    
    echo -e "\n${BLUE}Step 4: Summary${NC}"
    echo -e "${GREEN}✓ Processed $video_count videos${NC}"
    echo -e "${GREEN}✓ Processed $image_count images${NC}"
    
    # Check which required videos are still missing
    echo -e "\n${BLUE}Required videos status:${NC}"
    local missing_count=0
    for key in "${!VIDEO_MAPPING[@]}"; do
        local video_file="$CONVERTED_DIR/${VIDEO_MAPPING[$key]}"
        if [ -f "$video_file" ]; then
            echo -e "${GREEN}✓ ${VIDEO_MAPPING[$key]}${NC}"
        else
            echo -e "${RED}✗ ${VIDEO_MAPPING[$key]} (missing)${NC}"
            ((missing_count++))
        fi
    done
    
    if [ $missing_count -gt 0 ]; then
        echo -e "\n${YELLOW}Warning: $missing_count required video(s) still missing${NC}"
        echo -e "${YELLOW}Make sure to upload all required videos before deploying${NC}"
    else
        echo -e "\n${GREEN}✓ All required videos are ready!${NC}"
    fi
}

# Help function
show_help() {
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  process    Process files in the uploads directory"
    echo "  status     Show status of required media files"
    echo "  help       Show this help message"
    echo ""
    echo "To upload files:"
    echo "  1. Place your Mac Photos exports in the '$UPLOAD_DIR' directory"
    echo "  2. Run: $0 process"
    echo ""
}

# Status function
show_status() {
    echo -e "${BLUE}Media Files Status${NC}"
    echo -e "${BLUE}================================================${NC}"
    
    echo -e "\n${YELLOW}Required Videos:${NC}"
    for key in "${!VIDEO_MAPPING[@]}"; do
        local video_file="$CONVERTED_DIR/${VIDEO_MAPPING[$key]}"
        if [ -f "$video_file" ]; then
            local size=$(du -h "$video_file" | cut -f1)
            echo -e "${GREEN}✓${NC} ${VIDEO_MAPPING[$key]} (${size})"
        else
            echo -e "${RED}✗${NC} ${VIDEO_MAPPING[$key]} (missing)"
        fi
    done
    
    echo -e "\n${YELLOW}Images in assets:${NC}"
    shopt -s nullglob
    local images=("$ASSETS_DIR"/*.png)
    if [ ${#images[@]} -gt 0 ]; then
        for img in "${images[@]}"; do
            if [ -f "$img" ]; then
                local size=$(du -h "$img" | cut -f1)
                echo -e "${GREEN}✓${NC} $(basename "$img") (${size})"
            fi
        done
    else
        echo -e "${YELLOW}No images found${NC}"
    fi
}

# Main script
case "${1:-process}" in
    process)
        process_uploads
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}Unknown option: $1${NC}"
        show_help
        exit 1
        ;;
esac
