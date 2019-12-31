const restfulApi = require('./restfulApi')
const api = require(`../services/users/api`)
const { pickBy, identity } = require('lodash')

const permittedParams = ({ id } = {}) => pickBy({ id }, identity)

const permittedQuery = ({ page, limit, query, sort } = {}) =>
  pickBy({ page, limit, query, sort }, identity)

const permittedAttrs = ({ email, password, admin } = {}) =>
  pickBy({ email, password, admin }, identity)

module.exports = restfulApi({
  api,
  permittedQuery,
  permittedParams,
  permittedAttrs
})
