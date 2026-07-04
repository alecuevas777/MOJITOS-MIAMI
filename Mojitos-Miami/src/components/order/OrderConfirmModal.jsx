import { useEffect, useState } from 'react'
import { FiMapPin, FiMinus, FiPlus, FiShoppingCart, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { PHONE_PREFIX, alcoholIntensities, extraIngredients, MAX_EXTRAS, paymentMethods, deliveryModes } from '@/data/orderConfig'
import { siteConfig } from '@/data/siteConfig'
import { getProductById } from '@/services/api'
import {
  calculateOrderTotals,
  createOrderDraft,
  isOrderDraftValid,
  productNeedsIntensity,
  submitOrderToWhatsApp,
  toggleExtraSelection,
  validateCouponCode,
} from '@/services/order'
import { useCartStore } from '@/store/cartStore'
import { useUiStore } from '@/store/uiStore'
import { formatPrice, cn } from '@/utils'
import styles from './OrderConfirmModal.module.css'

export default function OrderConfirmModal() {
  const orderModal = useUiStore((state) => state.orderModal)
  const closeOrderModal = useUiStore((state) => state.closeOrderModal)
  const clearCart = useCartStore((state) => state.clearCart)
  const [draft, setDraft] = useState(null)
  const [couponFeedback, setCouponFeedback] = useState('')

  useEffect(() => {
    if (orderModal?.lines) {
      setDraft(createOrderDraft(orderModal.lines))
      setCouponFeedback('')
    } else {
      setDraft(null)
    }
  }, [orderModal])

  useEffect(() => {
    if (!draft) return undefined

    const pendingLines = draft.lines.filter(
      (line) => line.usa_variantes && (!line.variants || line.variants.length === 0),
    )

    if (pendingLines.length === 0) return undefined

    let active = true

    async function loadVariantsForDraft() {
      try {
        const linesWithVariants = await Promise.all(
          pendingLines.map(async (line) => {
            const data = await getProductById(line.productId)
            return {
              ...line,
              variants: data.variantes ?? [],
              variantId: line.variantId ?? data.variantes?.[0]?.id ?? null,
              variantName:
                line.variantName ?? data.variantes?.[0]?.nombre_variante ?? null,
              price:
                line.variantId || line.variantName
                  ? line.price
                  : Number(data.variantes?.[0]?.precio ?? line.price),
            }
          }),
        )

        if (!active) return

        setDraft((current) => ({
          ...current,
          lines: current.lines.map((line) => {
            const updated = linesWithVariants.find((item) => item.id === line.id)
            return updated ?? line
          }),
        }))
      } catch (_) {
        // No-op: keep current draft if variant loading fails.
      }
    }

    loadVariantsForDraft()

    return () => {
      active = false
    }
  }, [draft])

  useEffect(() => {
    if (!orderModal) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeOrderModal()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [orderModal, closeOrderModal])

  if (!orderModal || !draft) return null

  const isValid = isOrderDraftValid(draft)
  const totals = calculateOrderTotals(draft)

  const updateDraft = (patch) => {
    setDraft((current) => ({ ...current, ...patch }))
  }

  const handleVariantChange = (lineId, variant) => {
    setDraft((current) => ({
      ...current,
      lines: current.lines.map((line) =>
        line.id === lineId
          ? {
              ...line,
              variantId: variant.id,
              variantName: variant.nombre_variante,
              price: Number(variant.precio),
            }
          : line,
      ),
    }))
  }

  const handleIntensityChange = (lineId, intensity) => {
    setDraft((current) => ({
      ...current,
      lines: current.lines.map((line) =>
        line.id === lineId ? { ...line, intensity } : line,
      ),
    }))
  }

  const handleExtraToggle = (extraId) => {
    setDraft((current) => ({
      ...current,
      extras: toggleExtraSelection(current.extras, extraId),
    }))
  }

  const handleCouponToggle = (hasCoupon) => {
    setDraft((current) => ({
      ...current,
      hasCoupon,
      couponCode: hasCoupon ? current.couponCode : '',
      couponValidated: false,
    }))
    setCouponFeedback('')
  }

  const handleValidateCoupon = () => {
    const coupon = validateCouponCode(draft.couponCode)

    if (!coupon) {
      setDraft((current) => ({ ...current, couponValidated: false }))
      setCouponFeedback('Cupón no válido. Intenta con otro código.')
      return
    }

    setDraft((current) => ({ ...current, couponValidated: true }))
    setCouponFeedback(`Cupón "${coupon.code}" aplicado.`)
  }

  const handlePhoneChange = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 8)
    updateDraft({ customerPhone: digits })
  }

  const handleSubmit = () => {
    if (!submitOrderToWhatsApp(draft)) return

    if (orderModal.source === 'cart') {
      clearCart()
    }

    closeOrderModal()
  }

  return (
    <div className={styles.root} role="presentation">
      <div className={styles.overlay} onClick={closeOrderModal} aria-hidden="true" />

      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <header className={styles.header}>
          <div>
            <h2 id="order-modal-title" className={styles.title}>
              Confirmar pedido
            </h2>
            <ul className={styles.summary}>
              {draft.lines.map((line) => (
                <li key={line.id}>
                  {line.quantity} x {line.name} · {formatPrice(line.price)} c/u
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeOrderModal}
            aria-label="Cerrar"
          >
            <FiX aria-hidden="true" />
          </button>
        </header>

        <div className={styles.body}>
          {draft.lines.map((line) => (
            <section key={`variant-${line.id}`} className={styles.section}>
              <h3 className={styles.sectionTitle}>Elige tu sabor</h3>
              <p className={styles.sectionHint}>
                Selecciona el tipo de mojito para este producto
              </p>
              <p className={styles.lineLabel}>
                {line.quantity} x {line.name}
              </p>

              {line.variants?.length > 0 ? (
                <div className={styles.optionGroup}>
                  {line.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      className={cn(
                        styles.optionBtn,
                        line.variantId === variant.id && styles.optionBtnActive,
                      )}
                      onClick={() => handleVariantChange(line.id, variant)}
                    >
                      <span>{variant.nombre_variante}</span>
                      <strong>{formatPrice(variant.precio)}</strong>
                    </button>
                  ))}
                </div>
              ) : (
                <p className={styles.variantHint}>Cargando opciones...</p>
              )}
            </section>
          ))}

          {draft.lines
            .filter((line) => productNeedsIntensity(line.category))
            .map((line) => (
              <section key={`intensity-${line.id}`} className={styles.section}>
                <h3 className={styles.sectionTitle}>Intensidad de alcohol</h3>
                <p className={styles.sectionHint}>
                  Elige si prefieres el trago suave, medio o fuerte
                </p>
                <p className={styles.lineLabel}>
                  {line.quantity} x {line.name}
                </p>

                <div className={styles.optionGroup}>
                  {alcoholIntensities.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={cn(
                        styles.optionBtn,
                        line.intensity === option.id && styles.optionBtnActive,
                      )}
                      onClick={() => handleIntensityChange(line.id, option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>
            ))}

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Ingredientes extras</h3>
            <p className={styles.sectionHint}>
              Elige hasta {MAX_EXTRAS} ({draft.extras.length}/{MAX_EXTRAS})
            </p>

            <div className={styles.extrasGrid}>
              {extraIngredients.map((extra) => {
                const isSelected = draft.extras.includes(extra.id)
                const isDisabled =
                  !isSelected && draft.extras.length >= MAX_EXTRAS

                return (
                  <button
                    key={extra.id}
                    type="button"
                    className={cn(
                      styles.extraBtn,
                      isSelected && styles.extraBtnActive,
                      isDisabled && styles.extraBtnDisabled,
                    )}
                    onClick={() => handleExtraToggle(extra.id)}
                    disabled={isDisabled}
                  >
                    <span>{extra.name}</span>
                    <span>{formatPrice(extra.price)}</span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>¿Tienes un cupón?</h3>

            <div className={styles.couponToggle}>
              <button
                type="button"
                className={cn(
                  styles.couponBtn,
                  !draft.hasCoupon && styles.couponBtnActive,
                )}
                onClick={() => handleCouponToggle(false)}
              >
                No
              </button>
              <button
                type="button"
                className={cn(
                  styles.couponBtn,
                  draft.hasCoupon && styles.couponBtnActive,
                )}
                onClick={() => handleCouponToggle(true)}
              >
                Sí, tengo cupón
              </button>
            </div>

            {draft.hasCoupon && (
              <>
                <div className={styles.couponRow}>
                  <input
                    type="text"
                    className={styles.couponInput}
                    placeholder="EJ: ENVIO30"
                    value={draft.couponCode}
                    onChange={(event) => {
                      updateDraft({
                        couponCode: event.target.value.toUpperCase(),
                        couponValidated: false,
                      })
                      setCouponFeedback('')
                    }}
                  />
                  <button
                    type="button"
                    className={styles.validateBtn}
                    onClick={handleValidateCoupon}
                  >
                    Validar
                  </button>
                </div>
                {couponFeedback && (
                  <p
                    className={cn(
                      styles.feedback,
                      draft.couponValidated ? styles.feedbackSuccess : styles.feedbackError,
                    )}
                  >
                    {couponFeedback}
                  </p>
                )}
              </>
            )}
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Tus datos</h3>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Nombre</span>
              <input
                type="text"
                className={styles.fieldInput}
                placeholder="Tu nombre completo"
                value={draft.customerName}
                onChange={(event) => updateDraft({ customerName: event.target.value })}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Número de celular</span>
              <div className={styles.phoneRow}>
                <span className={styles.phonePrefix}>{PHONE_PREFIX}</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  className={styles.phoneInput}
                  placeholder="87073838"
                  value={draft.customerPhone}
                  onChange={(event) => handlePhoneChange(event.target.value)}
                />
              </div>
              <p className={styles.fieldHint}>
                Solo los 8 dígitos después del +56 9 (ej. 12 34 56 78 → escribes 12345678)
              </p>
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Correo electrónico (opcional)</span>
              <input
                type="email"
                className={styles.fieldInput}
                placeholder="correo@ejemplo.com"
                value={draft.customerEmail}
                onChange={(event) => updateDraft({ customerEmail: event.target.value })}
              />
              <p className={styles.fieldHint}>
                No es necesario completarlo para confirmar tu pedido.
              </p>
            </label>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Método de pago</h3>
            <div className={styles.toggleGroup}>
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={cn(
                    styles.toggleBtn,
                    draft.paymentMethod === method.id && styles.toggleBtnActive,
                  )}
                  onClick={() => updateDraft({ paymentMethod: method.id })}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>¿Cómo lo recibes?</h3>
            <div className={styles.toggleGroup}>
              {deliveryModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className={cn(
                    styles.toggleBtn,
                    draft.deliveryMode === mode.id && styles.toggleBtnActive,
                  )}
                  onClick={() =>
                    updateDraft({
                      deliveryMode: mode.id,
                      deliveryAddress: mode.id === 'retiro' ? '' : draft.deliveryAddress,
                    })
                  }
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {draft.deliveryMode === 'retiro' ? (
              <div className={styles.locationBox}>
                <p className={styles.locationTitle}>Dirección del local</p>
                <p className={styles.locationAddress}>{siteConfig.address}</p>
                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  <FiMapPin aria-hidden="true" />
                  Ver en el mapa
                </a>
              </div>
            ) : (
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Dirección de entrega</span>
                <input
                  type="text"
                  className={styles.fieldInput}
                  placeholder="Calle, número, depto/casa"
                  value={draft.deliveryAddress}
                  onChange={(event) => updateDraft({ deliveryAddress: event.target.value })}
                />
              </label>
            )}
          </section>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <strong>{formatPrice(totals.subtotal + totals.extrasTotal)}</strong>
            </div>
            {totals.deliveryFee > 0 && (
              <div className={styles.totalRow}>
                <span>Delivery</span>
                <strong>+{formatPrice(totals.deliveryFee)}</strong>
              </div>
            )}
            <div className={cn(styles.totalRow, styles.totalRowFinal)}>
              <span>Total estimado</span>
              <strong>{formatPrice(totals.total)}</strong>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <button
            type="button"
            className={cn(styles.submitBtn, !isValid && styles.submitBtnDisabled)}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            <FaWhatsapp aria-hidden="true" />
            Continuar a WhatsApp
          </button>
        </footer>
      </div>
    </div>
  )
}
