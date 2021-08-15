const { Router } = require('express')
const path = require('path')


const router = Router()

router.get('/', (req,res) => {
    res.redirect('/page1')
})



module.exports = router