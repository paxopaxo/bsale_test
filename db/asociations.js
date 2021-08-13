const { sequelize } = require('sequelize');

const Category = require('../models/Categories')
const Product = require('../models/Products')

const setRelations = async() => {
    // await Category.hasMany(Product, { foreignKey: 'category' })
    // await Product.belongsTo(Category)
    await Product.belongsTo( Category, { foreignKey: 'category', as: 'cat_relation' })
    console.log('Relaciones completas.')

}

module.exports = {
    setRelations
}