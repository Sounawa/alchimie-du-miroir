#!/bin/bash
set -e

# Read token
TOKEN=$(cat .deploy-token 2>/dev/null || echo "")
if [ -z "$TOKEN" ]; then
  echo "ERROR: .deploy-token file not found"
  exit 1
fi

# Build
echo "Building..."
bun run build

# Deploy to gh-pages branch
echo "Deploying to gh-pages..."

cd out

git init
git checkout -b gh-pages
git add -A

# Add .nojekyll
touch .nojekyll
git add .nojekyll

git -c user.name="deploy-bot" -c user.email="deploy@sounawa.com" commit -m "Deploy $(date +%Y-%m-%d_%H:%M)"

git push "https://${TOKEN}@github.com/Sounawa/alchimie-du-miroir.git" gh-pages --force 2>&1

echo "Deploy complete!"
