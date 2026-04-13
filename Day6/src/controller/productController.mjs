import productModel from '../models/productModel.mjs'

let addProduct = async (req,res) => {
    try{
        let data = req.body
    let product = await productModel.create(data)
    res.send({message:"success", data:product})
    }catch(err){
        res.send({message:"error", data:err})
    }
}

export {addProduct}
