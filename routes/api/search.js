const { Router } = require('express')
const { check } = require('express-validator')
const { searchFunction } = require('../../controllers/api/search')
const { validarCampos, choicesMiddleware, positiveNumber } = require('../../middleweres')

const router = Router()

// Search an expression either in categories or products

router.get('/:options/:exp',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number... (OPTIONAL)
    check('from','form param should be a integer number.').isInt().optional(),
    check('show','show param should be a integer number.').isInt().optional(),
    // MIDDLEWERE req.params.exp Should be a string (MANDATORY)
    // MIDDLEWERE req.params.options Should be a string (MANDATORY)
    check('exp','exp path variable is mandatory.').notEmpty(),
    check('options','options path variable is mandatory.').notEmpty(),
    validarCampos,
    check('options','options path variable should be a string.').isString(),
    validarCampos,
    choicesMiddleware,
    positiveNumber
], searchFunction )




module.exports = router