import { create } from 'zustand'
import { menuCategories, menuItems } from '@/data/menuData'
import { getMenu } from '@/services/api'

export const useMenuStore = create((set, get) => ({
  categories: menuCategories,
  items: menuItems,
  activeCategory: 'all',
  searchQuery: '',
  isLoading: false,
  hasLoaded: false,
  error: null,

  setActiveCategory: (category) => set({ activeCategory: category }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchMenu: async () => {
    const { isLoading, hasLoaded, items } = get()
    if (isLoading || hasLoaded) return

    const hasCachedItems = items.length > 0
    set({ isLoading: !hasCachedItems, error: null })

    try {
      const data = await getMenu()
      set({
        categories: data.categories ?? menuCategories,
        items: data.items?.length ? data.items : items,
        isLoading: false,
        hasLoaded: true,
      })
    } catch (error) {
      set({
        isLoading: false,
        hasLoaded: true,
        error: error.message,
      })
    }
  },
}))
