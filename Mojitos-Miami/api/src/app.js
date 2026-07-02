import express from 'express'
import cors from 'cors'
import env from './config/env.js'
import routes from './routes/index.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Mojitos Miami API',
    version: '1.0.0',
  })
})

app.use('/api', routes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
