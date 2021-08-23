const { validationResult } = require('express-validator')

// Function that catches all express-validator errors 

const validarCampos = (req, res, next) => { 
    const errors = validationResult(req) 

    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()
}


module.exports = { validarCampos }
