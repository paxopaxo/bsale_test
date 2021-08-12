const { Router } = require('express')
const path = require('path')
const { } = require('../controllers/main')


const router = Router()

router.get('/test', (req,res) => {
    res.sendFile( path.join(__dirname,'../public/index.html' ) )
})



module.exports = router