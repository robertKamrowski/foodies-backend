const errorHandler = ({message, stack}, req, res, next) => {
  const statusCode = res.statusCode ?? 500

  res.status(statusCode)
  res.json({
    message,
    stack: process.env.NODE_ENV !== 'production' ? stack : null
  })
}

module.exports = {
  errorHandler
}