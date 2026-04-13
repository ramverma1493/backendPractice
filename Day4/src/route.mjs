import express from 'express'
import getUsers from '../controller/userController.mjs'

let router = express.Router()

router.get('/', (req,res) => {
    res.send('Hello world')
})

router.post('/add',getUsers)

export default router