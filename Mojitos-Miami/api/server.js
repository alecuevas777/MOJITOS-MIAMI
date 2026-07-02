import app from './src/app.js'
import env from './src/config/env.js'
import { testConnection } from './src/config/database.js'

async function startServer() {
  try {
    await testConnection()
    console.log(`✓ Base de datos "${env.db.database}" conectada`)

    app.listen(env.port, () => {
      console.log(`✓ API escuchando en http://localhost:${env.port}`)
      console.log(`✓ Health check: http://localhost:${env.port}/api/health`)
    })
  } catch (error) {
    console.error('✗ No se pudo conectar a la base de datos:', error.message)
    process.exit(1)
  }
}

startServer()
