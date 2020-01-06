const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')
const updateService = require('../services/users/currentUserUpdate')

async function update({ user: currentUser, body }, res) {
  const user = await updateService(
    currentUser,
    permittedAttrs(currentUser, body)
  )

  if (!user) {
    res.status(404)
  } else if (user.error) {
    res.status(422)
  } else {
    res.status(200)
  }

  res.send(user)
}

module.exports = { update }

const permittedAttrs = (
  { signInProvider },
  { name, picture, pictureUpload, email, password, language } = {}
) => {
  if (signInProvider === 'local') {
    return pickBy(
      { name, picture, pictureUpload, email, password, language },
      identity
    )
  }

  return pickBy({ name, picture, pictureUpload, language }, identity)
}
