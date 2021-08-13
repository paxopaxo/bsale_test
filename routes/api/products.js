const { Router } = require('express')
const path = require('path')

const { getAllProducts, getAllByCategory, getAllProductsWithDiscount } = require('../../controllers/api/products')


const router = Router()

router.get('/',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number...
], getAllProducts )

router.get('/cat/:id',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number...
    // MIDDLEWERE req.params.id must be a number...
], getAllByCategory )

router.get('/discount',[
    // MIDDLEWERE req.query.form and req.query.show Should be a number...
], getAllProductsWithDiscount )



module.exports = router