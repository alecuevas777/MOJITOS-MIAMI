import { FiSearch } from 'react-icons/fi'
import { useMenuStore } from '@/store/menuStore'

const inputClass =
  'w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 pl-10 pr-4 text-sm tracking-[0.02em] text-[var(--color-text)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(184,240,74,0.12)]'

/** Campo desktop: alineado a la derecha del título */
export function ProductSearchDesktop() {
  const searchQuery = useMenuStore((state) => state.searchQuery)
  const setSearchQuery = useMenuStore((state) => state.setSearchQuery)

  return (
    <div className="hidden w-[min(300px,32vw)] shrink-0 sm:block">
      <label className="relative block w-full">
        <span className="sr-only">Buscar productos</span>
        <FiSearch
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)]"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar productos..."
          className={inputClass}
        />
      </label>
    </div>
  )
}

/** Móvil: siempre visible, encima de Categorías */
export function ProductSearchMobile() {
  const searchQuery = useMenuStore((state) => state.searchQuery)
  const setSearchQuery = useMenuStore((state) => state.setSearchQuery)

  return (
    <div className="mb-4 sm:hidden">
      <label className="relative block w-full">
        <span className="sr-only">Buscar productos</span>
        <FiSearch
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)]"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar productos..."
          className={inputClass}
        />
      </label>
    </div>
  )
}
