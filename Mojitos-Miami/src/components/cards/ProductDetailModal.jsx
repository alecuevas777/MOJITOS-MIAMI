import { useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiShoppingCart, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import ProductTags from '@/components/cards/ProductTags'
import { useMenuStore, mapVariante } from '@/store/menuStore'
import { useCartStore } from '@/store/cartStore'
import { useUiStore } from '@/store/uiStore'
import { getProductById } from '@/services/api'
import { useProductPricing, useVariantPricing } from '@/hooks/useProductPricing'
import { formatPrice, getVariantPricing, PLACEHOLDER, resolveVariantImage } from '@/utils'
import styles from './ProductDetailModal.module.css'

export default function ProductDetailModal() {
  const categories = useMenuStore((state) => state.categories)
  const product = useUiStore((state) => state.productDetail)
  const closeProductDetail = useUiStore((state) => state.closeProductDetail)
  const openOrderModal = useUiStore((state) => state.openOrderModal)
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const [variants, setVariants] = useState([])
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [isLoadingVariants, setIsLoadingVariants] = useState(false)
  const [variantsError, setVariantsError] = useState('')
  const [imageError, setImageError] = useState(false)
  const pricing = useProductPricing(product)
  const variantPricing = useVariantPricing(product, selectedVariant)

  useEffect(() => {
    if (product) {
      setQuantity(1)
      setSelectedVariant(null)
      setVariants([])
      setVariantsError('')
    }
  }, [product])

  useEffect(() => {
    if (!product) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeProductDetail()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [product, closeProductDetail])

  useEffect(() => {
    if (!product?.usa_variantes) return undefined

    async function loadVariants() {
      setIsLoadingVariants(true)
      setVariantsError('')

      try {
        const detail = await getProductById(product.id)
        const loaded = (detail.variantes ?? []).map(mapVariante)
        setVariants(loaded)
        setSelectedVariant(loaded[0] ?? null)
      } catch (error) {
        setVariantsError('No se pudo cargar las variantes.')
      } finally {
        setIsLoadingVariants(false)
      }
    }

    loadVariants()
  }, [product])

  const displayImage = product
    ? product.usa_variantes
      ? resolveVariantImage(selectedVariant, product.image)
      : product.image
    : PLACEHOLDER

  useEffect(() => {
    setImageError(false)
  }, [displayImage])

  if (!product) return null

  const categoryName =
    categories.find((cat) => cat.id === product.category)?.name ?? null

  const currentPrice = variantPricing.displayPrice
  const displayProduct = { ...product, discountLabel: pricing.discountLabel }

  const hasVariants = product.usa_variantes && variants.length > 0
  const isVariantSelectionMissing = product.usa_variantes && variants.length > 0 && !selectedVariant

  const handleAdd = () => {
    if (product.usa_variantes && hasVariants) {
      if (!selectedVariant) {
        toast.error('Elige un sabor antes de añadir al carrito.')
        return
      }

      addItem(
        { ...product, price: variantPricing.displayPrice },
        quantity,
        { ...selectedVariant, precio: variantPricing.displayPrice },
      )
      toast.success(
        `${quantity}x ${product.name} ${selectedVariant.nombre_variante} agregado al carrito`,
      )
      return
    }

    addItem({ ...product, price: pricing.displayPrice }, quantity)
    toast.success(`${quantity}x ${product.name} agregado al carrito`)
  }

  const handleOrder = () => {
    closeProductDetail()
    openOrderModal(
      [
        {
          id: product.id,
          productId: product.id,
          variantId: selectedVariant?.id ?? null,
          variantName: selectedVariant?.nombre_variante ?? null,
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
            src={imageError ? PLACEHOLDER : displayImage}
            alt={selectedVariant ? `${product.name} - ${selectedVariant.nombre_variante}` : product.name}
            loading="lazy"
            onError={() => setImageError(true)}
          />
          <ProductTags product={displayProduct} layout="overlay" />
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
            <p className={styles.price}>
              {product.usa_variantes
                ? selectedVariant
                  ? formatPrice(variantPricing.displayPrice)
                  : `Desde ${formatPrice(pricing.displayPrice)}`
                : formatPrice(pricing.displayPrice)}
            </p>

            {product.usa_variantes && (
              <section className={styles.variantSection}>
                <div className={styles.variantHeader}>
                  <p className={styles.variantTitle}>Elige tu sabor</p>
                  <p className={styles.variantSubtitle}>Selecciona una opción para continuar</p>
                </div>
                {isLoadingVariants ? (
                  <p className={styles.variantHint}>Cargando opciones...</p>
                ) : variantsError ? (
                  <p className={styles.variantError}>{variantsError}</p>
                ) : variants.length === 0 ? (
                  <p className={styles.variantHint}>
                    No hay variantes disponibles en este momento.
                  </p>
                ) : (
                  <div className={styles.variantOptions} role="listbox" aria-label="Sabores disponibles">
                    {variants.map((variant) => {
                      const isSelected = variant.id === selectedVariant?.id

                      return (
                        <button
                          key={variant.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={isSelected ? styles.variantOptionActive : styles.variantOption}
                          onClick={() => setSelectedVariant(variant)}
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
    </div>
  )
}
