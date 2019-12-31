const User = require('../../models/mongo/user')

module.exports = async () => {
  if (!(await User.countDocuments({}))) {
    await new User({
      email: 'initial@user.com',
      password: 'initial',
      loginProvider: 'local',
      admin: true
    }).save()
  }
}
