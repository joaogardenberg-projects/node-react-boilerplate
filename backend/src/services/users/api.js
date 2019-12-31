const restfulApi = require('../restfulApi/api')
const User = require('../../models/mongo/user')
const sanitize = require('./sanitize')

module.exports = restfulApi({
  Model: User,
  query: ({ id }) => ({ _id: id }),
  sanitize
})
