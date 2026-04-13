import express from 'express'
import router from './src/route.mjs'
import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://ramverma1493_db_user:Jx8uCloxEh4k3yPi@cluster0.ikpexmv.mongodb.net/day4").then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.log(err)
})


const app = express()
app.use(express.json())

app.use('/', router)

app.listen(8080, () => {
    console.log('listing to port 8080')
})