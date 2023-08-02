'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Item', {
            item_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            option_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Option',
                    key: 'option_id',
                },
                onDelete: 'CASCADE',
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            type: {
                allowNull: false,
                type: Sequelize.ENUM('coffee', 'juice', 'food'),
            },
            amount: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Item');
    },
};
