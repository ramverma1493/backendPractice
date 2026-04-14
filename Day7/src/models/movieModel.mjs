import mongoose from "mongoose"

let movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        default: Date.now,
        required: true
    },
    cast: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cast',
        required: true
    },
    category: {
        type: String,
        enum: ['comedy', 'action', 'thriller', 'drama', 'romance', 'horror'],
        required: true
    },
    revenue: Number,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const movieModel = mongoose.model('movie', movieSchema)

export { movieModel }