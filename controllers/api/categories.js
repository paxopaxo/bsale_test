const { Category } = require("../../models/relations")


const getCategoriesNames = async(req, res) => {
    let categories = await Category.findAll({
        attributes: {
            exclude: ['id']
        }
    })
    categories = categories.map( obj => obj.name )
    res.json( categories )
}

module.exports = {
    getCategoriesNames
}