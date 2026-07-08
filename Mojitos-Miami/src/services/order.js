import { DELIVERY_FEE } from '@/data/orderConfig'
import { formatPrice } from '@/utils'
import { buildWhatsAppUrl } from '@/services/whatsapp'
import { validateCupon } from '@/services/api'

export function createOrderDraft(lines) {
  return {
    lines: lines.map((line) => ({
      id: line.id,
      productId: line.productId ?? null,
      variantId: line.variantId ?? null,
      variantName: line.variantName ?? null,
      variants: line.variants ?? [],
      name: line.name,
      price: line.price,
      quantity: line.quantity,
      category: line.category ?? null,
      usa_variantes: Boolean(line.usa_variantes),
    })),
    hasCoupon: false,
    couponCode: '',
    couponValidated: false,
    coupon: null,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
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

function buildValidationPayload(draft) {
  const subtotal = draft.lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  )

  return {
    codigo: draft.couponCode.trim(),
    subtotal,
    delivery_fee: DELIVERY_FEE,
    lineas: draft.lines.map((line) => ({
      product_id: line.productId,
      categoria_id: line.category != null ? Number(line.category) : null,
      precio: line.price,
      cantidad: line.quantity,
    })),
  }
}

export async function validateCouponForDraft(draft) {
  const result = await validateCupon(buildValidationPayload(draft))

  return {
    ...result,
    code: result.cupon?.codigo ?? draft.couponCode.trim().toUpperCase(),
    description: result.cupon?.descripcion ?? '',
  }
}

export function isOrderDraftValid(draft) {
  if (!draft?.lines?.length) return false

  const itemsValid = draft.lines.every((line) => {
    if (!line.usa_variantes) return true
    return line.variantId != null && Boolean(line.variantName)
  })

  const customerValid =
    draft.customerName.trim().length >= 2 &&
    isValidPhone(draft.customerPhone) &&
    isValidEmail(draft.customerEmail)

  const couponValid =
    !draft.hasCoupon ||
    (draft.couponCode.trim().length > 0 && draft.couponValidated)

  const deliveryValid = draft.deliveryAddress.trim().length >= 5

  return itemsValid && customerValid && couponValid && deliveryValid
}

export function calculateOrderTotals(draft) {
  const subtotal = draft.lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  )

  let deliveryFee = DELIVERY_FEE
  let subtotalDiscount = 0
  let deliveryDiscount = 0

  if (draft.hasCoupon && draft.couponValidated && draft.coupon) {
    subtotalDiscount = Number(draft.coupon.subtotalDiscount ?? 0)
    deliveryDiscount = Number(draft.coupon.deliveryDiscount ?? 0)
    deliveryFee = Number(draft.coupon.deliveryFee ?? DELIVERY_FEE)
  }

  const total = Math.max(0, subtotal - subtotalDiscount + deliveryFee)

  return {
    subtotal,
    subtotalDiscount,
    deliveryDiscount,
    deliveryFee,
    total,
  }
}

export function buildConfirmOrderMessage(draft) {
  const lines = ['Hola, me gustaría pedir:', '']

  draft.lines.forEach((line) => {
    const variantLabel = line.variantName ? ` - ${line.variantName}` : ''
    const itemLine = `${line.quantity} x ${line.name}${variantLabel} (${formatPrice(line.price)} c/u)`
    lines.push(itemLine)
  })

  lines.push('')
  lines.push(`*Nombre:* ${draft.customerName.trim()}`)
  lines.push(`*Número de celular:* +56 9 ${draft.customerPhone.replace(/\s/g, '')}`)

  if (draft.customerEmail.trim()) {
    lines.push(`*Correo:* ${draft.customerEmail.trim()}`)
  }

  lines.push('', '*Método de pago:* Transferencia')

  const { subtotal, subtotalDiscount, deliveryFee, deliveryDiscount, total } =
    calculateOrderTotals(draft)

  lines.push(`*Subtotal:* ${formatPrice(subtotal)}`)

  if (subtotalDiscount > 0) {
    lines.push(`*Descuento:* -${formatPrice(subtotalDiscount)}`)
  }

  if (deliveryDiscount > 0) {
    lines.push(`*Delivery:* Gratis (cupón aplicado)`)
  } else {
    lines.push(`*Delivery:* +${formatPrice(deliveryFee)}`)
  }

  lines.push(`*Dirección:* ${draft.deliveryAddress.trim()}`)

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
