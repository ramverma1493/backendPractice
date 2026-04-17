import express from 'express'
import { createUser, userLogin } from './controller/userController.mjs'
import { createBook, getallBooks } from './controller/bookController.mjs'
import { addReview, updateReview } from './controller/reviewController.mjs'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World Two')
})

router.post('/createuser', createUser)
router.post('/createbook', createBook)

router.post('/login', userLogin)

router.get('/books', getallBooks)

router.post('/books/:bookId/review', addReview)

router.put('/books/:bookId/review/:reviewId', updateReview)

export default router