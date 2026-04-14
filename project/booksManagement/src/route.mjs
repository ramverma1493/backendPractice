import express from 'express'
import { createUser } from './controller/userController.mjs'
import { createBook } from './controller/bookController.mjs'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World Two')
})

router.post('/createuser', createUser)
router.post('/createbook', createBook)

export default router