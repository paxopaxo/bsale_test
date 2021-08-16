const { Router } = require('express')
const path = require('path')


const router = Router()

router.get('/cats', (req,res) => {
    res.sendFile( path.join( __dirname ,'../public/cats.html' ) )
})
router.get('/results', (req,res) => {
    res.sendFile( path.join( __dirname ,'../public/results.html' ) )
})
router.get('/favicon.ico', (req,res) => {
    res.redirect('https://static.vecteezy.com/system/resources/previews/002/133/765/original/alcohol-bottle-rgb-color-icon-vector.jpg')
})

router.get('/404', (req,res) => {
    res.sendFile( path.join( __dirname ,'../public/404.html' ) )
})


module.exports = router