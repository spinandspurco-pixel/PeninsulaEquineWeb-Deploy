#!/bin/bash

# Peninsula Equine - Pre-Deployment Checklist
# Run this script to verify everything is ready

echo "🐴 Peninsula Equine - Pre-Deployment Check"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
checks_passed=0
checks_failed=0

# Function to check command
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $2"
        ((checks_passed++))
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        ((checks_failed++))
        return 1
    fi
}

# Function to check file
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((checks_passed++))
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        ((checks_failed++))
        return 1
    fi
}

# Function to check directory
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((checks_passed++))
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        ((checks_failed++))
        return 1
    fi
}

echo "1. Checking Dependencies..."
echo "----------------------------"
check_command node "Node.js installed"
check_command npm "npm installed"
check_command git "Git installed"
echo ""

echo "2. Checking Project Files..."
echo "-----------------------------"
check_file "package.json" "package.json exists"
check_file "vite.config.ts" "vite.config.ts exists"
check_file "tsconfig.json" "tsconfig.json exists"
check_file "vercel.json" "vercel.json exists"
check_file "index.html" "index.html exists"
check_file ".gitignore" ".gitignore exists"
echo ""

echo "3. Checking Source Files..."
echo "---------------------------"
check_file "src/App.tsx" "App.tsx exists"
check_file "src/main.tsx" "main.tsx exists"
check_file "src/index.css" "index.css exists"
check_dir "src/components" "Components directory exists"
check_dir "src/pages" "Pages directory exists"
check_dir "src/lib" "Lib directory exists"
echo ""

echo "4. Checking Dependencies Installation..."
echo "-----------------------------------------"
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules directory exists"
    ((checks_passed++))
else
    echo -e "${YELLOW}!${NC} node_modules not found, installing..."
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} Dependencies installed successfully"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} Failed to install dependencies"
        ((checks_failed++))
    fi
fi
echo ""

echo "5. Running Build Test..."
echo "------------------------"
npm run build &> /dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Build successful"
    ((checks_passed++))
else
    echo -e "${RED}✗${NC} Build failed - check for errors"
    ((checks_failed++))
    echo "Run 'npm run build' to see detailed errors"
fi
echo ""

echo "6. Checking Git Status..."
echo "-------------------------"
if [ -d ".git" ]; then
    echo -e "${GREEN}✓${NC} Git repository initialized"
    ((checks_passed++))
    
    # Check if there are uncommitted changes
    if [[ -n $(git status -s) ]]; then
        echo -e "${YELLOW}!${NC} You have uncommitted changes"
        echo "  Files changed:"
        git status -s | head -5
        if [[ $(git status -s | wc -l) -gt 5 ]]; then
            echo "  ... and more"
        fi
    else
        echo -e "${GREEN}✓${NC} No uncommitted changes"
        ((checks_passed++))
    fi
else
    echo -e "${RED}✗${NC} Git repository not initialized"
    ((checks_failed++))
fi
echo ""

echo "=========================================="
echo "Pre-Deployment Check Complete"
echo "=========================================="
echo ""
echo -e "${GREEN}Passed: $checks_passed${NC}"
echo -e "${RED}Failed: $checks_failed${NC}"
echo ""

if [ $checks_failed -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Ready to deploy!${NC}"
    echo ""
    echo "To deploy, run:"
    echo "  vercel --prod"
    echo ""
    echo "Or use the deploy script:"
    echo "  ./deploy.sh"
    exit 0
else
    echo -e "${RED}⚠️  Some checks failed. Please fix the issues above.${NC}"
    exit 1
fi
