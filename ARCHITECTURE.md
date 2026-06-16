# RhemaAI Solutions Ltd — Architecture Document

> **Version:** 1.0 · **Author:** Funke Yusuf · **Date:** June 2026

---

## Table of Contents

1. [Business Architecture](#1-business-architecture)
2. [Application Architecture](#2-application-architecture)
3. [Software Architecture](#3-software-architecture)
4. [Data Architecture](#4-data-architecture)
5. [Deployment Architecture](#5-deployment-architecture)
6. [CI/CD Architecture](#6-cicd-architecture)
7. [Security Architecture](#7-security-architecture)
8. [Analytics & Data Engineering Architecture](#8-analytics--data-engineering-architecture)

---

## 1. Business Architecture

### 1.1 Company Overview

**RhemaAI Solutions Ltd** is an enterprise AI, cloud, and data engineering consultancy founded by Funke Yusuf. The business delivers production-grade AI systems, data platforms, and cloud architectures to enterprise clients across Africa, Europe, and beyond.

### 1.2 Business Capabilities

```
┌─────────────────────────────────────────────────────────────┐
│                  RhemaAI Solutions Ltd                      │
├──────────────┬──────────────┬──────────────┬───────────────┤
│  Enterprise  │    Cloud     │    Data      │   Education   │
│      AI      │ Architecture │ Engineering  │   & Content   │
├──────────────┼──────────────┼──────────────┼───────────────┤
│ Agentic AI   │ Azure / AWS  │ Lakehouse    │ RhemaAI Press │
│ LLM Eng.     │ / GCP        │ Engineering  │ RhemaAI Acad. │
│ RAG Systems  │ Multi-cloud  │ MLOps        │ RhemaAI Labs  │
│ Multi-agent  │ Kubernetes   │ Data Science │ Case Studies  │
└──────────────┴──────────────┴──────────────┴───────────────┘
```

### 1.3 Revenue Streams

| Stream | Description | Platform |
|---|---|---|
| Consulting | Enterprise AI & data engineering engagements | Direct / Contact form |
| Publications | Books & white papers (RhemaAI Press) | `/publications` |
| Courses | Online learning (RhemaAI Academy) | `/courses` |
| SaaS Products | AI platform products | `/products` |

### 1.4 Stakeholders

| Stakeholder | Role |
|---|---|
| Funke Yusuf | Founder, Data & AI Architect, Enterprise AI Consultant |
| Enterprise clients | Primary service consumers |
| Course learners | RhemaAI Academy students |
| Book readers | RhemaAI Press customers |

---

## 2. Application Architecture

### 2.1 High-Level System Context

```
                        ┌───────────────────────────────┐
                        │        Internet / CDN          │
                        └───────────────┬───────────────┘
                                        │ HTTPS
                        ┌───────────────▼───────────────┐
                        │         Nginx (reverse proxy)  │
                        │         rhemaaisolutions.tech           │
                        └──────────┬────────────────────┘
                                   │
              ┌────────────────────┴────────────────────┐
              │                                          │
  ┌───────────▼──────────┐              ┌───────────────▼──────────┐
  │  React SPA (Vite)    │              │  Node.js / Express API   │
  │  Static files served │              │  Port 5000               │
  │  by Nginx            │              │  /api/*                  │
  └──────────────────────┘              └───────────────┬──────────┘
                                                        │
                                        ┌───────────────▼──────────┐
                                        │       MongoDB 8.0         │
                                        │  localhost:27017/rhemaai  │
                                        └──────────────────────────┘
```

### 2.2 Application Modules

```
rhemaaisolutions.tech
│
├── / ──────────────────── Homepage (Hero, Services, WhyUs, Industries)
├── /about ─────────────── About page (Founder, Pillars, Values)
├── /services ──────────── Services catalogue
├── /case-studies ──────── Client results & engagements
├── /products ──────────── RhemaAI Platform products
├── /publications ──────── RhemaAI Press (books & white papers)
├── /courses ───────────── RhemaAI Academy courses
├── /labs ──────────────── RhemaAI Labs research
├── /insights ──────────── Research articles
├── /insights/:slug ────── Individual research article
├── /contact ───────────── Contact & consultation booking
├── /careers ───────────── Careers page
├── /admin ─────────────── Admin operations (key-protected)
└── /api/* ─────────────── REST API (Express, served by same VPS)
```

---

## 3. Software Architecture

### 3.1 Frontend Architecture

**Stack:** React 18 · Vite 5 · React Router v6 · Framer Motion · CSS Modules

```
client/
├── src/
│   ├── assets/              # Static images, fonts
│   ├── components/          # Reusable UI components
│   │   ├── Hero/            # Homepage hero section
│   │   ├── Navbar/          # Global navigation
│   │   ├── Footer/          # Global footer
│   │   ├── Marquee/         # Tech brand logos ticker
│   │   ├── Services/        # Services grid
│   │   ├── WhyUs/           # Value proposition
│   │   ├── Industries/      # Industry verticals
│   │   ├── CTA/             # Call-to-action section
│   │   └── BookPromoStream/ # Publication promo
│   ├── pages/               # Route-level page components
│   ├── hooks/               # Custom React hooks (useCountUp)
│   ├── styles/              # Global CSS variables & resets
│   ├── utils/               # API client utilities
│   └── __tests__/           # Vitest test suites
└── vite.config.js
```

**Design Patterns:**
- CSS Modules for scoped styling (zero global leakage)
- Path aliases (`@components`, `@utils`, `@hooks`) via Vite config
- Lazy loading via React Router for code splitting
- SEO via `react-helmet-async` on every page

### 3.2 Backend Architecture

**Stack:** Node.js 22 · Express.js · Mongoose · Joi validation · Swagger UI

```
server/
├── index.js                 # Entry point, port binding
├── app.js                   # Express app, middleware, routes
├── models/                  # Mongoose schemas
│   ├── Contact.js
│   ├── Newsletter.js
│   ├── CaseStudy.js
│   ├── Publication.js
│   ├── Course.js
│   ├── Product.js
│   └── Insight.js
├── routes/                  # Express route handlers
│   ├── contact.js
│   ├── newsletter.js
│   ├── caseStudies.js
│   ├── publications.js
│   ├── courses.js
│   ├── products.js
│   └── insights.js
├── middleware/              # Auth, validation, error handling
├── uploads/                 # File upload storage
└── __tests__/               # Jest + Supertest test suites (127 tests)
```

**API Design:**
- RESTful endpoints under `/api/*`
- Joi schema validation on all write operations
- Admin key protection on sensitive read/write operations
- Swagger UI docs at `/api/docs`
- Health check at `/api/health`

### 3.3 Component Interaction

```
Browser
  │
  ├── React Router ──→ Page Component
  │                         │
  │                    ┌────▼─────┐
  │                    │  State   │  useState / useEffect
  │                    └────┬─────┘
  │                         │
  │                    API Client (@utils/api)
  │                         │ fetch /api/*
  │                         │
  └── Express Router ──→ Route Handler
                               │
                          Joi Validation
                               │
                         Mongoose Model
                               │
                           MongoDB
```

### 3.4 Testing Architecture

| Layer | Tool | Count | Scope |
|---|---|---|---|
| Client unit/integration | Vitest + React Testing Library | 46 tests, 7 suites | Components, pages, API calls |
| Server integration | Jest + Supertest | 127 tests, 11 suites | All API routes, DB operations |

---

## 4. Data Architecture

### 4.1 Operational Database (MongoDB)

**Collections:**

| Collection | Purpose | Key Fields |
|---|---|---|
| `contacts` | Enquiries & consultation requests | name, email, company, message, service, status |
| `newsletters` | Email subscriber list | email, active, subscribedAt |
| `casestudies` | Client engagement records | title, industry, outcomes, metrics, tags |
| `publications` | Books & white papers | title, type, author, price, coverImage, accessLink |
| `courses` | Academy course catalogue | title, category, price, level, duration |
| `products` | SaaS platform products | name, description, features, pricing |
| `insights` | Research articles | title, slug, category, content, publishedAt |

### 4.2 Analytics Data Engineering Architecture

```
MongoDB (Operational)
        │
        ▼
   ETL Pipeline
  (Python / Airflow)
        │
   ┌────┴────────────────────────────┐
   │                                  │
   ▼                                  ▼
SQL Server                      Azure Blob / S3
(Analytical layer)              (Raw data lake)
   │
   ├── dbo.contacts_fact
   ├── dbo.publications_dim
   ├── dbo.courses_dim
   ├── dbo.enquiry_funnel
   └── dbo.content_performance
        │
        ▼
   Power BI / Analytics
   - Enquiry funnel analysis
   - Content performance
   - Revenue tracking
   - Course completion rates
```

---

## 5. Deployment Architecture

### 5.1 Infrastructure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Hostinger KVM 1 VPS                          │
│                    Ubuntu 24.04 LTS                             │
│                    4 vCPU · 4GB RAM · 50GB NVMe                 │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Nginx (Port 80/443)                    │   │
│  │                    SSL: Let's Encrypt                     │   │
│  │                    Domain: rhemaaisolutions.tech                  │   │
│  └──────────────┬───────────────────────────────────────────┘   │
│                 │                                                 │
│     ┌───────────┴──────────────┐                                 │
│     │                          │                                 │
│  Static files              Proxy /api/*                         │
│  /var/www/rhemaai           → localhost:5000                    │
│  /client/dist                                                    │
│                    ┌─────────────────────┐                      │
│                    │  Node.js (PM2)       │                      │
│                    │  rhemaai-server      │                      │
│                    │  Port 5000           │                      │
│                    └──────────┬──────────┘                      │
│                               │                                  │
│                    ┌──────────▼──────────┐                      │
│                    │  MongoDB 8.0         │                      │
│                    │  localhost:27017     │                      │
│                    │  /var/lib/mongodb    │                      │
│                    └─────────────────────┘                      │
│                                                                  │
│  Backups: Daily auto-backup (Hostinger) + MongoDB cron dump     │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Nginx Configuration

```nginx
# HTTP → HTTPS redirect
server { listen 80; return 301 https://$host$request_uri; }

# HTTPS — serve React SPA + proxy API
server {
  listen 443 ssl;
  server_name rhemaaisolutions.tech www.rhemaaisolutions.tech;

  # React build (static)
  root /var/www/rhemaai/client/dist;
  try_files $uri $uri/ /index.html;   # SPA fallback

  # API proxy
  location /api/ {
    proxy_pass http://localhost:5000;
  }
}
```

### 5.3 Process Management (PM2)

```bash
pm2 start /var/www/rhemaai/server/index.js \
  --name rhemaai-server \
  --node-args="--enable-source-maps"

pm2 startup   # auto-restart on VPS reboot
pm2 save
```

### 5.4 Environment Variables

| Variable | Used By | Description |
|---|---|---|
| `NODE_ENV` | Server | `production` on VPS |
| `PORT` | Server | `5000` |
| `MONGODB_URI` | Server | `mongodb://127.0.0.1:27017/rhemaai` |
| `EMAIL_HOST` | Server | `smtp.hostinger.com` |
| `EMAIL_PORT` | Server | `465` |
| `EMAIL_USER` | Server | `info@rhemaaisolutions.tech` |
| `EMAIL_PASS` | Server | Hostinger webmail password |
| `CONTACT_ADMIN_KEY` | Server | Admin panel API key |
| `FRONTEND_URL` | Server | `https://rhemaaisolutions.tech` |
| `VITE_API_URL` | Client build | `/api` |

---

## 6. CI/CD Architecture

### 6.1 Pipeline Overview

```
Developer pushes to main
          │
          ▼
   GitHub Actions
          │
     ┌────┴────────────────────────┐
     │                              │
     ▼                              ▼
Job: test-client              Job: test-server
Vitest (46 tests)             Jest (127 tests)
ubuntu-latest                 ubuntu-latest + mongo:7.0 service
     │                              │
     └──────────┬───────────────────┘
                │ Both pass
                ▼
         Job: deploy
         SSH → VPS
         bash deploy.sh
                │
                ▼
         Health check
         GET /api/health → 200
                │
         ┌──────┴──────┐
         │ Pass        │ Fail
         ▼             ▼
      Done          Rollback
                  git revert HEAD
                  pm2 restart
```

### 6.2 Deploy Script (`deploy/deploy.sh`)

```bash
git pull                              # 1. Pull latest code
npm --prefix server ci --omit=dev     # 2. Install backend deps
npm --prefix client ci                # 3. Install frontend deps
VITE_API_URL=/api npm --prefix client run build  # 4. Build React
pm2 restart rhemaai-server            # 5. Restart backend
```

### 6.3 GitHub Secrets Required

| Secret | Description |
|---|---|
| `VPS_HOST` | VPS IP address |
| `VPS_USER` | `root` |
| `VPS_SSH_KEY` | ED25519 private key (passwordless) |

---

## 7. Security Architecture

### 7.1 Layers of Security

```
Internet
   │
   ▼
UFW Firewall (allow 22, 80, 443 only)
   │
   ▼
Nginx (TLS 1.2/1.3, HTTPS redirect, rate limiting)
   │
   ▼
Express Middleware
 ├── helmet.js (security headers)
 ├── cors (FRONTEND_URL whitelist)
 ├── express-rate-limit (API throttling)
 └── Joi validation (all inputs sanitised)
   │
   ▼
Admin routes → CONTACT_ADMIN_KEY header check
   │
   ▼
MongoDB (localhost only, no external port)
```

### 7.2 Security Checklist

| Control | Status |
|---|---|
| HTTPS / SSL (Let's Encrypt) | ✅ |
| HTTP → HTTPS redirect | ✅ |
| MongoDB not exposed externally | ✅ |
| Input validation (Joi) on all writes | ✅ |
| Admin API key protection | ✅ |
| SSH key auth (no password login) | ✅ |
| UFW firewall (ports 22, 80, 443) | ✅ |
| Environment variables (no secrets in code) | ✅ |
| Daily backups (Hostinger) | ✅ |

---

## 8. Analytics & Data Engineering Architecture

### 8.1 Future Data Pipeline

```
┌─────────────────────────────────────────────────────────┐
│  SOURCE LAYER (Bronze)                                   │
│  MongoDB → daily export via mongodump cron               │
│  Contact forms, publications, course enrollments         │
└───────────────────────────┬─────────────────────────────┘
                            │ ETL (Python / Airflow)
┌───────────────────────────▼─────────────────────────────┐
│  TRANSFORM LAYER (Silver)                                │
│  Cleaned, deduplicated, typed data                       │
│  Stored in Azure Blob / AWS S3 (Parquet)                 │
└───────────────────────────┬─────────────────────────────┘
                            │ Load
┌───────────────────────────▼─────────────────────────────┐
│  ANALYTICAL LAYER (Gold)                                 │
│  SQL Server / Azure Synapse                              │
│  Star schema — facts + dimensions                        │
│                                                          │
│  dbo.fact_enquiries                                      │
│  dbo.fact_publications_sales                             │
│  dbo.fact_course_enrollments                             │
│  dbo.dim_date · dbo.dim_service · dbo.dim_content        │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  REPORTING LAYER                                         │
│  Power BI / Tableau                                      │
│  - Enquiry funnel & conversion rates                     │
│  - Publication sales performance                         │
│  - Course completion & revenue                           │
│  - Client industry breakdown                             │
└─────────────────────────────────────────────────────────┘
```

### 8.2 Immediate Free Backup (MongoDB Cron)

```bash
# /etc/cron.d/rhemaai-backup — runs 2am daily
0 2 * * * root mongodump \
  --uri="mongodb://127.0.0.1:27017/rhemaai" \
  --archive \
  | gzip > /var/backups/rhemaai-$(date +\%F).gz

# Keep last 30 days only
0 3 * * * root find /var/backups -name "rhemaai-*.gz" -mtime +30 -delete
```

---

## Technology Stack Summary

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 5, React Router v6, Framer Motion, CSS Modules |
| **Backend** | Node.js 22, Express.js, Mongoose, Joi, Swagger UI |
| **Database** | MongoDB 8.0 |
| **Testing** | Vitest (client), Jest + Supertest (server) |
| **Web Server** | Nginx |
| **Process Manager** | PM2 |
| **SSL** | Let's Encrypt (Certbot) |
| **Infrastructure** | Hostinger KVM 1 VPS, Ubuntu 24.04 LTS |
| **CI/CD** | GitHub Actions |
| **Version Control** | Git / GitHub (`phunkie24/rhemaai`) |
| **Domain** | rhemaaisolutions.tech |
| **Future Analytics** | Python, Apache Airflow, SQL Server, Azure Synapse, Power BI |
