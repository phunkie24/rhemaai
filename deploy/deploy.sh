#!/usr/bin/env bash
# =============================================================================
# RhemaAI — Redeploy after code changes
# Run on VPS: bash /var/www/rhemaai/deploy/deploy.sh
# =============================================================================
set -euo pipefail

APP_DIR="/var/www/rhemaai"
DOMAIN="rhemaaisolutions.tech"

export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
\. "$NVM_DIR/nvm.sh"

echo "======================================================"
echo "  RhemaAI Redeploy — $(date)"
echo "======================================================"

echo "[1/5] Pulling latest code..."
git -C "$APP_DIR" pull

echo "[2/5] Installing backend dependencies..."
npm --prefix "$APP_DIR/server" ci --omit=dev

echo "[3/5] Rebuilding React frontend..."
npm --prefix "$APP_DIR/client" ci
VITE_API_URL=/api npm --prefix "$APP_DIR/client" run build

echo "[4/5] Applying nginx config..."
mkdir -p /etc/nginx/snippets
sed "s/DOMAIN/${DOMAIN}/g" "$APP_DIR/deploy/security-headers.nginx" \
  > /etc/nginx/snippets/rhemaai-security.conf
sed "s/DOMAIN/${DOMAIN}/g" "$APP_DIR/deploy/nginx.conf" \
  > /etc/nginx/sites-available/rhemaai
nginx -t && systemctl reload nginx

echo "[5/5] Restarting backend..."
pm2 restart rhemaai-server --update-env

echo ""
echo "Deployment complete."
pm2 status rhemaai-server
