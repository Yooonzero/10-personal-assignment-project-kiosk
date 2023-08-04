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
            this.belongsTo(models.Item, {
                targetKey: 'item_id',
                foreignKey: 'item_id',
            });
        }
    }
    Order_item.init(
        {
            order_item_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            item_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            amount: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            state: {
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
            modelName: 'Order_item',
        }
    );
    return Order_item;
};
