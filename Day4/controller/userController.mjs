import userModel from '../model/userModel.mjs'

let getUsers = async (req,res) =>{
    let data = req.body
    let user = await userModel.create(data)
    res.send(user)
}

export default getUsers