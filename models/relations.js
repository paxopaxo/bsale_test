const Category = require("./Categories")
const Product = require("./Products")

Category.hasMany(Product, {
    foreignKey: "category",
    as: "Rel",
})
Product.belongsTo(Category, { sourceKey: 'id', foreignKey: 'category', as: "categoria" })

module.exports = {
    Category,
    Product,
}
