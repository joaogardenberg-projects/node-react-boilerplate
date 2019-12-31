const bodyParser = require('body-parser')
const passport = require('passport')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
// const { COOKIE_KEY } = require('../config')
require('./passport')

module.exports = (app) => {
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('combined'))
  app.use(passport.initialize())
}
