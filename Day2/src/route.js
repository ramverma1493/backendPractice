const router = require('express').Router();

//creating route
router.get('/', (req, res) => {
    console.log(req.body)
    res.send("Hello this is home")
})

router.get('/india', (req, res) => {
    res.send("Hello this is India")
})

router.get('/world', (req, res) => {
    res.send("Hello this is world")
})

module.exports = router;