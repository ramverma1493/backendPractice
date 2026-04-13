import productModel from '../models/productModel.mjs'

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

let readProducts = async (req, res) => {
    try {
        let {minPrice} = req.query
        let readProducts = await productModel.find({price:{$gte:minPrice}})
        res.send({ message: "Find all", data: readProducts })
    } catch (err) {
        res.send({ message: "error", data: err })
    }
}

let findById = (req,res) => {
    try{
        let {id} = req.params
    let idProduct= productModel.findById(id)
    res.send({message:"success",data:idProduct})
    }catch(err){
        res.send({message:"error",data:err})
    }
}

export { addProduct, addProducts, readProducts, findById }
