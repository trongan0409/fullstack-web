'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.Allcode, { foreignKey: 'categoryType', targetKey: 'keyMap', as: 'typeData' })
            Product.belongsTo(models.Allcode, { foreignKey: 'status', targetKey: 'keyMap', as: 'statusData' })
        }
    };
    Product.init({
        nameProduct: DataTypes.STRING,
        categoryType: DataTypes.STRING,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        slug: DataTypes.STRING,
        detail: DataTypes.TEXT,
        image: DataTypes.BLOB('long'),
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};