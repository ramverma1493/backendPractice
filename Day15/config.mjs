import dotenv from 'dotenv'

dotenv.config()

let config = {
    uri: process.env.MongoDb,
    Port: process.env.PORT,
    redisUserName: process.env.redisUserName,
    redisPassword: process.env.redisPassword,
    redisHost: process.env.redisHost,
    redisPort: process.env.redisPort
}

export { config }