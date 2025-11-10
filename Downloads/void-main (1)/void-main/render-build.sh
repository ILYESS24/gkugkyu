#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Building React components..."
npm run buildreact

echo "Compiling web version..."
npm run compile-web

echo "Build complete!"

