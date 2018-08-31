const initdb = require('./tools/initdb')
const logger = require('@xsy-customize/logger')

logger.mark('start to start up via app.js...')

initdb.then(() => {
  require('./server')
}, err => {
  logger.error(err)
  throw new Error(err)
})
