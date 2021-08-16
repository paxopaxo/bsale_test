const { Router } = require('express')
const { check } = require('express-validator')
const { searchFunction } = require('../../controllers/api/search')
const { validarCampos, choicesMiddlewere, positiveNumber } = require('../../middleweres')

const router = Router()

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
    choicesMiddlewere,
    positiveNumber
], searchFunction )




module.exports = router