import { bookModel } from "../models/bookModel.mjs";
import { userModel } from "../models/userModel.mjs";

let createBook = async (req, res) => {
    try {
        let bookData = req.body
        let userId = bookData.userId

        if (! await userModel.findById(userId)) {
            return res.status(400).send({ message: "no user is present" })
        }

        let book = await bookModel.create(bookData)
        return res.status(201).send({ message: "success", data: book })
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

let getallBooks = async (req, res) => {
    try {
        let books = await bookModel.find({ isDeleted: false })
        let { userId, category, subcategory } = req.query
        if (userId) {
            books = books.filter(book => book.userId == userId)
        }
        if (category) {
            books = books.filter(book => book.category == category)
        }
        if (subcategory) {
            books = books.filter(book => book.subcategory == subcategory)
        }

        if (books.length == 0) {
            return res.status(400).send({ message: "no books are present" })
        }
        books.sort((a, b) => a.title.localeCompare(b.title))

        return res.status(200).send({ message: "all books", data: books })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

export { createBook, getallBooks }