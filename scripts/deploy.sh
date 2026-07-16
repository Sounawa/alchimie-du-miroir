#!/usr/bin/env bash
# Deploy script: builds static site and pushes to GitHub Pages (gh-pages branch)
# Usage: GITHUB_TOKEN=ghp_xxx bash scripts/deploy.sh
#
# Or create a .deploy-token file (ignored by git) containing just the token.

set -e

# Read token from env var, or .deploy-token file
if [ -n "$GITHUB_TOKEN" ]; then
  TOKEN="$GITHUB_TOKEN"
elif [ -f ".deploy-token" ]; then
  TOKEN=$(cat .deploy-token | tr -d '[:space:]')
else
  echo "Error: set GITHUB_TOKEN env var or create .deploy-token file"
  exit 1
fi

REPO="Sounawa/alchimie-du-miroir"
BRANCH="gh-pages"
OUT_DIR="out"

echo "=== Deploy to GitHub Pages ==="

# 1. Generate data & build
echo "[1/4] Generating static data..."
node scripts/pre-build-data.js

echo "[2/4] Building static export..."
bun run build

# 2. Clone gh-pages branch into a temp dir
echo "[3/4] Preparing gh-pages branch..."
TMP_DIR=$(mktemp -d)
git clone --branch "$BRANCH" "https://x-access-token:${TOKEN}@github.com/${REPO}.git" "$TMP_DIR" 2>/dev/null || {
  echo "gh-pages branch doesn't exist yet, creating..."
  mkdir -p "$TMP_DIR"
  cd "$TMP_DIR"
  git init
  git checkout -b "$BRANCH"
  cd -
}

# 3. Copy built files
echo "[4/4] Deploying to gh-pages..."
rm -rf "$TMP_DIR"/*
cp -r "$OUT_DIR"/* "$TMP_DIR"/
# .nojekyll is CRITICAL — without it, GitHub Pages (Jekyll) ignores _next/ directory
touch "$TMP_DIR/.nojekyll"

cd "$TMP_DIR"
git add -A
git commit -m "deploy: static site $(date -u +%Y-%m-%d_%H:%M:%S)" --allow-empty
git push "https://x-access-token:${TOKEN}@github.com/${REPO}.git" "$BRANCH" --force
cd -

# Cleanup
rm -rf "$TMP_DIR"

echo "=== Deploy complete! ==="
echo "Site will be live at: https://sounawa.github.io/alchimie-du-miroir/"