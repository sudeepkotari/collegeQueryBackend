const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const { verifyAccessToken } = require('./helpers/jwt_helper')
require('./helpers/init_redis')

const AuthRoute = require('./Routes/Auth.route')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', verifyAccessToken, async (req, res, next) => {
  res.send({"success": true })
})

app.use('/auth', AuthRoute)

/*
  handles error when try to access not defined routes
*/
app.use(async (req, res, next) => {
  next(createError.NotFound())
})


/*
  handles all errors created in next()
*/
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
