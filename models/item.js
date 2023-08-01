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
                allowNull: false,
                type: DataTypes.NUMBER,
            },
            price: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            type: {
                allowNull: false,
                type: DataTypes.ENUM,
            },
            amount: {
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
            modelName: 'Item',
        }
    );
    return Item;
};
