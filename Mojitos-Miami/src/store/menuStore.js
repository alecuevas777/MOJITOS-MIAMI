import { create } from 'zustand'
import { getProductos, getCategorias } from '@/services/api'
import { resolveProductImage } from '@/utils'

const ALL_CATEGORY = { id: 'all', name: 'Todos', icon: 'grid' }

export function mapVariante(v) {
  const rawImage = String(v.img_variante ?? '').trim()

  return {
    id: v.id,
    nombre_variante: v.nombre_variante,
    precio: Number(v.precio),
    stock: v.stock != null ? Number(v.stock) : null,
    img_variante: rawImage || null,
    image: rawImage ? resolveProductImage(rawImage) : null,
  }
}

function mapProduct(p, categoryDiscountMap = new Map()) {
  const usaVariantes = Boolean(Number(p.usa_variantes))
  const precioDesde = p.precio_desde != null ? Number(p.precio_desde) : null
  const basePrice = usaVariantes ? (precioDesde ?? 0) : Number(p.precio_producto)

  return {
    id: p.id_producto,
    name: p.nom_producto,
    description: p.descripcion_producto ?? '',
    price: basePrice,
    precio_base: precioDesde,
    productDiscount: Number(p.descuento_porcentaje) || 0,
    categoryDiscount: categoryDiscountMap.get(String(p.categoria_id)) || 0,
    category: String(p.categoria_id),
    image: resolveProductImage(p.img_prod),
    usa_variantes: usaVariantes,
    variantes: (p.variantes ?? []).map(mapVariante),
  }
}

function mapCategory(c) {
  return {
    id: String(c.id_categoria),
    name: c.nom_categoria,
    icon: 'grid',
    descuento_porcentaje: Number(c.descuento_porcentaje) || 0,
  }
}

export const useMenuStore = create((set, get) => ({
  categories: [ALL_CATEGORY],
  items: [],
  activeCategory: 'all',
  searchQuery: '',
  isLoading: false,
  hasLoaded: false,
  error: null,

  setActiveCategory: (category) => set({ activeCategory: category }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchMenu: async () => {
    const { isLoading, hasLoaded } = get()
    if (isLoading || hasLoaded) return

    set({ isLoading: true, error: null })

    try {
      const [productosRes, categoriasRes] = await Promise.all([
        getProductos(),
        getCategorias(),
      ])

      const categories = [
        ALL_CATEGORY,
        ...(categoriasRes.data ?? []).map(mapCategory),
      ]
      const categoryDiscountMap = new Map(
        categories
          .filter((cat) => cat.id !== 'all')
          .map((cat) => [cat.id, cat.descuento_porcentaje]),
      )
      const items = (productosRes.data ?? []).map((p) => mapProduct(p, categoryDiscountMap))

      set({
        items,
        categories,
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