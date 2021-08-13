const { Op } = require("sequelize")
const Category = require("../../models/Categories")
const Product = require("../../models/Products")

const searchFunction = async (req, res) => {
    const { from = 0, show = 10 } = req.query
    const { options, exp } = req.params

    const likeForm = `%${exp}%`

    switch (options) {
        case "products":
            const product = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: likeForm,
                    },
                },
                offset: Number(from),
                limit: Number(show),
            })

            res.status(200).json({ product })

            break
        case "categories":
            const categories = await Category.findAll({
                where: {
                    name: {
                        [Op.like]: likeForm,
                    },
                },
                offset: Number(from),
                limit: Number(show),
            })
            res.status(200).json({ categories })
            break
        case "both":

            const join = await Product.findAll({
                include: {
                    model: Category,
                    as: "join",
                    // where: {
                    //     [Op.or] : [
                    //         { [Op.like] : likeForm },
                    //         { [Op.like] : likeForm }
                    //     ]
                    // },
                    // required: false,
                },
            })

            break
        default:
            break
    }
}

module.exports = {
    searchFunction,
}
