import { Router } from 'express'
import { testConnection } from '../config/database.js'
import menuRoutes from './menuRoutes.js'

const router = Router()

router.use(menuRoutes)

router.get('/health', async (_req, res, next) => {
  try {
    await testConnection()
    res.json({
      success: true,
      message: 'API y base de datos conectadas',
      database: 'mojitos-miami',
    })
  } catch (error) {
    next(error)
  }
})

export default router
