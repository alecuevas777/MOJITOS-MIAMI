import { FiShoppingCart } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useCartStore } from '@/store/cartStore'
import { useUiStore } from '@/store/uiStore'
import { buildWhatsAppUrl } from '@/services/whatsapp'
import styles from './FloatingActions.module.css'

const defaultMessage = '¡Hola! Quiero hacer un pedido en Mojito Bar.'

export default function FloatingActions() {
  const openCart = useUiStore((state) => state.openCart)
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  )

  const whatsappUrl = buildWhatsAppUrl(defaultMessage)

  return (
    <div className={styles.fabGroup} aria-label="Acciones rápidas">
      <button
        type="button"
        className={styles.cartFab}
        onClick={openCart}
        aria-label={`Mi carrito, ${itemCount} productos`}
      >
        <FiShoppingCart aria-hidden="true" />
        {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFab}
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
    </div>
  )
}
