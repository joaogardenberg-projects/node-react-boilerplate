const mongoose = require('mongoose')
const { MONGODB_URI } = require('config')
const seedUsers = require('services/users/seed')

module.exports = () => {
  mongoose.connect(MONGODB_URI || '', {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  })

  mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB')
    mongoose.connection.on('error', (error) => console.log('MongoDB', error))
  })

  mongoose.connection.on('error', () =>
    console.log("Couldn't connect to MongoDB")
  )

  seedUsers()
}
