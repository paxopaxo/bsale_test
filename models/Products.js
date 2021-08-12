const { DataTypes } = require('sequelize')
const db = require('../db/connection')

const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING
    },
    url_image: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER
    },
    discount: {
        type: DataTypes.NUMBER
    },
    category: {
        type: DataTypes.NUMBER
    }
})