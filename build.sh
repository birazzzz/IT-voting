#!/bin/bash
# Simple build script for static site
echo "Starting build process..."
mkdir -p build
cp -r *.html build/
cp -r *.js build/ 2>/dev/null || true
cp -r *.css build/ 2>/dev/null || true
cp -r *.png build/ 2>/dev/null || true
cp -r *.svg build/ 2>/dev/null || true
cp -r *.toml build/ 2>/dev/null || true
cp -r _* build/ 2>/dev/null || true
echo "Build completed successfully"
ls -la build/

