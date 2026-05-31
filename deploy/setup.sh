#!/usr/bin/env bash
# =============================================================================
# RhemaAI VPS Setup — Ubuntu 24.04 (Hostinger)
# Run once as root: bash setup.sh
# =============================================================================
set -euo pipefail

DOMAIN="rhemaai.tech"
REPO="https://github.com/YOUR_GITHUB_USERNAME/rhemaai.git"   # <-- update this
APP_DIR="/opt/rhemaai"

echo "======================================================"
echo "  RhemaAI VPS Setup — $(date)"
echo "======================================================"

# ── 1. System update ──────────────────────────────────────
echo "[1/7] Updating system packages..."
apt-get update -y && apt-get upgrade -y
apt-get install -y git curl ufw nginx certbot python3-certbot-nginx

# ── 2. Install Docker ─────────────────────────────────────
echo "[2/7] Installing Docker..."
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | bash
  systemctl enable docker
  systemctl start docker
else
  echo "  Docker already installed: $(docker --version)"
fi

# ── 3. Firewall ───────────────────────────────────────────
echo "[3/7] Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# ── 4. Clone repo ─────────────────────────────────────────
echo "[4/7] Cloning repository..."
if [ -d "$APP_DIR/.git" ]; then
  echo "  Repo exists — pulling latest..."
  git -C "$APP_DIR" pull
else
  git clone "$REPO" "$APP_DIR"
fi

# ── 5. Create .env ────────────────────────────────────────
echo "[5/7] Setting up environment..."
if [ ! -f "$APP_DIR/.env" ]; then
  cat > "$APP_DIR/.env" <<EOF
EMAIL_USER=info@rhemaai.tech
EMAIL_PASS=REPLACE_WITH_YOUR_APP_PASSWORD
FRONTEND_URL=https://${DOMAIN}
CONTACT_ADMIN_KEY=REPLACE_WITH_STRONG_SECRET
EOF
  echo "  !! .env created — edit $APP_DIR/.env with real values before continuing !!"
  echo "  Press ENTER when ready..."
  read -r
fi

# ── 6. Configure Nginx ────────────────────────────────────
echo "[6/7] Configuring Nginx..."
sed "s/DOMAIN/${DOMAIN}/g" "$APP_DIR/deploy/nginx.conf" \
  > /etc/nginx/sites-available/rhemaai

ln -sf /etc/nginx/sites-available/rhemaai /etc/nginx/sites-enabled/rhemaai
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx

# ── 7. SSL with Let's Encrypt ─────────────────────────────
echo "[7/7] Obtaining SSL certificate..."
echo "  Make sure DNS A records for ${DOMAIN} and www.${DOMAIN} point to this server's IP."
echo "  Press ENTER to continue..."
read -r

certbot --nginx \
  -d "${DOMAIN}" \
  -d "www.${DOMAIN}" \
  --non-interactive \
  --agree-tos \
  --email "info@${DOMAIN}" \
  --redirect

# Enable auto-renewal
systemctl enable certbot.timer
systemctl start certbot.timer

# ── Build and start containers ────────────────────────────
echo ""
echo "Starting Docker containers..."
cd "$APP_DIR"
docker compose -f docker-compose.prod.yml up -d --build

echo ""
echo "======================================================"
echo "  Setup complete!"
echo "  Site:   https://${DOMAIN}"
echo "  Logs:   docker compose -f $APP_DIR/docker-compose.prod.yml logs -f"
echo "  Update: bash $APP_DIR/deploy/deploy.sh"
echo "======================================================"
