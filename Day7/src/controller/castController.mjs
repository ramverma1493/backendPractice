import { castModel } from "../models/castModel.mjs"

let addCast = async (req, res) => {
    try {
        let data = req.body
        let movie = await castModel.create(data)
        res.status(201).send({ message: "success", data: movie })
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

let allCast = async (req, res) => {
    try {
        let cast = await castModel.find()
        res.status(200).send({ message: "success", data: cast })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

let findCast = async (req, res) => {
    try {
        let { id } = req.params
        let cast = await castModel.findById(id)
        res.status(200).send({ message: "success", data: cast })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export { addCast, allCast, findCast }