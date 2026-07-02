import { create } from 'zustand'

export const useUiStore = create((set) => ({
  isSidebarOpen: false,
  isCartOpen: false,
  activeNav: 'inicio',
  orderModal: null,
  productDetail: null,

  setActiveNav: (id) => set({ activeNav: id }),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
  openOrderModal: (lines, source = 'product') =>
    set({ orderModal: { lines, source } }),
  closeOrderModal: () => set({ orderModal: null }),
  openProductDetail: (product) => set({ productDetail: product }),
  closeProductDetail: () => set({ productDetail: null }),
}))
