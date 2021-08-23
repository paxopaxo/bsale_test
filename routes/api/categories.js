const { Router } = require('express')
const { getCategoriesNames } = require('../../controllers/api/categories')

const router = Router()

// Get all categories  
router.get('/', getCategoriesNames )

module.exports = router