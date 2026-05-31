#!/usr/bin/env bash
# =============================================================================
# RhemaAI — Redeploy after code changes
# Run on VPS: bash /var/www/rhemaai/deploy/deploy.sh
# =============================================================================
set -euo pipefail

APP_DIR="/var/www/rhemaai"

export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
\. "$NVM_DIR/nvm.sh"

echo "======================================================"
echo "  RhemaAI Redeploy — $(date)"
echo "======================================================"

echo "[1/4] Pulling latest code..."
git -C "$APP_DIR" pull

echo "[2/4] Installing backend dependencies..."
npm --prefix "$APP_DIR/server" install --omit=dev

echo "[3/4] Rebuilding React frontend..."
npm --prefix "$APP_DIR/client" install
VITE_API_URL=/api npm --prefix "$APP_DIR/client" run build

echo "[4/4] Restarting backend..."
pm2 restart rhemaai-server

echo ""
echo "Deployment complete."
pm2 status rhemaai-server
