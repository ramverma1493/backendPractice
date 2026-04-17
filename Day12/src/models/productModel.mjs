import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, },
    comment: { type: String, required: true, },
    date: { type: Date, required: true, },
    reviewerName: { type: String, required: true, },
    reviewerEmail: { type: String, required: true, },
})

const dimensionsSchema = new mongoose.Schema({
    width: { type: Number, required: true, },
    height: { type: Number, required: true, },
    depth: { type: Number, required: true, },
})

const metaSchema = new mongoose.Schema({
    createdAt: { type: Date, required: true, },
    updatedAt: { type: Date, required: true, },
    barcode: { type: String, required: false, },
    qrCode: { type: String, required: false, },
})

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true, },
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    category: { type: String, required: true, },
    price: { type: Number, required: true, },
    discountPercentage: { type: Number, required: false, },
    rating: { type: Number, required: false, },
    stock: { type: Number, required: false, },
    tags: { type: [String], required: false, default: [], },
    brand: { type: String, required: false, },
    sku: { type: String, required: false, },
    weight: { type: Number, required: false, },
    dimensions: { type: dimensionsSchema, required: false, },
    warrantyInformation: { type: String, required: false, },
    shippingInformation: { type: String, required: false, },
    availabilityStatus: { type: String, required: false, },
    reviews: { type: [reviewSchema], required: false, default: [], },
    returnPolicy: { type: String, required: false, },
    minimumOrderQuantity: { type: Number, required: false, },
    meta: { type: metaSchema, required: false, },
    thumbnail: { type: String, required: false, },
    images: { type: [String], required: false, default: [], },
})

const productModel = mongoose.model('Product', productSchema)
export { productModel }