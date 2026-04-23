import express from 'express'
import { addProducts, getProducts, getProductById } from './controller/productController.mjs'

const router = express.Router()

router.get('/api', (req, res) => {
    res.status(200).send({ message: 'OK' })
})

router.post('/addproduct', addProducts)
router.get('/products', getProducts)
router.get('/products/:id', getProductById)

export default router