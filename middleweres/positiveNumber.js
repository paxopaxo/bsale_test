
// Middleware which is used to check if pagination params are positive  (It cannot be negative, that will deliver SQL error)

const positiveNumber = (req, res, next) => {
    const { from = 1 , show = 1 } = req.query 
    // If params are undefined default values would be 1 and 1 with the porpuse of passsing the middlewere succesfully ( FROM AND SHOW ARE OPTIONAL )

    if( from < 0 || show < 0 ) {
        return res.status(400).json({ errors: [ {msg: 'form and show params should be higher than 0'}]})
    }
    next()

}

module.exports = {
    positiveNumber
}