'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item_order_customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Item_order_customer.init(
        {
            item_order_customer_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            item_id: {
                allowNull: false,
                type: DataTypes.NUMBER,
            },
            order_customer_id: {
                allowNull: false,
                type: DataTypes.NUMBER,
            },
            amount: {
                allowNull: false,
                type: DataTypes.NUMBER,
            },
            option: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Item_order_customer',
        }
    );
    return Item_order_customer;
};
