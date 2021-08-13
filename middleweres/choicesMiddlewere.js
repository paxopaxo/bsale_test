const choicesMiddlewere = (req, res, next) => {
    const availableOptions = ['categories','products']
    const { options } = req.params
    const trimOptions = options.trim().toLowerCase()
    
    console.log(trimOptions)

    if( !availableOptions.includes(trimOptions) ) {
        return res.status(400).json({ errors: [ {msg: 'exp path variable only can have two String values: categories and products.'}]})
    }
    next()

}

module.exports =  { choicesMiddlewere }