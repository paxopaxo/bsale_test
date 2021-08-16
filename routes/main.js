const { Router } = require('express')
const path = require('path')


const router = Router()

router.get('/cats', (req,res) => {
    res.sendFile( path.join( __dirname ,'../public/cats.html' ) )
})



module.exports = router