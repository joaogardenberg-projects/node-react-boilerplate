const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')
const restfulApi = require('./restfulApi')
const api = require(`../services/users/api`)

const permittedParams = ({ id } = {}) => pickBy({ id }, identity)

const permittedQuery = ({ page, limit, query, sort } = {}) =>
  pickBy({ page, limit, query, sort }, identity)

const permittedAttrs = ({
  name,
  picture,
  pictureUpload,
  email,
  password,
  googleId,
  facebookId,
  oAuthEmail,
  signInProvider,
  admin
} = {}) =>
  pickBy(
    {
      name,
      picture,
      pictureUpload,
      email,
      password,
      googleId,
      facebookId,
      oAuthEmail,
      signInProvider,
      admin
    },
    identity
  )

module.exports = restfulApi({
  api,
  permittedQuery,
  permittedParams,
  permittedAttrs
})
