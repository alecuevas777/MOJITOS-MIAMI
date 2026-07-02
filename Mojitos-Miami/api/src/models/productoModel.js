import pool from '../config/database.js'

const PRODUCT_COLUMNS = `
  p.id_producto,
  p.nom_producto,
  p.precio_producto,
  p.descuento_porcentaje,
  p.stock_disponible,
  p.aviso_stock_desde,
  p.descripcion_producto,
  p.img_prod,
  p.presentacion,
  p.detalles,
  p.caracteristicas,
  c.categoria AS categoria_slug,
  c.descuento_porcentaje AS categoria_descuento
`

export async function findAllProductsWithCategory() {
  const [rows] = await pool.query(
    `SELECT ${PRODUCT_COLUMNS}
     FROM producto p
     INNER JOIN categoria c ON c.id_categoria = p.categoria_id
     ORDER BY p.id_producto ASC`,
  )

  return rows
}
