'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Order.init({
        orderCode: DataTypes.STRING,
        productId: DataTypes.STRING,
        productName: DataTypes.STRING,
        price: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        note: DataTypes.TEXT,
        paymentMethod: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};