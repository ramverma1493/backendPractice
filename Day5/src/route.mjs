import express from 'express'
import { addStudent, getStudent } from './controller/studentController.mjs'

const router = express.Router()

router.get('/api', (req, res) => {
    res.send('Hello world route')
})

router.post('/add', addStudent)
router.get('/student/:rollNo', getStudent)

export default router