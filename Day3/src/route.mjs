//const router = require('express').Router()
import express from 'express'
import {getCountry, addCountry} from './controller/country.mjs'

const router = express.Router()


router.get('/:country', getCountry)
router.post('/add', addCountry)

export default router