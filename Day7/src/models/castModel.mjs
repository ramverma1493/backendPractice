import mongoose from "mongoose"

let castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid name`
        }
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['male', 'female', 'other'],
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