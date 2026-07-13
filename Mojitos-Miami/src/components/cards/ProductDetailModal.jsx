import { useEffect, useState } from 'react'
import { FiEye, FiMinus, FiPlus, FiShoppingCart, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import ProductTags from '@/components/cards/ProductTags'
import { useMenuStore, mapVariante } from '@/store/menuStore'
import { useCartStore } from '@/store/cartStore'
import { useUiStore } from '@/store/uiStore'
import { getProductById } from '@/services/api'
import { useProductPricing, useSelectedVariantsPricing } from '@/hooks/useProductPricing'
import {
  formatPrice,
  formatVariantNames,
  getVariantPricing,
  PLACEHOLDER,
  resolveVariantImage,
} from '@/utils'
import styles from './ProductDetailModal.module.css'

export default function ProductDetailModal() {
  const categories = useMenuStore((state) => state.categories)
  const product = useUiStore((state) => state.productDetail)
  const closeProductDetail = useUiStore((state) => state.closeProductDetail)
  const openOrderModal = useUiStore((state) => state.openOrderModal)
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const [variants, setVariants] = useState([])
  const [selectedVariants, setSelectedVariants] = useState([])
  const [isLoadingVariants, setIsLoadingVariants] = useState(false)
  const [variantsError, setVariantsError] = useState('')
  const [imageError, setImageError] = useState(false)
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false)
  const pricing = useProductPricing(product)
  const selectedPricing = useSelectedVariantsPricing(product, selectedVariants)

  useEffect(() => {
    if (product) {
      setQuantity(1)
      setSelectedVariants([])
      setVariants([])
      setVariantsError('')
      setIsImagePreviewOpen(false)
    }
  }, [product])

  useEffect(() => {
    if (!product) return undefined

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (isImagePreviewOpen) {
        setIsImagePreviewOpen(false)
        return
      }
      closeProductDetail()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [product, closeProductDetail, isImagePreviewOpen])

  useEffect(() => {
    if (!product?.usa_variantes) return undefined

    let cancelled = false

    const applyVariants = (loaded) => {
      setVariants(loaded)
      setSelectedVariants(loaded[0] ? [loaded[0]] : [])
      setVariantsError('')
    }

    const cached = (product.variantes ?? []).map(mapVariante)
    if (cached.length) {
      applyVariants(cached)
      setIsLoadingVariants(false)
      return undefined
    }

    async function loadVariants() {
      setIsLoadingVariants(true)
      setVariantsError('')

      try {
        const detail = await getProductById(product.id, { timeout: 8000, retries: 1 })
        if (cancelled) return
        const loaded = (detail.variantes ?? []).map(mapVariante)
        applyVariants(loaded)
      } catch {
        if (cancelled) return
        setVariantsError('No se pudieron cargar los sabores. Revisa tu conexión e intenta de nuevo.')
      } finally {
        if (!cancelled) setIsLoadingVariants(false)
      }
    }

    loadVariants()

    return () => {
      cancelled = true
    }
  }, [product])

  const primarySelected = selectedVariants[0] ?? null
  const displayImage = product
    ? product.usa_variantes && product.mostrar_imagen_variantes
      ? resolveVariantImage(primarySelected, product.image)
      : product.image
    : PLACEHOLDER

  useEffect(() => {
    setImageError(false)
  }, [displayImage])

  if (!product) return null

  const categoryName =
    categories.find((cat) => cat.id === product.category)?.name ?? null

  const currentPrice = selectedVariants.length
    ? selectedPricing.displayPrice
    : pricing.displayPrice
  const displayProduct = { ...product, discountLabel: pricing.discountLabel }
  const imageSrc = imageError ? PLACEHOLDER : displayImage
  const variantNamesLabel = formatVariantNames(selectedVariants)
  const imageAlt = variantNamesLabel
    ? `${product.name} - ${variantNamesLabel}`
    : product.name

  const hasVariants = product.usa_variantes && variants.length > 0
  const maxSabores = Math.min(2, Math.max(1, Number(product.max_sabores) || 1))
  const isVariantSelectionMissing =
    product.usa_variantes && variants.length > 0 && selectedVariants.length === 0
  const variantTitle = maxSabores >= 2 ? 'Elige tus sabores' : 'Elige tu sabor'
  const variantSubtitle =
    maxSabores >= 2
      ? 'Puedes elegir 1 o 2 sabores (ej. mango + maracuyá)'
      : 'Selecciona un sabor para continuar'

  const toggleVariant = (variant) => {
    setSelectedVariants((current) => {
      const exists = current.some((item) => item.id === variant.id)

      if (maxSabores === 1) {
        return exists ? current : [variant]
      }

      if (exists) {
        if (current.length === 1) return current
        return current.filter((item) => item.id !== variant.id)
      }

      if (current.length >= maxSabores) {
        toast.error(`Máximo ${maxSabores} sabores por producto.`)
        return current
      }

      return [...current, variant]
    })
  }

  const buildCartVariant = () => {
    const ids = selectedVariants.map((variant) => variant.id)
    return {
      id: ids.length === 1 ? ids[0] : ids.map(String).sort().join('-'),
      ids,
      nombre_variante: formatVariantNames(selectedVariants),
      precio: selectedPricing.displayPrice,
      image: resolveVariantImage(primarySelected, product.image),
    }
  }

  const handleAdd = () => {
    if (product.usa_variantes && hasVariants) {
      if (!selectedVariants.length) {
        toast.error('Elige al menos un sabor antes de añadir al carrito.')
        return
      }

      const cartVariant = buildCartVariant()
      addItem({ ...product, price: selectedPricing.displayPrice }, quantity, cartVariant)
      toast.success(
        `${quantity}x ${product.name} (${cartVariant.nombre_variante}) agregado al carrito`,
      )
      return
    }

    addItem({ ...product, price: pricing.displayPrice }, quantity)
    toast.success(`${quantity}x ${product.name} agregado al carrito`)
  }

  const handleOrder = () => {
    const cartVariant = hasVariants ? buildCartVariant() : null
    closeProductDetail()
    openOrderModal(
      [
        {
          id: product.id,
          productId: product.id,
          variantId: cartVariant?.id ?? null,
          variantIds: cartVariant?.ids ?? [],
          variantName: cartVariant?.nombre_variante ?? null,
          variants,
          usa_variantes: Boolean(product.usa_variantes),
          name: product.name,
          price: currentPrice,
          quantity,
          category: product.category,
          image: displayImage,
        },
      ],
      'product',
    )
  }

  return (
    <div className={styles.root} role="presentation">
      <div className={styles.overlay} onClick={closeProductDetail} aria-hidden="true" />

      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={closeProductDetail}
          aria-label="Cerrar"
        >
          <FiX aria-hidden="true" />
        </button>

        <div className={styles.imageWrap}>
          <img
            key={displayImage}
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            onError={() => setImageError(true)}
          />
          <ProductTags product={displayProduct} layout="overlay" />
          <button
            type="button"
            className={styles.imagePreviewBtn}
            onClick={() => setIsImagePreviewOpen(true)}
            aria-label="Ver imagen ampliada"
            title="Ver imagen ampliada"
          >
            <FiEye aria-hidden="true" />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.scrollBody}>
            {categoryName && <p className={styles.category}>{categoryName}</p>}
            <h2 id="product-detail-title" className={styles.name}>
              {product.name}
            </h2>
            {product.description ? (
              <p className={styles.description}>{product.description}</p>
            ) : null}
            <p className={styles.price}>{formatPrice(currentPrice)}</p>

            {product.usa_variantes && (
              <section className={styles.variantSection}>
                <div className={styles.variantHeader}>
                  <p className={styles.variantTitle}>{variantTitle}</p>
                  <p className={styles.variantSubtitle}>{variantSubtitle}</p>
                </div>
                {isLoadingVariants ? (
                  <p className={styles.variantHint}>Cargando opciones...</p>
                ) : variantsError ? (
                  <div className={styles.variantErrorWrap}>
                    <p className={styles.variantError}>{variantsError}</p>
                    <button
                      type="button"
                      className={styles.variantRetryBtn}
                      onClick={() => {
                        setVariants([])
                        setVariantsError('')
                        setIsLoadingVariants(true)
                        getProductById(product.id, { timeout: 8000, retries: 1 })
                          .then((detail) => {
                            const loaded = (detail.variantes ?? []).map(mapVariante)
                            setVariants(loaded)
                            setSelectedVariants(loaded[0] ? [loaded[0]] : [])
                            setVariantsError('')
                          })
                          .catch(() => {
                            setVariantsError(
                              'No se pudieron cargar los sabores. Revisa tu conexión e intenta de nuevo.',
                            )
                          })
                          .finally(() => setIsLoadingVariants(false))
                      }}
                    >
                      Reintentar
                    </button>
                  </div>
                ) : variants.length === 0 ? (
                  <p className={styles.variantHint}>
                    No hay variantes disponibles en este momento.
                  </p>
                ) : (
                  <div
                    className={styles.variantOptions}
                    role="group"
                    aria-label="Sabores disponibles"
                  >
                    {variants.map((variant) => {
                      const isSelected = selectedVariants.some((item) => item.id === variant.id)

                      return (
                        <button
                          key={variant.id}
                          type="button"
                          aria-pressed={isSelected}
                          className={isSelected ? styles.variantOptionActive : styles.variantOption}
                          onClick={() => toggleVariant(variant)}
                        >
                          <span className={styles.variantOptionName}>{variant.nombre_variante}</span>
                          <strong className={styles.variantOptionPrice}>
                            {formatPrice(getVariantPricing(variant, pricing).displayPrice)}
                          </strong>
                        </button>
                      )
                    })}
                  </div>
                )}
              </section>
            )}
          </div>

          <div className={styles.footerActions}>
            <div className={styles.actionsRow}>
              <div className={styles.quantity}>
                <span className={styles.quantityLabel}>Cant.</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Disminuir cantidad"
                >
                  <FiMinus aria-hidden="true" />
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Aumentar cantidad"
                >
                  <FiPlus aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                className={styles.addBtn}
                onClick={handleAdd}
                disabled={isVariantSelectionMissing}
              >
                <FiShoppingCart aria-hidden="true" />
                Añadir
              </button>
            </div>

            <button
              type="button"
              className={styles.orderBtn}
              onClick={handleOrder}
              disabled={isVariantSelectionMissing}
            >
              <FaWhatsapp aria-hidden="true" />
              Pedir ahora
            </button>
          </div>
        </div>
      </div>

      {isImagePreviewOpen && (
        <div
          className={styles.imageLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada del producto"
        >
          <button
            type="button"
            className={styles.imageLightboxBackdrop}
            onClick={() => setIsImagePreviewOpen(false)}
            aria-label="Cerrar imagen ampliada"
          />
          <div className={styles.imageLightboxContent}>
            <button
              type="button"
              className={styles.imageLightboxClose}
              onClick={() => setIsImagePreviewOpen(false)}
              aria-label="Cerrar"
            >
              <FiX aria-hidden="true" />
            </button>
            <img src={imageSrc} alt={imageAlt} />
          </div>
        </div>
      )}
    </div>
  )
}
