import express from 'express'
import mongoose from 'mongoose'
import { uri, PORT } from './config.mjs'
import router from './src/route.mjs'

mongoose.connect(uri).then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(express.json())

app.use('/', router)

app.listen(PORT, () => {
    console.log(`listing to port ${PORT}`)
})