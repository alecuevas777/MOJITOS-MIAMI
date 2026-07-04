import { useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiShoppingCart, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import ProductTags from '@/components/cards/ProductTags'
import { useMenuStore } from '@/store/menuStore'
import { useCartStore } from '@/store/cartStore'
import { useUiStore } from '@/store/uiStore'
import { getProductById } from '@/services/api'
import { formatPrice } from '@/utils'
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
        if (product.variantes?.length) {
          setVariants(product.variantes)
          setSelectedVariant(product.variantes[0])
          return
        }

        const data = await getProductById(product.id)
        setVariants(data.variantes ?? [])
        setSelectedVariant(data.variantes?.[0] ?? null)
      } catch (error) {
        setVariantsError('No se pudo cargar las variantes.')
      } finally {
        setIsLoadingVariants(false)
      }
    }

    loadVariants()
  }, [product])

  if (!product) return null

  const categoryName =
    categories.find((cat) => cat.id === product.category)?.name ?? null

  const currentPrice = product.usa_variantes
    ? Number(selectedVariant?.precio ?? product.precio_base ?? product.price)
    : product.price

  const hasVariants = product.usa_variantes && variants.length > 0
  const isVariantSelectionMissing = product.usa_variantes && variants.length > 0 && !selectedVariant

  const handleAdd = () => {
    if (product.usa_variantes && hasVariants) {
      if (!selectedVariant) {
        toast.error('Elige un sabor antes de añadir al carrito.')
        return
      }

      addItem(product, quantity, selectedVariant)
      toast.success(
        `${quantity}x ${product.name} ${selectedVariant.nombre_variante} agregado al carrito`,
      )
      return
    }

    addItem(product, quantity)
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
          name: product.name,
          price: currentPrice,
          quantity,
          category: product.category,
          image: product.image,
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
          <img src={product.image} alt={product.name} loading="lazy" />
          <ProductTags product={product} layout="overlay" />
        </div>

        <div className={styles.content}>
          <div className={styles.scrollBody}>
            {categoryName && <p className={styles.category}>{categoryName}</p>}
            <h2 id="product-detail-title" className={styles.name}>
              {product.name}
            </h2>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>
              {product.usa_variantes
                ? `Desde ${formatPrice(product.precio_base ?? currentPrice)}`
                : formatPrice(currentPrice)}
            </p>

            {product.usa_variantes && (
              <section className={styles.variantSection}>
                <p className={styles.variantTitle}>Elige tu sabor</p>
                {isLoadingVariants ? (
                  <p className={styles.variantHint}>Cargando opciones...</p>
                ) : variantsError ? (
                  <p className={styles.variantError}>{variantsError}</p>
                ) : variants.length === 0 ? (
                  <p className={styles.variantHint}>
                    No hay variantes disponibles en este momento.
                  </p>
                ) : (
                  <div className={styles.variantOptions}>
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        className={
                          variant.id === selectedVariant?.id
                            ? styles.variantOptionActive
                            : styles.variantOption
                        }
                        onClick={() => setSelectedVariant(variant)}
                      >
                        <span>{variant.nombre_variante}</span>
                        <strong>{formatPrice(variant.precio)}</strong>
                      </button>
                    ))}
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
