import * as categoriaModel from '../models/categoriaModel.js'
import * as productoModel from '../models/productoModel.js'
import { buildMenuPayload } from '../utils/menuMapper.js'

export async function getMenu(_req, res, next) {
  try {
    const [categories, products] = await Promise.all([
      categoriaModel.findAllCategories(),
      productoModel.findAllProductsWithCategory(),
    ])

    res.set('Cache-Control', 'public, max-age=60')
    res.json(buildMenuPayload(categories, products))
  } catch (error) {
    next(error)
  }
}
