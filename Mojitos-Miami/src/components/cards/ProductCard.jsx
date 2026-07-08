import { memo, useState } from 'react'
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import ProductTags from '@/components/cards/ProductTags'
import { useCartStore } from '@/store/cartStore'
import { useUiStore } from '@/store/uiStore'
import { useProductPricing } from '@/hooks/useProductPricing'
import { formatPrice, cn } from '@/utils'
import styles from './ProductCard.module.css'

function ProductCard({ product, priority = false }) {
  const addItem = useCartStore((state) => state.addItem)
  const openOrderModal = useUiStore((state) => state.openOrderModal)
  const openProductDetail = useUiStore((state) => state.openProductDetail)

  const [quantity, setQuantity] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)
  const pricing = useProductPricing(product)
  const displayProduct = { ...product, discountLabel: pricing.discountLabel }

  const handleAdd = () => {
    if (product.usa_variantes) {
      openProductDetail(product)
      toast('Elige el sabor en el detalle del producto', { icon: '🍹' })
      return
    }

    addItem({ ...product, price: pricing.displayPrice }, quantity)
    toast.success(`${quantity}x ${product.name} agregado al carrito`)
  }

  const handleOrder = () => {
    if (product.usa_variantes) {
      openProductDetail(product)
      return
    }

    openOrderModal(
      [
        {
          id: product.id,
          name: product.name,
          price: pricing.displayPrice,
          quantity,
          category: product.category,
          image: product.image,
          productId: product.id,
          variantId: null,
          variantName: null,
          variants: [],
          usa_variantes: Boolean(product.usa_variantes),
        },
      ],
      'product',
    )
  }

  const handleOpenDetail = () => {
    openProductDetail(product)
  }

  return (
    <article id={`product-${product.id}`} className={styles.card}>
      <button
        type="button"
        className={cn(styles.imageWrap, !imageLoaded && styles.imageLoading)}
        onClick={handleOpenDetail}
        aria-label={`Ver detalle de ${product.name}`}
      >
        {!imageLoaded && (
          <span className={styles.imageSkeleton} aria-hidden="true" />
        )}

        <ProductTags product={displayProduct} layout="overlay" />

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
          <span className={styles.price}>
            {product.usa_variantes
              ? `Desde ${formatPrice(pricing.displayPrice)}`
              : formatPrice(pricing.displayPrice)}
          </span>

          <button
            type="button"
            className={styles.viewMoreBtn}
            onClick={handleOpenDetail}
          >
            Ver más
          </button>
        </div>

        <div className={styles.actionsRow}>
          <div className={styles.quantity}>
            <span className={styles.quantityLabel}>Cant.</span>

            <button
              type="button"
              onClick={() => setQuantity((v) => Math.max(1, v - 1))}
            >
              <FiMinus />
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() => setQuantity((v) => v + 1)}
            >
              <FiPlus />
            </button>
          </div>

          <button
            type="button"
            className={styles.addBtn}
            onClick={handleAdd}
          >
            <FiShoppingCart />
            Añadir
          </button>
        </div>

        <button
          type="button"
          className={styles.orderBtn}
          onClick={handleOrder}
        >
          <FaWhatsapp />
          Pedir ahora
        </button>
      </div>
    </article>
  )
}

export default memo(ProductCard)