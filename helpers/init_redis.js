const redis = require('redis')

const client = redis.createClient(process.env.REDIS_URL)

/*
  default redis port number and localhost
  {
  port: 6379,
  host: '127.0.0.1',
  }
  process.env.REDIS_URL is specifically for heroku server deployment
*/

client.on('connect', () => {
  console.log('Client connected to redis...')
})

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...')
})

client.on('error', (err) => {
  console.log(err.message)
})

client.on('end', () => {
  console.log('Client disconnected from redis')
})

process.on('SIGINT', () => {
  client.quit()
})

module.exports = client
