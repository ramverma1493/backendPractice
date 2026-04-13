import mongoose from "mongoose"

let studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    courses:[String],
    pasword:String,
    dob:Date,
    phone:String,
    placed:Boolean,
    rollNo:Number,
    rank:Number,
    backlog:Boolean,
    university:String,
    college:String,
    Adress:{
        city:String,
        state:String,
        pincode:Number
    }
},{timestamps:true})

const student = mongoose.model('student', studentSchema)

export {student}