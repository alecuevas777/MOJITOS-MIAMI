export function formatDiscountPercent(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return 0
  return Number.isInteger(n) ? n : parseFloat(n.toFixed(2))
}

/** Prioridad: descuento global → producto → categoría */
export function getEffectiveDiscountPercent({
  globalDiscount = 0,
  productDiscount = 0,
  categoryDiscount = 0,
} = {}) {
  const global = Number(globalDiscount) || 0
  if (global > 0) return formatDiscountPercent(global)

  const product = Number(productDiscount) || 0
  if (product > 0) return formatDiscountPercent(product)

  const category = Number(categoryDiscount) || 0
  if (category > 0) return formatDiscountPercent(category)

  return 0
}

export function applyDiscountPrice(basePrice, discountPercent) {
  const base = Number(basePrice) || 0
  const discount = Number(discountPercent) || 0
  if (discount <= 0) return base
  return Math.round(base * (1 - discount / 100))
}

export function getProductPricing(product, categories = [], globalDiscount = 0) {
  const category = categories.find((cat) => cat.id === product?.category)
  const discountPercent = getEffectiveDiscountPercent({
    globalDiscount,
    productDiscount: product?.productDiscount ?? 0,
    categoryDiscount: category?.descuento_porcentaje ?? product?.categoryDiscount ?? 0,
  })

  const basePrice = product?.usa_variantes
    ? Number(product.precio_base ?? product.price) || 0
    : Number(product?.price) || 0

  const displayPrice = applyDiscountPrice(basePrice, discountPercent)

  return {
    discountPercent,
    discountLabel: discountPercent > 0 ? `-${discountPercent}%` : null,
    basePrice,
    displayPrice,
    hasDiscount: discountPercent > 0,
  }
}

export function getVariantPricing(variant, pricing) {
  const basePrice = Number(variant?.precio) || 0

  return {
    ...pricing,
    basePrice,
    displayPrice: applyDiscountPrice(basePrice, pricing.discountPercent),
  }
}
