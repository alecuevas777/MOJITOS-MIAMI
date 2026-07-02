import { useMenuStore } from '@/store/menuStore'
import { cn } from '@/utils'
import styles from './CategoryFilter.module.css'

export default function CategoryFilter() {
  const categories = useMenuStore((state) => state.categories)
  const activeCategory = useMenuStore((state) => state.activeCategory)
  const setActiveCategory = useMenuStore((state) => state.setActiveCategory)

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>CATEGORÍAS</p>
      <div className={styles.scroll} role="tablist" aria-label="Filtrar por categoría">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(styles.pill, isActive && styles.pillActive)}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
