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
            this.belongsTo(models.Item, {
                targetKey: 'item_id',
                foreignKey: 'item_id',
            });
            this.belongsTo(models.Order_customer, {
                targetKey: 'order_customer_id',
                foreignKey: 'order_customer_id',
            });
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
                type: DataTypes.INTEGER,
            },
            order_customer_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            amount: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            option: {
                allowNull: false,
                type: DataTypes.JSON,
            },
            price: {
                allowNull: false,
                type: DataTypes.INTEGER,
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
