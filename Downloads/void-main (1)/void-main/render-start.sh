#!/bin/bash
set -e

# Use Render's PORT environment variable
export VSCODE_SERVER_PORT=${PORT:-9888}

echo "Starting Void Editor server on port $PORT..."

# Start the web server (code-web.js is better for web deployments)
node scripts/code-web.js --host 0.0.0.0 --port $PORT

