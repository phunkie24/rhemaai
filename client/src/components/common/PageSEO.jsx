import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const BASE      = 'https://rhemaaisolutions.tech'
const OG_IMAGE  = `${BASE}/og-image.svg`

export default function PageSEO({
  title,
  description,
  keywords,
  image,
  noindex = false,
  type = 'website',
  structuredData,
}) {
  const { pathname } = useLocation()
  const canonical  = pathname === '/' ? BASE : `${BASE}${pathname}`
  const fullTitle  = title.includes('RhemaAI') ? title : `${title} | RhemaAI Solutions Ltd`
  const ogImage    = image || OG_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description"  content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots"       content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical"     href={canonical} />

      {/* hreflang — single English site serving multiple regions */}
      <link rel="alternate" hreflang="en"         href={canonical} />
      <link rel="alternate" hreflang="en-NG"      href={canonical} />
      <link rel="alternate" hreflang="en-GB"      href={canonical} />
      <link rel="alternate" hreflang="en-US"      href={canonical} />
      <link rel="alternate" hreflang="en-ZA"      href={canonical} />
      <link rel="alternate" hreflang="en-AE"      href={canonical} />
      <link rel="alternate" hreflang="x-default"  href={canonical} />

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:site_name"   content="RhemaAI Solutions Ltd" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@rhemaai" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* Per-page structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}
