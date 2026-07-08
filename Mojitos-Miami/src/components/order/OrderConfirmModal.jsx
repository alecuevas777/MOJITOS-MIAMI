import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { PHONE_PREFIX } from '@/data/orderConfig'
import {
  calculateOrderTotals,
  createOrderDraft,
  isOrderDraftValid,
  submitOrderToWhatsApp,
  validateCouponForDraft,
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
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false)

  useEffect(() => {
    if (orderModal?.lines) {
      setDraft(createOrderDraft(orderModal.lines))
      setCouponFeedback('')
    } else {
      setDraft(null)
    }
  }, [orderModal])

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

  const handleCouponToggle = (hasCoupon) => {
    setDraft((current) => ({
      ...current,
      hasCoupon,
      couponCode: hasCoupon ? current.couponCode : '',
      couponValidated: false,
      coupon: null,
    }))
    setCouponFeedback('')
  }

  const handleValidateCoupon = async () => {
    if (!draft.couponCode.trim()) {
      setCouponFeedback('Ingresa un código de cupón.')
      return
    }

    setIsValidatingCoupon(true)
    setCouponFeedback('')

    try {
      const coupon = await validateCouponForDraft(draft)

      setDraft((current) => ({
        ...current,
        couponValidated: true,
        coupon,
      }))
      setCouponFeedback(
        coupon.description
          ? `Cupón "${coupon.code}" aplicado: ${coupon.description}`
          : `Cupón "${coupon.code}" aplicado.`,
      )
    } catch (error) {
      setDraft((current) => ({
        ...current,
        couponValidated: false,
        coupon: null,
      }))
      setCouponFeedback(error.message || 'Cupón no válido. Intenta con otro código.')
    } finally {
      setIsValidatingCoupon(false)
    }
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
                  {line.quantity} x {line.name}
                  {line.variantName ? ` · ${line.variantName}` : ''} · {formatPrice(line.price)} c/u
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
                        coupon: null,
                      })
                      setCouponFeedback('')
                    }}
                  />
                  <button
                    type="button"
                    className={styles.validateBtn}
                    onClick={handleValidateCoupon}
                    disabled={isValidatingCoupon}
                  >
                    {isValidatingCoupon ? 'Validando...' : 'Validar'}
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
            <h3 className={styles.sectionTitle}>Dirección de entrega</h3>
            <p className={styles.sectionHint}>
              Solo realizamos delivery. Indica dónde entregar tu pedido.
            </p>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Dirección</span>
              <input
                type="text"
                className={styles.fieldInput}
                placeholder="Calle, número, depto/casa"
                value={draft.deliveryAddress}
                onChange={(event) => updateDraft({ deliveryAddress: event.target.value })}
              />
            </label>
          </section>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <strong>{formatPrice(totals.subtotal)}</strong>
            </div>
            {totals.subtotalDiscount > 0 && (
              <div className={styles.totalRow}>
                <span>Descuento</span>
                <strong>-{formatPrice(totals.subtotalDiscount)}</strong>
              </div>
            )}
            <div className={styles.totalRow}>
              <span>Delivery</span>
              <strong>
                {totals.deliveryDiscount > 0
                  ? 'Gratis'
                  : `+${formatPrice(totals.deliveryFee)}`}
              </strong>
            </div>
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
