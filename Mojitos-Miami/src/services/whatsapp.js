import { useConfigStore } from '@/store/configStore'

function encodeMessage(text) {
  return encodeURIComponent(text)
}

export function buildWhatsAppUrl(message) {
  const phone = useConfigStore.getState().site.phone.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeMessage(message)}`
}
