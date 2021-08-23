const { Router } = require('express')
const { getCategoriesNames } = require('../../controllers/api/categories')

const router = Router()

router.get('/', getCategoriesNames )

module.exports = router