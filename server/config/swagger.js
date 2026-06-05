import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RhemaAI Technologies API',
      version: '1.0.0',
      description:
        'REST API for RhemaAI Technologies — insights, publications, products, case studies, contact, and newsletter endpoints.',
      contact: {
        name: 'RhemaAI Technologies',
        email: 'info@rhemaai.tech',
        url: 'https://rhemaai.tech',
      },
    },
    servers: [
      { url: 'http://localhost:5000/api', description: 'Local development' },
      { url: 'https://rhemaai.tech/api',  description: 'Production' },
    ],
    components: {
      securitySchemes: {
        AdminApiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'x-admin-api-key',
          description: 'Required for all /admin/* endpoints. Set CONTACT_ADMIN_KEY in .env.',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Validation failed' },
            errors:  { type: 'array', items: { type: 'string' } },
          },
        },
        Contact: {
          type: 'object',
          required: ['name', 'email', 'message'],
          properties: {
            name:    { type: 'string', minLength: 2, maxLength: 100, example: 'Funke Yusuf' },
            email:   { type: 'string', format: 'email', example: 'funke@company.com' },
            company: { type: 'string', maxLength: 150, example: 'Acme Enterprises Ltd' },
            service: {
              type: 'string',
              enum: ['agentic-ai','generative-ai','ai-advisory','data-engineering',
                     'data-science','cloud-architecture','mlops','software-engineering',
                     'fintech-blockchain','general'],
              default: 'general',
            },
            budget: {
              type: 'string',
              enum: ['under-10k','10k-50k','50k-100k','above-100k','not-specified'],
              default: 'not-specified',
            },
            message: { type: 'string', minLength: 10, maxLength: 2000, example: 'We need help building an agentic AI system.' },
          },
        },
        Insight: {
          type: 'object',
          properties: {
            _id:         { type: 'string' },
            title:       { type: 'string' },
            slug:        { type: 'string' },
            excerpt:     { type: 'string' },
            category:    { type: 'string' },
            tags:        { type: 'array', items: { type: 'string' } },
            readTime:    { type: 'integer' },
            published:   { type: 'boolean' },
            publishedAt: { type: 'string', format: 'date-time' },
            author:      { type: 'object', properties: { name: { type: 'string' } } },
          },
        },
        PaginatedInsights: {
          type: 'object',
          properties: {
            insights: { type: 'array', items: { $ref: '#/components/schemas/Insight' } },
            total:    { type: 'integer' },
            page:     { type: 'integer' },
            pages:    { type: 'integer' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
}

export const swaggerSpec = swaggerJsdoc(options)
