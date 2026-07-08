import { useEffect } from "react"

import Seo from "@/components/common/Seo"
import Sidebar from "@/components/sidebar/Sidebar"
import MobileHeader from "@/components/common/MobileHeader"
import FloatingActions from "@/components/common/FloatingActions"
import MobileBarBanner from "@/components/hero/HeroBannerMovil"
import Hero from "@/components/hero/Hero"
import Features from "@/components/hero/Features"
import CategoryFilter from "@/components/catalog/CategoryFilter"
import { ProductSearchDesktop, ProductSearchMobile } from "@/components/catalog/ProductSearch"
import ProductCard from "@/components/cards/ProductCard"
import ProductDetailModal from "@/components/cards/ProductDetailModal"

import CartSidebar from "@/components/cart/CartSidebar"
import OrderConfirmModal from "@/components/order/OrderConfirmModal"

import Footer from "@/components/footer/Footer"

import { useFilteredMenuItems } from "@/hooks/useMenuItems"
import { useMenuStore } from "@/store/menuStore"
import { useConfigStore } from "@/store/configStore"

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
  const searchQuery = useMenuStore((state) => state.searchQuery)
  const carta = useConfigStore((state) => state.site.carta)

  const showLoading = isLoading && items.length === 0

  useEffect(() => {
    useMenuStore.getState().fetchMenu()
    useConfigStore.getState().fetchConfig()
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
              <header className="mb-6">
                <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.34em] text-[var(--color-text-dim)] sm:text-[11px] sm:tracking-[0.38em]">
                  {carta.label}
                </p>

                <div className="mt-3 flex items-end justify-between gap-5 sm:mt-4 sm:gap-8">
                  <h2 className="min-w-0 flex-1 text-[clamp(1.65rem,4.2vw,2.35rem)] font-extrabold leading-[1.12] tracking-[0.02em] text-[var(--color-text)] sm:tracking-[0.025em]">
                    {carta.title}
                  </h2>
                  <ProductSearchDesktop />
                </div>

                <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.7] tracking-[0.015em] text-[var(--color-text-muted)] sm:mt-5">
                  {carta.subtitle}
                </p>
              </header>

              <div className="mb-6">
                <ProductSearchMobile />
                <CategoryFilter />
              </div>

              {showLoading ? (
                <p className="py-12 text-center text-[var(--color-text-dim)]">
                  Cargando menú...
                </p>
              ) : items.length === 0 ? (
                <p className="py-12 text-center text-[var(--color-text-dim)]">
                  {searchQuery.trim()
                    ? `No hay productos que coincidan con "${searchQuery.trim()}".`
                    : 'No hay productos en esta categoría.'}
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