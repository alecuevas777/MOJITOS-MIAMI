import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/utils/constants'

const getCartTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)

const getItemCount = (items) => items.reduce((count, item) => count + item.quantity, 0)

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const { items } = get()
        const existing = items.find((item) => item.id === product.id)

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    category: product.category ?? item.category,
                  }
                : item,
            ),
          })
          return
        }

        set({
          items: [
            ...items,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
              quantity,
            },
          ],
        })
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => getCartTotal(get().items),

      getItemCount: () => getItemCount(get().items),
    }),
    {
      name: STORAGE_KEYS.CART,
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
