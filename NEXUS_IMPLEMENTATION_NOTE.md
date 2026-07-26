# Nexus AOS implementation note

## Existing architecture

- Client: React 18.3, Vite 5, JavaScript/JSX, React Router 6 and route-level lazy loading.
- Styling: CSS Modules backed by shared CSS custom properties in `client/src/styles/variables.css`; Syne and DM Sans are bundled through Fontsource.
- Layout: global `Navbar`, `Footer`, skip link, `ScrollToTop` and responsive page shells.
- Product routing: `/products/:slug` renders `ProductDetailPage`. The canonical Nexus AOS URL is `/products/nexus-aos`; Forge SE uses the same generic product-detail pattern.
- Content: product and other public records come from MongoDB-backed APIs with static seed content used as a resilient client fallback.
- Forms: React Hook Form on the client; Express/Joi/Mongoose, IP-based rate limiting and email notification on the server.
- SEO: `PageSEO` supplies canonical, Open Graph, social and JSON-LD metadata. The Express crawler renderer and dynamic sitemap provide non-JavaScript bot coverage.
- Analytics: no analytics SDK or event layer is currently present.
- Testing: Vitest/Testing Library for the client, Jest/Supertest with mongodb-memory-server for the API, and Playwright for end-to-end checks.
- Deployment: Vite production build served by Nginx, Express under PM2 or Docker, MongoDB, and GitHub Actions deployment to the existing VPS.

## Reusable pieces

- `PageSEO`, `Navbar`, `Footer`, `BrandMark`, global focus/reduced-motion rules and existing CTA/card conventions.
- `contactAPI`, server email configuration, Mongo persistence and `contactLimiter`.
- Existing product catalogue entry and indexed URL for Nexus AOS.

## Routes to add

- `/products/nexus-aos` (enhanced in place)
- `/products/nexus-aos/demo`
- `/products/nexus-aos/readiness-assessment`
- `/products/nexus-aos/solutions`
- `/products/nexus-aos/solutions/agentic-data-engineering`
- `/products/nexus-aos/solutions/procurement`
- `/products/nexus-aos/solutions/:domain`
- `/products/nexus-aos/architecture`
- `/products/nexus-aos/pricing`
- `/products/nexus-aos/docs`
- `/products/nexus-aos/docs/:section`

The documentation section route will cover getting started, concepts, architecture, agents, workflows, integrations, governance, observability, security and API.

## Shared implementation

- Nexus page shell, sub-navigation, hero, CTA group, breadcrumbs, final CTA, workflow and architecture diagrams.
- Central domain, navigation, pricing, documentation and assessment data modules.
- Searchable/sortable domain catalogue and reusable domain-detail template.
- Multi-step readiness assessment with scoring kept separate from presentation.
- Dedicated demo request form and secure `/api/nexus/demo` submission path.
- Privacy-safe analytics event helper with no sensitive payload fields.

## Data and content model

- Plain JavaScript objects with runtime integrity tests, matching the repository’s current language and content conventions.
- Exactly 20 domain records as the single source of truth.
- Forty-eight five-point assessment questions across twelve dimensions.
- Documentation content stored separately from page components.
- All public US-dollar amounts, package contents, form interest labels, support examples and commercial terms are maintained in `client/src/data/nexusPricing.js`.
- The commercial sequence is paid assessment, paid workflow discovery, paid pilot, annual platform licence, then separately scoped implementation, infrastructure, support and expansion services.

## Risks and inconsistencies

- The existing generic product route must remain after the more-specific Nexus routes so indexed product URLs continue to work.
- No analytics provider is configured; events will dispatch to a neutral browser event/data-layer interface without adding a vendor.
- The client previously had no repository ESLint configuration. A project-local configuration is required so the existing lint script can analyse JSX and enforce hook and unused-code rules consistently.
- Static crawler metadata currently recognises only generic product detail records; Nexus static routes need explicit crawler handlers and sitemap entries.
- Domain design counts are research/design artefacts only. The UI must never describe them as customers, deployments or production usage.
- No public Nexus API contract exists, so the documentation portal must not invent endpoints.

## Deployment considerations

- No new environment variable is required. Nexus notification email reuses `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` and `NOTIFY_EMAIL`; the client reuses `VITE_API_URL`.
- The deployment must publish the rebuilt Vite assets and restart the Express process so `/api/nexus/demo`, `/api/nexus/assessment`, sitemap entries and crawler metadata become available together.
- MongoDB must be reachable before enabling the public forms because Nexus enquiries are persisted before email delivery is attempted.
- Production rate limits allow five Nexus submissions per IP per hour, in addition to the existing global API limit.
- The current VPS/Nginx/Express deployment remains the correct target. No separate static-site deployment should be created because the Nexus forms and crawler rendering depend on the existing API process and database.
- After release, verify the canonical Nexus, pricing, assessment, one domain, documentation and demo URLs; then submit or refresh `/api/sitemap.xml` in the search platform used by the site.
