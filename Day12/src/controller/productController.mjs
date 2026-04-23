import { productModel } from '../models/productModel.mjs'

const addProducts = async (req, res) => {
    try {
        let data = req.body
        const product = await productModel.create(data)
        res.status(201).send({ message: 'Product added successfully', product })
    } catch (error) {
        if (error.message.includes('duplicate')) {
            res.status(400).send({ message: 'Product already exists' })
        } else if (error.message.includes('validation')) {
            res.status(400).send({ message: 'Invalid product data', error })
        } else {
            res.status(500).send({ message: 'Error adding product', error })
        }
    }
}

const getProducts = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        let skip = (page - 1) * limit

        const products = await productModel.aggregate([
            {
                $match: { stock: { $gt: 50 } }
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    title: 1,
                    price: 1,
                    category: 1,
                }
            },
            { $sort: { id: 1 } },
            { $skip: skip },
            { $limit: limit }

        ])
        res.status(200).send({ message: 'Products retrieved successfully', count: products.length, products })
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving products', error })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productModel.findOne({ id })
        if (product) {
            res.status(200).send({ message: 'Product retrieved successfully', product })
        } else {
            res.status(404).send({ message: 'Product not found' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving product', error })
    }
}




export { addProducts, getProducts, getProductById }