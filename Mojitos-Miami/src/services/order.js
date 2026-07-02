import {
  alcoholIntensities,
  deliveryModes,
  extraIngredients,
  MAX_EXTRAS,
  DELIVERY_FEE,
  paymentMethods,
  validCoupons,
} from '@/data/orderConfig'
import { formatPrice } from '@/utils'
import { buildWhatsAppUrl } from '@/services/whatsapp'

export function productNeedsIntensity(category) {
  return category !== 'sin-alcohol'
}

export function createOrderDraft(lines) {
  return {
    lines: lines.map((line) => ({
      id: line.id,
      name: line.name,
      price: line.price,
      quantity: line.quantity,
      category: line.category ?? null,
      intensity: productNeedsIntensity(line.category) ? null : undefined,
    })),
    extras: [],
    hasCoupon: false,
    couponCode: '',
    couponValidated: false,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    paymentMethod: 'transferencia',
    deliveryMode: 'retiro',
    deliveryAddress: '',
  }
}

function isValidEmail(email) {
  if (!email.trim()) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function isValidPhone(phone) {
  return /^\d{8}$/.test(phone.replace(/\s/g, ''))
}

export function validateCouponCode(code) {
  const normalized = code.trim().toUpperCase()
  if (!normalized) return null
  return validCoupons[normalized] ?? null
}

export function isOrderDraftValid(draft) {
  if (!draft?.lines?.length) return false

  const intensityValid = draft.lines.every((line) => {
    if (!productNeedsIntensity(line.category)) return true
    return alcoholIntensities.some((option) => option.id === line.intensity)
  })

  const customerValid =
    draft.customerName.trim().length >= 2 &&
    isValidPhone(draft.customerPhone) &&
    isValidEmail(draft.customerEmail)

  const couponValid =
    !draft.hasCoupon ||
    (draft.couponCode.trim().length > 0 && draft.couponValidated)

  const deliveryValid =
    draft.deliveryMode !== 'delivery' || draft.deliveryAddress.trim().length >= 5

  return intensityValid && customerValid && couponValid && deliveryValid
}

export function calculateOrderTotals(draft) {
  const subtotal = draft.lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  )

  const extrasTotal = draft.extras.reduce((sum, extraId) => {
    const extra = extraIngredients.find((item) => item.id === extraId)
    return sum + (extra?.price ?? 0)
  }, 0)

  const deliveryFee = draft.deliveryMode === 'delivery' ? DELIVERY_FEE : 0

  return {
    subtotal,
    extrasTotal,
    deliveryFee,
    total: subtotal + extrasTotal + deliveryFee,
  }
}

export function toggleExtraSelection(extras, extraId) {
  if (extras.includes(extraId)) {
    return extras.filter((id) => id !== extraId)
  }

  if (extras.length >= MAX_EXTRAS) return extras

  return [...extras, extraId]
}

function getPaymentLabel(paymentMethod) {
  return paymentMethods.find((method) => method.id === paymentMethod)?.label ?? paymentMethod
}

function getDeliveryLabel(deliveryMode) {
  return deliveryModes.find((mode) => mode.id === deliveryMode)?.label ?? deliveryMode
}

export function buildConfirmOrderMessage(draft) {
  const lines = ['Hola, me gustaría pedir:', '']

  draft.lines.forEach((line) => {
    let itemLine = `${line.quantity} x ${line.name} (${formatPrice(line.price)} c/u)`

    if (line.intensity) {
      const intensityLabel = alcoholIntensities.find(
        (option) => option.id === line.intensity,
      )?.label

      if (intensityLabel) {
        itemLine += ` — Alcohol: ${intensityLabel.toLowerCase()}`
      }
    }

    lines.push(itemLine)
  })

  lines.push('')
  lines.push(`*Nombre:* ${draft.customerName.trim()}`)
  lines.push(`*Número de celular:* +56 9 ${draft.customerPhone.replace(/\s/g, '')}`)

  if (draft.customerEmail.trim()) {
    lines.push(`*Correo:* ${draft.customerEmail.trim()}`)
  }

  lines.push('', `*Método de pago:* ${getPaymentLabel(draft.paymentMethod)}`)

  const { subtotal, extrasTotal, deliveryFee, total } = calculateOrderTotals(draft)

  lines.push(`*Subtotal:* ${formatPrice(subtotal)}`)

  if (draft.extras.length > 0) {
    lines.push('', '*Ingredientes extras:*')

    draft.extras.forEach((extraId) => {
      const extra = extraIngredients.find((item) => item.id === extraId)
      if (extra) {
        lines.push(`• ${extra.name} (${formatPrice(extra.price)})`)
      }
    })

    lines.push('', `*Extras total:* +${formatPrice(extrasTotal)}`)
  }

  if (deliveryFee > 0) {
    lines.push('', `*Delivery:* +${formatPrice(deliveryFee)}`)
  }

  lines.push(`*Modalidad:* ${getDeliveryLabel(draft.deliveryMode)}`)

  if (draft.deliveryMode === 'delivery') {
    lines.push(`*Dirección:* ${draft.deliveryAddress.trim()}`)
  }

  if (draft.hasCoupon && draft.couponValidated) {
    lines.push(`*Cupón:* ${draft.couponCode.trim().toUpperCase()}`)
  } else {
    lines.push('*Cupón:* No')
  }

  lines.push('', `*Total estimado:* ${formatPrice(total)}`)

  return lines.join('\n')
}

export function submitOrderToWhatsApp(draft) {
  if (!isOrderDraftValid(draft)) return false

  const message = buildConfirmOrderMessage(draft)
  const url = buildWhatsAppUrl(message)

  window.open(url, '_blank', 'noopener,noreferrer')
  return true
}
