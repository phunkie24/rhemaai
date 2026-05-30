export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate entry detected.',
      field: Object.keys(err.keyValue)[0],
    })
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ message: 'Validation failed', errors })
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err)
    return res.status(statusCode).json({
      message: err.message,
      stack: err.stack,
    })
  }

  return res.status(statusCode).json({
    message: statusCode === 500 ? 'Internal server error' : err.message,
  })
}
