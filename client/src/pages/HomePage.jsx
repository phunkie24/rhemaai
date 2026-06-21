import PageSEO from '@components/common/PageSEO'
import Hero from '@components/Hero/Hero'
import Marquee from '@components/Marquee/Marquee'
import Services from '@components/Services/Services'
import WhyUs from '@components/WhyUs/WhyUs'
import Industries from '@components/Industries/Industries'
import CTA from '@components/CTA/CTA'

const SERVICE_NAMES = [
  'Agentic AI Engineering',
  'Generative AI & LLM Systems Design',
  'Data Engineering & Platforms',
  'Data Science & Advanced Analytics',
  'Cloud Architecture',
  'MLOps & DataOps',
]

export default function HomePage() {
  return (
    <>
      <PageSEO
        title="RhemaAI Solutions Ltd | Enterprise AI, Data Engineering & Agentic AI"
        description="Nigeria-based enterprise AI consultancy delivering agentic AI systems, data engineering pipelines, Azure cloud architecture, machine learning, BI analytics and data science for UK, US, UAE, South Africa, Kenya, Canada, Australia and global enterprises."
        keywords="enterprise AI consulting Nigeria, data engineering Africa, agentic AI systems, machine learning consultancy, Azure cloud consulting, BI analytics, data science, AI company Nigeria UK UAE"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'RhemaAI Solutions Ltd',
            url: 'https://rhemaaisolutions.tech',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://rhemaaisolutions.tech/insights?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'RhemaAI Solutions Ltd',
            url: 'https://rhemaaisolutions.tech',
            image: 'https://rhemaaisolutions.tech/og-image.svg',
            areaServed: ['Nigeria', 'United Kingdom', 'United States', 'United Arab Emirates', 'South Africa', 'Kenya', 'Canada', 'Australia'],
            serviceType: ['Enterprise AI consulting', 'Agentic AI engineering', 'Data engineering', 'Cloud architecture', 'MLOps', 'Business intelligence'],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Enterprise AI, Data and Cloud Services',
              itemListElement: SERVICE_NAMES.map((name) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name,
                  provider: {
                    '@type': 'Organization',
                    name: 'RhemaAI Solutions Ltd',
                  },
                },
              })),
            },
          },
        ]}
      />
      <Hero />
      <Marquee />
      <Services />
      <WhyUs />
      <Industries />
      <CTA />
    </>
  )
}
