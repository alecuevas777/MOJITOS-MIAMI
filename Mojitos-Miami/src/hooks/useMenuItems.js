import { useMemo } from 'react'
import { useMenuStore } from '@/store/menuStore'

export function useFilteredMenuItems() {
  const items = useMenuStore((state) => state.items)
  const activeCategory = useMenuStore((state) => state.activeCategory)

  return useMemo(() => {
    if (activeCategory === 'all') return items

    return items.filter((item) => item.category === activeCategory)
  }, [items, activeCategory])
}
