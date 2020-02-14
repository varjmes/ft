const Pino = require('pino')

const options = {
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: process.env.NODE_ENV !== 'production',
  name: process.env.npm_package_name,
}

const logger = new Pino(options)

module.exports = logger
