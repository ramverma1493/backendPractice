import express from 'express'
import { addProduct, addProducts, readProducts, findById } from './controller/productController.mjs'

const router = express.Router()

router.get('/', (req,res) => {
    res.send('Hello World')
})

router.post('/add', addProduct)
router.post('/addall', addProducts)
router.get('/find', readProducts)
router.get('/product/:id', findById)

export default router