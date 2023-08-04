'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Order_item, {
                sourceKey: 'item_id',
                foreignKey: 'item_id',
            });
            this.hasMany(models.Item_order_customer, {
                sourceKey: 'item_id',
                foreignKey: 'item_id',
            });
        }
    }
    Item.init(
        {
            item_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            option_id: {
                type: DataTypes.INTEGER,
            },
            price: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            type: {
                allowNull: false,
                type: DataTypes.ENUM,
                values: ['coffee', 'juice', 'food'],
            },
            amount: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 0,
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
            modelName: 'Item',
        }
    );
    return Item;
};
