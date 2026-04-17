import { reviewModel } from "../models/reviewModel.mjs"
import { bookModel } from "../models/bookModel.mjs"

let addReview = async (req, res) => {
    try {
        let data = req.body
        let bookId = data.bookId

        let book = await bookModel.findById(bookId)

        if (!book || book.isDeleted == true) {
            return res.status(400).send({ status: "fail", message: "no book is present" })
        }

        let review = await reviewModel.create(data)
        book.reviews += 1
        await book.save()

        return res.status(201).send({ status: "success", data: review })
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

let updateReview = async (req, res) => {
    try {
        let { bookId, reviewId } = req.params
        let book = await bookModel.findById(bookId)
        if (!book || book.isDeleted == true) {
            return res.status(400).send({ status: "fail", message: "no book with review is present" })
        }
        let review = await reviewModel.findById(reviewId)
        if (!review) {
            return res.status(400).send({ status: "fail", message: "no review is present" })
        }

        let reviewData = req.body
        let updatedReview = await reviewModel.findByIdAndUpdate(reviewId, reviewData)
        return res.status(200).send({ status: "success", data: updatedReview })
    } catch (err) {
        if (err.message.includes('validation')) {
            return res.status(400).send({ status: "400", message: err.message })
        } else if (err.message.includes('dublicate')) {
            return res.status(400).send({status: "400 2", message: err.message })
        } else {
            return res.status(500).send({status: "500", message: err.message })
        }
    }
}

export { addReview, updateReview }