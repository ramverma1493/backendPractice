import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    emial:String,
    password:String,
    phone:String,
    age:Number
})

let user = mongoose.model('user',userSchema)

export default user