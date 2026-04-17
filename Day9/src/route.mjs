import express from 'express'
import { addMovie, allMovies, findMovie } from './controller/movieController.mjs'
import { addCast, allCast, findCast } from './controller/castController.mjs'

const router = express.Router()

router.get('/api', (req,res) => {
    res.status(200).send({message:'OK'})
})

router.post('/addmovie', addMovie)
router.get('/movies', allMovies)
router.get('/movies/:id',findMovie)

router.post('/addcast', addCast)
router.get('/casts', allCast)
router.get('/casts/:id', findCast)

export default router