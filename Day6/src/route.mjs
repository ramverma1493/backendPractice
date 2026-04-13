import express from 'express'
import { addProduct } from './controller/productController.mjs'

const router = express.Router()

router.get('/', (req,res) => {
    res.send('Hello World')
})

router.post('/add', addProduct)

export default router