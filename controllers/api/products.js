const { Op } = require('sequelize')
const { Product, Category } = require("../../models/relations")

const getAllProducts = async (req, res) => {
    const { from = 0, show = 10 } = req.query

    const product = await Product.findAll({
        attributes: {
            exclude: ['id','category']
        },
        offset: Number(from),
        limit: Number(show),
    })

    res.json({ product })
}
const getAllByCategory = async (req, res) => {

    const { from = 0, show = 10 } = req.query
    const { cat } = req.params
    
    const product = await Product.findAll({
        attributes: {
            exclude: ['category','id']
        },
        include: {
            model: Category,
            as: "categoria",
            attributes: {
                exclude: ['id']
            }
        },
        where: {
            '$categoria.name$': cat
        },
        offset: Number(from),
        limit: Number(show),
    })

    res.json({ product })
}
const getAllProductsWithDiscount = async(req, res) => {
    const { from = 0, show = 10 } = req.query
    
    const product = await Product.findAll({
        attributes: {
            exclude: ['id','category']
        },
        where: {
            discount: {
                [Op.gt]: 0,
            }
        },
        order: [['discount','DESC']],
        offset: Number(from),
        limit: Number(show),
    })

    res.json({ product })
}

module.exports = {
    getAllProducts,
    getAllByCategory,
    getAllProductsWithDiscount
}
