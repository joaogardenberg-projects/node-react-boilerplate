const validation = require('./validations/image')
const Schema = require('./schema')

const ImageSchema = Schema({
  url: {
    ...validation.url,
    type: String
  },
  alt: {
    ...validation.alt,
    type: String
  }
})

module.exports = ImageSchema
