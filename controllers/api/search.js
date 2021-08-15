const { Op } = require("sequelize")
const { Category, Product } = require("../../models/relations")

const searchFunction = async (req, res) => {
    const { from = 0, show = 10 } = req.query
    const { options, exp } = req.params

    const likeForm = `%${exp.trim()}%`

    switch (options) {
        case "products":
            const product = await Product.findAll({
                attributes: { exclude: ['category'] },
                where: {
                    [Op.or]: [
                        { name: {
                            [Op.like]: likeForm
                        }},
                        { id: Number(exp.trim()) || null }
                    ]
                },
                include: {
                    model: Category,
                    as: "categoria",
                },
                offset: Number(from),
                limit: Number(show),
            })

            res.status(200).json({ product })

            break
        case "categories":
            const categories = await Category.findAll({
                where: {
                    [Op.or]: [
                        { name: {
                            [Op.like]: likeForm,
                        }},
                        { id: Number(exp.trim()) || null }
                    ]
                    ,
                },
                offset: Number(from),
                limit: Number(show),
            })
            res.status(200).json({ categories })
            break

        default:
            res.status(500).json({err: 'Server error'})
            break
    }
}

module.exports = {
    searchFunction,
}
