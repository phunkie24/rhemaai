import { Helmet } from 'react-helmet-async'
import Hero from '@components/Hero/Hero'
import Marquee from '@components/Marquee/Marquee'
import Services from '@components/Services/Services'
import WhyUs from '@components/WhyUs/WhyUs'
import Industries from '@components/Industries/Industries'
import CTA from '@components/CTA/CTA'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>RhemaAI Solutions Ltd | Enterprise AI, Cloud & Data Engineering</title>
        <meta
          name="description"
          content="RhemaAI Solutions Ltd delivers enterprise AI transformation, agentic AI systems, cloud architecture, data science, and advanced analytics. Multi-cloud experts: Azure, AWS and GCP."
        />
      </Helmet>
      <Hero />
      <Marquee />
      <Services />
      <WhyUs />
      <Industries />
      <CTA />
    </>
  )
}
