import { Helmet } from 'react-helmet-async'
import { getSiteUrl, siteConfig } from '@/data/siteConfig'
import { useConfigStore } from '@/store/configStore'
import { formatPhone } from '@/utils'

export default function Seo({ title, description, path = '', noIndex = false }) {
  const site = useConfigStore((state) => state.site)
  const siteName = site.name || siteConfig.name
  const siteDescription = site.description || siteConfig.seo.description
  const pageTitle = title ? `${title} | ${siteName}` : siteName
  const socialTitle = title ? `${title} | ${siteName}` : siteConfig.seo.title
  const pageDescription = description || siteDescription || siteConfig.seo.description
  const origin = getSiteUrl()
  const canonicalPath = path || '/'
  const canonicalUrl = `${origin}${canonicalPath === '/' ? '' : canonicalPath}` || origin
  const ogImageUrl = origin ? `${origin}${siteConfig.seo.ogImage}` : siteConfig.seo.ogImage
  const keywords = siteConfig.seo.keywords.join(', ')
  const phoneDigits = String(site.phone || siteConfig.phone).replace(/\D/g, '')
  const phoneDisplay = formatPhone(site.phone || siteConfig.phone)
  const instagram = site.social?.instagram || siteConfig.social.instagram

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: siteName,
    description: pageDescription,
    url: origin || undefined,
    image: ogImageUrl || undefined,
    telephone: phoneDigits ? `+${phoneDigits}` : undefined,
    email: site.email || siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -37.0294,
      longitude: -73.1402,
    },
    areaServed: {
      '@type': 'City',
      name: 'Coronel',
    },
    servesCuisine: ['Cócteles', 'Mojitos', 'Mocktails'],
    priceRange: '$$',
    sameAs: [instagram].filter(Boolean),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '17:00',
      closes: '02:00',
    },
  }

  return (
    <Helmet>
      <html lang="es" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords} />
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow'}
      />
      <meta name="author" content={siteName} />
      <meta name="theme-color" content={siteConfig.seo.themeColor} />
      <meta name="geo.region" content="CL-BI" />
      <meta name="geo.placename" content="Coronel" />
      <meta name="language" content="Spanish" />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={siteConfig.seo.locale} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={pageDescription} />
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      {ogImageUrl ? <meta property="og:image" content={ogImageUrl} /> : null}
      {ogImageUrl ? <meta property="og:image:secure_url" content={ogImageUrl} /> : null}
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(siteConfig.seo.ogImageWidth)} />
      <meta property="og:image:height" content={String(siteConfig.seo.ogImageHeight)} />
      <meta property="og:image:alt" content={siteConfig.seo.ogImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {ogImageUrl ? <meta name="twitter:image" content={ogImageUrl} /> : null}

      {phoneDisplay ? <meta name="telephone" content={phoneDisplay} /> : null}

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
