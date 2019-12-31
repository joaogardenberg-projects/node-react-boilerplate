module.exports = (req) => {
  req.logout()
  return { user: {} }
}
