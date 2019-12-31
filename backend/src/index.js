const express = require('express')
const { PORT } = require('./config')
const addMiddlewares = require('./middlewares')
const mongoConnect = require('./models/mongo')
const addRoutes = require('./routes')

const app = express()

addMiddlewares(app)
mongoConnect()
addRoutes(app)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
