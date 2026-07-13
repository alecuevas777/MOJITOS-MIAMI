import logo from '../assets/logo.png'

export const siteConfig = {
  name: 'Mojitos Miami',
  brand: 'Mojitos Miami',
  brandSuffix: 'MIAMI',

  logo,

  tagline: 'El sabor que te mueve',
  description:
    'Mojitos, cócteles artesanales y barra libre en Coronel. Pedidos por WhatsApp con delivery a domicilio.',
  phone: import.meta.env.VITE_WHATSAPP_NUMBER || '56951731209',
  email: 'contacto@mojitosmiami.cl',
  address: 'Gabriela Mistral 1782, Coronel',
  city: 'Coronel',
  region: 'Biobío',
  country: 'CL',
  mapUrl: 'https://maps.google.com/?q=Gabriela+Mistral+1782,+Coronel',
  hours: 'Lunes a Domingo 17:00 a 02:00 hrs',
  happyHour: 'Lunes a Jueves 17:00 a 20:00 hrs',
  schedule: {
    openHour: 17,
    openMinute: 0,
    closeHour: 2,
    closeMinute: 0,
  },

  social: {
    instagram: 'https://www.instagram.com/mojitosmiami/',
    facebook: '',
    whatsapp: 'https://wa.me/56951731209',
  },

  seo: {
    title: 'Mojitos Miami | Mojitos y cócteles en Coronel',
    description:
      'Pide mojitos, cócteles artesanales, mocktails y combos en Coronel. Delivery a domicilio y barra libre para eventos. Pedidos por WhatsApp.',
    keywords: [
      'mojitos Coronel',
      'cócteles Coronel',
      'delivery mojitos Coronel',
      'barra libre Coronel',
      'mocktails Coronel',
      'tragos a domicilio Coronel',
      'Mojitos Miami',
      'coctelería artesanal Biobío',
      'pedidos WhatsApp Coronel',
      'barra móvil eventos Coronel',
    ],
    locale: 'es_CL',
    ogImage: '/og-image.png',
    ogImageAlt: 'Mojitos Miami — Coronel',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    themeColor: '#000000',
  },
}

/** URL pública del sitio (para Open Graph / canonical). */
export function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return ''
}
