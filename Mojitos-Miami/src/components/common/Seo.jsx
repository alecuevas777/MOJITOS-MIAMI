import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/data/siteConfig'

export default function Seo({ title, description, path = '' }) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const pageDescription = description || siteConfig.description

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={`${window.location.origin}${path}`} />
    </Helmet>
  )
}
