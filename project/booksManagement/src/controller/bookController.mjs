import { bookModel } from "../models/bookModel.mjs";

let createBook = async (req, res) => {
    try {
        let bookData = req.body
        let book = await bookModel.create(bookData)
        res.send({ message: "success", data: book })
    } catch (err) {
        res.send({ message: 'failed', data: err })
    }
}

export { createBook }