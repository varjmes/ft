require('dotenv-safe').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const expressPino = require('express-pino-logger')
const sassMiddleware = require('node-sass-middleware')

const logger = require('./helpers/logger')
const httpsRedirect = require('./helpers/httpsRedirect')
const indexRouter = require('./routes/index')

const app = express()
const port = process.env.PORT || 3000

// Set caching on views to a day
app.set('views', path.join(__dirname, 'views'), { maxAge: 86400000 })
app.set('view engine', 'pug')

if (process.env.NODE_ENV !== 'test') {
  app.use(expressPino({ logger }))
}

// Parsing incoming requests into JSON and makes it available as `req.body`
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(httpsRedirect)

app.use('/', indexRouter)

app.use((req, res, next) => {
  next(createError(404))
})

// Custom error handler
app.use((err, req, res, next) => {
  // Set local message scoped to the request in question
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    logger.info(`:) jmes' ft app listening on port ${port}!`)
  }
})

module.exports = app
