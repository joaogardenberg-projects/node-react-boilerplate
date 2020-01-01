const { URL_REGEX } = require('../../../config/regex')

module.exports = {
  url: {
    required: [true, 'Url obrigatória'],
    match: [URL_REGEX, 'Url inválida']
  }
}
