//import express
//const express = require('express')
//const route = require('./src/route.mjs')
import express from 'express'
import route from './src/route.mjs'

//instance of express
const app = express()
// read golobla data
app.use(express.json())
//moving all request to roye file
app.use('/',route)
//making server
app.listen(8090,() => {
    console.log('listing to port 8090')
})
