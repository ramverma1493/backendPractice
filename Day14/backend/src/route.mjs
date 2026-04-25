import express from "express"
import {registerUser, loginUser, getUserProfile, updateUserProfile} from './controller/userController.mjs'
import { authenticateToken, authorizeToken } from './auth/authentication.mjs'
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello World!")
})

router.post("/register", registerUser)
router.post("/login", loginUser)

//here we are using the authenticateToken middleware to protect the profile routes. 
// Only authenticated users with a valid JWT token will be able to access these routes.
router.get("/profile/:id", authenticateToken, getUserProfile)
router.put("/profile/:id", authenticateToken, authorizeToken, updateUserProfile)

export default router