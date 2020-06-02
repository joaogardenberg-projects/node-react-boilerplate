const User = require('models/mongo/user')

module.exports = async () => {
  if (!(await User.countDocuments({}))) {
    await new User({
      name: 'Initial User',
      email: 'initial@user.com',
      password: 'initial',
      admin: true
    }).save()
  }
}
