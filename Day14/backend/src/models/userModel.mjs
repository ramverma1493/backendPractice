import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    dob: {
        type: Date,
        required: [true, "Date of Birth is required"]
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: [true, "Gender is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{ timestamps: true });

const userModel = mongoose.model("User", userSchema);
export { userModel };