'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Option extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Option.init(
        {
            option_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            extra_price: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            shot_price: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            hot: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
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
            modelName: 'Option',
        }
    );
    return Option;
};
