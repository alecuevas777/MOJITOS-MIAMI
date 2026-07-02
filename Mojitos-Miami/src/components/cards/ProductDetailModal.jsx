import { useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiShoppingCart, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import ProductTags from '@/components/cards/ProductTags'
import { useMenuStore } from '@/store/menuStore'
import { useCartStore } from '@/store/cartStore'
import { useUiStore } from '@/store/uiStore'
import { formatPrice } from '@/utils'
import styles from './ProductDetailModal.module.css'

export default function ProductDetailModal() {
  const categories = useMenuStore((state) => state.categories)
  const product = useUiStore((state) => state.productDetail)
  const closeProductDetail = useUiStore((state) => state.closeProductDetail)
  const openOrderModal = useUiStore((state) => state.openOrderModal)
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (product) setQuantity(1)
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

  if (!product) return null

  const categoryName =
    categories.find((cat) => cat.id === product.category)?.name ?? null

  const handleAdd = () => {
    addItem(product, quantity)
    toast.success(`${quantity}x ${product.name} agregado al carrito`)
  }

  const handleOrder = () => {
    closeProductDetail()
    openOrderModal(
      [
        {
          id: product.id,
          name: product.name,
          price: product.price,
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
            <p className={styles.price}>{formatPrice(product.price)}</p>
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

              <button type="button" className={styles.addBtn} onClick={handleAdd}>
                <FiShoppingCart aria-hidden="true" />
                Añadir
              </button>
            </div>

            <button type="button" className={styles.orderBtn} onClick={handleOrder}>
              <FaWhatsapp aria-hidden="true" />
              Pedir ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
