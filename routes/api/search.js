const { Router } = require('express')
const { searchFunction } = require('../../controllers/api/search')

const router = Router()

router.get('/:options/:exp',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number... (OPTIONAL)
    // MIDDLEWERE req.params.exp Should be a string (MANDATORY)
    // MIDDLEWERE req.params.options Should be a string (MANDATORY)
], searchFunction )




module.exports = router