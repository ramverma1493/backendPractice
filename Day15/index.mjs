import express from 'express'
import mongoose from 'mongoose'
import { config } from './config.mjs'
import router from './src/route.mjs'


// client.on('error', err => console.log('Redis Client Error', err))

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

mongoose.connect(config.uri).then(() => { 
    console.log('Connect to MongoDB')
}).catch((err) => {
    console.error("Error connecting to MongoDB", err)
})

const app = express()
app.use(express.json())

app.use('/', router)

app.listen(config.Port, () => {
    console.log(`Server is running on port ${config.Port}`)
})