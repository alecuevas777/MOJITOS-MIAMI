import { useEffect } from "react"

import Seo from "@/components/common/Seo"
import Sidebar from "@/components/sidebar/Sidebar"
import MobileHeader from "@/components/common/MobileHeader"
import FloatingActions from "@/components/common/FloatingActions"
import MobileBarBanner from "@/components/hero/HeroBannerMovil"
import Hero from "@/components/hero/Hero"
import Features from "@/components/hero/Features"
import CategoryFilter from "@/components/catalog/CategoryFilter"
import ProductCard from "@/components/cards/ProductCard"
import ProductDetailModal from "@/components/cards/ProductDetailModal"

import CartSidebar from "@/components/cart/CartSidebar"
import OrderConfirmModal from "@/components/order/OrderConfirmModal"

import Footer from "@/components/footer/Footer"

import { useFilteredMenuItems } from "@/hooks/useMenuItems"
import { useMenuStore } from "@/store/menuStore"

function prefetchImages(urls) {
  urls.forEach((url) => {
    const img = new Image()
    img.decoding = "async"
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

      <div className="min-h-screen bg-[var(--color-bg)]">
        <Sidebar />

        <CartSidebar />

        <OrderConfirmModal />

        <ProductDetailModal />

        <FloatingActions />

        <div className="min-h-screen ml-[var(--sidebar-width)] max-[1100px]:ml-0">
          <MobileHeader />

          <main className="flex flex-col">

            {/* HERO */}
            <Hero />

            {/* FEATURES */}
            <Features />

            {/* CATÁLOGO */}
            <section
              id="catalogo"
              className="px-8 pt-8 pb-16 max-[1100px]:px-5 max-[1100px]:pt-6"
            >
              <p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-[var(--color-text-dim)]">
                NUESTRA CARTA
              </p>

              <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold tracking-[-0.02em] text-[var(--color-text)]">
                Mojitos y cócteles
              </h2>

              <p className="mb-6 max-w-[42ch] text-[15px] leading-[1.6] text-[var(--color-text-muted)]">
                Explora mojitos, cócteles, promociones y combos. Pide por WhatsApp con retiro o
                delivery.
              </p>

              <CategoryFilter />

              {showLoading ? (
                <p className="py-12 text-center text-[var(--color-text-dim)]">
                  Cargando menú...
                </p>
              ) : (
                <div className="grid gap-4 grid-cols-4 max-[1400px]:grid-cols-3 max-[1100px]:grid-cols-2 max-[480px]:grid-cols-1">
                  {items.map((item, index) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      priority={index < 4}
                    />
                  ))}
                </div>
              )}
            </section>

<MobileBarBanner />

            {/* FOOTER */}
            <Footer />

          </main>
        </div>
      </div>
    </>
  )
}