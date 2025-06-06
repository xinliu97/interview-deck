#!/usr/bin/env bash
set -euo pipefail

# Navigate to the client directory
cd "$(dirname "$0")/client"

# Install dependencies if needed
npm install

# Build the client
npm run build

# Serve the build using Vite preview
npm run preview
