import { siteConfig } from '@/data/siteConfig'

function encodeMessage(text) {
  return encodeURIComponent(text)
}

export function buildWhatsAppUrl(message) {
  const phone = siteConfig.phone.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeMessage(message)}`
}
