'use strict';
const {
    Model
} = require('sequelize');
//const { FOREIGNKEYS } = require('sequelize/types/query-types');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.User, { foreignKey: 'roleId', as: 'roleData' })
            Allcode.hasMany(models.Product, { foreignKey: 'categoryType', as: 'typeProductData' })
            Allcode.hasMany(models.Product, { foreignKey: 'status', as: 'statusProductData' })
            Allcode.hasMany(models.Post, { foreignKey: 'typePosts', as: 'typePostsData' })
            Allcode.hasMany(models.Order, { foreignKey: 'status', as: 'statusOrderData' })
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};