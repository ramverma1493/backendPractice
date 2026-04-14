import productModel from '../models/productModel.mjs'


//create product
let addProduct = async (req, res) => {
    try {
        let data = req.body
        let product = await productModel.create(data)
        res.send({ message: "success", data: product })
    } catch (err) {
        res.send({ message: "error", data: err })
    }
}

let addProducts = async (req, res) => {
    try {
        let datas = req.body
        let products = await productModel.insertMany(datas)
        res.send({ message: "success all products", data: products })
    } catch (err) {
        res.send({ message: "error", data: err })
    }
}

//read products
let readProducts = async (req, res) => {
    try {
        let { minPrice } = req.query
        let readProducts = await productModel.find({ price: { $gte: minPrice } })
        res.send({ message: "Find all", data: readProducts })
    } catch (err) {
        res.send({ message: "error", data: err })
    }
}

let findById = async (req, res) => {
    try {
        let { id } = req.params
        let idProduct = await productModel.findById(id)
        res.send({ message: "success", data: idProduct })
    } catch (err) {
        res.send({ message: "error", data: err })
    }
}

let findByName = async (req, res) => {
    try {
        let { name } = req.params
        let nameProduct = await productModel.findOne({ name: name })
        res.send({ message: "success", data: nameProduct })
    } catch (err) {
        res.send({ message: "error", data: err })
    }
}

//update product

let updateProduct = async (req, res) => {
    try {
        let { id, price } = req.body
        let updatedProduct = await productModel.updateOne({ _id: id }, { $set: { price: price } })
        res.send({ message: "success", data: updatedProduct })
    } catch (err) {
        res.send({ message: "error", data: err })
    }
}

let updateProductAll = async (req, res) => {
    try {
        let { category, description } = req.body
        let updatedProduct = await productModel.updateMany({ category: category }, { $set: { description: description } })
        res.send({ message: "success", data: updatedProduct })
    } catch (err) {
        res.send({ message: "error", data: err })
    }
}

let updateById = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedId = await productModel.findByIdAndUpdate(id, data)
        res.send({ message: "success", data: updatedId })
    } catch (err) {
        res.send({ message: "error", data: err })
    }
}

export { addProduct, addProducts, readProducts, findById, 
    findByName, updateProduct, updateProductAll, updateById }
