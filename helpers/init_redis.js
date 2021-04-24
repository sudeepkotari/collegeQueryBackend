const redis = require('redis')

const client = redis.createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  //password: process.env.REDIS_PASSWORD
  })

/*
  default redis port number and localhost
  {
  port: 16877,
  host: 'redis-16877.c263.us-east-1-2.ec2.cloud.redislabs.com',
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
