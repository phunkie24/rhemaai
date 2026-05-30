import { Helmet } from 'react-helmet-async'
import Hero from '@components/Hero/Hero'
import Marquee from '@components/Marquee/Marquee'
import Services from '@components/Services/Services'
import DataScience from '@components/DataScience/DataScience'
import WhyUs from '@components/WhyUs/WhyUs'
import Process from '@components/Process/Process'
import Industries from '@components/Industries/Industries'
import CTA from '@components/CTA/CTA'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>RhemaAI Technologies | Enterprise AI, Cloud & Data Engineering</title>
        <meta name="description" content="RhemaAI Technologies delivers enterprise AI transformation, agentic AI systems, cloud architecture, data science, and advanced analytics. Multi-cloud experts: Azure, AWS, GCP." />
      </Helmet>

      <Hero />
      <Marquee />
      <Services />
      <DataScience />
      <WhyUs />
      <Process />
      <Industries />
      <CTA />
    </>
  )
}
