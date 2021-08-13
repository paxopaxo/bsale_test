const { Op } = require('sequelize')
const { Product } = require("../../models/relations")

const getAllProducts = async (req, res) => {
    const { from = 0, show = 10 } = req.query

    const product = await Product.findAll({
        offset: Number(from),
        limit: Number(show),
    })

    res.json({ product })
}
const getAllByCategory = async (req, res) => {

    const { from = 0, show = 10 } = req.query
    const { id } = req.params
    
    const product = await Product.findAll({
        where: {
            category: Number(id)
        },
        offset: Number(from),
        limit: Number(show),
    })

    res.json({ product })
}
const getAllProductsWithDiscount = async(req, res) => {
    const { from = 0, show = 10 } = req.query
    
    const product = await Product.findAll({
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
