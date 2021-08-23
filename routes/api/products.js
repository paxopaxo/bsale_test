const { Router } = require('express')
const { check } = require('express-validator')

const { getAllProducts, getAllByCategory, getAllProductsWithDiscount } = require('../../controllers/api/products')
const { validarCampos, positiveNumber } = require('../../middleweres')


const router = Router()

// Get all products

router.get('/',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number...(OPTIONAL)
    check('from','form param should be a integer number.').isInt().optional(),
    check('show','show param should be a integer number.').isInt().optional(),
    validarCampos,
    positiveNumber
], getAllProducts )

// Gets a category filtered by its name

router.get('/cat/:cat',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number...(OPTIONAL)
    check('from','form param should be a integer number.').isInt().optional(),
    check('show','show param should be a number.').isInt().optional(),
    // MIDDLEWERE req.params.id must be a number...(MANDATORY)
    check('cat','cat path variable is mandatory.').notEmpty(),
    validarCampos,
    positiveNumber
], getAllByCategory )

// Get all categories which are actually on discount

router.get('/discount',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number...(OPTIONAL)
    check('from','form param should be a integer number.').isInt().optional(),
    check('show','show param should be a integer number.').isInt().optional(),
    validarCampos,
    positiveNumber
], getAllProductsWithDiscount )



module.exports = router