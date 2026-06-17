#!/usr/bin/env bash
# =============================================================================
# RhemaAI — One-time VPS setup for Ubuntu 24.04 (Hostinger)
# Run as root: bash setup.sh
# =============================================================================
set -euo pipefail

DOMAIN="rhemaaisolutions.tech"
REPO="https://github.com/phunkie24/rhemaai.git"
APP_DIR="/var/www/rhemaai"

echo "======================================================"
echo "  RhemaAI VPS Setup — $(date)"
echo "======================================================"

# ── 1. System update ──────────────────────────────────────
echo ""
echo "[1/11] Updating system..."
apt-get update -y && apt-get upgrade -y
apt-get install -y git curl gnupg ufw nginx certbot python3-certbot-nginx

# ── 2. Node.js 22 via nvm ─────────────────────────────────
echo ""
echo "[2/11] Installing Node.js 22..."
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
echo "[3/11] Installing PM2..."
npm install -g pm2

# ── 4. MongoDB 8.0 ────────────────────────────────────────
echo ""
echo "[4/11] Installing MongoDB 8.0..."
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
echo "[5/11] Cloning repository..."
mkdir -p /var/www
if [ -d "$APP_DIR/.git" ]; then
  echo "  Repo exists — pulling latest..."
  git -C "$APP_DIR" pull
else
  git clone "$REPO" "$APP_DIR"
fi

# ── 6. Backend setup ──────────────────────────────────────
echo ""
echo "[6/11] Setting up backend..."
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
EMAIL_USER=info@rhemaaisolutions.tech
EMAIL_PASS=REPLACE_WITH_HOSTINGER_EMAIL_PASSWORD

# Paystack — Settings > API Keys > Secret Key (sk_live_...)
PAYSTACK_SECRET_KEY=REPLACE_WITH_PAYSTACK_SECRET_KEY

# Admin panel — username is always "admin", set your password here
CONTACT_ADMIN_KEY=63e6666a1b5f574d828e4d87c3949ff10ee47affe6eb7b76
ADMIN_PANEL_PASSWORD=REPLACE_WITH_ADMIN_PANEL_PASSWORD

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
echo "[7/11] Building React frontend..."
cd "$APP_DIR/client"
npm ci
VITE_API_URL=/api npm run build
echo "  Build output: $APP_DIR/client/dist"

# ── 8. Nginx + SSL ────────────────────────────────────────
echo ""
echo "[8/11] Configuring Nginx..."

# Write HTTP-only config first — certbot needs nginx running to do the ACME challenge,
# but the full SSL config references letsencrypt files that don't exist until after certbot runs.
cat > /etc/nginx/sites-available/rhemaai <<NGINX_HTTP
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        root ${APP_DIR}/client/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
}
NGINX_HTTP

ln -sf /etc/nginx/sites-available/rhemaai /etc/nginx/sites-enabled/rhemaai
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx

# Firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# SSL — certbot issues the cert AND creates /etc/letsencrypt/options-ssl-nginx.conf
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

# Now letsencrypt files exist — deploy the full config with security headers
sed "s/DOMAIN/${DOMAIN}/g" "$APP_DIR/deploy/nginx.conf" \
  > /etc/nginx/sites-available/rhemaai

nginx -t && systemctl reload nginx

systemctl enable certbot.timer
systemctl start certbot.timer

# ── 9. PM2 log rotation ───────────────────────────────────
echo ""
echo "[9/11] Configuring PM2 log rotation..."
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 50M
pm2 set pm2-logrotate:retain 14
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval "0 0 * * *"
echo "  Log rotation: 50MB max, 14 days retained, compressed, rotates daily"

# ── 10. MongoDB daily backup cron ─────────────────────────
echo ""
echo "[10/11] Setting up MongoDB daily backup..."
mkdir -p /var/backups/rhemaai

cat > /etc/cron.d/rhemaai-backup <<'CRON'
# RhemaAI — MongoDB nightly backup at 02:00
0 2 * * * root mongodump --uri="mongodb://127.0.0.1:27017/rhemaai" --archive | gzip > /var/backups/rhemaai/rhemaai-$(date +\%F).gz

# Delete backups older than 30 days
0 3 * * * root find /var/backups/rhemaai -name "rhemaai-*.gz" -mtime +30 -delete
CRON

chmod 644 /etc/cron.d/rhemaai-backup
echo "  MongoDB backup: daily at 02:00 → /var/backups/rhemaai/, 30-day retention"

# ── 11. Netdata monitoring ────────────────────────────────
echo ""
echo "[11/11] Installing Netdata (server observability)..."
curl https://get.netdata.cloud/kickstart.sh | sudo bash /dev/stdin --non-interactive --stable-channel

# Lock Netdata to localhost only (do not expose port 19999 publicly)
sed -i 's/# bind to = \*/bind to = 127.0.0.1/' /etc/netdata/netdata.conf 2>/dev/null || true
systemctl restart netdata
systemctl enable netdata

# Create basic auth files
apt-get install -y apache2-utils -qq

# Admin panel — password from .env
ADMIN_PASS=$(grep '^ADMIN_PANEL_PASSWORD=' "$APP_DIR/server/.env" | cut -d= -f2-)
htpasswd -cb /etc/nginx/.htpasswd_admin admin "${ADMIN_PASS}"

# Netdata dashboard — random password (saved in htpasswd file)
htpasswd -cb /etc/nginx/.htpasswd_netdata admin "$(openssl rand -base64 16)"
NETDATA_PASS=$(grep admin /etc/nginx/.htpasswd_netdata | cut -d: -f1)

nginx -t && systemctl reload nginx
echo "  Netdata: https://${DOMAIN}/netdata/ (user: admin)"

echo ""
echo "======================================================"
echo "  Setup complete!"
echo ""
echo "  Site:      https://${DOMAIN}"
echo "  API docs:  https://${DOMAIN}/api/docs"
echo "  Netdata:   https://${DOMAIN}/netdata/ (user: admin)"
echo ""
echo "  Logs:      pm2 logs rhemaai-server"
echo "  Monitor:   pm2 monit"
echo "  Backup:    /var/backups/rhemaai/"
echo "  Update:    bash ${APP_DIR}/deploy/deploy.sh"
echo ""
echo "  Next steps:"
echo "  1. Add UptimeRobot free monitor → https://uptimerobot.com"
echo "     Ping: https://${DOMAIN}/api/health every 5 min"
echo "  2. Save Netdata password from /etc/nginx/.htpasswd_netdata"
echo "======================================================"
