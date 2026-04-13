import express from 'express'
import route from './src/route.mjs'
import mongoose from 'mongoose'
import { uri, PORT} from './config.mjs'

let app = express()
app.use(express.json())
mongoose.connect(uri).then(() => {
    console.log('connected to dataBase')
}).catch((err) => {
    console.log(err)
})

app.use('/', route)
app.listen(PORT, () => {
    console.log(`listing to port ${PORT}`)
})