const { createClient } = require('redis')
const { REDIS_URI } = require('config')

const client = createClient(REDIS_URI, { retry_strategy: () => 1000 })

client.on('connect', () => {
  console.log('Connected to Redis')
  client.on('error', (error) => console.log('Redis', error))
})

client.on('error', () => console.log("Couldn't connect to Redis"))

module.exports = client
