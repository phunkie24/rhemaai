# RhemaAI Solutions Ltd

Enterprise AI, cloud, data engineering and analytics website built with React, Vite, Express, MongoDB and Docker.

## Stack

- Frontend: React 18, Vite, React Router, Framer Motion, React Helmet Async
- Backend: Node.js, Express, MongoDB, Mongoose, Joi, Nodemailer
- Runtime: Docker Compose with nginx serving the SPA and proxying `/api`
- Production entrypoint: `docker-compose.prod.yml`

## Local Development

```bash
npm run install:all
cp .env.example .env
cp server/.env.example server/.env
npm run dev
```

Local URLs:

- Frontend: `http://localhost:5173`
- API: `http://localhost:5000/api`
- Health check: `http://localhost:5000/api/health`

## Required Production Environment

Create `.env` on the VPS from `.env.example`:

```env
FRONTEND_URL=https://rhemaai.tech
CONTACT_ADMIN_KEY=replace_with_a_long_random_secret
EMAIL_USER=info@rhemaai.tech
EMAIL_PASS=your_gmail_app_password
```

Generate a strong admin key on the VPS with:

```bash
openssl rand -hex 32
```

Production Compose will fail fast if `FRONTEND_URL` or `CONTACT_ADMIN_KEY` is missing.

`CONTACT_ADMIN_KEY` protects `GET /api/contact` in production. Use it as:

```bash
curl -H "x-admin-api-key: YOUR_SECRET" https://rhemaai.tech/api/contact
```

## Hostinger VPS Deployment

1. Point DNS `A` records for `rhemaai.tech` and `www.rhemaai.tech` to the VPS IP.
2. SSH into the VPS and install Docker plus the Docker Compose plugin.
3. Clone or upload this repository to the VPS.
4. Create `.env` in the project root using the production values above.
5. Build and start:

```bash
npm run docker:prod:build
npm run docker:prod:up
npm run docker:prod:ps
```

6. Check health:

```bash
curl http://127.0.0.1:8080/health
curl http://127.0.0.1:8080/api/health
```

7. Add TLS with a host-level reverse proxy or Certbot/nginx on the VPS. The Docker client is bound to `127.0.0.1:8080`, so proxy public `80/443` traffic to that local port.

## Production Notes

- MongoDB is internal to Docker and is not exposed publicly.
- nginx serves the built React app and proxies `/api` to the Express container.
- Static assets are cached for one year; HTML is not cached.
- API requests are rate limited.
- Contact submissions are stored in MongoDB even if email credentials are not configured.
- `server/.env` is for non-Docker local server development. Docker production reads root `.env`.

## Useful Commands

```bash
npm run build
npm run test
npm run test:e2e
npm run docker:prod:logs
npm run docker:prod:ps
```
