module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Not logged in' })
  }

  if (!req.user.admin) {
    return res.status(401).send({ error: 'Not an admin' })
  }

  next()
}
