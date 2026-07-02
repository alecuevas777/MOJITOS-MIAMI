import { memo, useState } from 'react'
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import ProductTags from '@/components/cards/ProductTags'
import { useCartStore } from '@/store/cartStore'
import { useUiStore } from '@/store/uiStore'
import { formatPrice, cn } from '@/utils'
import styles from './ProductCard.module.css'

function ProductCard({ product, priority = false }) {
  const addItem = useCartStore((state) => state.addItem)
  const openOrderModal = useUiStore((state) => state.openOrderModal)
  const openProductDetail = useUiStore((state) => state.openProductDetail)
  const [quantity, setQuantity] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAdd = () => {
    addItem(product, quantity)
    toast.success(`${quantity}x ${product.name} agregado al carrito`)
  }

  const handleOrder = () => {
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

  const handleOpenDetail = () => {
    openProductDetail(product)
  }

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={cn(styles.imageWrap, !imageLoaded && styles.imageLoading)}
        onClick={handleOpenDetail}
        aria-label={`Ver detalle de ${product.name}`}
      >
        {!imageLoaded && <span className={styles.imageSkeleton} aria-hidden="true" />}
        <ProductTags product={product} layout="overlay" />
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          width={400}
          height={400}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setImageLoaded(true)}
        />
      </button>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <button type="button" className={styles.viewMoreBtn} onClick={handleOpenDetail}>
            Ver más
          </button>
        </div>

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
            aria-label={`Añadir ${quantity} ${product.name} al carrito`}
          >
            <FiShoppingCart aria-hidden="true" />
            Añadir
          </button>
        </div>

        <button type="button" className={styles.orderBtn} onClick={handleOrder}>
          <FaWhatsapp aria-hidden="true" />
          Pedir ahora
        </button>
      </div>
    </article>
  )
}

export default memo(ProductCard)
