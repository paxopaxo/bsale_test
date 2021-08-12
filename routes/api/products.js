const { Router } = require('express')
const path = require('path')

const { getProducts } = require('../../controllers/api/products')


const router = Router()

router.get('/', getProducts )



module.exports = router