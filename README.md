# RhemaAI Technologies — Full MERN Stack Website

## Architecture Overview

```
rhemaai/
├── client/                    # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/        # All UI sections
│   │   │   ├── Navbar/
│   │   │   ├── Hero/
│   │   │   ├── Marquee/
│   │   │   ├── Services/
│   │   │   ├── DataScience/   # Data Science & Advanced Analytics
│   │   │   ├── WhyUs/
│   │   │   ├── Process/
│   │   │   ├── Industries/
│   │   │   ├── CTA/
│   │   │   ├── Footer/
│   │   │   └── common/        # Button, Badge, SectionHeader, AnimatedCard
│   │   ├── pages/             # HomePage, ServicesPage, AboutPage, ContactPage
│   │   ├── hooks/             # useScrollAnimation, useInView, useForm
│   │   ├── context/           # ThemeContext, ToastContext
│   │   ├── utils/             # api.js, seo.js, animations.js
│   │   └── styles/            # globals.css, variables.css, animations.css
│   ├── index.html             # SEO-optimised HTML shell
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Node.js + Express backend
│   ├── routes/
│   │   ├── contact.js         # POST /api/contact
│   │   ├── newsletter.js      # POST /api/newsletter
│   │   └── insights.js        # GET  /api/insights
│   ├── controllers/
│   │   ├── contactController.js
│   │   ├── newsletterController.js
│   │   └── insightsController.js
│   ├── models/
│   │   ├── Contact.js         # Mongoose schema
│   │   ├── Subscriber.js
│   │   └── Insight.js
│   ├── middleware/
│   │   ├── validateRequest.js # Joi validation
│   │   ├── rateLimiter.js     # express-rate-limit
│   │   └── errorHandler.js
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   └── index.js               # Express entry point
│
└── docker-compose.yml         # Dev environment
```

## Tech Stack

### Frontend
- **React 18** — UI library with concurrent features
- **Vite** — build tool (HMR, tree-shaking)
- **React Router v6** — client-side routing
- **Framer Motion** — production animations
- **React Hook Form** — performant forms
- **Axios** — HTTP client
- **React Helmet Async** — SEO meta management
- **CSS Custom Properties** — theming system

### Backend
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — document database
- **Nodemailer** — email delivery (consultation requests)
- **Joi** — input validation
- **express-rate-limit** — API protection
- **cors** — cross-origin configuration
- **dotenv** — environment management

### DevOps / Deployment
- **Docker + docker-compose** — containerised dev
- **Vercel** — frontend hosting (recommended)
- **Railway / Render** — backend hosting
- **MongoDB Atlas** — managed database

## Getting Started

```bash
# Clone and install
git clone https://github.com/rhemaai/website.git
cd rhemaai

# Install all dependencies
cd client && npm install
cd ../server && npm install

# Environment setup
cp server/.env.example server/.env
# Fill in MONGODB_URI, EMAIL_USER, EMAIL_PASS, PORT

# Development
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev

# Production build
cd client && npm run build
```

## Environment Variables

```env
# server/.env
PORT=5000
MONGODB_URI=mongodb+srv://...
EMAIL_USER=hello@rhemaai.tech
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## SEO Strategy
- React Helmet Async on every page (title, description, OG tags)
- Semantic HTML5 structure (nav, main, section, article, footer)
- Structured data (JSON-LD: Organization, Service)
- Sitemap.xml generation
- robots.txt
- Core Web Vitals optimised (lazy loading, code splitting)
