const { Router } = require('express')
const { check } = require('express-validator')

const { getAllProducts, getAllByCategory, getAllProductsWithDiscount } = require('../../controllers/api/products')
const { validarCampos } = require('../../middleweres')


const router = Router()

router.get('/',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number...(OPTIONAL)
    check('from','form param should be a number.').isNumeric().optional(),
    check('show','show param should be a number.').isNumeric().optional(),
    validarCampos
], getAllProducts )

router.get('/cat/:id',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number...(OPTIONAL)
    check('from','form param should be a number.').isNumeric().optional(),
    check('show','show param should be a number.').isNumeric().optional(),
    // MIDDLEWERE req.params.id must be a number...(MANDATORY)
    check('id','id path variable is mandatory.').notEmpty(),
    validarCampos,
    check('id','id path variable should be a number.').isNumeric(),
    validarCampos
], getAllByCategory )

router.get('/discount',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number...(OPTIONAL)
    check('from','form param should be a number.').isNumeric().optional(),
    check('show','show param should be a number.').isNumeric().optional(),
    validarCampos,
], getAllProductsWithDiscount )



module.exports = router