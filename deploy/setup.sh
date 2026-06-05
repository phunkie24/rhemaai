#!/usr/bin/env bash
# =============================================================================
# RhemaAI — One-time VPS setup for Ubuntu 24.04 (Hostinger)
# Run as root: bash setup.sh
# =============================================================================
set -euo pipefail

DOMAIN="rhemaai.tech"
REPO="https://github.com/phunkie24/rhemaai.git"
APP_DIR="/var/www/rhemaai"

echo "======================================================"
echo "  RhemaAI VPS Setup — $(date)"
echo "======================================================"

# ── 1. System update ──────────────────────────────────────
echo ""
echo "[1/8] Updating system..."
apt-get update -y && apt-get upgrade -y
apt-get install -y git curl gnupg ufw nginx certbot python3-certbot-nginx

# ── 2. Node.js 22 via nvm ─────────────────────────────────
echo ""
echo "[2/8] Installing Node.js 22..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
\. "$NVM_DIR/nvm.sh"
nvm install 22
nvm use 22
nvm alias default 22
echo "  Node: $(node -v)  npm: $(npm -v)"

# ── 3. PM2 ────────────────────────────────────────────────
echo ""
echo "[3/8] Installing PM2..."
npm install -g pm2

# ── 4. MongoDB 8.0 ────────────────────────────────────────
echo ""
echo "[4/8] Installing MongoDB 8.0..."
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
  gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] \
https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" \
  | tee /etc/apt/sources.list.d/mongodb-org-8.0.list

apt-get update -y
apt-get install -y mongodb-org

systemctl daemon-reload
systemctl start mongod
systemctl enable mongod
echo "  MongoDB status: $(systemctl is-active mongod)"

# ── 5. Clone repo ─────────────────────────────────────────
echo ""
echo "[5/8] Cloning repository..."
mkdir -p /var/www
if [ -d "$APP_DIR/.git" ]; then
  echo "  Repo exists — pulling latest..."
  git -C "$APP_DIR" pull
else
  git clone "$REPO" "$APP_DIR"
fi

# ── 6. Backend setup ──────────────────────────────────────
echo ""
echo "[6/8] Setting up backend..."
cd "$APP_DIR/server"
npm install --omit=dev

if [ ! -f "$APP_DIR/server/.env" ]; then
  cat > "$APP_DIR/server/.env" <<EOF
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/rhemaai

# Hostinger email — use your webmail password
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_USER=info@rhemaai.tech
EMAIL_PASS=REPLACE_WITH_HOSTINGER_EMAIL_PASSWORD

# Admin panel key — paste this into /admin password field
CONTACT_ADMIN_KEY=63e6666a1b5f574d828e4d87c3949ff10ee47affe6eb7b76

FRONTEND_URL=https://${DOMAIN}
EOF
  echo ""
  echo "  !! .env created at $APP_DIR/server/.env"
  echo "  !! Edit EMAIL_PASS with your real Hostinger password, then press ENTER..."
  nano "$APP_DIR/server/.env"
fi

# Start backend with PM2 (NODE_ENV set explicitly for process manager)
NODE_ENV=production pm2 start "$APP_DIR/server/index.js" \
  --name rhemaai-server \
  --node-args="--enable-source-maps"
pm2 startup
pm2 save
echo "  Backend running on port 5000"

# ── 7. Frontend build ─────────────────────────────────────
echo ""
echo "[7/8] Building React frontend..."
cd "$APP_DIR/client"
npm ci
VITE_API_URL=/api npm run build
echo "  Build output: $APP_DIR/client/dist"

# ── 8. Nginx + SSL ────────────────────────────────────────
echo ""
echo "[8/8] Configuring Nginx..."

# Write Nginx site config
sed "s/DOMAIN/${DOMAIN}/g" "$APP_DIR/deploy/nginx.conf" \
  > /etc/nginx/sites-available/rhemaai

ln -sf /etc/nginx/sites-available/rhemaai /etc/nginx/sites-enabled/rhemaai
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx

# Firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# SSL
echo ""
echo "  DNS: make sure A records for ${DOMAIN} and www.${DOMAIN} point to this IP."
echo "  Press ENTER to request the SSL certificate..."
read -r

certbot --nginx \
  -d "${DOMAIN}" \
  -d "www.${DOMAIN}" \
  --non-interactive \
  --agree-tos \
  --email "info@${DOMAIN}" \
  --redirect

systemctl enable certbot.timer
systemctl start certbot.timer

echo ""
echo "======================================================"
echo "  Setup complete!"
echo "  Site:    https://${DOMAIN}"
echo "  Logs:    pm2 logs rhemaai-server"
echo "  Update:  bash ${APP_DIR}/deploy/deploy.sh"
echo "======================================================"
