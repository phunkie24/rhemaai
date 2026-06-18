import PageSEO from '@components/common/PageSEO'
import Hero from '@components/Hero/Hero'
import BookPromoStream from '@components/BookPromoStream/BookPromoStream'
import Marquee from '@components/Marquee/Marquee'
import Services from '@components/Services/Services'
import WhyUs from '@components/WhyUs/WhyUs'
import Industries from '@components/Industries/Industries'
import CTA from '@components/CTA/CTA'

export default function HomePage() {
  return (
    <>
      <PageSEO
        title="RhemaAI Solutions Ltd | Enterprise AI, Data Engineering & Agentic AI"
        description="Nigeria-based enterprise AI consultancy delivering agentic AI systems, data engineering pipelines, Azure cloud architecture, machine learning, BI analytics and data science — serving UK, US, UAE, South Africa, Kenya, Canada, Australia and global enterprises."
        keywords="enterprise AI consulting Nigeria, data engineering Africa, agentic AI systems, machine learning consultancy, Azure cloud consulting, BI analytics, data science, AI company Nigeria UK UAE"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'RhemaAI Solutions Ltd',
          url: 'https://rhemaaisolutions.tech',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://rhemaaisolutions.tech/insights?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <Hero />
      <BookPromoStream />
      <Marquee />
      <Services />
      <WhyUs />
      <Industries />
      <CTA />
    </>
  )
}
