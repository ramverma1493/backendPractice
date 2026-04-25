import express from "express"
import { createPost, getPostMongo, getPost } from "./controller/postController.mjs"

const router = express.Router()

router.get("/api", (req, res) => {
    res.send("Hello World!")
})

router.post('/post', createPost)
router.get('/post/mongo', getPostMongo)
router.get('/post', getPost)



export default router