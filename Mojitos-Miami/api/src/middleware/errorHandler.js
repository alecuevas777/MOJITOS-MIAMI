export function notFoundHandler(_req, res) {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  })
}

export function errorHandler(err, _req, res, _next) {
  console.error('[API Error]', err)

  const status = err.status || 500
  const message =
    err.expose || process.env.NODE_ENV === 'development'
      ? err.message
      : 'Error interno del servidor'

  res.status(status).json({
    success: false,
    message,
  })
}
