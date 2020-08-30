const { BASE_FRONTEND_URL } = require('config')

module.exports = (app) => {
  app.get('*', ({ url }, res) => res.redirect(`${BASE_FRONTEND_URL}${url}`))
}
