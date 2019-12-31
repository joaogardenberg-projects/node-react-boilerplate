const fs = require('fs')

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? ''
    : process.env.NODE_ENV === 'staging'
    ? ''
    : `http://localhost:${process.env.PORT}/`

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  PASSWORD_PEPPER: process.env.PASSWORD_PEPPER,
  PORT: process.env.PORT,
  REDIS_URI: process.env.REDIS_URI
}

let defaultsFile
let defaults = {}

try {
  defaultsFile = require('yaml').parse(
    fs.readFileSync('../docker-compose.yml', 'utf8')
  )
} catch (e) {}

if (defaultsFile) {
  defaults = defaultsFile.services.backend.environment.reduce((acc, cur) => {
    const [key, value] = cur.split('=')
    return { ...acc, [key]: value }
  }, {})
}

Object.keys(config).forEach((key) => {
  const value = config[key]
  const defaultValue = defaults[key]

  if (!value) {
    if (defaultValue) {
      config[key] = defaultValue
    } else {
      console.log(`[WARNING] There is no ${key} environment variable set!`)
    }
  }
})

module.exports = config
