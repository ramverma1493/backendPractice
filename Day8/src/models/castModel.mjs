import mongoose from "mongoose"

let castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: '{VALUE} is not supported'
        }
    },
    networth: {
        type: Number,
    },
    movies: {
        type: Array,
    },
    adress: {
        country: {
            type: String,
        },
        city: {
            type: String,
        }
    },
    height: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const castModel = mongoose.model('cast', castSchema)

export { castModel }