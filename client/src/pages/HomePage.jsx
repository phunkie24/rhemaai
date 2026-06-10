import { Helmet } from 'react-helmet-async'
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
      <Helmet>
        <title>RhemaAI Solutions Ltd | Enterprise AI, Cloud, Data Engineering & Multi-Agent Systems</title>
        <meta
          name="description"
          content="RhemaAI Solutions Ltd delivers enterprise AI transformation, agentic AI systems, cloud architecture, data engineering, analytics, and the Multi-Agent Orchestration Patterns book for scalable AI systems."
        />
        <meta
          name="keywords"
          content="enterprise AI, multi-agent orchestration patterns, agentic AI systems, cloud architecture, data engineering, AI governance"
        />
      </Helmet>
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
