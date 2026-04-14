import express from 'express'
import { addProduct, addProducts, readProducts, findById, findByName, updateProduct, updateProductAll, updateById } from './controller/productController.mjs'

const router = express.Router()

router.get('/', (req,res) => {
    res.send('Hello World')
})

router.post('/add', addProduct)
router.post('/addall', addProducts)
router.get('/find', readProducts)
router.get('/product/:id', findById)
router.get('/products/:name', findByName)
router.patch('/update', updateProduct)
router.patch('/updateall', updateProductAll)
router.put('/update/:id', updateById)

export default router