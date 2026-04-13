import {student} from '../models/studentModel.mjs'

let addStudent = async (req,res) => {
    let data = req.body
    let stdnt = await student.create(data)
    res.send(stdnt)
}

let getStudent = async (req,res) => {
    try{
        let {rollNo} = req.params
        let stdnt = await student.find({rollNo:rollNo})
        if(stdnt.length == 0){
            res.send({message:"ok", data:"student not found"})
        }
        res.send({message:"success", data:stdnt})
    }
    catch(err){
        res.send({message:"failed"})
        console.log(err)
    }
}

export {addStudent, getStudent}