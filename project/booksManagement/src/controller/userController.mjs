import { userModel } from "../models/userModel.mjs";

let createUser = async (req, res) => {
    try {
        let userData = req.body
        let user = await userModel.create(userData)
        res.send({ message: "success", data: user })
    } catch (err) {
        res.send({ message: 'failed', data: err })
    }
}

export { createUser }