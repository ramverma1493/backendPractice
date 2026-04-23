import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, },
    comment: { type: String, required: true, },
    date: { type: Date, required: true, },
    reviewerName: { type: String, required: true, },
    reviewerEmail: { type: String, required: true, },
},{_id: false})

const dimensionsSchema = new mongoose.Schema({
    width: { type: Number, required: true, },
    height: { type: Number, required: true, },
    depth: { type: Number, required: true, },
},{_id: false})

const metaSchema = new mongoose.Schema({
    createdAt: { type: Date, required: true, },
    updatedAt: { type: Date, required: true, },
    barcode: String,
    qrCode: String,
},{_id: false})

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    discountPercentage: Number,
    rating: Number,
    stock: Number,

    tags: {
        type: [String],
        default: []
    },

    brand: String,
    sku: String,
    weight: Number,
    dimensions: dimensionsSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,

    reviews: {
        type: [reviewSchema],
        default: []
    },

    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: metaSchema,
    thumbnail: String,
    
    images: {
        type: [String],
        default: []
    },
})

productSchema.pre('findOneAndUpdate', function(next){
    this.set({ 'meta.updatedAt': new Date() })
    next()
})

const productModel = mongoose.model('Product', productSchema)
export { productModel }