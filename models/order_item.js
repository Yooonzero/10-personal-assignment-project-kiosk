'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order_item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order_item.init(
        {
            order_items_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            item_id: {
                allowNull: false,
                type: DataTypes.NUMBER,
            },
            amount: {
                allowNull: false,
                type: DataTypes.NUMBER,
            },
            state: {
                allowNull: false,
                type: DataTypes.NUMBER,
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
            modelName: 'Order_item',
        }
    );
    return Order_item;
};