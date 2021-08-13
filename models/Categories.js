const { DataTypes } = require('sequelize')
const db = require('../db/connection')
const Product = require('./Products')

const Category = db.define('category', {
    name: {
        type: DataTypes.STRING
    }
    }, {
    freezeTableName: true,
    timestamps: false
})




module.exports = Category