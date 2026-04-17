import { userModel } from "../models/userModel.mjs";

let createUser = async (req, res) => {
    try {
        let userData = req.body
        let user = await userModel.create(userData)
        res.status(201).send({ message: "success", data: user })
    } catch (err) {
        if (err.message.includes('validation')) {
            return res.status(400).send({ message: err.message })
        } else if (err.message.includes('dublicate')) {
            return res.status(400).send({ message: err.message })
        } else {
            return res.status(500).send({ message: err.message })
        }
    }
}

let userLogin = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await userModel.findOne({ email: email, password: password })
        if (user.length == 0) {
            res.status(400).send({status:"yehai hai na", message: "wrong credentials" })
        }
        res.status(201).send({ message: "success", data: user })
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export { createUser, userLogin }