import { movieModel } from "../models/movieModel.mjs"

let addMovie = async (req, res) => {
    try {
        let data = req.body
        let movie = await movieModel.create(data)
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

let allMovies = async (req, res) => {
    try {
        let movies = await movieModel.find()
        res.status(200).send({ message: "success", data: movies })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

let findMovie = async (req, res) => {
    try {
        let { id } = req.params
        let movies = await movieModel.findbyId(id)
        res.status(200).send({ message: "success", data: movies })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export { addMovie, allMovies, findMovie }