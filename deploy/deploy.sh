#!/usr/bin/env bash
# =============================================================================
# RhemaAI — Redeploy (run after pushing code changes)
# Usage: bash /opt/rhemaai/deploy/deploy.sh
# =============================================================================
set -euo pipefail

APP_DIR="/opt/rhemaai"
COMPOSE="docker compose -f $APP_DIR/docker-compose.prod.yml"

echo "[1/4] Pulling latest code..."
git -C "$APP_DIR" pull

echo "[2/4] Building new images..."
$COMPOSE build --no-cache

echo "[3/4] Restarting containers (zero-downtime where possible)..."
$COMPOSE up -d --remove-orphans

echo "[4/4] Cleaning up old images..."
docker image prune -f

echo ""
echo "Deployment complete. Current container status:"
$COMPOSE ps
