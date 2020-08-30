const User = require('models/mongo/user')

module.exports = async () => {
  if (!(await User.countDocuments({}))) {
    console.log('No users found in the db. Creating initial user...')

    await new User({
      name: 'Initial User',
      email: 'initial@user.com',
      password: 'initial',
      admin: true
    }).save()
  }
}
