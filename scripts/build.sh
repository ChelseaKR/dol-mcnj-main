#!/usr/bin/env bash

set -e

cd $(git rev-parse --show-toplevel)
npm --prefix=frontend run build
npm --prefix=backend run build

rm -rf backend/dist_old || true
[ -d backend/dist ] && mv backend/dist backend/dist_old

mv backend/dist_temp backend/dist
# Next.js builds to .next directory - copy the static assets and public content
cp -r frontend/.next/static backend/dist/_next/static 2>/dev/null || true
cp -r frontend/public/* backend/dist/ 2>/dev/null || true

echo "✅ Build successfully completed."
