import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    rating:Number,
    description:String,
    reviews:[String]
},{timestamps:true})

const productModel = mongoose.model('product', productSchema)

export default productModel