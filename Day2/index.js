const express = require('express')
const router = require('./src/route.js')

//making an app
//creaeting app instance
const app = express()


//crate server
// app.use('/',async (req,res) => {
//     res.send("Hello world this is my new app")
// })

//reading request
app.use(express.json())

//creating serves using router

app.use('/', router)

app.listen(8080,()=>{
    console.log('Listing to port 8080')
})