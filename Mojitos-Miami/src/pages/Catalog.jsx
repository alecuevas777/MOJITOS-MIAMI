import { useEffect } from 'react'
import CategoryFilter from '@/components/catalog/CategoryFilter'
import Seo from '@/components/common/Seo'
import FloatingActions from '@/components/common/FloatingActions'
import MobileHeader, { ViewMoreButton } from '@/components/common/MobileHeader'
import Sidebar from '@/components/sidebar/Sidebar'
import Hero from '@/components/hero/Hero'
import FeaturesBar from '@/components/hero/FeaturesBar'
import ProductCard from '@/components/cards/ProductCard'
import OrderConfirmModal from '@/components/order/OrderConfirmModal'
import ProductDetailModal from '@/components/cards/ProductDetailModal'
import CartSidebar from '@/components/cart/CartSidebar'
import Footer from '@/components/footer/Footer'
import { useFilteredMenuItems } from '@/hooks/useMenuItems'
import { useMenuStore } from '@/store/menuStore'
import styles from './Catalog.module.css'

function prefetchImages(urls) {
  urls.forEach((url) => {
    const img = new Image()
    img.decoding = 'async'
    img.src = url
  })
}

export default function Catalog() {
  const items = useFilteredMenuItems()
  const isLoading = useMenuStore((state) => state.isLoading)
  const showLoading = isLoading && items.length === 0

  useEffect(() => {
    useMenuStore.getState().fetchMenu()
  }, [])

  useEffect(() => {
    prefetchImages(items.slice(0, 6).map((item) => item.image))
  }, [items])

  return (
    <>
      <Seo />

      <div className={styles.app}>
        <Sidebar />
        <CartSidebar />
        <OrderConfirmModal />
        <ProductDetailModal />
        <FloatingActions />

        <div className={styles.main}>
          <MobileHeader />

          <div className={styles.content}>
            <Hero />
            <FeaturesBar />

            <section className={styles.catalog} id="catalogo">
              <p className={styles.catalogLabel}>NUESTRA CARTA</p>
              <h2 className={styles.catalogTitle}>Mojitos y cócteles</h2>
              <p className={styles.catalogDescription}>
                Explora mojitos, cócteles, promociones y combos. Pide por WhatsApp con retiro o
                delivery.
              </p>

              <CategoryFilter />

              {showLoading ? (
                <p className={styles.status}>Cargando menú...</p>
              ) : (
                <>
                  <div className={styles.grid}>
                    {items.map((item, index) => (
                      <ProductCard key={item.id} product={item} priority={index < 4} />
                    ))}
                  </div>
                  <ViewMoreButton />
                </>
              )}
            </section>

            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
