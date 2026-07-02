const CATEGORY_ICONS = {
  promociones: 'star',
  mojitos: 'leaf',
  cocteles: 'flask',
  'sin-alcohol': 'drop',
  combos: 'grid',
}

function buildDiscountLabel(product, categoryDiscount) {
  if (product.descuento_porcentaje != null) {
    const value = Number(product.descuento_porcentaje)
    return value % 1 === 0 ? `-${value}%` : `-${value.toFixed(0)}%`
  }

  if (/2\s*x\s*1|2x1/i.test(product.nom_producto)) {
    return '2X1'
  }

  if (categoryDiscount != null && product.categoria_slug === 'promociones') {
    const value = Number(categoryDiscount)
    return value % 1 === 0 ? `-${value}%` : `-${value.toFixed(0)}%`
  }

  if (product.stock_disponible != null && product.aviso_stock_desde != null) {
    if (product.stock_disponible <= product.aviso_stock_desde) {
      return 'POCAS UNIDADES'
    }
  }

  return null
}

export function mapCategoryRow(row) {
  return {
    id: row.categoria,
    name: row.nom_categoria,
    icon: CATEGORY_ICONS[row.categoria] ?? 'grid',
  }
}

export function mapProductRow(row) {
  const discountLabel = buildDiscountLabel(row, row.categoria_descuento)

  return {
    id: row.id_producto,
    name: row.nom_producto,
    description: row.descripcion_producto,
    price: Number(row.precio_producto),
    category: row.categoria_slug,
    image: row.img_prod,
    ...(discountLabel ? { discountLabel } : {}),
    presentation: row.presentacion,
    details: row.detalles,
    characteristics:
      typeof row.caracteristicas === 'string'
        ? JSON.parse(row.caracteristicas)
        : row.caracteristicas,
  }
}

export function buildMenuPayload(categories, products) {
  return {
    success: true,
    categories: [{ id: 'all', name: 'Todos', icon: 'grid' }, ...categories.map(mapCategoryRow)],
    items: products.map(mapProductRow),
  }
}
