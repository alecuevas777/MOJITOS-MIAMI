import pool from '../config/database.js'

const CATEGORY_COLUMNS = `
  id_categoria,
  nom_categoria,
  descripcion,
  categoria,
  descuento_porcentaje
`

export async function findAllCategories() {
  const [rows] = await pool.query(
    `SELECT ${CATEGORY_COLUMNS}
     FROM categoria
     ORDER BY id_categoria ASC`,
  )

  return rows
}
